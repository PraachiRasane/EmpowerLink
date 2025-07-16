import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel(data, fileName = "data", sheetName = "Sheet1") {
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = {
    Sheets: { [sheetName]: worksheet },
    SheetNames: [sheetName],
  };

  // Write workbook to binary Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Trigger download
  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(blob, `${fileName}.xlsx`);
}
