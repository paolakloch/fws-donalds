import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps {
    products: Product[];
}

const Products = ({ products }: ProductsProps) => {

    const { slug } = useParams<{ slug: string }>();

    return (
        <div className="space-y-3 ">
            {products.map(product => (
                <Link href={`/${slug}/menu/${product.id}`} key={product.id} className="flex items-center border-b justify-between gap-10 py-3">
                    <div>
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="line-clamp-2 text-muted-foreground">{product.description}</p>
                        <p>{new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(product.price)}
                        </p>
                    </div>

                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>

                </Link>
            ))}
        </div>
    );
}

export default Products;