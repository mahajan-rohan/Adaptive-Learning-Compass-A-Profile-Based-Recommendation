"use client";

import { useState } from "react";

interface CourseProps {
  course: {
    code: string;
    title: string;
    professor: string;
    time: string;
    color: string;
    marksObtained: number;
    totalMarks: number;
    unitTest1?: number;
    unitTest2?: number;
    midSemester?: number;
    finalSemester?: number;
  };
  onUpdateMarks: (courseCode: string, updates: Partial<CourseMarks>) => void;
  className?: string;
}

interface CourseMarks {
  unitTest1: number;
  unitTest2: number;
  midSemester: number;
  finalSemester: number;
}

const Card = ({ course, onUpdateMarks, className }: CourseProps) => {
  const [courses, setCourses] = useState(course);
  const [isHovered, setIsHovered] = useState(false);

  const [marks, setMarks] = useState({
    unitTest1: courses.unitTest1 || 0,
    unitTest2: courses.unitTest2 || 0,
    midSemester: courses.midSemester || 0,
    finalSemester: courses.finalSemester || 0,
  });

  const handleMarkChange = (field: keyof CourseMarks, value: string) => {
    const numValue = Number.parseInt(value) || 0;
    setMarks((prev) => ({ ...prev, [field]: numValue }));
    onUpdateMarks(courses.code, { [field]: numValue });
  };

  const renderMarkInput = (
    field: keyof CourseMarks,
    label: string,
    max = 100
  ) => (
    <div className="flex items-center justify-between mt-2">
      <label className="text-gray-400 text-sm">{label}:</label>
      <input
        type="number"
        value={marks[field]}
        onChange={(e) => handleMarkChange(field, e.target.value)}
        className="w-16 px-4 py-2 bg-gray-700/50 rounded text-white text-sm"
        min="0"
        max={max}
      />
    </div>
  );

  return (
    <div
      className={`rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group shadow-md hover:shadow-black/40 group bg-gray-900/90 backdrop-blur-2xl hover:transform hover:scale-105 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundColor: courses.color,
          opacity: isHovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
        className="h-3 mx-2 rounded-t-lg "
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
            {courses.code}
          </span>
        </div>
        <big className="text-gray-100 font-semibold text-lg mb-2">
          {courses.title}
        </big>
        <div className="text-xs text-gray-400 space-y-2">
          {renderMarkInput("unitTest1", "Unit Test 1", 25)}
          {renderMarkInput("unitTest2", "Unit Test 2", 25)}
          {renderMarkInput("midSemester", "Mid Semester", 25)}
          {renderMarkInput("finalSemester", "Final Semester", 25)}
          <div className="mt-4 pt-2 border-t border-gray-700">
            <span>
              Total Marks: {courses.marksObtained}/{courses.totalMarks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
