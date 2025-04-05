"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    type: true,
    name: "",
    email: "",
    studentId: "",
    major: "",
    year: "",
    semester: "",
    bio: "",
    yearsOfExperience: "",
    certifications: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated info to your backend
    console.log("Updated user info:", userInfo);
    // You can add a success message or redirect here
    try {
      const {
        data: { token },
      } = await axios.get("/api/getToken"); // Get Clerk JWT Token

      const response = await axios.put(
        "http://localhost:5000/api/users/update-user",
        userInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Updated user info:", response.data);

      alert("User info updated successfully!");
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { token },
        } = await axios.get("/api/getToken"); // Get Clerk JWT Token

        let response = await axios.get(
          "http://localhost:5000/api/users/e20e23k",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);

        setUserInfo({
          userName: response.data.userName || "",
          type: response.data.type,
          name: response.data.name || "",
          email: response.data.email || "",
          studentId: response.data.studentId || "",
          major: response.data.major || "",
          year: response.data.year || "",
          semester: response.data.semester || "",
          bio: response.data.bio || "",
          yearsOfExperience: response.data.yearsOfExperience || "",
          certifications: response.data.certifications || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User info updated:", userInfo);
  }, [userInfo]);

  return (
    <div className="flex-1 p-4 lg:p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <Card className="border-0 bg-black/50 backdrop-blur-2xl">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your account details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="gap-2 flex items-center">
                <Switch
                  id="type"
                  checked={userInfo.type}
                  onCheckedChange={() => {
                    setUserInfo({
                      ...userInfo,
                      type: !userInfo.type,
                    });
                  }}
                />
                <Label htmlFor="name">Student mode</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userInfo.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  name="major"
                  value={userInfo.major}
                  onChange={handleInputChange}
                />
              </div>
              {userInfo.type ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      value={userInfo.year}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input
                      id="semester"
                      name="semester"
                      value={userInfo.semester}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="yearsOfExperience">
                      Years of Experience
                    </Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={userInfo.yearsOfExperience}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Input
                      id="certifications"
                      name="certifications"
                      value={userInfo.certifications}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={userInfo.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
