"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const fieldData = {
  labels: ["Lapangan A", "Lapangan B", "Lapangan C"],
  datasets: [
    {
      label: "Jumlah Booking",
      data: [77, 78, 95], // Contoh data booking
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)", // merah
        "rgba(54, 162, 235, 0.6)", // biru
        "rgba(75, 192, 192, 0.6)", // hijau
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

export const PopularFieldPieChart = () => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Lapangan yang Paling Sering Dibooking",
      },
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return <Pie data={fieldData} options={options} />;
};
