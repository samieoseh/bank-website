import { useState } from "react";
import {
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { CircleAlert, LucideCheckCircle } from "lucide-react";

export default function TransactionTable({ data }) {
  const [rowData] = useState(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colDefs] = useState<any>([
    { field: "sender.fullName", filter: true, cellDataType: "text" },
    { field: "sender.accountNumber", filter: true, cellDataType: "text" },
    {
      field: "reciever.fullName",
      filter: true,
      cellDataType: "text",
    },
    {
      field: "reciever.accountNumber",
      filter: true,
      cellDataType: "text",
    },
    { field: "amount", filter: true, cellDataType: "number" },
    {
      field: "transactionDate",
      filter: "agDateColumnFilter",
      cellDataType: "time",
    },
    { field: "description", filter: true, cellDataType: "text" },
    {
      field: "status",
      filter: true,
      pinned: "right",
      cellDataType: "text",
      cellRenderer: (params: { value: string }) => {
        return (
          <div className="flex items-center gap-2">
            {params.value === "COMPLETED" ? (
              <LucideCheckCircle
                fill="green"
                stroke="#fff"
                height={22}
                width={22}
              />
            ) : (
              <CircleAlert fill="red" stroke="#fff" height={22} width={22} />
            )}
            <p className="">{params.value}</p>
          </div>
        );
      },
    },
    { field: "transactionType", filter: true, cellDataType: "text" },
  ]);

  const autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToContentStrategy = {
    type: "fitCellContents",
  };

  return (
    <div
      className="ag-theme-quartz w-full" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData.map(
          (row: { transactionDate: string | number | Date }) => ({
            ...row,
            transactionDate: new Date(row.transactionDate),
          })
        )}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
        detailRowAutoHeight={true}
      />
    </div>
  );
}
