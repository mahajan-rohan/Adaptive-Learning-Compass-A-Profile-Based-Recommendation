import { Badge } from "@/components/ui/badge";

interface SubjectHeroProps {
  subject: string;
  proficiency?: string;
}

export function SubjectHero({ subject, proficiency }: SubjectHeroProps) {
  return (
    <div className="bg-muted">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4 capitalize">
            {subject.replace("-", " ")}
          </h1>
          {proficiency && (
            <Badge variant="secondary" className="mb-4">
              {proficiency} Level
            </Badge>
          )}
          <p className="text-muted-foreground text-lg">
            Explore curated resources to help you master {subject}. From
            beginner to advanced, find the perfect materials for your learning
            journey.
          </p>
        </div>
      </div>
    </div>
  );
}
