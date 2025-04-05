import { BookOpen, GraduationCap, BarChart, Compass } from "lucide-react";

const features = [
  {
    name: "Subject Proficiency Analysis",
    description:
      "Input your marks and receive a detailed analysis of your strengths and areas for improvement.",
    icon: BarChart,
  },
  {
    name: "Personalized Resource Recommendations",
    description:
      "Get tailored suggestions for books, courses, and online materials based on your proficiency levels.",
    icon: Compass,
  },
  {
    name: "Comprehensive Learning Library",
    description:
      "Access a vast collection of curated resources including PDFs, websites, and interactive content.",
    icon: BookOpen,
  },
  {
    name: "Interactive Learning Interface",
    description:
      "Engage with an intuitive platform designed to make your learning experience seamless and enjoyable.",
    icon: GraduationCap,
  },
];

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Empowering Your Education
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Discover how Student Hub can transform your learning experience with
          our innovative approach.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg shadow-sm bg-background p-8"
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
