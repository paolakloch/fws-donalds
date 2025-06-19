import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { ProductHeader } from "./components/product-header";
import { ProductDetails } from "./components/product-details";

interface ProductPageProps {
    params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {

    const { slug, productId } = await params;


    const product = await db.product.findUnique({ where: { id: productId }, include: { restaurant: true } })

    if (!product) {
        return notFound();
    }

    if (product.restaurant.slug.toLocaleUpperCase !== slug.toLocaleUpperCase) {
        return notFound();
    }

    return (
        <div className=" flex flex-col h-full">
            <ProductHeader
                product={product} />
            <ProductDetails
                product={product}
            />
        </div>
    );
}

export default ProductPage;