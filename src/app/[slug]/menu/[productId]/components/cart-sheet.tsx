import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { CartContext } from "../../context/cart";

export const CartSheet = () => {

    const { isOpen, toggleCart, products } = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                {products.map(product =>
                    <h1 key={product.id}>{product.name} - {product.quantity}</h1>
                )}
            </SheetContent>
        </Sheet>
    )
}