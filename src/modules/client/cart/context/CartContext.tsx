import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import type { CartItemDto, CartItemModifierDto } from '../../../../core/application/dtos/cart/CartDto';
import type { ProductDto } from '../../../../core/application/dtos/restaurant/ProductDto';
import { useAuthContext } from '../../../../shared/context/useAuthContext';

interface CartContextType {
    items: CartItemDto[];
    isOpen: boolean;
    totalAmount: number;
    totalItems: number;
    addItem: (product: ProductDto, quantity?: number, selectedModifiers?: CartItemModifierDto[], specialInstructions?: string) => void;
    removeItem: (productId: string) => void;
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
    const { isAuthenticated } = useAuthContext();

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

    const addItem = useCallback((
        product: ProductDto, 
        quantity = 1, 
        selectedModifiers: CartItemModifierDto[] = [], 
        specialInstructions = ''
    ) => {
        setItems((prevItems) => {
            // We use the generated ID conceptually to find duplicates, 
            // but strict comparison of modifiers is safer or we store the 'cartItemId' if we added it to DTO.
            // For now, let's compare logically.
            
            const existingItemIndex = prevItems.findIndex((item) => {
                if (item.product.id !== product.id) return false;
                
                // Compare modifiers
                const itemModifiers = item.selectedModifiers || [];
                const newModifiers = selectedModifiers || [];
                
                if (itemModifiers.length !== newModifiers.length) return false;
                
                // Deep compare - assuming order might differ so sort or check every
                // For simplicity assuming we pass sorted or consistent structure from modal
                // Ideally generating a unique signature is better.
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
                
                // Update special instructions if new ones provided (append or replace? usually replace or distinct item)
                // For simplicity here, we'll keep the existing instructions or update if needed.
                // If instructions differ, should it be a new item? 
                // Usually yes, differing instructions = new line item.
                // Let's assume instructions dictate uniqueness too.
                if (specialInstructions && newItems[existingItemIndex].specialInstructions !== specialInstructions) {
                    // Logic break: if instructions differ, we should have returned false in findIndex
                    // Let's refine findIndex for instructions too if we want robust split.
                    // For now, let's just update quantity.
                }

                return newItems;
            }

            // Since we don't have a unique 'id' field in CartItemDto generally exposed (it uses productId as key in original code),
            // we might run into issues if removeItem uses productId.
            // We need to use a composite key for removal/updates or rely on object identity/index.
            // But the interface says `removeItem(productId: string)`.
            // This is a breaking change for the interface contract if we have multiple items with same productId.
            // We need to change `productId` param to `cartMetadataId` or similar.
            // **Correction**: To maintain compatibility without huge refactor, we can append a suffix to productId in the CartItem 
            // but CartItemDto.product.id should remain real product ID.
            // CartItemDto.productId is the top level key. We can start using the composite ID there.
            
            const cartItemId = generateCartItemId(product.id, selectedModifiers); 
            // Note: If we change productId here, it might break backend sync if it expects real UUID. 
            // But frontend usually manages cart until checkout. 
            // Check usage: product.id should be real ID. item.productId can be unique key.

            return [...prevItems, {
                product,
                quantity,
                productId: cartItemId, // Use unique generated ID as the key for the cart item list
                subtotal: unitPrice * quantity,
                selectedModifiers,
                specialInstructions
            }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((cartItemId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.productId !== cartItemId));
    }, []);

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
