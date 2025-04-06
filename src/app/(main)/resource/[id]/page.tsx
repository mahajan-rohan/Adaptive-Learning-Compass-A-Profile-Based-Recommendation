"use client";

import { useState, useEffect } from "react";
import {
  YoutubeIcon,
  FileIcon,
  ExternalLinkIcon,
  BookOpenIcon,
  AlertCircleIcon,
  GlobeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { use } from "react";
import { useAppContext } from "@/Context/context";
import axios from "axios";

interface Resource {
  title: string;
  link: string;
  tags?: string;
  source: string;
  website?: string;
}

interface ResourceData {
  results?: Resource[];
  udemy_courses?: Resource[];
  coursera_courses?: Resource[];
  links?: { link: string; website: string }[];
  subject: string;
  level: string;
  errors?: { error: string }[];
}

interface Params {
  id: string;
}

export default function ResourcesPage({ params }: { params: Promise<Params> }) {
  const unwrappedParams = use(params);
  const [resourceData, setResourceData] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const { userInfo, setUserInfo } = useAppContext();
  const [errors, setErrors] = useState<string[]>([]);
  const [websiteFilter, setWebsiteFilter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data from backend
        const {
          data: { token },
        } = await axios.get("/api/getToken");

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
            userInfo: JSON.stringify(userInfo),
          },
        });
        const data = response.data;
        setResourceData(data);

        // Extract errors if any
        if (data.errors && data.errors.length > 0) {
          setErrors(data.errors.map((err: { error: string }) => err.error));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!resourceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium">Error loading resources</h2>
          <p className="text-muted-foreground mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  // Combine all resources into a single array
  const allResources: Resource[] = [
    ...(resourceData.results || []).map((item) => ({
      ...item,
      source: "general",
    })),
    ...(resourceData.udemy_courses || []).map((course) => ({
      ...course,
      tags: "Udemy Course",
      source: "udemy",
    })),
    ...(resourceData.coursera_courses || []).map((course) => ({
      ...course,
      tags: "Coursera Course",
      source: "coursera",
    })),
    ...(resourceData.links || []).map((link) => ({
      title: link.link.split("/").pop() || link.link,
      link: link.link,
      tags: "Website Link",
      source: "website",
      website: link.website,
    })),
  ];

  // Filter resources based on selected filter
  let filteredResources = allResources;

  if (filter) {
    filteredResources = allResources.filter(
      (item) =>
        item.tags?.includes(filter) || item.source === filter.toLowerCase()
    );
  }

  if (websiteFilter) {
    filteredResources = filteredResources.filter(
      (item) => item.website === websiteFilter
    );
  }

  // Count resources by type
  const youtubeCount = allResources.filter((item) =>
    item.tags?.includes("YouTube")
  ).length;
  const pdfCount = allResources.filter((item) =>
    item.tags?.includes("PDF")
  ).length;
  const udemyCount = allResources.filter(
    (item) => item.source === "udemy"
  ).length;
  const courseraCount = allResources.filter(
    (item) => item.source === "coursera"
  ).length;
  const websiteCount = allResources.filter(
    (item) => item.source === "website"
  ).length;

  // Group website links by domain
  const websiteCounts = (resourceData.links || []).reduce(
    (acc: { name: string; count: number }[], link) => {
      const existing = acc.find((site) => site.name === link.website);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ name: link.website, count: 1 });
      }
      return acc;
    },
    []
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-4 md:p-8">
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

        {resourceData.errors && resourceData.errors.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400 flex items-center gap-2 mb-2">
              <AlertCircleIcon className="h-4 w-4" />
              Notices
            </h3>
            <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1 ml-6 list-disc">
              {resourceData.errors.map((error, index) => (
                <li key={index}>{error.error || error || "Error"}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Main filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setFilter(null);
                setWebsiteFilter(null);
              }}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
                !filter && !websiteFilter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              <BookOpenIcon className="h-3.5 w-3.5" />
              All ({allResources.length})
            </button>

            <button
              onClick={() => {
                setFilter("YouTube");
                setWebsiteFilter(null);
              }}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
                filter === "YouTube"
                  ? "bg-red-500 text-white dark:bg-red-600"
                  : "bg-secondary hover:bg-secondary/80"
              )}
              disabled={youtubeCount === 0}
            >
              <YoutubeIcon className="h-3.5 w-3.5" />
              Videos ({youtubeCount})
            </button>

            <button
              onClick={() => {
                setFilter("PDF");
                setWebsiteFilter(null);
              }}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
                filter === "PDF"
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-secondary hover:bg-secondary/80"
              )}
              disabled={pdfCount === 0}
            >
              <FileIcon className="h-3.5 w-3.5" />
              PDFs ({pdfCount})
            </button>

            <button
              onClick={() => {
                setFilter("Udemy");
                setWebsiteFilter(null);
              }}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
                filter === "Udemy"
                  ? "bg-purple-500 text-white dark:bg-purple-600"
                  : "bg-secondary hover:bg-secondary/80"
              )}
              disabled={udemyCount === 0}
            >
              <UdemyIcon className="h-3.5 w-3.5" />
              Udemy ({udemyCount})
            </button>

            <button
              onClick={() => {
                setFilter("Coursera");
                setWebsiteFilter(null);
              }}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
                filter === "Coursera"
                  ? "bg-green-500 text-white dark:bg-green-600"
                  : "bg-secondary hover:bg-secondary/80"
              )}
              disabled={courseraCount === 0}
            >
              <CourseraIcon className="h-3.5 w-3.5" />
              Coursera ({courseraCount})
            </button>

            <button
              onClick={() => {
                setFilter("Website");
                setWebsiteFilter(null);
              }}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5",
                filter === "Website"
                  ? "bg-amber-500 text-white dark:bg-amber-600"
                  : "bg-secondary hover:bg-secondary/80"
              )}
              disabled={websiteCount === 0}
            >
              <GlobeIcon className="h-3.5 w-3.5" />
              Websites ({websiteCount})
            </button>
          </div>

          {/* Website filters - only show when Website filter is active */}
          {filter === "Website" && (
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0 md:ml-2 md:border-l md:pl-4 md:border-gray-200 dark:md:border-gray-800">
              {websiteCounts.map((site) => (
                <button
                  key={site.name}
                  onClick={() => setWebsiteFilter(site.name)}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-md transition-colors",
                    websiteFilter === site.name
                      ? "bg-amber-500 text-white dark:bg-amber-600"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {site.name} ({site.count})
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="space-y-1 divide-y divide-gray-100 dark:divide-gray-800">
          {filteredResources.map((resource, index) => {
            const isYoutube = resource.tags?.includes("YouTube");
            const isPdf = resource.tags?.includes("PDF");
            const isUdemy = resource.source === "udemy";
            const isCoursera = resource.source === "coursera";
            const isWebsite = resource.source === "website";

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
            } else if (isCoursera) {
              borderColor = "border-green-500/50 hover:border-green-500";
              iconComponent = (
                <CourseraIcon className="h-4 w-4 text-green-500" />
              );
            } else if (isWebsite) {
              borderColor = "border-amber-500/50 hover:border-amber-500";
              iconComponent = <GlobeIcon className="h-4 w-4 text-amber-500" />;
            }

            return (
              <li
                key={index}
                className={cn(
                  "relative border-l-2 pl-4 py-3 transition-all",
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
                      <h3 className="text-sm font-medium flex items-center gap-1">
                        {resource.title}
                        <ExternalLinkIcon
                          className={cn(
                            "h-3 w-3 transition-opacity",
                            activeItem === index ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isYoutube && "YouTube Video"}
                        {isPdf && "PDF Document"}
                        {isUdemy && "Udemy Course"}
                        {isCoursera && "Coursera Course"}
                        {isWebsite && resource.website}
                      </p>
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
  )
}

// Custom Coursera icon component
function CourseraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.7 17.7l-2.1-2.1c-.6.4-1.5.7-2.4.7-2.2 0-4-1.8-4-4s1.8-4 4-4c.9 0 1.8.3 2.4.7l2.1-2.1C10.3 5.7 8.7 5 6.9 5 3.1 5 0 8.1 0 12s3.1 7 6.9 7c1.8 0 3.4-.7 4.8-1.3zm.3-5.7c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zm9.7 5.7l-2.1-2.1c.6-.4 1.5-.7 2.4-.7 2.2 0 4-1.8 4-4s-1.8-4-4-4c-.9 0-1.8.3-2.4.7l2.1-2.1c1.4-.6 3-.9 4.8-.9 3.8 0 6.9 3.1 6.9 7s-3.1 7-6.9 7c-1.8 0-3.4-.7-4.8-1.3z" />
    </svg>
  )
}