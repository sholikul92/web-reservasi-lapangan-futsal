"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { Field } from "@/app/types";

export default function FieldPage() {
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const getFields = async () => {
      const response = await fetch("/api/field");

      if (response.status === 200) {
        const result: Field[] = await response.json();
        setFields(result);
      }
    };

    getFields();
  }, [fields]);

  return (
    <div className='p-8 pl-20'>
      <h1 className='text-center mb-4 font-semibold text-2xl'>Daftar Lapangan</h1>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>Lapangan</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Lapangan Tidak Tersedia!'>
          {fields.length === 0
            ? []
            : fields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.price}</TableCell>
                  <TableCell>
                    <Button>Ubah</Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
