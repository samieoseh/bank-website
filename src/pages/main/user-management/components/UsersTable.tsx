import { UserType } from "@/types/user";
import {
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export default function UsersTable({ data }: { data: UserType[] }) {
  // Row Data: The data to be displayed.
  const [rowData] = useState(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colDefs] = useState<any>([
    { field: "fullName", pinned: "left" },
    { field: "accountNumber" },
    { field: "phoneNumber" },
    { field: "email" },
    { field: "username" },
    { field: "address" },
    { field: "balance", cellDataType: "number" },
    { field: "active" },
    { field: "emailVerified" },
    { field: "phoneNumberVerified" },
    { field: "createdAt", cellDataType: "time" },
    { field: "lastLoginAt", cellDataType: "time" },
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
        rowData={rowData.map(
          (row: {
            createdAt: string | number | Date;
            lastLoginAt: string | number | Date;
          }) => ({
            ...row,
            createdAt: new Date(row.createdAt),
            lastLoginAt: new Date(row.lastLoginAt),
          })
        )}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
      />
    </div>
  );
}
