"use client";
import { schemaCekSchedule } from "@/app/lib/schema";
import { Field, ScheduleSchema } from "@/app/types";
import { Button, DatePicker, Form, Select, SelectItem, useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Schedule from "./Schedule";

export default function FormSchedule() {
  const { handleSubmit, control } = useForm<ScheduleSchema>({
    resolver: zodResolver(schemaCekSchedule),
  });

  const [fields, setFields] = useState<Field[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [availableSlot, setAvailableSlot] = useState<string[]>([]);

  useEffect(() => {
    const getFields = async () => {
      const res = await fetch("/api/field");
      const result: Field[] = await res.json();

      setFields(result);
    };

    getFields();
  }, []);

  const onSubmit = async (data: ScheduleSchema) => {
    const bookingDate = data.date.toDate(getLocalTimeZone());
    const year = bookingDate.getFullYear();
    const month = String(bookingDate.getMonth() + 1).padStart(2, "0");
    const day = String(bookingDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    console.log("date:", data.date.toDate());

    const payload = {
      fieldId: data.fieldId,
      date: formattedDate,
    };

    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setAvailableSlot(result.availableSlots);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='fieldId'
          render={({ field }) => (
            <Select {...field} variant='bordered' placeholder='Pilih Lapangan' aria-label='lapangan'>
              {fields.map((field) => (
                <SelectItem key={field.id}>{field.name}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name='date'
          render={({ field }) => (
            <DatePicker
              aria-label='tanggal'
              minValue={today(getLocalTimeZone())}
              showMonthAndYearPickers
              variant='bordered'
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button type='submit' onPress={onOpen}>
          Cek Jadwal
        </Button>
      </Form>
      <Schedule isOpen={isOpen} onOpenChange={onOpenChange} availableSlots={availableSlot} />
    </>
  );
}
