import Image from "next/image"
import { CartContext, CartProduct } from "../../context/cart"
import { formatCurrency } from "@/helpers/format-currency"
import { ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"

interface CartItemProps {
    item: CartProduct

}

export const CartItem = ({ item }: CartItemProps) => {

    const { decreaseProduct, addProduct } = useContext(CartContext)

    return (
        <div className="flex items-center  mb-6 justify-between">
            <div className="relative h-20 w-20  bg-gray-100 rounded-xl">
                <Image src={item.imageUrl} alt={item.name} fill />
            </div>
            <div className="space-y-1 min-w-[60%]">
                <p className="mb-1 text-sm truncate m-w-[90%]">{item.name}</p>
                <div className="flex justify-between">
                    <p>{formatCurrency(item.price)}</p>
                    <Button variant="ghost"> {<TrashIcon />}</Button>
                </div>
                <div className="flex items-center gap-2 text-center">
                    <Button disabled={item.quantity == 1} onClick={() => decreaseProduct(item)} className="h-7 w-7 rounded-lg" > <ChevronLeftIcon /></Button>
                    <p>{item.quantity}</p>
                    <Button onClick={() => addProduct(item)} className="h-7 w-7 rounded-lg" variant="destructive"> <ChevronRightIcon /></Button>
                </div>

            </div>
        </div>
    )
}