import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";

export default function PieChart() {
  const [options] = useState<ApexOptions>({
    chart: {
      id: "basic-pie",
      type: "pie",
      zoom: {
        enabled: false, // Disable zoom functionality
      },
      toolbar: {
        show: false, // Hide toolbar
      },
    },
    labels: ["1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998"], // Set labels for each slice
    tooltip: {
      shared: true,
      intersect: false,
    },
    title: {
      text: "Pie Chart Example",
      align: "right", // Align the title to the center
      style: {
        fontSize: "14px", // Customize the font size
        fontWeight: "bold", // Make the title bold
        color: "#263238", // Set a subtle dark color for the title
        fontFamily: "Arial, sans-serif", // Use a clean font
      },
    },
  });

  const [series] = useState([30, 40, 45, 50, 49, 60, 70, 91]); // Pie chart data values

  return (
    <div className="p-2 flex-1 bg-white">
      <Chart
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="270"
      />
    </div>
  );
}
