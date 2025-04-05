import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Image } from "@/components/ui/image";

type BaseResource = {
  id: number;
  title: string;
  url?: string;
  platform?: string;
  type?: string;
  author?: string;
};

type VideoResource = BaseResource & {
  resourceType: "video";
  thumbnail: string;
  duration: string;
  rating: number;
  views: string;
};

type ArticleResource = BaseResource & {
  resourceType: "article";
  image: string;
  description: string;
};

type PDFResource = BaseResource & {
  resourceType: "pdf";
  pages: number;
  level: string;
  downloadUrl: string;
  size: string;
};

type Resource = VideoResource | ArticleResource | PDFResource;

// This would come from your backend in a real application
const getResourceById = (id: string) => {
  const allResources = [
    ...trendingResources,
    ...videoResources,
    ...pdfAndArticleResources,
  ];
  return allResources.find((resource) => resource.id.toString() === id);
};

export default function ResourcePage({ params }: { params: { id: string } }) {
  const resource = getResourceById(params.id);

  if (!resource) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
        <div className="mb-6">
          <Image
            src={getResourceImage(resource)}
            alt={resource.title}
            className="w-full h-64 object-cover rounded-lg"
            fallback="/placeholder.jpg"
          />
        </div>
        <div className="grid gap-4 mb-6">
          <p>
            <strong>Type:</strong> {resource.type || "N/A"}
          </p>
          <p>
            <strong>Platform:</strong> {resource.platform || "N/A"}
          </p>
          {"author" in resource && resource.author && (
            <p>
              <strong>Author:</strong> {resource.author}
            </p>
          )}
          {"duration" in resource && resource.duration && (
            <p>
              <strong>Duration:</strong> {resource.duration}
            </p>
          )}
          {"rating" in resource && resource.rating && (
            <p>
              <strong>Rating:</strong> {resource.rating}/5
            </p>
          )}
          {"views" in resource && resource.views && (
            <p>
              <strong>Views:</strong> {resource.views}
            </p>
          )}
          {"description" in resource && resource.description && (
            <div>
              <strong>Description:</strong>
              <p>{resource.description}</p>
            </div>
          )}
        </div>
        <Button asChild>
          <a
            href={resource.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            Go to Resource <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

// Mock data (in a real app, this would be in a separate data file or fetched from an API)
const trendingResources: Resource[] = [
  {
    id: 1,
    resourceType: "article",
    title: "Essential Machine Learning",
    description: "Master the fundamentals of ML algorithms",
    image: "/placeholder.svg?height=400&width=300",
    type: "Course",
    platform: "Coursera",
    url: "https://coursera.org/ml-course",
  },
  // ... other trending resources
];

const videoResources: Resource[] = [
  {
    id: 101,
    resourceType: "video",
    title: "Complete Guide to Modern Development",
    thumbnail: "/placeholder.svg",
    duration: "15:30",
    author: "Tech Academy",
    platform: "YouTube",
    rating: 4.8,
    views: "125K",
    url: "https://youtube.com/watch?v=123",
  },
];

const pdfAndArticleResources: Resource[] = [
  {
    id: 201,
    resourceType: "pdf",
    title: "Complete Guide to the Fundamentals",
    type: "PDF",
    pages: 25,
    level: "Beginner",
    author: "Tech Publications",
    downloadUrl: "https://example.com/pdf/123",
    size: "2.5 MB",
  },
];

// Update the image source line to use type narrowing
const getResourceImage = (resource: Resource) => {
  if (resource.resourceType === "video") return resource.thumbnail;
  if (resource.resourceType === "article") return resource.image;
  return "/placeholder.svg";
};
