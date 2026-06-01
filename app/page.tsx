import Hero from "@/components/Hero";
import Description from "@/components/Description";
import DatesGrid from "@/components/DatesGrid";
import Program from "@/components/Program";
import Details from "@/components/Details";
import Reviews from "@/components/Reviews";
import Venue from "@/components/Venue";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Description />
      <DatesGrid />
      <Program />
      <Details />
      <Reviews />
      <Venue />
      <Faq />
      <Footer />
    </main>
  );
}
