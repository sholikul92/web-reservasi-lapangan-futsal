import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId }: { userId: string } = body;

    if (!userId) return NextResponse.json({ message: "User ID kosong" }, { status: 400 });

    const transactions = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        field: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  }
}
