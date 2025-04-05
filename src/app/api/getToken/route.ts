import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    // console.log(
    //   "45677777777777777777777777777778888888888888888888888888888888888888888888888888888888888888"
    // );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get token" }), {
      status: 500,
    });
  }
};
