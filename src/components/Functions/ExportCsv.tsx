import Button from "@mui/material/Button";
import {Parser} from "@json2csv/plainjs";
import {useState} from "react";

const ExportCsv = (
  {
    fileNameToExport = "download",
    dataToExport = [],
    optsToExport = {}
  }) => {
  const [loadingExport, setLoadingExport] = useState(false);

  const handleCSVExport = () => {
    setLoadingExport(true)
    try {
      const jsonParser = new Parser(optsToExport);
      const csv = jsonParser.parse(dataToExport);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${Date.now()}-${fileNameToExport?.split(" ").join("-")}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("Error while exporting CSV", error);
    } finally {
      setLoadingExport(false)
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className="ms-3 p-2 btn addDomain upload scandomainbtn"
      onClick={() => handleCSVExport()}
      disabled={loadingExport || !dataToExport}
    >
      Export Data
    </Button>
  )
}
export default ExportCsv;