import { auth } from "@clerk/nextjs/server";

export default async function handler(req: any, res: any) {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to get token" });
  }
}
