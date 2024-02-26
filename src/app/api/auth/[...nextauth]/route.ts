import { connectDB } from "@/utils/connect";

export async function POST(req: { json: () => Promise<any> }) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    console.log("username", username, "email", email, "password", password);
    return;
  } catch (error) {
    console.error("POST /api/auth/signup failed:", error);
    return {
      status: 500,
      body: { message: "Internal server error" },
    };
  }
}
