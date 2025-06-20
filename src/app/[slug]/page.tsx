import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurants-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurants = await getRestaurantBySlug(slug);

  if (!restaurants) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurants?.avatarImageUrl}
          alt={restaurants.name}
          width={82}
          height={82}
        />
        <h2 className="fonts-semibold">{restaurants.name}</h2>
        <div className="space-y-2 pt-24 text-center">
          <h3 className="text-2xl font-semibold">Welcome!</h3>
          <p>Choose how to better enjoy your meal.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-14">
          <ConsumptionMethodOption
            slug={slug}
            imageUrl="/dine_in.png"
            imageAlt="Dine In"
            buttonText="Dine In"
            option="DINE_IN"
          />
          <ConsumptionMethodOption
            slug={slug}
            imageUrl="/takeaway.png"
            imageAlt="Take Out"
            buttonText="Take Out"
            option="TAKEAWAY"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
