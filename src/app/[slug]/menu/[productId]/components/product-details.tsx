"use client"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/format-currency"
import { Prisma, Product, Restaurant } from "@prisma/client"
import { ChefHatIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useContext, useState } from "react"
import { CartContext } from "../../context/cart"
import { CartSheet } from "./cart-sheet"


interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {

    const [quantity, setQuantity] = useState(1)

    const { toggleCart } = useContext(CartContext)

    const handleToggleCart = () => {
        toggleCart()
    }

    return (
        <>   <div className="relative z-50 rounded-t-3xl py-5 mt-[-1rem] p-5 flex-col flex-auto flex flex-col">
            <div className="flex-auto">
                <div className="flex items.center gap-1  ">
                    <Image
                        src={product.restaurant.avatarImageUrl}
                        alt={product.restaurant.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>

                </div>

                <h2 className="text-xl font-semibold mt-1">{product.name}</h2>

                <div className="flex items-center justify-between mt-3">
                    <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>
                    <div className="flex items-center gap-3 text-center">
                        <Button variant="outline" className="w-8 h-8 rounded-xl" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                            <ChevronLeft />
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="outline" className="w-8 h-8 rounded-xl" onClick={() => setQuantity(quantity + 1)}>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <h4 className="font-semi-bold">Sobre</h4>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-1">
                        <ChefHatIcon />
                        <h4 className="font-semi-bold">Ingredientes</h4>
                    </div>

                    <ul className="list-disc px-7 text-muted-foreground">
                        {product.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

            </div>
            <Button className="mt-6 w-full rounded-full" onClick={handleToggleCart}>Adicionar na Sacola</Button>

            <CartSheet />
        </div>
        </>
    )
}