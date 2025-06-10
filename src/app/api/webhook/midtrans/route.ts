import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[Midtrans] Incoming Notification:", body);

    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;

    if (!orderId) {
      console.error("[Midtrans] Missing order_id in payload");
      return NextResponse.json({ message: "Missing order_id" }, { status: 400 });
    }

    // Log status yang diterima
    console.log(`[Midtrans] Status for ${orderId}: transaction=${transactionStatus}, fraud=${fraudStatus}`);

    let status: "PENDING" | "APPROVED" | "REJECTED" = "PENDING";

    // Handle semua status sesuai dokumentasi Midtrans
    if (transactionStatus === "capture" && fraudStatus === "accept") {
      status = "APPROVED";
    } else if (transactionStatus === "settlement") {
      status = "APPROVED";
    } else if (transactionStatus === "pending" || (transactionStatus === "capture" && fraudStatus === "challenge")) {
      status = "PENDING";
    } else if (["deny", "cancel", "expire", "failure"].includes(transactionStatus)) {
      status = "REJECTED";
    } else {
      console.warn(`[Midtrans] Unhandled status: ${transactionStatus}, fraud: ${fraudStatus}`);
    }

    console.log(`[Midtrans] Updating ${orderId} to status: ${status}`);

    // Gunakan update instead of updateMany untuk lebih aman
    const updatedBooking = await prisma.booking.update({
      where: { orderId },
      data: { status },
    });

    console.log(`[Midtrans] Updated booking:`, updatedBooking.id);

    return NextResponse.json({
      message: "Notification processed",
      status: updatedBooking.status,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[Midtrans] Error:", error);

    // Berikan informasi lebih detail tentang error
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      {
        status: 500,
      }
    );
  }
}
