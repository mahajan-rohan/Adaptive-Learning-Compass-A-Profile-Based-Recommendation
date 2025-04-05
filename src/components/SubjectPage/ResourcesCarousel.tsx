"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResourceCarouselProps {
  subject: string;
  proficiency?: string;
  type: "video" | "pdf" | "article" | "course";
  title: string;
}

export function ResourceCarousel({
  subject,
  proficiency,
  type,
  title,
}: ResourceCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // This would come from your ML/scraping backend
  const resources = [
    {
      id: 101,
      title: "Complete Guide to Modern Development",
      thumbnail: "/placeholder.svg",
      duration: "15:30",
      author: "Tech Academy",
      platform: "YouTube",
      rating: 4.8,
      views: "125K",
      url: "https://youtube.com/watch?v=123",
    },
    {
      id: 102,
      title: "Advanced Concepts in Practice",
      thumbnail: "/placeholder.svg",
      duration: "22:15",
      author: "Code Masters",
      platform: "Udemy",
      rating: 4.9,
      views: "50K",
      url: "https://udemy.com/course/123",
    },
    {
      id: 103,
      title: "Real-world Applications",
      thumbnail: "/placeholder.svg",
      duration: "18:45",
      author: "Dev Insights",
      platform: "Coursera",
      rating: 4.7,
      views: "75K",
      url: "https://coursera.org/learn/123",
    },
    {
      id: 104,
      title: "Expert Level Techniques",
      thumbnail: "/placeholder.svg",
      duration: "45:00",
      author: "Pro Coders",
      platform: "edX",
      rating: 4.6,
      views: "30K",
      url: "https://edx.org/course/123",
    },
    {
      id: 105,
      title: "Industry Best Practices",
      thumbnail: "/placeholder.svg",
      duration: "28:20",
      author: "Tech Pros",
      platform: "Pluralsight",
      rating: 4.5,
      views: "40K",
      url: "https://pluralsight.com/courses/123",
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
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
        {resources.map((resource) => (
          <Link
            key={resource.id}
            href={`/resource/${resource.id}`}
            className="group"
          >
            <Card
              className={cn(
                "flex-shrink-0 snap-start transition-transform duration-300 group-hover:scale-[1.02]",
                "w-[300px] sm:w-[350px]"
              )}
            >
              <CardContent className="p-4">
                <div className="aspect-video relative rounded-xl overflow-hidden bg-muted">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded-full text-sm">
                    {resource.duration}
                  </div>
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 backdrop-blur-sm bg-black/50"
                  >
                    {resource.platform}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {resource.title}
                  <ExternalLink className="inline-block ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                  <span>{resource.author}</span>
                  <span>{resource.views} views</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-500">★</span>
                  <span>{resource.rating}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
