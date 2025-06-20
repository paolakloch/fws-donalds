"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
})

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    const addProduct = (product: CartProduct) => {

        const productIsAlreadyOneTheCart = products.some((prevProduct) => prevProduct.id === product.id)

        if (productIsAlreadyOneTheCart) {
            return setProducts((prev) => [...prev, product]);
        }
        setProducts(prevProducts =>
            prevProducts.map(prevProduct =>
                prevProduct.id === product.id
                    ? { ...prevProduct, quantity: prevProduct.quantity + product.quantity }
                    : prevProduct
            )
        )
        // return prevProduct;
    }

    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                toggleCart,
                addProduct
            }}
        >
            {children}
        </CartContext.Provider>
    )
};

