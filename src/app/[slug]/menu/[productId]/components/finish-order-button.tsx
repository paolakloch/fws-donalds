import Image from "next/image"
import { CartContext, CartProduct } from "../../context/cart"
import { formatCurrency } from "@/helpers/format-currency"
import { ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { DrawerClose, DrawerFooter, DrawerDescription, DrawerTitle, DrawerHeader, DrawerContent, DrawerTrigger, Drawer } from "@/components/ui/drawer"

interface FinishOrderButtonProps {
    item: CartProduct
}

export const FinishOrderButton = ({ item }: FinishOrderButtonProps) => {

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-full rounded-lg">Finalizar Pedido</Button></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>Insira suas infos abaixo para finalizar o pedido</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}