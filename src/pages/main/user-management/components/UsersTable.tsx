import {
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export default function UsersTable({ data }) {
  // Row Data: The data to be displayed.
  const [rowData] = useState(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colDefs] = useState<any>([
    { field: "fullName", pinned: "left" },
    { field: "accountNumber", pinned: "left" },
    { field: "phoneNumber" },
    { field: "email" },
    { field: "username" },
    { field: "address" },
    { field: "balance" },
    { field: "active", pinned: "left" },
    { field: "emailVerified" },
    { field: "phoneNumberVerified" },
    { field: "createdAt" },
    { field: "lastLoginAt" },
    { field: "accountLockedUntil" },
  ]);

  const autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToContentStrategy = {
    type: "fitCellContents",
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz w-full" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
      />
    </div>
  );
}
