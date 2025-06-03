import prisma from '@/lib/prisma';
import { snap } from '@/lib/midtrans';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, phone, fieldId, date, timeStart, timeEnd, totalPrice } =
    await req.json();

  const start = new Date(timeStart);
  const end = new Date(timeEnd);
  const bookingDate = new Date(date);

  const overlapping = await prisma.booking.findFirst({
    where: {
      fieldId,
      date: bookingDate,
      status: { not: 'failed' },
      OR: [
        {
          timeStart: { lt: end },
          timeEnd: { gt: start },
        },
      ],
    },
  });

  if (overlapping) {
    return NextResponse.json(
      { error: 'waktu ini sudah dipesan. Silahkan pilih slot lain.' },
      { status: 409 }
    );
  }

  const booking = await prisma.booking.create({
    data: {
      name,
      phone,
      fieldId,
      date: bookingDate,
      timeStart: start,
      timeEnd: end,
      totalPrice,
      status: 'pending',
      OrderId: `ORDER-${Date.now()}`,
    },
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: booking.OrderId,
      gross_amount: totalPrice,
    },
    customer_details: {
      first_name: name,
      phone,
    },
  });

  return NextResponse.json({ token: transaction.token });
}
