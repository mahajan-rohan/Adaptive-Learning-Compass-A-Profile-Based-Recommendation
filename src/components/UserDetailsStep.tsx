"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";

interface UserDetailsStepProps {
  onSubmit: (details: {
    username: string;
    semester?: string;
    type: boolean;
    yearsOfExperience?: number;
    certifications?: number;
  }) => void;
}

export default function UserDetailsStep({ onSubmit }: UserDetailsStepProps) {
  const [username, setUsername] = useState("");
  const [semester, setSemester] = useState("1");
  const [type, setType] = useState(true);
  const [yearsOfExperience, setYearsOfExperience] = useState<
    number | undefined
  >(undefined);
  const [certifications, setCertifications] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, semester, type, yearsOfExperience, certifications });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2 h-fit w-fit flex gap-2 items-center">
        <Label
          htmlFor="name"
          className="h-full flex items-center justify-center mt-2"
        >
          Student mode
        </Label>
        <Switch
          id="type"
          checked={type}
          onCheckedChange={setType}
          className="scale-90"
        />
      </div>
      {type ? (
        <div className="space-y-2">
          <Label htmlFor="semester">Current Semester</Label>
          <Select value={semester} onValueChange={setSemester} required>
            <SelectTrigger id="semester">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent
              className="relative z-[100] border-2 border-white/10 backdrop-blur-lg"
              position="popper"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Input
              id="yearsOfExperience"
              type="number"
              value={yearsOfExperience ?? ""}
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                required
                min={0}
                max={60}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications</Label>
            <Input
              id="certifications"
              type="number"
              value={certifications ?? ""}
              onChange={(e) => setCertifications(Number(e.target.value))}
                required
                min={0}
                max={200}
            />
          </div>
        </>
      )}
      <Button type="submit" className="w-full">
        Next
      </Button>
    </form>
  );
}
