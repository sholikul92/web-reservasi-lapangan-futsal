"use client";
import { schemaFormBooking } from "@/app/lib/schema";
import { Field, PayloadFormBooking, FormBookingSchema } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { getLocalTimeZone, today } from "@internationalized/date";
import { NumberInput, Form, DatePicker, Input, Button, Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSessionContext } from "@/app/context/session-context";
import SnapTrigger from "./SnapTrigger";

const hours = Array.from({ length: 14 }, (_, i) => {
  const hour = i + 10;
  const label = `${hour.toString().padStart(2, "0")}:00`;
  return label;
});

export default function FormBooking() {
  const { session } = useSessionContext();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormBookingSchema>({
    resolver: zodResolver(schemaFormBooking),
  });

  const [fields, setFields] = useState<Field[]>([]);
  const [fieldSelect, setFieldSelect] = useState<Field | null>(null);
  const [snapToken, setSnapToken] = useState<string | null>(null);

  // Fetch daftar lapangan
  useEffect(() => {
    const getFields = async () => {
      const response = await fetch("/api/field");
      const data: Field[] = await response.json();
      setFields(data);
    };

    getFields();
  }, []);

  const handleFieldSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setFieldSelect(fields.find((field) => field.id === id)!);
    setValue("fieldId", id);
  };

  const handleInputDuration = (e: number | ChangeEvent<HTMLInputElement>) => {
    const value: number = e.target.valueAsNumber;
    if (!Number.isNaN(value)) {
      setValue("durationHours", value);
      const total = (fieldSelect?.price || 0) * value;
      setValue("totalAmount", total.toString());
    }
  };

  const onSubmit = async (data: FormBookingSchema) => {
    const bookingDate = data.bookingStart.toDate(getLocalTimeZone());
    const hour = parseInt(data.startHour);
    bookingDate.setHours(hour, 0, 0, 0);
    data.bookingStart = bookingDate;

    if (session) {
      const payload: PayloadFormBooking = {
        userId: session.user.id,
        bookingStart: data.bookingStart.toISOString(),
        fieldId: data.fieldId,
        durationHours: data.durationHours,
        totalAmount: Number(data.totalAmount),
      };

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      setSnapToken((prev) => {
        if (prev !== result.snapToken) {
          return result.snapToken;
        }
        return prev;
      });
    }
  };

  return (
    <>
      <SnapTrigger token={snapToken} onClose={() => setSnapToken(null)} />
      <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-stretch w-full'>
        <Controller
          control={control}
          name='fieldId'
          render={() => (
            <Select label='Lapangan' labelPlacement='outside-left' variant='bordered' placeholder='Pilih Lapangan' onChange={handleFieldSelect}>
              {fields.map((field) => (
                <SelectItem key={field.id}>{field.name}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name='bookingStart'
          render={({ field }) => (
            <DatePicker
              minValue={today(getLocalTimeZone())}
              showMonthAndYearPickers
              label='Tanggal Main'
              variant='bordered'
              labelPlacement='outside-left'
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='startHour'
          render={({ field }) => (
            <Select
              label='Jam Mulai'
              labelPlacement='outside-left'
              variant='bordered'
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0];
                field.onChange(selectedKey); // string
              }}
              placeholder='Pilih Jam'
            >
              {hours.map((hour) => (
                <SelectItem key={hour}>{hour}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name='durationHours'
          render={({ field }) => (
            <NumberInput
              {...field}
              defaultValue={0}
              hideStepper
              maxValue={12}
              type='number'
              variant='bordered'
              label='Durasi Main'
              endContent='Jam'
              labelPlacement='outside-left'
              onChange={handleInputDuration}
            />
          )}
        />
        <Controller
          control={control}
          name='totalAmount'
          render={({ field }) => (
            <Input {...field} type='number' variant='bordered' label='Total Harga' labelPlacement='outside-left' disabled startContent='Rp.' />
          )}
        />
        <Button type='submit' disabled={isSubmitting} color='primary' className='cursor-pointer' isLoading={isSubmitting}>
          Booking
        </Button>
      </Form>
    </>
  );
}
