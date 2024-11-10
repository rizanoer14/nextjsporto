import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, password } = await request.json();

  const users = await prisma.users.findUnique({
    where: { email },
  });

  if (!users || !(await bcrypt.compare(password, users.password))) {
    return new Response(JSON.stringify({ message: "Invalid email or password" }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
  });
}
