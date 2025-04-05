"use client"

import { useAppContext } from "@/Context/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, GraduationCap, Mail, User } from "lucide-react"
// import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  const { userInfo, courses } = useAppContext()

  // Use either context courses or userInfo.subjects, whichever is available
  const userCourses = userInfo.subjects.length > 0 ? userInfo.subjects : courses

  return (
    <div className="flex-1 p-6 min-h-screen element">
      {/* Welcome Banner */}
      <div className="bg-primary/10 rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">Hi {userInfo.userName || userInfo.name}!</h1>
        <p className="text-muted-foreground">
          Welcome to your personalized learning dashboard. Track your progress and discover recommended courses.
        </p>
      </div>

      {/* User Profile Section */}
      <div className="bg-card rounded-xl p-6 border shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Your Profile</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            {/* <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={userInfo.name} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar> */}
            <h3 className="text-lg font-semibold">{userInfo.name}</h3>
            {/* {userInfo.studentId && <p className="text-muted-foreground text-sm">ID: {userInfo.studentId}</p>} */}
          </div>

          {/* <Separator className="md:hidden my-4" /> */}

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {userInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-muted-foreground">{userInfo.email}</p>
                </div>
              </div>
            )}

            {userInfo.major && (
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Major</p>
                  <p className="text-muted-foreground">{userInfo.major}</p>
                </div>
              </div>
            )}

            {userInfo.year && (
              <div>
                <p className="text-sm font-medium">Year</p>
                <p className="text-muted-foreground">{userInfo.year}</p>
              </div>
            )}

            {userInfo.semester && (
              <div>
                <p className="text-sm font-medium">Semester</p>
                <p className="text-muted-foreground">{userInfo.semester}</p>
              </div>
            )}

            {userInfo.bio && (
              <div className="col-span-full mt-2">
                <p className="text-sm font-medium">About me</p>
                <p className="text-muted-foreground">{userInfo.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Courses Section */}
      <h2 className="text-xl font-bold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userCourses.map((course, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className={`bg-${course.color}-500/10 pb-2`}>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="mb-2">
                  {course.code}
                </Badge>
                {course.isCodingSubject && <Code className="h-4 w-4 text-primary" />}
              </div>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {/* <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.round((course.marksObtained / course.totalMarks) * 100)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(course.marksObtained / course.totalMarks) * 100}%` }}
                  />
                </div> */}

                {/* {course.attendance !== undefined && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Attendance</span>
                    </span>
                    <span>{course.attendance}%</span>
                  </div>
                )}

                {course.previousMarks !== undefined && course.updatedMarks !== undefined && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span>Previous</span>
                    <div className="flex items-center gap-2">
                      <span>{course.previousMarks}</span>
                      <span className="text-muted-foreground">→</span>
                      <span
                        className={
                          course.updatedMarks > course.previousMarks
                            ? "text-green-500"
                            : course.updatedMarks < course.previousMarks
                              ? "text-red-500"
                              : ""
                        }
                      >
                        {course.updatedMarks}
                      </span>
                    </div>
                  </div>
                )}

                {course.semester && (
                  <div className="text-sm text-muted-foreground mt-2">Semester: {course.semester}</div>
                )}

                {course.studyHours !== undefined && (
                  <div className="text-sm text-muted-foreground mt-2">Study Hours: {course.studyHours}h</div>
                )} */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

