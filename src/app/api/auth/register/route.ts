import { schemaSignUp } from "@/app/lib/schema";
import { hashPassword } from "@/app/utils/bcrypt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const schema = schemaSignUp.safeParse(data);
  if (!schema.success) {
    return NextResponse.json({ type: "validation", error: schema.error.errors[0].message }, { status: 400 });
  }

  const { name, email, password, confirmPassword } = schema.data;

  const userAvailable = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userAvailable) return NextResponse.json({ type: "email", error: "Email sudah terdaftar" }, { status: 409 });

  if (password !== confirmPassword) return NextResponse.json({ type: "confirmPassword", error: "Password tidak sesuai!" }, { status: 400 });

  const passwordHashing = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHashing,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
