import { RecentActivitiesType } from "@/types/recent-activities";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import {
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
} from "ag-grid-community";

export default function RecentActivitiesTable({
  data,
}: {
  data: RecentActivitiesType[] | undefined;
}) {
  const [rowData] = useState<RecentActivitiesType[] | undefined>(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [colDefs] = useState<any>([
    { field: "fullName" },
    { field: "description" },
    { field: "actionType" },
    { field: "actionTime" },
  ]);

  const autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToContentStrategy = {
    type: "fitGridWidth",
  };

  return (
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
