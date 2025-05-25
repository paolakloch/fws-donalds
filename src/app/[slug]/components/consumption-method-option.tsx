import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
    slug: string;
    imageUrl: string;
    imageAlt: string;
    buttonText: string;
    option: string;
}

const ConsumptionMethodOption = ({
    imageAlt,
    imageUrl,
    buttonText,
    option,
    slug,
}: ConsumptionMethodOptionProps) => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-8 px-12 py-8">
                <div className="relative h-[80px] w-[80px]">
                    <Image
                        src={imageUrl}
                        fill
                        alt={imageAlt}
                        className="object-contain"
                    />
                </div>
                <Button variant="secondary" className="rounded-full" asChild>
                    <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
                        {buttonText}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default ConsumptionMethodOption;
