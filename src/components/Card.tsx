"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Edit2,
  Save,
  Trash2,
} from "lucide-react";
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
    yearsOfExperience?: number;
    certifications?: number;
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
  onDelete: (courseCode: string) => void; // New prop for handling deletion in the parent component
  link?: string;
  type?: boolean;
  isCodingSubject?: boolean;
}

const Card = ({
  course,
  onUpdateMarks,
  onDelete,
  link = "#",
  type = true,
  isCodingSubject = true,
}: CourseProps) => {
  const url = usePathname();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Local state variables for editing
  const [editedPreviousMarks, setEditedPreviousMarks] = useState(
    course.previousMarks || 0
  );
  const [editedUpdatedMarks, setEditedUpdatedMarks] = useState(
    course.updatedMarks || 0
  );
  const [editedCodingContests, setEditedCodingContests] = useState(
    course.codingContestsAttempted || 0
  );
  const [editedProjectsBuilt, setEditedProjectsBuilt] = useState(
    course.projectsBuilt || 0
  );
  const [editedAttendance, setEditedAttendance] = useState(
    course.attendance || 0
  );
  const [editedStudyHours, setEditedStudyHours] = useState(
    course.studyHours || 0
  );
  const [editedYearsOfExp, setEditedYearsOfExp] = useState(
    course.yearsOfExperience || 0
  );
  const [editedNoOfCertifications, setEditedNoOfCertifications] = useState(
    course.certifications || 0
  );

  const handleDelete = async () => {
    try {
      const {
        data: { token },
      } = await axios.get("/api/getToken");

      await axios.delete("http://localhost:5000/api/users/delete-subject", {
        headers: { Authorization: `Bearer ${token}` },
        data: { courseCode: course.code },
      });

      alert("Course deleted successfully!");
      onDelete(course.code); // Call the onDelete callback to update the parent state
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete the course.");
    }
  };

  const handleSave = async () => {
    const updates = {
      previousMarks: editedPreviousMarks,
      updatedMarks: editedUpdatedMarks,
      codingContestsAttempted: editedCodingContests,
      projectsBuilt: editedProjectsBuilt,
      attendance: editedAttendance,
      studyHours: editedStudyHours,
      yearOfExperience: editedYearsOfExp,
      noOfCertifications: editedNoOfCertifications,
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

  const handleCancel = () => {
    setEditedPreviousMarks(course.previousMarks);
    setEditedUpdatedMarks(course.updatedMarks);
    setEditedCodingContests(course.codingContestsAttempted || 0);
    setEditedProjectsBuilt(course.projectsBuilt || 0);
    setEditedAttendance(course.attendance || 0);
    setEditedStudyHours(course.studyHours || 0);
    setEditedYearsOfExp(course.yearsOfExperience || 0);
    setEditedNoOfCertifications(course.noOfCertifications || 0);
    setIsEditing(false);
  };

  // Calculate change and determine trend
  const marksDifference = editedUpdatedMarks - editedPreviousMarks;
  const percentChange =
    editedPreviousMarks > 0 ? (marksDifference / editedPreviousMarks) * 100 : 0;
  const trend =
    marksDifference > 0 ? "up" : marksDifference < 0 ? "down" : "neutral";

  // Calculate completion percentage
  const completionPercentage = (editedUpdatedMarks / course.totalMarks) * 100;

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
        {/* Header with course code, edit button, and delete button */}
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
            <div className="flex items-center space-x-2">
              {url !== "/dashboard" && (
                <>
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="text-green-500 hover:text-green-700 p-1 rounded-full bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-400 hover:text-primary p-1 rounded-full bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                </>
              )}
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 p-1 rounded-full bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
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
            {/* Marks comparison section */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {isEditing ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Previous</span>
                    <input
                      type="number"
                      value={editedPreviousMarks}
                      onChange={(e) =>
                        setEditedPreviousMarks(Number(e.target.value))
                      }
                      className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                      min={0}
                      max={100}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Updated</span>
                    <input
                      type="number"
                      value={editedUpdatedMarks}
                      onChange={(e) =>
                        setEditedUpdatedMarks(Number(e.target.value))
                      }
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
                      {course.previousMarks}/{course.totalMarks}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Updated</span>
                    <span className="text-sm font-medium text-gray-200">
                      {course.updatedMarks}/{course.totalMarks}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Conditional rendering based on isCodingSubject */}
            {isCodingSubject ? (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {isEditing ? (
                  <>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        Coding Contests
                      </span>
                      <input
                        type="number"
                        value={editedCodingContests}
                        onChange={(e) =>
                          setEditedCodingContests(Number(e.target.value))
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
                        value={editedProjectsBuilt}
                        onChange={(e) =>
                          setEditedProjectsBuilt(Number(e.target.value))
                        }
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
                        {course.codingContestsAttempted}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">
                        Projects Built
                      </span>
                      <span className="text-sm font-medium text-gray-200">
                        {course.projectsBuilt}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {isEditing ? (
                  <>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Attendance</span>
                      <input
                        type="number"
                        value={editedAttendance}
                        onChange={(e) =>
                          setEditedAttendance(Number(e.target.value))
                        }
                        className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                        min={0}
                        max={100}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Study Hours</span>
                      <input
                        type="number"
                        value={editedStudyHours}
                        onChange={(e) =>
                          setEditedStudyHours(Number(e.target.value))
                        }
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
                        {course.attendance}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Study Hours</span>
                      <span className="text-sm font-medium text-gray-200">
                        {course.studyHours}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {isEditing ? (
              <>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">
                    Years of Experience
                  </span>
                  <input
                    type="number"
                    value={editedYearsOfExp}
                    onChange={(e) =>
                      setEditedYearsOfExp(Number(e.target.value))
                    }
                    className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                    min={0}
                    max={100}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Certifications</span>
                  <input
                    type="number"
                    value={editedNoOfCertifications}
                    onChange={(e) =>
                      setEditedNoOfCertifications(Number(e.target.value))
                    }
                    className="w-full px-2 py-1 text-sm rounded-md text-black mt-1"
                    min={0}
                    max={24}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">
                    Years of Experience
                  </span>
                  <span className="text-sm font-medium text-gray-200">
                    {course.yearsOfExperience}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Certifications</span>
                  <span className="text-sm font-medium text-gray-200">
                    {course.certifications}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Trend indicator */}
        {type ? (
          <div className="flex items-center justify-between bg-gray-800/40 rounded-md p-2">
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
              {trend !== "neutral" && `${Math.abs(percentChange).toFixed(1)}%`}
            </span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Card;
