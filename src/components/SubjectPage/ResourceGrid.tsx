"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Book, Video, Laptop } from "lucide-react";
import { motion } from "motion/react";

interface ResourceGridProps {
  subject: string;
  proficiency?: string;
  type: "video" | "pdf" | "article" | "course";
  title: string;
}

const MotionLink = motion(Link);
const MotionCard = motion(Card);

export function ResourceGrid({
  subject,
  proficiency,
  type,
  title,
}: ResourceGridProps) {
  const resources = [
    {
      id: "1",
      type: "PDF",
      level: "Beginner",
      title: "Introduction to React",
      author: "John Doe",
      size: "2MB",
      pages: 20,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "2",
      type: "Article",
      level: "Intermediate",
      title: "Advanced React Patterns",
      author: "Jane Smith",
      size: "N/A",
      pages: 15,
      color: "from-purple-500/20 to-pink-500/20",
    },
    // ... more resources
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return FileText;
      case "Article":
        return Book;
      case "Video":
        return Video;
      default:
        return Laptop;
    }
  };

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-2xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.type);

          return (
            <MotionLink
              key={resource.id}
              href={`/resource/${resource.id}`}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MotionCard className="h-[200px] overflow-hidden backdrop-blur-xl bg-gradient-to-br border-0 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-50`}
                />
                <CardContent className="relative p-6 h-full flex flex-col">
                  <div className="flex flex-wrap gap-2 items-start mb-3">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-background/50 backdrop-blur-sm"
                    >
                      <Icon className="h-3 w-3" />
                      {resource.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-background/50 backdrop-blur-sm"
                    >
                      {resource.level}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                    <ExternalLink className="inline-block ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                    <span className="truncate max-w-[150px]">
                      {resource.author}
                    </span>
                    <span>
                      {resource.type === "PDF"
                        ? resource.size
                        : resource.pages + " pages"}
                    </span>
                  </div>
                </CardContent>
              </MotionCard>
            </MotionLink>
          );
        })}
      </div>
    </div>
  );
}
