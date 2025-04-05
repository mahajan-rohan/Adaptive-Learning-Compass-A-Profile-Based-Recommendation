import { currentUser } from "@clerk/nextjs/server";

export default async function handler(req: any, res: any) {
  try {
    const user = await currentUser();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Failed to fetch current user" });
  }
}
