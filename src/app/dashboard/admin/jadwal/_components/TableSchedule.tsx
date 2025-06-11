"use client";
import { Bookings, StatusPlaying } from "@/app/types";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, PressEvent, Input } from "@heroui/react";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "orderId",
    label: "ORDER ID",
  },
  {
    key: "name",
    label: "NAMA",
  },
  {
    key: "lapangan",
    label: "LAPANGAN",
  },
  {
    key: "tanggal",
    label: "Tanggal",
  },
  {
    key: "waktu",
    label: "WAKTU",
  },
  {
    key: "durasi",
    label: "DURASI",
  },
  {
    key: "totalHarga",
    label: "TOTAL HARGA",
  },
  {
    key: "paymentStatus",
    label: "STATUS PEMBAYARAN",
  },
  {
    key: "playingStatus",
    label: "STATUS BERMAIN",
  },
  {
    key: "action",
    label: "AKSI",
  },
];

export default function TableSchedule() {
  const [transactions, setTransactions] = useState<Bookings[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Bookings[]>([]);
  const [searchOrderId, setSearchOrderId] = useState("");

  const getTransactions = async () => {
    const response = await fetch("/api/schedule/all");

    if (response.ok) {
      const result = await response.json();
      setTransactions(result.bookings);
      setFilteredTransactions(result.bookings);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // Filter transactions berdasarkan Order ID
  useEffect(() => {
    if (searchOrderId.trim() === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) => transaction.orderId.toLowerCase().includes(searchOrderId.toLowerCase()));
      setFilteredTransactions(filtered);
    }
  }, [searchOrderId, transactions]);

  const handleClickPlayingStatus = async (e: PressEvent) => {
    const value = e.target.innerHTML;
    const orderId = e.target.id.split("_")[1];

    let statusPlaying: StatusPlaying = "NOTPLAYING";

    if (value === "Bermain") {
      statusPlaying = "INPROGGRESS";
    } else if (value === "Selesai") {
      statusPlaying = "FINISHED";
    }

    const payload = {
      orderId,
      statusPlaying,
    };

    const response = await fetch("/api/schedule/status-playing/update", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      getTransactions();
    }

    console.log({ value, orderId, statusPlaying });
  };

  const handleSearchChange = (value: string) => {
    setSearchOrderId(value);
  };

  const clearSearch = () => {
    setSearchOrderId("");
  };

  return (
    <div className='space-y-4'>
      <div className='flex gap-2 items-end justify-between'>
        <Input
          placeholder='Masukan Order ID'
          value={searchOrderId}
          onValueChange={handleSearchChange}
          className='max-w-sm'
          classNames={{
            input: "focus:outline-none",
          }}
          isClearable
          onClear={clearSearch}
          variant='bordered'
        />
        <div className='text-sm text-gray-500'>
          {filteredTransactions.length} dari {transactions.length} transaksi
        </div>
      </div>

      <Table aria-label='Table schedule dengan pencarian'>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent='Tidak ada transaksi ditemukan'>
          {filteredTransactions.map((item) => {
            const bookingDate = new Date(item.bookingStart).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            const jam = new Date(item.bookingStart).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            return (
              <TableRow key={item.id}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.field.name}</TableCell>
                <TableCell>{bookingDate}</TableCell>
                <TableCell>{jam}</TableCell>
                <TableCell>{item.durationHours} Jam</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
                <TableCell className={`${item.status === "APPROVED" && "text-success"} ${item.status === "PENDING" && "text-warning"}`}>
                  {item.status}
                </TableCell>
                <TableCell
                  className={`
                    ${item.playingStatus === "FINISHED" && "text-success"}
                    ${item.playingStatus === "INPROGGRESS" && "text-warning"}
                    ${item.playingStatus === "NOTPLAYING" && "text-primary"}
                  `}
                >
                  {item.playingStatus}
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <Button
                      id={`btn_${item.orderId}`}
                      onPress={handleClickPlayingStatus}
                      color='warning'
                      value='bermain'
                      disabled={item.playingStatus === "FINISHED" || item.playingStatus === "INPROGGRESS"}
                    >
                      Bermain
                    </Button>
                    <Button
                      id={`btn_${item.orderId}`}
                      onPress={handleClickPlayingStatus}
                      value='selesai'
                      color='success'
                      disabled={item.playingStatus === "FINISHED"}
                    >
                      Selesai
                    </Button>
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
