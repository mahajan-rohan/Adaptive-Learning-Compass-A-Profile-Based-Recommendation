"use client";

import { Subject } from "@/components/Subjects-steps";
import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useState,
} from "react";

// --- Interfaces ---
interface UserInfo {
  clerkId?: string;
  userName?: string;
  type: boolean;
  name: string;
  email: string;
  studentId: string;
  major: string;
  year: string;
  semester: any;
  bio: string;
  subjects: Course[];
}

export interface Course {
  code: string;
  title: string;
  color: string;
  marksObtained: number;
  totalMarks: number;
  previousMarks: number;
  updatedMarks: number;
  semester?: string;
  studyHours?: number;
  isNonStudent?: boolean;
  isCodingSubject?: boolean;
  attendance?: number;
  projectsBuilt?: number;
  codingContestsAttempted?: number;
}

interface FeedbackInfo {
  name: string;
  email: string;
  description: string;
}

// --- Context Type ---
interface AppContextProps {
  // Register State
  showRegister: boolean;
  setShowRegister: (value: boolean) => void;

  // User State
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;

  // Course State
  courses: Subject[];
  setCourses: Dispatch<SetStateAction<Subject[]>>;
  handleUpdateMarks: (courseCode: string, updates: any) => void;

  // Feedback State
  feedbackInfo: FeedbackInfo;
  setFeedbackInfo: Dispatch<SetStateAction<FeedbackInfo>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- User State ---
  const [userInfo, setUserInfo] = useState<UserInfo>({
    type: true,
    name: "",
    email: "",
    studentId: "12345678",
    major: "",
    semester: 1,
    year: "",
    bio: "",
    subjects: [],
  });

  // --- Course State ---
  const [courses, setCourses] = useState<Course[]>([
    {
      code: "MATH 301",
      title: "Advanced Calculus",
      color: "blue",
      marksObtained: 85,
      totalMarks: 100,
      previousMarks: 80,
      updatedMarks: 85,
    },
    {
      code: "PHYS 201",
      title: "Quantum Physics",
      color: "purple",
      marksObtained: 85,
      totalMarks: 100,
      previousMarks: 80,
      updatedMarks: 85,
    },
    {
      code: "CS 401",
      title: "Data Structures",
      color: "green",
      marksObtained: 85,
      totalMarks: 100,
      previousMarks: 80,
      updatedMarks: 85,
    },
    {
      code: "PSY 301",
      title: "Cognitive Psychology",
      color: "red",
      marksObtained: 85,
      totalMarks: 100,
      previousMarks: 80,
      updatedMarks: 85,
    },
    {
      code: "HIST 202",
      title: "World History",
      color: "yellow",
      marksObtained: 85,
      totalMarks: 100,
      previousMarks: 80,
      updatedMarks: 85,
    },
    {
      code: "BIO 301",
      title: "Molecular Biology",
      color: "pink",
      marksObtained: 85,
      totalMarks: 100,
      previousMarks: 80,
      updatedMarks: 85,
    },
  ]);

  const handleUpdateMarks = (courseCode: string, updates: any) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.code === courseCode) {
          const updatedCourse = { ...course, ...updates };
          // Recalculate total marks
          const total =
            (updatedCourse.unitTest1 || 0) +
            (updatedCourse.unitTest2 || 0) +
            (updatedCourse.midSemester || 0) +
            (updatedCourse.finalSemester || 0);
          return { ...updatedCourse, marksObtained: total };
        }
        return course;
      })
    );
  };

  // --- Feedback State ---
  const [feedbackInfo, setFeedbackInfo] = useState<FeedbackInfo>({
    name: "John Doe",
    email: "john.doe@example.com",
    description: "Great Website, I love it!",
  });

  // --- Register State ---
  const [showRegister, setShowRegister] = useState(false);

  // --- Context Value ---
  const value: AppContextProps = {
    userInfo,
    setUserInfo,
    courses,
    setCourses,
    handleUpdateMarks,
    feedbackInfo,
    setFeedbackInfo,
    showRegister,
    setShowRegister,
  };

  // --- Provider ---
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- Custom Hook ---
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
