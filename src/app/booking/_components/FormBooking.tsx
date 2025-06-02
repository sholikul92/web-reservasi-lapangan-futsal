"use client";
import { Form, Input, Select, SelectItem, DatePicker } from "@heroui/react";

const fields = ["Lapangan A", "Lapangan B", "Lapangan C"];
const hours = [
  "10.00",
  "11.00",
  "12.00",
  "13.00",
  "14.00",
  "15.00",
  "16.00",
  "17.00",
  "18.00",
  "19.00",
  "20.00",
];

export default function FormBooking() {
  return (
    <Form className="dark text-foreground bg-black/60 md:w-1/3 p-4 rounded-xl">
      <h1 className="block w-full text-center text-2xl font-semibold">
        Form Booking Lapangan
      </h1>
      <Input
        isRequired
        errorMessage="tolong masukan nama yang benar"
        label="Nama"
        labelPlacement="outside"
        name="nama"
        placeholder="Masukan nama"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        errorMessage="tolong masukan nama yang benar"
        label="No Hp"
        labelPlacement="outside"
        name="No Hp"
        placeholder="Masukan No Hp"
        type="text"
        variant="bordered"
        inputMode="numeric"
      />
      <Select
        label="Lapangan"
        labelPlacement="outside"
        name="fields"
        placeholder="Pilih Lapangan"
        variant="bordered"
      >
        {fields.map((field, index) => (
          <SelectItem key={index}>{field}</SelectItem>
        ))}
      </Select>
      <DatePicker label="Tanggal" labelPlacement="outside" variant="bordered" />
      <Select
        label="Jam"
        labelPlacement="outside"
        name="jam"
        placeholder="Pilih Jam"
        variant="bordered"
      >
        {hours.map((hour, index) => (
          <SelectItem key={index}>{hour}</SelectItem>
        ))}
      </Select>
    </Form>
  );
}
