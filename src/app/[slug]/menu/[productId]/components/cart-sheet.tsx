import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { CartContext } from "../../context/cart";
import { CartItem } from "./cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerDescription, DrawerTitle, DrawerHeader, DrawerTrigger, Drawer } from "@/components/ui/drawer";

export const CartSheet = () => {

    const { isOpen, toggleCart, products, total } = useContext(CartContext)

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                </SheetHeader>
                <div className="h-full py-10 flex flex-col gap-2">
                    <div className="flex-auto">  {products.map(product =>
                        <CartItem key={product.name} item={product} />
                    )}
                    </div>
                    <Card>
                        <CardContent className="flex justify-between p-4">
                            <p className="text-sm text-muted-foreground">total</p>
                            <p className="font-bold text-sm">{formatCurrency(total)}</p>
                        </CardContent>
                    </Card>

                </div>
            </SheetContent>
        </Sheet>
    )
}