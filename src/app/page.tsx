import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ShopByCategory } from "@/components/home/shop-by-category";
import { BestSellers } from "@/components/home/best-sellers";
import { Occasions } from "@/components/home/occasions";
import { WhyGemista } from "@/components/home/why-gemista";
import { Reviews } from "@/components/home/reviews";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { Press } from "@/components/home/press";
import { GiftGuideBanner } from "@/components/home/gift-guide-banner";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Press />
      <FeaturedCollections />
      <ShopByCategory />
      <NewArrivals />
      <BestSellers />
      <Occasions />
      <WhyGemista />
      <Reviews />
      <InstagramFeed />
      <GiftGuideBanner />
      <Newsletter />
    </>
  );
}
