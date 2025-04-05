import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectHero } from "@/components/SubjectPage/SubjectHero";
import { ResourceCarousel } from "@/components/SubjectPage/ResourcesCarousel";
import { ResourceGrid } from "@/components/SubjectPage/ResourceGrid";
import { TrendingSection } from "@/components/SubjectPage/TrendingSection";

// Dummy data for isValidSubject and courses - Replace with actual implementation
const isValidSubject = (subject: string) => {
  // Replace with your actual validation logic
  return ["math", "science", "history"].includes(subject);
};

const courses = [
  { id: "1", title: "Introduction to Algebra", href: "/courses/algebra" },
  { id: "2", title: "Advanced Calculus", href: "/courses/calculus" },
  { id: "3", title: "Quantum Physics", href: "/courses/physics" },
];

interface PageProps {
  params: {
    subject: string;
  };
  searchParams: {
    proficiency?: string;
  };
}

export default async function SubjectPage({ params, searchParams }: PageProps) {
  const { subject } = await params;
  const { proficiency } = (await searchParams) || { proficiency: "beginner" };

  // if (!isValidSubject(subject)) {
  //   notFound();
  // }

  // let obj = {
  //   subject: subject,
  //   proficiency: proficiency,
  // };

  // // Remove subject property in a type-safe way by destructuring
  // const { subject: _, ...rest } = obj;
  // not using this because it's not a good practice
  // we should use the searchParams to get the proficiency
  // and then use the subject from the params
  // because we want to keep the subject and proficiency separate
  // and not have to pass the subject in the searchParams
  // and then have to destructure it again
  // and then pass the rest of the object to the SubjectHero component
  // and then have to destructure it again
  // and then pass the rest of the object to the ResourceGrid component
  // and then have to destructure it again

  // console.log(rest);

  return (
    <div className="w-full overflow-hidden">
      <SubjectHero subject={subject} proficiency={proficiency} />

      <div className="space-y-8 sm:space-y-12 mt-8">
        {/* Video Carousel Section */}
        <section className="w-full">
          <Suspense
            fallback={
              <Skeleton className="h-[300px] sm:h-[350px] md:h-[400px] w-full rounded-xl" />
            }
          >
            <ResourceCarousel
              subject={subject}
              proficiency={proficiency}
              type="video"
              title="Recommended Videos"
            />
          </Suspense>
        </section>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <ResourceGrid
                subject={subject}
                proficiency={proficiency}
                type="pdf"
                title="Study Materials"
              />
            </Suspense>

            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <ResourceGrid
                subject={subject}
                proficiency={proficiency}
                type="article"
                title="Related Articles"
              />
            </Suspense>
          </div>

          {/* Sidebar - 1 column */}
          <aside className="space-y-6 sm:space-y-8">
            <Suspense
              fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
            >
              <TrendingSection subject={subject} />
            </Suspense>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-4">Popular Courses</h3>
              <div className="space-y-2 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-muted-foreground/20">
                {courses.map((course) => (
                  <a
                    key={course.id}
                    href={course.href}
                    className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="text-sm truncate flex-1 mr-2">
                      {course.title}
                    </span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
