"use client";

import { Button } from "@heroui/button";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import { useRef } from "react";
import { createPortal } from "react-dom";

type InvoiceProps = {
  invoice: {
    orderId: string;
    user: { name: string; email: string };
    tanggal: string;
    jam: string;
    durationHours: number;
    totalAmount: number;
    field: { name: string; price: number };
  };
};

export default function InvoiceDownloadButton({ invoice }: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    const clone = invoiceRef.current.cloneNode(true) as HTMLElement;
    clone.style.display = "block";
    document.body.appendChild(clone);

    await html2pdf()
      .set({
        margin: 10,
        filename: `invoice-${invoice.orderId}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(clone)
      .save();

    document.body.removeChild(clone);
  };

  return (
    <>
      <Button color='success' className='cursor-pointer' onPress={handleDownload}>
        Download Invoice
      </Button>

      {typeof window !== "undefined" &&
        createPortal(
          <div ref={invoiceRef} style={{ display: "none" }}>
            <div
              style={{
                padding: "24px",
                fontFamily: "Arial, sans-serif",
                color: "#000",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Image src='/logo.png' alt='Logo' width={100} height={100} />
                <div>
                  <h2 style={{ margin: 0, fontSize: "24px" }}>INVOICE</h2>
                  <p style={{ margin: 0 }}>Order ID: {invoice.orderId}</p>
                  <p style={{ margin: 0 }}>Tanggal: {invoice.tanggal}</p>
                </div>
              </div>

              <hr style={{ margin: "24px 0" }} />

              {/* Informasi Pelanggan */}
              <h3 className='font-semibold'>Detail Pelanggan</h3>
              <p>Nama: {invoice.user.name}</p>
              <p>Email: {invoice.user.email}</p>

              {/* Detail Pemesanan */}
              <h3>Detail Pemesanan</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f3f3f3" }}>
                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Lapangan</th>
                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Jam</th>
                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Durasi</th>
                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Harga / Jam</th>
                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{invoice.field.name}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{invoice.jam}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{invoice.durationHours} Jam</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>Rp{invoice.field.price.toLocaleString("id-ID")}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>Rp{invoice.totalAmount.toLocaleString("id-ID")}</td>
                  </tr>
                </tbody>
              </table>

              {/* Total */}
              <div style={{ textAlign: "right", marginTop: "16px" }}>
                <h3>Total: Rp{invoice.totalAmount.toLocaleString("id-ID")}</h3>
              </div>

              <hr style={{ margin: "24px 0" }} />

              {/* Footer */}
              <p style={{ fontSize: "12px", textAlign: "center" }}>
                Terima kasih telah melakukan pemesanan di Rajawali Futsal. Invoice ini dihasilkan secara otomatis dan tidak memerlukan tanda tangan.
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
