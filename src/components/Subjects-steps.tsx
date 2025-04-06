"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "./Card";
import { Course } from "@/types/Course";

export interface Subject extends Course {}

interface SubjectsStepProps {
  subjects: Subject[];
  onSubjectsChange: (subjects: Subject[]) => void;
  onSubmit: (subjects: Subject[]) => void;
  onBack: () => void;
  type: boolean;
}

export default function SubjectsStep({
  subjects,
  onSubjectsChange,
  onSubmit,
  onBack,
  type,
}: SubjectsStepProps) {
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    code: "",
    title: "",
    color: "blue",
    marksObtained: 0,
    totalMarks: 100,
    previousMarks: 0,
    updatedMarks: 0,
    semester: 1,
    isCodingSubject: false,
    isNonStudent: false,
    codingContestsAttempted: 0,
    projectsBuilt: 0,
    attendance: 0,
    studyHours: 0,
  });

  const addSubject = () => {
    if (newSubject.title?.trim()) {
      const newSubjectObj: Subject = {
        code: `SUB${subjects.length + 1}`,
        title: newSubject.title.trim(),
        color: newSubject.color ?? "blue",
        marksObtained: newSubject.marksObtained ?? 0,
        totalMarks: newSubject.totalMarks ?? 100,
        previousMarks: newSubject.previousMarks ?? 0,
        updatedMarks: newSubject.updatedMarks ?? 0,
        semester: newSubject.semester ?? 1,
        isCodingSubject: newSubject.isCodingSubject,
        isNonStudent: newSubject.isNonStudent,
        codingContestsAttempted: newSubject.codingContestsAttempted ?? 0,
        projectsBuilt: newSubject.projectsBuilt ?? 0,
        attendance: newSubject.attendance ?? 0,
        studyHours: newSubject.studyHours ?? 0,
      };
      onSubjectsChange([...subjects, newSubjectObj]);
      setNewSubject({
        code: "",
        title: "",
        color: "blue",
        marksObtained: 0,
        totalMarks: 100,
        previousMarks: 0,
        updatedMarks: 0,
        semester: 1,
        isCodingSubject: false,
        isNonStudent: false,
        codingContestsAttempted: 0,
        projectsBuilt: 0,
        attendance: 0,
        studyHours: 0,
      });
    }
  };

  const handleUpdateMarks = (courseCode: string, updates: Partial<Subject>) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.code === courseCode ? { ...subject, ...updates } : subject
    );
    onSubjectsChange(updatedSubjects);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(subjects);
  };

  useEffect(() => {
    console.log(newSubject);
  }, [newSubject]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="courseTitle">Course Title</Label>
        <Input
          id="courseTitle"
          value={newSubject.title}
          onChange={(e) =>
            setNewSubject({ ...newSubject, title: e.target.value })
          }
          placeholder="Enter subject title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="courseColor">Color</Label>
        <select
          id="courseColor"
          value={newSubject.color}
          onChange={(e) =>
            setNewSubject({ ...newSubject, color: e.target.value })
          }
          className="w-full p-2 border rounded bg-background border-gray-100/10 border-1"
          required
        >
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
      </div>
      {type && (
        <>
          {/* <div className="space-y-2">
            <Label htmlFor="marksObtained">Marks Obtained</Label>
            <Input
              type="number"
              id="marksObtained"
              value={newSubject.marksObtained}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  marksObtained: Number(e.target.value),
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input
              type="number"
              id="totalMarks"
              value={newSubject.totalMarks}
              onChange={(e) =>
                setNewSubject({ ...newSubject, totalMarks: Number(e.target.value) })
              }
              required
            />
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="previousMarks">Previous Marks</Label>
            <Input
              type="number"
              id="previousMarks"
              value={newSubject.previousMarks}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  previousMarks: Number(e.target.value),
                })
              }
              required
              min={0}
              max={100}
            />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="updatedMarks">Updated Marks</Label>
            <Input
              type="number"
              id="updatedMarks"
              value={newSubject.updatedMarks}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  updatedMarks: Number(e.target.value),
                })
              }
              required
            />
          </div> */}
          {type ? (
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <select
                id="semester"
                value={newSubject.semester}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    semester: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md bg-background border-gray-100/10 border-1"
                required
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </div>
          ) : null}
          {/* <div className="">
        <Label className="flex items-center">
          <Input
            type="checkbox"
            checked={newSubject.isNonStudent}
            onChange={(e) =>
              setNewSubject({ ...newSubject, isNonStudent: e.target.checked })
            }
            className="max-w-fit"
          />
          <span className="ml-2">Is Non Student</span>
        </Label>
      </div> */}
          <div className="">
            <Label className="flex items-center">
              <Input
                type="checkbox"
                checked={newSubject.isCodingSubject}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    isCodingSubject: e.target.checked,
                  })
                }
                className="max-w-fit"
              />
              <span className="ml-2">Is Coding Subject</span>
            </Label>
          </div>
          {newSubject.isCodingSubject ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="codingContestsAttempted">
                  Coding Contests Attempted
                </Label>
                <Input
                  type="number"
                  id="codingContestsAttempted"
                  value={newSubject.codingContestsAttempted}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      codingContestsAttempted: Number(e.target.value),
                    })
                  }
                  min={0}
                  max={200}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectsBuilt">Projects Built</Label>
                <Input
                  type="number"
                  id="projectsBuilt"
                  value={newSubject.projectsBuilt}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      projectsBuilt: Number(e.target.value),
                    })
                  }
                  min={0}
                  max={200}
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="attendance">Attendance</Label>
                <Input
                  type="number"
                  id="attendance"
                  value={newSubject.attendance}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      attendance: Number(e.target.value),
                    })
                  }
                    min={0}
                    max={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studyHours">Study Hours</Label>
                <Input
                  type="number"
                  id="studyHours"
                  value={newSubject.studyHours}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      studyHours: Number(e.target.value),
                    })
                  }
                    min={0}
                    max={24}
                />
              </div>
            </>
          )}
        </>
      )}
      <div className="flex space-x-2">
        <Button type="button" onClick={addSubject}>
          Add Subject
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[45vh] overflow-y-auto p-2">
        {subjects.map((subject, index) => (
          <Card
            key={index}
            course={subject}
            onUpdateMarks={handleUpdateMarks}
            // className="shadow-black/40 shadow-lg hover:shadow-black/60"
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Complete Registration</Button>
      </div>
    </form>
  );
}
