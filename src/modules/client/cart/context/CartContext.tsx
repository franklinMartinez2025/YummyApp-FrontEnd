import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import type { CartItemDto } from '../../../../core/application/dtos/cart/CartDto';
import type { ProductDto } from '../../../../core/application/dtos/restaurant/ProductDto';
import { useAuthContext } from '../../../../shared/context/useAuthContext';

interface CartContextType {
    items: CartItemDto[];
    isOpen: boolean;
    totalAmount: number;
    totalItems: number;
    addItem: (product: ProductDto, quantity?: number) => void;
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

    const addItem = useCallback((product: ProductDto, quantity = 1) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            }

            return [...prevItems, {
                product,
                quantity,
                productId: product.id,
                subtotal: product.price * quantity
            }];
        });
        setIsOpen(true); // Open cart when adding item
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(productId);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity, subtotal: item.product.price * quantity } : item
            )
        );
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const totalAmount = useMemo(() => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
