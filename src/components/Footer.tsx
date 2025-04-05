import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Student Hub</h2>
          <p className="text-sm text-muted-foreground">
            Empowering students with personalized learning resources.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Subjects
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Student Hub. All rights reserved.
        </p>
      </div>
      {/* <div className="w-full bg-[#efefef] items-center justify-center h-full overflow-auto"> */}
      {/* add relative positioning to the main conent */}
      {/* <div className="relative w-dvw h-dvh z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center bg-gradient-to-b from-background via-background/90 to-background text-white whitespace-pre">
          Scroll down ↓
        </div> */}

      {/* Sticky footer. The only important thing here is the z-index, the sticky position and the bottom value */}
      {/* <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-white flex justify-center items-center">
          <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-blue-500/10">
            <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm sm:text-lg md:text-xl text-black">
              <ul>
                <li className="hover:underline cursor-pointer">Home</li>
                <li className="hover:underline cursor-pointer">Docs</li>
                <li className="hover:underline cursor-pointer">Comps</li>
              </ul>
              <ul>
                <li className="hover:underline cursor-pointer">Github</li>
                <li className="hover:underline cursor-pointer">Instagram</li>
                <li className="hover:underline cursor-pointer">X (Twitter)</li>
              </ul>
            </div>
            <h2 className="absolute bottom-0 left-0  translate-y-1/3 sm:text-[192px]  text-[80px] text-black font-calendas">
              fancy
            </h2>
          </div>
        </div> 
      </div>*/}
    </footer>
  );
}
