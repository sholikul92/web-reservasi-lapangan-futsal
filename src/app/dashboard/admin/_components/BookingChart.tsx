"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const bookingData = [32, 45, 28, 50, 40, 55, 0, 0, 0, 0, 0, 0]; // dummy data

export const BookingLineChart = () => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Booking",
        data: bookingData,
        fill: false,
        borderColor: "rgba(59, 130, 246, 0.8)", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3, // smooth curve
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Grafik Booking Lapangan (12 Bulan Terakhir)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Jumlah Booking" },
      },
      x: {
        title: { display: true, text: "Bulan" },
      },
    },
  };

  return <Line data={data} options={options} width={300} />;
};
