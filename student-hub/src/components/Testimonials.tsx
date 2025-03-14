"use client";

import { motion } from "motion/react";
import { Quote, Star, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Computer Science Student",
    avatar: "/placeholder.svg?height=80&width=80",
    quote:
      "Student Hub transformed my learning experience. The personalized recommendations helped me improve my algorithm skills, and I saw a 15% increase in my grades within a semester.",
    stars: 5,
    icon: GraduationCap,
  },
  {
    name: "Kavya Verma",
    role: "Mechanical Engineering",
    avatar: "/placeholder.svg?height=80&width=80",
    quote:
      "The subject proficiency analysis pinpointed exactly where I needed to focus. The recommended resources were spot-on and helped me master complex concepts I was struggling with.",
    stars: 5,
    icon: GraduationCap,
  },
  {
    name: "Ananya Mehta",
    role: "BSC student",
    avatar: "/placeholder.svg?height=80&width=80",
    quote:
      "As someone juggling studies with part-time work, Student Hub's curated resources saved me countless hours of searching. The platform is intuitive and the recommendations are incredibly relevant.",
    stars: 4,
    icon: GraduationCap,
  },
  {
    name: "Priya Patil",
    role: "MCA Student",
    avatar: "/placeholder.svg?height=80&width=80",
    quote:
      "I was struggling with advanced calculus until I found Student Hub. The tailored book recommendations and interactive materials made complex topics much more approachable.",
    stars: 5,
    icon: GraduationCap,
  },
  {
    name: "Dr. Vihan Kapoor",
    role: "University Professor",
    avatar: "/placeholder.svg?height=80&width=80",
    quote:
      "I recommend Student Hub to all my students. The platform's ability to identify knowledge gaps and provide targeted resources has noticeably improved classroom performance.",
    stars: 5,
    icon: Briefcase,
  },
  {
    name: "Riya Desai",
    role: "Diploma in IT",
    avatar: "/placeholder.svg?height=80&width=80",
    quote:
      "The comprehensive learning library has resources I couldn't find anywhere else. Student Hub has become an essential part of my study routine.",
    stars: 4,
    icon: GraduationCap,
  },
];

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="container space-y-16 py-24 md:py-32 relative">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          What Our Students Say
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Discover how Student Hub has helped students achieve their academic
          goals.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.23, 0.86, 0.39, 0.96],
            }}
            className={cn(
              "relative overflow-hidden rounded-lg border border-border/40 bg-background/95 p-8 shadow-sm backdrop-blur-sm",
              "transition-all duration-300 hover:shadow-md hover:border-border/60",
              hoveredIndex === index ? "scale-[1.02]" : ""
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="absolute top-4 right-4 text-yellow-400 flex">
              {Array(testimonial.stars)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                />
              </div> */}
              <div>
                <h3 className="font-bold">{testimonial.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <testimonial.icon className="mr-1 h-3 w-3" />
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Quote className="absolute -left-1 -top-1 h-6 w-6 text-muted-foreground/20" />
              <p className="pl-5 pt-2 text-muted-foreground">
                {testimonial.quote}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
