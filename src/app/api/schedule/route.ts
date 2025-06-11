import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateTimeSlots } from "@/app/utils/generateTimeSlot";
import { DateTime } from "luxon";

type payload = {
  fieldId: string;
  date: string;
};

export async function POST(req: Request) {
  try {
    const body: payload = await req.json();

    const { fieldId, date } = body;
    if (!fieldId || !date) return NextResponse.json({ message: "kolom tidak boleh kosong" }, { status: 400 });

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Format date tidak valid. Gunakan 'YYYY-MM-DD'" }, { status: 400 });
    }

    const startOfDay = DateTime.fromISO(date, { zone: "Asia/Jakarta" }).startOf("day").toUTC().toJSDate();
    const endOfDay = DateTime.fromISO(date, { zone: "Asia/Jakarta" }).endOf("day").toUTC().toJSDate();

    const bookings = await prisma.booking.findMany({
      where: {
        fieldId,
        status: {
          in: ["APPROVED", "PENDING"],
        },
        bookingStart: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        bookingStart: true,
        bookingEnd: true,
      },
    });

    const bookedSlots: string[] = [];

    for (const booking of bookings) {
      const start = DateTime.fromJSDate(booking.bookingStart).setZone("Asia/Jakarta");
      const end = DateTime.fromJSDate(booking.bookingEnd).setZone("Asia/Jakarta");

      let current = start.startOf("hour");
      while (current < end) {
        bookedSlots.push(current.toFormat("HH:00"));
        current = current.plus({ hours: 1 });
      }
    }

    const allSlots = generateTimeSlots(10, 24);
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    return NextResponse.json({
      fieldId,
      date,
      availableSlots,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
