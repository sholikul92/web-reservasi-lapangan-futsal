import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { StatusPlaying } from "@/app/types";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { statusPlaying, orderId }: { statusPlaying: StatusPlaying; orderId: string } = body;

    if (!statusPlaying || !orderId) return NextResponse.json({ message: "field tidak boleh kosong" }, { status: 400 });

    await prisma.booking.update({
      where: {
        orderId,
      },
      data: {
        playingStatus: statusPlaying,
      },
    });

    return NextResponse.json(
      {
        message: "Status playing berhasil diupdate",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
