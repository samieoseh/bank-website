import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";

export default function BarChart() {
  const [options] = useState<ApexOptions>({
    chart: {
      id: "basic-bar",
      type: "bar",
      zoom: {
        enabled: false, // Disable zoom functionality
      },
      toolbar: {
        show: false, // Hide toolbar
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      labels: {
        style: {
          fontSize: "12px", // Font size for x-axis labels
          fontWeight: "normal", // Font weight for x-axis labels
        },
      },
      axisTicks: {
        show: false, // Remove x-axis ticks
      },
    },
    yaxis: {
      min: 0, // Set the minimum value
      labels: {
        show: true, // Show y-axis labels
        style: {
          fontSize: "12px", // Font size for y-axis labels
          fontWeight: "normal", // Font weight for y-axis labels
        },
      },
      axisBorder: {
        show: true, // Show y-axis border
        color: "#e0e0e0", // Light color for the y-axis line
      },
      axisTicks: {
        show: true, // Optionally show ticks on the y-axis
        color: "#e0e0e0", // Light color for the ticks
      },
    },
    grid: {
      show: true, // Show grid lines
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Bar Chart Example",
      align: "right", // Align the title to the center
      style: {
        fontSize: "14px", // Customize the font size
        fontWeight: "bold", // Make the title bold
        color: "#263238", // Set a subtle dark color for the title
        fontFamily: "Arial, sans-serif", // Use a clean font
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  const [series] = useState([
    {
      name: "Series 1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  return (
    <div className="p-2 flex-1 bg-white">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="270"
      />
    </div>
  );
}
