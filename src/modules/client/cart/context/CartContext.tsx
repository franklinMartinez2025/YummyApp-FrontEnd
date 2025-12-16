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
    cartId: number | null;
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

const generateCartItemId = (productId: string, modifiers: CartItemModifierDto[] = []) => {
    if (!modifiers || modifiers.length === 0) return productId;
    
    const sortedModifiers = [...modifiers].sort((a, b) => a.name.localeCompare(b.name));
    const modifiersString = JSON.stringify(sortedModifiers);
    let hash = 0;
    for (let i = 0; i < modifiersString.length; i++) {
        const char = modifiersString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return `${productId}-${hash}`;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItemDto[]>([]);
    const [cartId, setCartId] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useAuthContext();
    const cartService = useMemo(() => new CartService(new CartAdapter()), []);

    useEffect(() => {
        if (!isAuthenticated) {
            setItems([]);
        } else {
             loadUserCart();
        }
    }, [isAuthenticated]);



    const loadUserCart = useCallback(async () => {
        if (!isAuthenticated || !user?.id) return;

        try {
            const userId = parseInt(user.id);
            if (isNaN(userId)) return;

            const response = await cartService.getCartsByUserId(userId);
            if (response.data) {
                const mappedItems: CartItemDto[] = response.data.map((dto) => {
                    const modifiers: CartItemModifierDto[] = dto.modifierGroups.map(group => ({
                        id: group.modifierGroupTemplateId,
                        name: group.modifierGroupTemplateName,
                        price: 0,
                        options: group.options.map(opt => ({
                            id: opt.id,
                            name: opt.name,
                            price: 0
                        }))
                    }));

                    const cartItemId = generateCartItemId(dto.dishId.toString(), modifiers);
                    const subtotal = dto.unitPrice * dto.quantity;

                    return {
                        productId: cartItemId,
                        product: {
                            id: dto.dishId.toString(),
                            name: dto.dishName,
                            price: dto.unitPrice,
                            image: dto.dishImage,
                            restaurantId: dto.restaurantId
                        },
                        quantity: dto.quantity,
                        subtotal: subtotal,
                        selectedModifiers: modifiers,
                        specialInstructions: ''
                    };
                });
                
                // Extract cartId from the first item if available
                if (response.data.length > 0) {
                    setCartId(response.data[0].cartId);
                }
                
                setItems(mappedItems);
            }
        } catch (error) {
            console.error("Failed to load user cart:", error);
        }
    }, [isAuthenticated, user, cartService]);

    const addItem = useCallback(async (
        product: ProductDto, 
        quantity = 1, 
        selectedModifiers: CartItemModifierDto[] = [], 
        specialInstructions = ''
    ) => {
        setItems((prevItems) => {
        
            const existingItemIndex = prevItems.findIndex((item) => {
                if (item.product.id !== product.id) return false;
                
                const itemModifiers = item.selectedModifiers || [];
                const newModifiers = selectedModifiers || [];
                
                if (itemModifiers.length !== newModifiers.length) return false;
                return JSON.stringify(itemModifiers) === JSON.stringify(newModifiers);
            });

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

       try {
            if (isAuthenticated && user) {
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
                 const response = await cartService.addToCart(addToCartDto);
                 
                 if (response.success && response.data) {
                     setCartId(response.data);
                 }
            }
        } catch (error) {
            console.error("Error adding item to backend cart:", error);
        }
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
        setCartId(null);
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
            cartId,
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
        [items, cartId, isOpen, totalAmount, totalItems, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart]
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
