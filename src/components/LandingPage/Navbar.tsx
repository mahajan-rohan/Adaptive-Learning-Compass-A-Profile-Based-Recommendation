import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-4 shadow-black/20 shadow-lg rounded-b-full hover:py-6 hover:px-12 transition-all duration-500 font-bold">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 text-[39px] tracking-widest font-bold"
        >
          <span className="font-bold">Student Hub</span>
          <span className="material-symbols-outlined text-[44px] text-gray-400 ml-2">
            school
          </span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="lg">
            Contact
          </Button> */}
          <Link
            href={"/dashboard"}
            className="bg-white/90 backdrop-blur-sm hover:bg-white/80 text-black/90 font-bold py-4 px-8 rounded-full transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
