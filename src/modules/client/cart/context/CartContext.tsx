import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import type { CartItemDto, CartItemModifierDto } from '../../../../core/application/dtos/cart/CartDto';
import type { AddToCartDto, AddToCartModifierGroupDto } from '../../../../core/application/dtos/cart/AddToCart.dto';
import type { RemoveFromCartDto, RemoveCartModifierGroupDto } from '../../../../core/application/dtos/cart/RemoveFromCart.dto';
import type { ProductDto } from '../../../../core/application/dtos/restaurant/ProductDto';
import { useAuthContext } from '../../../../shared/context/useAuthContext';
import { CartService } from '../../../../core/application/services/Cart/CartService';
import { CartAdapter } from '../../../../core/infrastructure/adapters/cart/CartAdapter';

interface CartContextType {
    items: CartItemDto[];
    isOpen: boolean;
    totalAmount: number;
    totalItems: number;
    addItem: (product: ProductDto, quantity?: number, selectedModifiers?: CartItemModifierDto[], specialInstructions?: string) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItemDto[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useAuthContext();
    const cartService = useMemo(() => new CartService(new CartAdapter()), []);

    useEffect(() => {
        if (!isAuthenticated) {
            setItems([]);
        }
    }, [isAuthenticated]);

    // Helper to generate a unique ID for the cart item based on product and modifiers
    const generateCartItemId = (productId: string, modifiers: CartItemModifierDto[] = []) => {
        if (!modifiers || modifiers.length === 0) return productId;
        
        // Simple hash generation for modifiers to distinguish variations
        const sortedModifiers = [...modifiers].sort((a, b) => a.name.localeCompare(b.name));
        const modifiersString = JSON.stringify(sortedModifiers);
        // Create a simple hash or just use the string if length permits, 
        // but robustly we append a signature
        let hash = 0;
        for (let i = 0; i < modifiersString.length; i++) {
            const char = modifiersString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return `${productId}-${hash}`;
    };

    const addItem = useCallback(async (
        product: ProductDto, 
        quantity = 1, 
        selectedModifiers: CartItemModifierDto[] = [], 
        specialInstructions = ''
    ) => {
        // ... (addItem logic remains same)
         // Call backend service
         // We don't await strictly to block UI, but we should handle errors.
         // For now, logging error.
       try {
            if (isAuthenticated && user) {
                // Determine restaurantId - try to get it from product if available (it might be missing in some DTO definitions)
                 // Assuming product has restaurantId or we default. 
                 // Note: The restaurant/ProductDto does not show restaurantId, but order/ProductDto does.
                 // We will cast/check safely.
                 const restaurantId = product.restaurantId || (product as any).restaurantId || 0;
                 const dishId = parseInt(product.id) || 0;

                 const modifierGroups: AddToCartModifierGroupDto[] = selectedModifiers.map(mod => ({
                     modifierGroupTemplateId: mod.id, 
                     modifierGroupTemplateName: mod.name,
                     options: mod.options.map(opt => ({
                         modifierItemId: opt.id,
                         modifierItemName: opt.name
                     }))
                 }));

                 const parsedUserId = user.id ? parseInt(user.id) : 0;
                 if (user.id && isNaN(parsedUserId)) {
                    console.warn("User ID is not a number:", user.id);
                 }

                 const addToCartDto: AddToCartDto = {
                     userId: parsedUserId, 
                     restaurantId: restaurantId,
                     dishId: dishId,
                     dishImage: product.image,
                     dishName: product.name,
                     quantity: quantity,
                     unitPrice: product.price,
                     modifierGroups: modifierGroups
                 };
                 await cartService.addToCart(addToCartDto);
            }
        } catch (error) {
            console.error("Error adding item to backend cart:", error);
        }

        setItems((prevItems) => {
        
            const existingItemIndex = prevItems.findIndex((item) => {
                if (item.product.id !== product.id) return false;
                
                const itemModifiers = item.selectedModifiers || [];
                const newModifiers = selectedModifiers || [];
                
                if (itemModifiers.length !== newModifiers.length) return false;
                return JSON.stringify(itemModifiers) === JSON.stringify(newModifiers);
            });

            // Calculate base price + modifiers
            let unitPrice = product.price;
            selectedModifiers?.forEach(mod => {
               mod.options.forEach(opt => unitPrice += opt.price);
            });

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                newItems[existingItemIndex].subtotal = unitPrice * newItems[existingItemIndex].quantity;
            
                if (specialInstructions && newItems[existingItemIndex].specialInstructions !== specialInstructions) {

                }

                return newItems;
            }
            
            const cartItemId = generateCartItemId(product.id, selectedModifiers);

            return [...prevItems, {
                product,
                quantity,
                productId: cartItemId,
                subtotal: unitPrice * quantity,
                selectedModifiers,
                specialInstructions
            }];
        });
        setIsOpen(true);
    }, [isAuthenticated, user, cartService]);

    const removeItem = useCallback(async (cartItemId: string) => {
        try {
            if (isAuthenticated && user) {
                const itemToRemove = items.find(item => item.productId === cartItemId);
                
                if (itemToRemove) {
                    const dishId = parseInt(itemToRemove.product.id) || 0;
                    const restaurantId = itemToRemove.product.restaurantId || (itemToRemove.product as any).restaurantId || 0;
                    
                    const modifierGroups: RemoveCartModifierGroupDto[] = (itemToRemove.selectedModifiers || []).map(mod => ({
                        modifierGroupTemplateId: mod.id,
                        optionIds: mod.options.map(opt => opt.id)
                    }));

                    const parsedUserId = user.id ? parseInt(user.id) : 0;

                    const removeFromCartDto: RemoveFromCartDto = {
                        userId: parsedUserId,
                        restaurantId: restaurantId,
                        dishId: dishId,
                        modifierGroups: modifierGroups
                    };

                    await cartService.removeFromCart(removeFromCartDto);
                }
            }
        } catch (error) {
           console.error("Error removing item from backend cart:", error);
        }
        setItems((prevItems) => prevItems.filter((item) => item.productId !== cartItemId));
    }, [isAuthenticated, user, cartService, items]);

    const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(cartItemId);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.productId === cartItemId) {
                     // Recalculate subtotal
                     let unitPrice = item.product.price;
                     item.selectedModifiers?.forEach(mod => {
                        mod.options.forEach(opt => unitPrice += opt.price);
                     });
                     
                     return { 
                         ...item, 
                         quantity, 
                         subtotal: unitPrice * quantity 
                     };
                }
                return item;
            })
        );
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const totalAmount = useMemo(() => {
        return items.reduce((total, item) => total + item.subtotal, 0);
    }, [items]);

    const totalItems = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const value = useMemo(
        () => ({
            items,
            isOpen,
            totalAmount,
            totalItems,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            toggleCart,
            openCart,
            closeCart,
        }),
        [items, isOpen, totalAmount, totalItems, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
