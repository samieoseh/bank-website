import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export default function UsersTable() {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colDefs] = useState<any>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz w-full" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
