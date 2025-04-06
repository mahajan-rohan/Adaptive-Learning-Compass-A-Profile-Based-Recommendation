"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus, Edit2, Save } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CourseProps {
  course: {
    code: string;
    title: string;
    color: string;
    semester?: any;
    marksObtained: number;
    totalMarks: number;
    previousMarks: number;
    updatedMarks: number;
    codingContestsAttempted?: number;
    projectsBuilt?: number;
    attendance?: number;
    studyHours?: number;
  };
  onUpdateMarks: (
    courseCode: string,
    updates: {
      previousMarks: number;
      updatedMarks: number;
      codingContestsAttempted?: number;
      projectsBuilt?: number;
      attendance?: number;
      studyHours?: number;
    }
  ) => void;
  link?: string;
  type?: boolean;
}

const Card = ({
  course,
  onUpdateMarks,
  link = "#",
  type = true,
}: CourseProps) => {
  const url = usePathname(); // Initialize useRouter
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [previousMarks, setPreviousMarks] = useState(course.previousMarks);
  const [updatedMarks, setUpdatedMarks] = useState(course.updatedMarks);
  const [codingContestsAttempted, setCodingContestsAttempted] = useState(
    course.codingContestsAttempted || 0
  );
  const [projectsBuilt, setProjectsBuilt] = useState(course.projectsBuilt || 0);
  const [attendance, setAttendance] = useState(course.attendance || 0);
  const [studyHours, setStudyHours] = useState(course.studyHours || 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isCodingSubject, setIsCodingSubject] = useState(false);
  const [isNonStudent, setIsNonStudent] = useState(false);

  const handleSave = async () => {
    const updates = {
      title: course.title,
      previousMarks,
      updatedMarks,
      codingContestsAttempted,
      projectsBuilt,
      attendance,
      studyHours,
    };

    onUpdateMarks(course.code, updates);
    setIsEditing(false);

    try {
      const {
        data: { token },
      } = await axios.get("/api/getToken");

      await axios.put(
        "http://localhost:5000/api/users/update-subject",
        {
          userName: "currentUserName",
          semester: "currentSemester",
          subject: { ...course, ...updates },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    if (updatedMarks == 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [updatedMarks]);

  // Calculate change and determine trend
  const marksDifference = updatedMarks - previousMarks;
  const percentChange =
    previousMarks > 0 ? (marksDifference / previousMarks) * 100 : 0;
  const trend =
    marksDifference > 0 ? "up" : marksDifference < 0 ? "down" : "neutral";

  // Calculate completion percentage
  const completionPercentage = (updatedMarks / course.totalMarks) * 100;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full rounded-xl overflow-hidden backdrop-blur-xl bg-gray-900/90 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Color bar at top */}
      <motion.div
        style={{
          backgroundColor: course.color,
          height: "13px",
          width: "90%",
          opacity: isHovered ? 1 : 0.7,
        }}
        className="text-center mx-auto rounded-t-lg"
        transition={{ duration: 0.3 }}
      />

      <div className="p-4">
        {/* Header with course code and edit button */}
        {type ? (
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col rounded-lg">
              <span className="text-xs font-medium text-gray-400 bg-gray-800/50 px-2 py-1">
                code : {course.code}
              </span>
              <span className="text-xs font-medium text-gray-400 bg-gray-800/50 px-2 py-1">
                semester : {course.semester}
              </span>
            </div>
            {/* Conditionally render the button */}
            {url !== "/dashboard" && (
              <button
                onClick={() => {
                  if (isEditing) handleSave();
                  setIsEditing(!isEditing);
                }}
                className={`text-gray-400 hover:text-primary p-1 rounded-full bg-gray-800/30 hover:bg-gray-800/50 transition-colors ${
                  isEditing
                    ? "bg-sky-500 text-white scale-105 hover:bg-sky-500/80"
                    : ""
                }`}
              >
                {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
              </button>
            )}
          </div>
        ) : null}

        {/* Course title */}
        <Link href={link} className="block">
          <h3 className="text-gray-100 font-semibold text-base mb-3 line-clamp-1 hover:underline">
            {course.title}
          </h3>
        </Link>

        {type ? (
          <>
            {/* Comparative progress visualization */}
            <div className="mb-3">
              <div className="relative h-7 bg-gray-800/50 rounded-md overflow-hidden">
                {/* Previous marks indicator */}
                <div
                  className="absolute h-full w-0.5 bg-white/70 z-10"
                  style={{
                    left: `${(previousMarks / course.totalMarks) * 100}%`,
                  }}
                />

                {/* Updated marks progress bar */}
                <motion.div
                  className={`absolute h-full ${
                    trend === "up"
                      ? "bg-green-500/70"
                      : trend === "down"
                      ? "bg-red-500/70"
                      : "bg-blue-500/70"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(updatedMarks / course.totalMarks) * 100}%`,
                  }}
                  transition={{ duration: 0.8 }}
                />

                {/* Percentage display */}
                <div className="absolute inset-0 flex items-center justify-end pr-2">
                  <span className="text-xs font-medium text-white z-10">
                    {Math.round(completionPercentage)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Marks comparison section */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {isEditing ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Previous</span>
                    <input
                      type="number"
                      value={previousMarks}
                      onChange={(e) => setPreviousMarks(Number(e.target.value))}
                      className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                      min={0}
                      max={100}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Updated</span>
                    <input
                      type="number"
                      value={updatedMarks}
                      onChange={(e) => setUpdatedMarks(Number(e.target.value))}
                      className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                      min={0}
                      max={100}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Previous</span>
                    <span className="text-sm font-medium text-gray-200">
                      {previousMarks}/{course.totalMarks}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Updated</span>
                    <span className="text-sm font-medium text-gray-200">
                      {updatedMarks}/{course.totalMarks}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Extra fields for type === true */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {isEditing ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">
                      Coding Contests
                    </span>
                    <input
                      type="number"
                      value={codingContestsAttempted}
                      onChange={(e) =>
                        setCodingContestsAttempted(Number(e.target.value))
                      }
                      className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                      min={0}
                      max={100}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">
                      Projects Built
                    </span>
                    <input
                      type="number"
                      value={projectsBuilt}
                      onChange={(e) => setProjectsBuilt(Number(e.target.value))}
                      className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                      min={0}
                      max={100}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">
                      Coding Contests
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                      {codingContestsAttempted}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">
                      Projects Built
                    </span>
                    <span className="text-sm font-medium text-gray-200">
                      {projectsBuilt}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Trend indicator */}
            <div
              className={`flex items-center justify-between bg-gray-800/40 rounded-md p-2 ${
                isHidden ? "invisible" : ""
              }`}
            >
              <div className="flex items-center">
                {trend === "up" ? (
                  <TrendingUp size={16} className="text-green-400 mr-1" />
                ) : trend === "down" ? (
                  <TrendingDown size={16} className="text-red-400 mr-1" />
                ) : (
                  <Minus size={16} className="text-gray-400 mr-1" />
                )}
                <span className="text-xs font-medium">
                  {trend === "neutral"
                    ? "No change"
                    : `${Math.abs(marksDifference).toFixed(1)} points ${
                        trend === "up" ? "increase" : "decrease"
                      }`}
                </span>
              </div>
              <span
                className={`text-xs font-medium ${
                  trend === "up"
                    ? "text-green-400"
                    : trend === "down"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {trend !== "neutral" &&
                  `${Math.abs(percentChange).toFixed(1)}%`}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Extra fields for type === false */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {isEditing ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Attendance</span>
                    <input
                      type="number"
                      value={attendance}
                      onChange={(e) => setAttendance(Number(e.target.value))}
                        className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                        min={0}
                        max={100}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Study Hours</span>
                    <input
                      type="number"
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                        className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                        min={0}
                        max={24}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Attendance</span>
                    <span className="text-sm font-medium text-gray-200">
                      {attendance}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Study Hours</span>
                    <span className="text-sm font-medium text-gray-200">
                      {studyHours}
                    </span>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
