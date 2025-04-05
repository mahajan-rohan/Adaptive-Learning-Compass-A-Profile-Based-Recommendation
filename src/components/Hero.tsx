import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Elevate Your Learning
          <br />
          with Student Hub
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-md sm:leading-8">
          Personalized learning resources based on your subject proficiency.
          Discover tailored books, courses, and materials to enhance your
          academic journey.
        </p>
      </div>
      <div>
        <Link
          href={"/dashboard"}
          className="bg-white/90 backdrop-blur-sm hover:bg-white/80 text-black/90 font-bold py-4 px-8 rounded-full transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
