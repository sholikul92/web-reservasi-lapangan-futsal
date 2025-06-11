import { z } from "zod";
import { schemaCekSchedule, schemaFormBooking, schemaSignIn, schemaSignUp } from "../lib/schema";

export type SignInFormSchema = z.infer<typeof schemaSignIn>;
export type RegisterSchema = z.infer<typeof schemaSignUp>;
export type FormBookingSchema = z.infer<typeof schemaFormBooking>;
export type ScheduleSchema = z.infer<typeof schemaCekSchedule>;

export type Field = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type PayloadFormBooking = {
  userId: string;
  fieldId: string;
  bookingStart: string;
  durationHours: number;
  totalAmount: number;
};

type NameField = {
  name: string;
  price: number;
};

type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Transactions = {
  id: string;
  userId: string;
  orderId: string;
  field: NameField;
  status: PaymentStatus;
  totalAmount: number;
  bookingStart: Date;
  bookingEnd: Date;
  durationHours: number;
  paymentUrl: string;
};

export type StatusPlaying = "FINISHED" | "INPROGGRESS" | "NOTPLAYING";

export type Bookings = {
  id: string;
  userId: string;
  fieldId: string;
  bookingStart: Date;
  bookingEnd: Date;
  durationHours: number;
  totalAmount: number;
  status: PaymentStatus;
  playingStatus: StatusPlaying;
  paymentUrl: string;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
  field: {
    name: string;
  };
  user: {
    name: string;
  };
};
