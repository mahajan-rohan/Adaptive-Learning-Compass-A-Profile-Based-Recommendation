"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function FeedbackPage() {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    description: "Great Website, I love it!",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated info to your backend
    console.log("Updated user info:", userInfo);
    // You can add a success message or redirect here
  };

  return (
    <div className="flex-1 p-4 lg:p-6">
      <h1 className="text-3xl font-bold mb-6 ">
        Any Ideas or Issues? Contact Us
      </h1>
      <Card className="border-0 bg-black/50 backdrop-blur-2xl pt-6">
        {/* <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your account details here.</CardDescription>
        </CardHeader> */}
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={userInfo.description}
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
