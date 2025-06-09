import { z } from "zod";
import { schemaFormBooking, schemaSignIn, schemaSignUp } from "../lib/schema";

export type SignInFormSchema = z.infer<typeof schemaSignIn>;
export type RegisterSchema = z.infer<typeof schemaSignUp>;
export type FormBookingSchema = z.infer<typeof schemaFormBooking>;

export type Field = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type PayloadFormBooking = {
  userId: string;
  fieldId: string;
  bookingStart: Date;
  durationHours: number;
  totalAmount: number;
};
