"use client";
import { useSessionContext } from "@/app/context/session-context";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { Transactions } from "@/app/types";
import InvoiceDownloadButton from "./InvoiceDownloadButton";
import Link from "next/link";

const ColumnHeader = ["Order ID", "Lapangan", "Waktu Booking", "Jam", "Lama Main", "Status", "Action"];

export default function TabelTransaction() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const { session } = useSessionContext();
  const userId = session!.user.id;
  const name = session!.user.name!;
  const email = session!.user.email!;

  useEffect(() => {
    const getTransactions = async () => {
      const res = await fetch("/api/history-transaction", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (res.status === 200) {
        const result = await res.json();
        const transactionHistories: Transactions[] = result.transactions;
        console.log(transactionHistories);

        setTransactions(transactionHistories);
      }
    };

    getTransactions();
  }, [userId]);

  return (
    <div className='flex flex-col gap-3'>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          {ColumnHeader.map((column, index) => (
            <TableColumn key={index}>{column.toUpperCase()}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent='Tidak Ada Transaksi Saat Ini.'>
          {transactions.map((transaction) => {
            const bookingDate = new Date(transaction.bookingStart).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            const jam = new Date(transaction.bookingStart).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            return (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.orderId}</TableCell>
                <TableCell>{transaction.field.name}</TableCell>
                <TableCell>{bookingDate}</TableCell>
                <TableCell>{jam}</TableCell>
                <TableCell>{transaction.durationHours} Jam</TableCell>
                <TableCell
                  className={`
                  ${transaction.status === "APPROVED" && "text-success"}
                  ${transaction.status === "PENDING" && "text-warning"}
                  ${transaction.status === "REJECTED" && "text-primary"}
                  `}
                >
                  {transaction.status}
                </TableCell>
                <TableCell>
                  <div className='flex justify-start cursor-pointer'>
                    <Link href={transaction.paymentUrl} aria-label='Url Payment' target='_blank'>
                      <Button color='warning' className={`${transaction.status === "APPROVED" && "hidden"}`}>
                        Bayar
                      </Button>
                    </Link>
                    {transaction.status === "APPROVED" && (
                      <InvoiceDownloadButton
                        invoice={{
                          orderId: transaction.orderId,
                          field: {
                            name: transaction.field.name,
                            price: transaction.field.price,
                          },
                          jam,
                          tanggal: bookingDate,
                          totalAmount: transaction.totalAmount,
                          user: {
                            name,
                            email,
                          },
                          durationHours: transaction.durationHours,
                        }}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
