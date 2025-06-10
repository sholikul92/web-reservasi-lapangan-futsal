import { z } from "zod";

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email tidak boleh kosong" })
    .email("Email tidak valid")
    .transform((val) => val.toLowerCase()),
  password: z
    .string({ required_error: "Password tidak boleh kosong" })
    .min(6, "Password minimal 6 karakter")
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf kapital")
    .regex(/[a-z]/, "Password harus mengangdung minimal 1 huruf")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
});

export const schemaSignUp = z
  .object({
    name: z.string({ required_error: "Nama tidak boleh kosong" }).min(3, "Minimal 3 Huruf"),
    email: z
      .string({ required_error: "Email tidak boleh kosong" })
      .email("Email tidak valid")
      .transform((val) => val.toLowerCase()),
    password: z
      .string({ required_error: "Password tidak boleh kosong" })
      .min(6, "Password minimal 6 karakter")
      .regex(/[a-z]/, "Password harus mengangdung minimal 1 huruf")
      .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf kapital")
      .regex(/[0-9]/, "Password harus mengandung minimal 1 angka"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const schemaFormBooking = z.object({
  fieldId: z.string().cuid(),
  bookingStart: z.any(),
  startHour: z.string(),
  durationHours: z.number().int().positive(),
  totalAmount: z.string(),
});

export const schemaCekSchedule = z.object({
  fieldId: z.string().cuid(),
  date: z.any(),
});
