import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { CartContext } from "../../context/cart";
import { CartItem } from "./cart-item";

export const CartSheet = () => {

    const { isOpen, toggleCart, products } = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="text-left mb-6">Sacola</SheetTitle>
                </SheetHeader>
                {products.map(product =>
                    <CartItem key={product.name} item={product} />
                )}
            </SheetContent>
        </Sheet>
    )
}