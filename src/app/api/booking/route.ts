import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";
import { PayloadFormBooking } from "@/app/types";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

export async function POST(request: Request) {
  try {
    const body: PayloadFormBooking = await request.json();
    const { userId, fieldId, bookingStart, durationHours, totalAmount } = body;

    if (!userId || !fieldId || !bookingStart || !durationHours || !totalAmount) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const start = new Date(bookingStart);
    const end = new Date(start);
    end.setHours(end.getHours() + Number(durationHours));

    const bookingConflict = await prisma.booking.findFirst({
      where: {
        fieldId,
        AND: [{ bookingStart: { lt: end } }, { bookingEnd: { gt: start } }],
        status: { not: "REJECTED" },
      },
    });

    if (bookingConflict) {
      return NextResponse.json({ message: "waktu sudah ada yang booking" }, { status: 409 });
    }

    const start_time = DateTime.now().setZone("Asia/Jakarta").plus({ hours: 24 }).toFormat("yyyy-MM-dd HH:mm:ss ZZZZ");

    console.log(start_time);

    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: Number(totalAmount),
      },
      expiry: {
        start_time,
        unit: "minute",
        duration: 60,
      },
    };

    const paymentUrlResponse = await snap.createTransaction(parameter);

    const createBooking = await prisma.booking.create({
      data: {
        userId,
        fieldId,
        bookingStart: start,
        bookingEnd: end,
        durationHours: Number(durationHours),
        totalAmount: Number(totalAmount),
        status: "PENDING",
        paymentUrl: paymentUrlResponse.redirect_url,
      },
    });

    return NextResponse.json({ createBooking });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
