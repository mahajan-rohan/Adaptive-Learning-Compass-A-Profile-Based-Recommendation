import { currentUser } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch current user" }), { status: 500 });
  }
};
