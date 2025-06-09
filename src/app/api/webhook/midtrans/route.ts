import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;

    let status: 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING';

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'challenge') {
        status = 'PENDING';
      } else if (fraudStatus === 'accept') {
        status = 'APPROVED';
      }
    } else if (transactionStatus === 'settlement') {
      status = 'APPROVED';
    } else if (
      transactionStatus === 'cancel' ||
      transactionStatus === 'deny' ||
      transactionStatus === 'expire'
    ) {
      status = 'REJECTED';
    }

    await prisma.booking.update({
      where: { orderId },
      data: { status },
    });

    return NextResponse.json({
      message: 'Midtrans notification received and processed',
    });
  } catch (error) {
    console.error('Midtrans Notification Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
