import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fields = await prisma.fields.findMany();

    if (fields.length === 0) return NextResponse.json({ message: "Error get all fields" }, { status: 500 });

    return NextResponse.json(fields);
  } catch (error) {
    console.error(error);
  }
}
