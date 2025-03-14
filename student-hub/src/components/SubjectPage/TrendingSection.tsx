"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingSectionProps {
  subject: string;
}

export function TrendingSection({ subject }: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth / 2
          : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // This would come from your ML/scraping backend
  const trending = [
    {
      id: 1,
      title: "Essential Machine Learning",
      description: "Master the fundamentals of ML algorithms",
      image: "/placeholder.svg?height=400&width=300",
      type: "Course",
      platform: "Coursera",
      url: "https://coursera.org/ml-course",
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      description: "Deep dive into Python's advanced features",
      image: "/placeholder.svg?height=400&width=300",
      type: "Video Series",
      platform: "YouTube",
      url: "https://youtube.com/python-advanced",
    },
    {
      id: 3,
      title: "Web Development 2024",
      description: "Modern web development techniques",
      image: "/placeholder.svg?height=400&width=300",
      type: "Workshop",
      platform: "Udemy",
      url: "https://udemy.com/web-dev-2024",
    },
    {
      id: 4,
      title: "Data Structures Masterclass",
      description: "Comprehensive guide to DS&A",
      image: "/placeholder.svg?height=400&width=300",
      type: "Course",
      platform: "edX",
      url: "https://edx.org/dsa-course",
    },
    {
      id: 5,
      title: "AI Foundation",
      description: "Understanding artificial intelligence",
      image: "/placeholder.svg?height=400&width=300",
      type: "Course",
      platform: "Stanford Online",
      url: "https://stanford.edu/ai-course",
    },
    {
      id: 6,
      title: "AI Foundation II",
      description: "Understanding artificial intelligence",
      image: "/placeholder.svg?height=400&width=300",
      type: "Course",
      platform: "Stanford Online",
      url: "https://stanford.edu/ai-course",
    },
    {
      id: 7,
      title: "AI Foundation III",
      description: "Understanding artificial intelligence",
      image: "/placeholder.svg?height=400&width=300",
      type: "Course",
      platform: "Stanford Online",
      url: "https://stanford.edu/ai-course",
    },
    {
      id: 8,
      title: "AI Foundation IV",
      description: "Understanding artificial intelligence",
      image: "/placeholder.svg?height=400&width=300",
      type: "Course",
      platform: "Stanford Online",
      url: "https://stanford.edu/ai-course",
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {trending.map((item) => (
          <Link
            key={item.id}
            href={`/resource/${item.id}`}
            className="relative flex-shrink-0 snap-start w-[200px] h-[300px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="bg-primary/20 text-xs inline-block px-2 py-1 rounded-full backdrop-blur-sm mb-2">
                {item.platform}
              </div>
              <h3 className="font-semibold line-clamp-2 mb-1">{item.title}</h3>
              <p className="text-sm text-white/80 line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
