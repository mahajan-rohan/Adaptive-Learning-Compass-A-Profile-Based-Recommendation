"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import UserDetailsStep from "@/components/UserDetailsStep";
import SubjectsStep from "@/components/Subjects-steps";
import type { Subject } from "@/components/Subjects-steps";
import axios from "axios";
import { useAppContext } from "@/Context/context";

export default function RegisterPage() {
  const { userInfo, setUserInfo, setCourses, setShowRegister } =
    useAppContext();
  const [step, setStep] = useState(1);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [userName, setUserName] = useState("");
  const [semester, setSemester] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [certifications, setCertifications] = useState(0);
  const [type, setType] = useState(true);
  const [user, setUser] = useState<{
    emailAddresses: { emailAddress: string }[];
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/getCurrentUser");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleUserDetailsSubmit = (details: {
    username: string;
    semester?: string;
    type: boolean;
    yearsOfExperience?: number;
    certifications?: number;
  }) => {
    setUserName(details.username);
    setSemester(details.semester || "1");
    setYearsOfExperience(details.yearsOfExperience || 0);
    setCertifications(details.certifications || 0);
    setType(details.type);

    nextStep();
  };

  const handleSubjectsChange = (updatedSubjects: any) => {
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async () => {
    if (!user) return alert("Please login first");

    console.log({
      userName,
      semester,
      subjects,
      type,
    });

    try {
      const {
        data: { token },
      } = await axios.get("/api/getToken"); // Get Clerk JWT Token

      await axios.post(
        "http://localhost:5000/api/users/save",
        {
          userName,
          semester,
          type,
          subjects,
          email: user?.emailAddresses[0]?.emailAddress || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserInfo({
        ...userInfo,
        name: userName,
        semester: semester,
        type: type,
        email: user?.emailAddresses[0]?.emailAddress || "",
      });
      setCourses([...subjects]);

      alert("Data saved successfully!");
      setShowRegister(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[89vh] bg-black/0 rounded-lg shadow-lg p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4">Registration</h1>
        <Card className="w-full border-4 border-white/10 backdrop-blur-lg inset-shadow-sm inset-shadow-gray-500">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="user-details"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserDetailsStep onSubmit={handleUserDetailsSubmit} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="subjects"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SubjectsStep
                    subjects={subjects}
                    onSubjectsChange={handleSubjectsChange}
                    onSubmit={handleSubmit}
                    onBack={prevStep}
                    type={type}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
