import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="border-t h-screen flex items-center justify-center bg-gradient-to-b bg-background">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-gray-700">
          Ready to boost your academic performance?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join Student Hub today and unlock a world of personalized learning
          resources tailored to your unique educational needs.
        </p>
        <Button
          size="lg"
          className="mt-4 bg-white/90 backdrop-blur-sm hover:bg-white/80 text-black/90 font-bold py-4 px-8 rounded-full transition-all duration-300"
        >
          Start Your Learning Journey
        </Button>
      </div>
    </section>
  );
}
