import { exec } from "child_process";
import path from "path";
import fs from "fs/promises";
import axios from "axios"; // Change import to axios

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  let id = url.searchParams.get("id");
  const userInfo = JSON.parse(url.searchParams.get("userInfo") || "{}"); // Extract userInfo

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), {
      status: 400,
    });
  }

  // Replace spaces with underscores in id
  id = id.replace(/%20/g, "_");

  console.log("Received request for user ID:", id);
  console.log("Received user info:", userInfo); // Log userInfo

  try {
    // Extract parameters for the Python script
    const category = userInfo.type ? "1" : "2"; // Student or Non-student
    let args: string;

    const title = id.replace(/_/g, " "); // Replace underscores with spaces

    // Fetch the previous marks based on the subject title (id)
    // Ensure both strings are trimmed and lowercased for comparison
const subject = userInfo.subjects.find((sub: any) => {
  console.log(sub.title.trim().toLowerCase(), title.trim().toLowerCase(), sub.title.trim().toLowerCase() === title.trim().toLowerCase());
  return sub.title.trim().toLowerCase() === title.trim().toLowerCase();
});

console.log("subject", subject);


    const previousMarks = subject ? subject.previousMarks : 0;
    // checking if coding subject
    const isCodingSubject = subject?.isCodingSubject ? "1" : "2";

    if (category === "1") {
      // Student
      if (subject.isCodingSubject) {
        args = `${category} ${isCodingSubject} ${previousMarks} ${subject.codingContestsAttempted} ${subject.projectsBuilt} ${id}`;
      } else {
        args = `${category} ${isCodingSubject} ${previousMarks} ${subject.attendance} ${subject.studyHours} ${id}`;
      }
    } else {
      // Non-student
      args = `${category} ${subject.yearsOfExperience} ${subject.certifications} ${id}`;
    }

    console.log({ args });

    // Path to your Python script - student-hub\script.py
    //const scriptPath = path.resolve(__dirname, "script.py"); // Use __dirname for absolute path

    // Command to execute Python script with arguments
    const command = `python script.py ${args}`;

    return new Promise((resolve) => {
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing Python script:", error); // Log the actual error
          resolve(
            new Response(
              JSON.stringify({
                error: "Failed to execute script",
                details: error.message,
              }), // Include error details
              {
                status: 500,
              }
            )
          );
        }

        try {
          const combinedLinks = await fs.readFile(
            "combined_links.json",
            "utf-8"
          );
          const result = JSON.parse(combinedLinks);
          resolve(new Response(JSON.stringify(result), { status: 200 }));
        } catch (parseError) {
          console.error("Error parsing script output:", parseError);
          resolve(
            new Response(
              JSON.stringify({ error: "Failed to parse script output" }),
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
