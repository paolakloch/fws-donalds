'use client'
import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductHeaderProps {
    product: Pick<Product, 'name' | `imageUrl`>
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {

    const { back } = useRouter()

    return (
        <div className="relative w-full h-[300px]">
            <div className="relative h-[250px] w-full">
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-4 z-50 rounded-full"
                    onClick={back}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-4 z-50 rounded-full"
                    onClick={back}
                >
                    <ScrollTextIcon />
                </Button>
            </div>
            {/* 'testestest' */}
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
            />
        </div>
    )
}