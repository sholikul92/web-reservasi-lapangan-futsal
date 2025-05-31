"use client";
import { Button, Form, Select, SelectItem, DatePicker } from "@heroui/react";

const fields = ["Lapangan A", "Lapangan B", "Lapangan C"];
const hours = ["10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00"];

export default function FormCekJadwal() {
  return (
    <Form id='form-cek-jadwal' className='w-[95%] md:w-1/2 scroll-mt-20 -mt-16 bg-white p-4 shadow-lg rounded-xl'>
      <h1 className='text-xl font-semibold'>Cek Jadwal Lapangan</h1>
      <div className='flex flex-col w-full gap-2 md:flex-row md:items-end'>
        <Select label='Lapangan' labelPlacement='outside' name='fields' placeholder='Pilih Lapangan' variant='bordered'>
          {fields.map((field, index) => (
            <SelectItem key={index}>{field}</SelectItem>
          ))}
        </Select>
        <DatePicker label='Tanggal' labelPlacement='outside' />
        <Select label='Jam' labelPlacement='outside' name='jam' placeholder='Pilih Jam' variant='bordered'>
          {hours.map((hour, index) => (
            <SelectItem key={index}>{hour}</SelectItem>
          ))}
        </Select>
        <Button color='primary'>Cek</Button>
      </div>
    </Form>
  );
}
