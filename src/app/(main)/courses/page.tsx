"use client";

import Card from "@/components/Card";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { useAppContext } from "@/Context/context";
import { useRouter } from "next/navigation";

const COLORS = ["blue", "purple", "green", "red", "yellow", "pink"];

interface Course {
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

const Course = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [isNonStudent, setIsNonStudent] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    code: "",
    title: "",
    color: COLORS[0],
    marksObtained: 0,
    totalMarks: 100,
    previousMarks: 0,
    updatedMarks: 0,
    semester: "1",
    isCodingSubject: false,
    attendance: 0,
    studyHours: 0,
    projectsBuilt: 0,
  codingContestsAttempted: 0,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const {
    userInfo: { userName, semester, type },
    showRegister,
  } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/getCurrentUser");
        setUser((prev) => ({ ...(prev || {}), ...response.data }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const {
          data: { token },
        } = await axios.get("/api/getToken"); // Get Clerk JWT Token

        let response = await axios.get(
          `http://localhost:5000/api/users/${user?.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser((prev) => ({ ...(prev || {}), ...response.data }));
        if (response.status === 404 && response.data) {
          router.push("/dashboard");
        }

        setCourses(response.data.subjects);
      } catch (error) {
        router.push("/dashboard");
      }
    };

    if (!showRegister) {
      fetchCourses();
    }
  }, []);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.semester === filter)
      );
    }
  }, [filter, courses]);

  const onUpdateMarks = async ({
    courseCode,
    updates,
  }: {
    courseCode: string;
    updates: {
      previousMarks: number;
      updatedMarks: number;
      codingContestsAttempted?: number;
      projectsBuilt?: number;
      attendance?: number;
      studyHours?: number;
    };
  }) => {
    const updatedCourses = courses.map((course) => {
      if (course.code === courseCode) {
        return { ...course, ...updates };
      }
      return course;
    });

    try {
      // const {
      //   data: { token },
      // } = await axios.get("/api/getToken"); // Get Clerk JWT Token

      // await axios.post(
      //   "http://localhost:5000/api/users/save",
      //   {
      //     userName,
      //     semester,
      //     subjects: updatedCourses,
      //   },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      console.log({
        userName,
        semester,
        subjects: updatedCourses,
      });

      alert("Data updated successfully!");
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.code && newCourse.title) {
      setCourses([...courses, newCourse as Course]);
      setShowNewCourseModal(false);

      console.log({ userName, semester });
    }
    try {
      const {
        data: { token },
      } = await axios.get("/api/getToken"); // Get Clerk JWT Token

      const subjects = [newCourse];

      await axios.post(
        "http://localhost:5000/api/users/save",
        {
          userName,
          semester,
          subjects,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Data saved successfully!");
      setNewCourse({
        code: " ",
        title: " ",
        color: COLORS[0],
        marksObtained: 0,
        totalMarks: 100,
        previousMarks: 0,
        updatedMarks: 0,
      });
      const fetchCourses = async () => {
        try {
          const {
            data: { token },
          } = await axios.get("/api/getToken"); // Get Clerk JWT Token
  
          let response = await axios.get(
            `http://localhost:5000/api/users/${user?.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          setUser((prev) => ({ ...(prev || {}), ...response.data }));
          if (response.status === 404 && response.data) {
            router.push("/dashboard");
          }
  
          setCourses(response.data.subjects);
        } catch (error) {
          router.push("/dashboard");
        }
      };
      if (!showRegister) {
        fetchCourses();
      }
      alert("course upadted successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <header className="flex justify-between items-center mb-8 h-full">
          <h1 className="text-3xl font-bold mb-2 my-auto">Courses Panel</h1>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto ">
          <button
            onClick={() => setShowNewCourseModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add New Course
          </button>
          {type ? (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-background border-2 text-gray-400 px-4 py-2 rounded-md"
            >
              <option value="all">All Courses</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
              {/* Add more semesters as needed */}
            </select>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 ">
        {filteredCourses?.map((course: Course, index: number) => (
          <Card
            key={index}
            course={course}
            onUpdateMarks={onUpdateMarks}
            link={`/resource/${course.title}`}
            type={type}
          />
        ))}
      </div>

      {/* New Course Modal */}
      {showNewCourseModal && (
        <div className="fixed top-0 left-0 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`bg-gray-800 rounded-lg p-6 w-full max-w-md ${
              type ? "mt-[550px]" : "mt-[100px]"
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Add New Course
            </h3>
            <form onSubmit={handleAddCourse} className="space-y-4">
              {/* Course Code */}
              <div>
                <label className="block text-gray-300 mb-1">Course Code</label>
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, code: e.target.value })
                  }
                  className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                  required
                />
              </div>

              {/* Course Title */}
              <div>
                <label className="block text-gray-300 mb-1">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                  required
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-gray-300 mb-1">Color</label>
                <select
                  value={newCourse.color}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, color: e.target.value })
                  }
                  className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marks Obtained */}
              {/* <div>
                <label className="block text-gray-300 mb-1">
                  Marks Obtained
                </label>
                <input
                  type="number"
                  value={newCourse.marksObtained}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      marksObtained: Number(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                  required
                />
              </div> */}

              {/* Total Marks */}
              {/* <div>
                <label className="block text-gray-300 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={newCourse.totalMarks}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      totalMarks: Number(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                  required
                />
              </div> */}

              {type ? (
                <>
                  {/* Previous Marks */}
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Previous Marks
                    </label>
                    <input
                      type="number"
                      value={newCourse.previousMarks}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          previousMarks: Number(e.target.value),
                        })
                      }
                      className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                      required
                    />
                  </div>

                  {/* Updated Marks */}
                  {/* <div>
                <label className="block text-gray-300 mb-1">
                  Updated Marks
                </label>
                <input
                  type="number"
                  value={newCourse.updatedMarks}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      updatedMarks: Number(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                  required
                />
              </div> */}

                  <div className="space-y-2">
                    <label className="block text-gray-300 mb-1">Semester</label>
                    <input
                      type="number"
                      value={newCourse.semester}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          semester: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                      required
                    />
                  </div>

                  {/* Is Coding Subject Checkbox */}
                  {/* <div>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={newCourse.isNonStudent}
                    onChange={(e) => setIsNonStudent(e.target.checked)}
                    className="mr-2"
                  />
                  Is Non Student
                </label>
              </div> */}

                  {/* Is Coding Subject Checkbox */}
                  <div>
                    <label className="flex items-center text-gray-300">
                      <input
                        type="checkbox"
                        checked={newCourse.isCodingSubject}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            isCodingSubject: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      Is Coding Subject
                    </label>
                  </div>

                  {/* Coding Subject Inputs */}
                  {newCourse.isCodingSubject ? (
                    <>
                      <div>
                        <label className="block text-gray-300 mb-1">
                          Coding Contests Attempted
                        </label>
                        <input
                          type="number"
                          value={newCourse.codingContestsAttempted}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              codingContestsAttempted: Number(e.target.value),
                            })
                          }
                          className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-1">
                          Projects Built
                        </label>
                        <input
                          type="number"
                          value={newCourse.projectsBuilt}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              projectsBuilt: Number(e.target.value),
                            })
                          }
                          className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-gray-300 mb-1">
                          Attendance
                        </label>
                        <input
                          type="number"
                          value={newCourse.attendance}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              attendance: Number(e.target.value),
                            })
                          }
                          className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-1">
                          Study Hours
                        </label>
                        <input
                          type="number"
                          value={newCourse.studyHours}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              studyHours: Number(e.target.value),
                            })
                          }
                          className="w-full bg-gray-700/50 text-white rounded px-3 py-2"
                        />
                      </div>
                    </>
                  )}
                </>
              ) : null}

              {/* Submit & Cancel Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Course
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
