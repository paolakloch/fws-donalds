import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import { ProductDetails } from "./components/product-details";
import { ProductHeader } from "./components/product-header";

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