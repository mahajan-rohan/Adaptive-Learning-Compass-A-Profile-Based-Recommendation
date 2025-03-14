"use client";

import { useState, useEffect } from "react";
import {
  YoutubeIcon,
  FileIcon,
  ExternalLinkIcon,
  BookOpenIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { use } from "react"; // Import use from React
import { useAppContext } from "@/Context/context";
import axios from "axios"; // Import axios

export default function ResourcesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params); // Unwrap params
  const [resourceData, setResourceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const { userInfo, setUserInfo } = useAppContext(); // Destructure setUserInfo from context

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data from backend
        const {
          data: { token },
        } = await axios.get("/api/getToken"); // Get Clerk JWT Token

        const userResponse = await axios.get(
          `http://localhost:5000/api/users/${unwrappedParams.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = userResponse.data;
        setUserInfo((prev) => ({ ...prev, ...userData }));

        // Display user data before passing
        console.log("User Data:", userInfo);

        const response = await axios.get(`/api/python-script`, {
          params: {
            id: unwrappedParams.id,
            userInfo: JSON.stringify(userInfo), // Send userInfo to backend
          },
        });
        const data = response.data;
        setResourceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resourceData) {
    return <div>Error loading data</div>;
  }

  // Combine all resources into a single array
  const allResources = [
    ...resourceData.results,
    ...resourceData.udemy_courses.map((course: any) => ({
      ...course,
      tags: course.tags || "Udemy Course",
    })),
  ];

  // Filter resources based on selected filter
  const filteredResources = filter
    ? allResources.filter((item) => item.tags.includes(filter))
    : allResources;

  // Count resources by type
  const youtubeCount = allResources.filter((item) =>
    item.tags.includes("YouTube")
  ).length;
  const pdfCount = allResources.filter((item) =>
    item.tags.includes("PDF")
  ).length;
  const udemyCount = allResources.filter((item) =>
    item.tags.includes("Udemy")
  ).length;

  return (
    <div className="min-h-screen w-full items-center justify-center bg-white dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium mb-2">
            {resourceData.subject} Resources
            <span className="ml-2 text-sm font-normal text-muted-foreground capitalize">
              ({resourceData.level})
            </span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpenIcon className="h-4 w-4" />
            <span>{allResources.length} resources available</span>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
              filter === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <BookOpenIcon className="h-3.5 w-3.5" />
            All ({allResources.length})
          </button>

          <button
            onClick={() => setFilter("YouTube")}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
              filter === "YouTube"
                ? "bg-red-500 text-white dark:bg-red-600"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <YoutubeIcon className="h-3.5 w-3.5" />
            Videos ({youtubeCount})
          </button>

          <button
            onClick={() => setFilter("PDF")}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
              filter === "PDF"
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <FileIcon className="h-3.5 w-3.5" />
            PDFs ({pdfCount})
          </button>

          <button
            onClick={() => setFilter("Udemy")}
            className={cn(
              "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
              filter === "Udemy"
                ? "bg-purple-500 text-white dark:bg-purple-600"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <UdemyIcon className="h-3.5 w-3.5" />
            Udemy ({udemyCount})
          </button>
        </div>

        <ul className="space-y-1">
          {filteredResources.map((resource, index) => {
            const isYoutube = resource.tags.includes("YouTube");
            const isPdf = resource.tags.includes("PDF");
            const isUdemy = resource.tags.includes("Udemy");

            let borderColor = "border-gray-500/50 hover:border-gray-500";
            let iconComponent = <FileIcon className="h-4 w-4 text-gray-500" />;

            if (isYoutube) {
              borderColor = "border-red-500/50 hover:border-red-500";
              iconComponent = <YoutubeIcon className="h-4 w-4 text-red-500" />;
            } else if (isPdf) {
              borderColor = "border-blue-500/50 hover:border-blue-500";
              iconComponent = <FileIcon className="h-4 w-4 text-blue-500" />;
            } else if (isUdemy) {
              borderColor = "border-purple-500/50 hover:border-purple-500";
              iconComponent = <UdemyIcon className="h-4 w-4 text-purple-500" />;
            }

            return (
              <li
                key={index}
                className={cn(
                  "relative border-l-2 pl-4 py-2 transition-all",
                  borderColor,
                  activeItem === index
                    ? "bg-slate-50 dark:bg-slate-900/50"
                    : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                )}
                onMouseEnter={() => setActiveItem(index)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{iconComponent}</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1">
                        {resource.title}
                        <ExternalLinkIcon
                          className={cn(
                            "h-3 w-3 transition-opacity",
                            activeItem === index ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </h3>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {filteredResources.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No resources found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}

// Custom Udemy icon component
function UdemyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.524 14.183c-.537.358-1.225.625-2.045.625-1.253 0-2.157-.508-2.157-1.875V7.167H7.488v5.625c0 .458.175.733.575.733.4 0 .825-.275 1.179-.733V7.167h1.233v7.016h-1.233l.234-.733zm5.149.733h-1.234v-.733c-.4.458-.825.733-1.233.733-.4 0-.575-.275-.575-.733V7.167h1.233v5.625c0 .458.175.733.575.733.4 0 .825-.275 1.234-.733V7.167h1.233v7.016h-1.233v-.733z" />
    </svg>
  );
}
