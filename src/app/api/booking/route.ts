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

    const start = DateTime.fromISO(bookingStart, { zone: "Asia/Jakarta" });
    const end = start.plus({ hours: Number(durationHours) });

    const bookingConflict = await prisma.booking.findFirst({
      where: {
        fieldId,
        AND: [{ bookingStart: { lt: end.toJSDate() } }, { bookingEnd: { gt: start.toJSDate() } }],
        status: { not: "REJECTED" },
      },
    });

    if (bookingConflict) {
      return NextResponse.json({ message: "waktu sudah ada yang booking" }, { status: 409 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const start_time = DateTime.now().setZone("Asia/Jakarta").plus({ hours: 24 }).toFormat("yyyy-MM-dd HH:mm:ss ZZZZ");

    const orderId = `ORDER-${Date.now()}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(totalAmount),
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
      },
      expiry: {
        start_time,
        unit: "hour",
        duration: 1,
      },
      callbacks: {
        finish: "http://rajawalifutsal.vercel.app/dashboard/player/booking/success",
      },
    };

    const paymentUrlResponse = await snap.createTransaction(parameter);

    await prisma.booking.create({
      data: {
        userId,
        fieldId,
        bookingStart: start.toJSDate(),
        bookingEnd: end.toJSDate(),
        orderId,
        durationHours: Number(durationHours),
        totalAmount: Number(totalAmount),
        status: "PENDING",
        paymentUrl: paymentUrlResponse.redirect_url,
      },
    });

    return NextResponse.json({ snapToken: paymentUrlResponse.token });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
