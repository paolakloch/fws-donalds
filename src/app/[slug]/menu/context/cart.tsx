"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
    extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    decreaseProduct: (product: CartProduct) => void;
    increaseProduct: (product: CartProduct) => void;
    removeProduct: (product: CartProduct) => void;
    total: number;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
    decreaseProduct: () => { },
    increaseProduct: () => { },
    removeProduct: () => { },
    total: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0)

    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    };
    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(
            (prevProduct) => prevProduct.id === product.id,
        );
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product]);
        }
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity,
                    };
                }
                return prevProduct;
            });
        });
    };

    const decreaseProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(
            (prevProduct) => prevProduct.id === product.id,
        );
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product]);
        }
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity - 1,
                    };
                }
                return prevProduct;
            });
        });
    };

    const increaseProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(
            (prevProduct) => prevProduct.id === product.id,
        );
        if (!productIsAlreadyOnTheCart) {

            return setProducts((prev) => [...prev, product]);
        }
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + 1,
                    };
                }
                return prevProduct;
            });
        });
    };

    const removeProduct = (product: CartProduct) => {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct,
                decreaseProduct,
                increaseProduct,
                removeProduct,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
};