import Navbar from "@/app/navbar";
import HeroSection from "../../app/sections/LandingPagesSections/herosection";
import Footer from "@/app/footer";

export default function LandingPage() {
  return (
    <div className="bg-[#f2f5f8]">
      <Navbar />
      {/* <section className="relative min-h-screen bg-background text-surface  flex flex-col items-center justify-center px-6 py-20 text-center">
        <div
          className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] z-0"
          aria-hidden
        />

        <div className="relative z-10 max-w-2xl">
          <Image
            src="/Elvo_logo_transparent.webp"
            alt="Elvo Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
            priority
          />

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            What if an AI could call your leads for you?
          </h1>

          <p className="mt-4 text-md md:text-lg text-muted-foreground">
            Meet Elvo — your smart voice agent that contacts, clusters, and
            summarizes leads while you sleep.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-primary text-background text-sm font-semibold rounded-full hover:opacity-90 transition duration-200"
          >
            Try It Now
          </Link>
        </div>
      </section> */}
      <HeroSection />
      <Footer />
    </div>
  );
}
