"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FileExcelUpload from "@/components/View/common/FileExcelUpload";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExportCsv from "@/components/View/common/ExportCsv";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Dayjs } from "dayjs";
import DateRangePicker from "@/components/Form/DateRangePicketMui";
import MainLoader from "@/components/Loaders/MainLoader";

const formatPercentage = (progress: any, totalCount: any): number => {
  const percentage =
    totalCount > 0 ? Math.min((progress / totalCount) * 100, 100) : 0;
  return parseInt(percentage.toFixed(0), 10);
};

const ProgressBar = ({
  progress,
  totalCount,
}: {
  progress: any;
  totalCount: any;
}) => {
  const percentage: number = formatPercentage(progress, totalCount);

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ flexGrow: 1, mr: 2 }}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Typography variant="body2">{percentage}%</Typography>
    </Box>
  );
};

const ScanDomainTool = () => {
  const [data, setData] = useState<any[]>([]);
  const [actualData, setActualData] = useState<any[]>([]);
  const [isLoader, setisLoader] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [showUpload, setshowUpload] = useState(false);
  const [searchDetails, setSearchDetails] = useState<any>("");
  const [totalData, setTotalData] = useState(0);
  const [currentPageData, setCurrentPageData] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exportData, setExportData] = useState({
    dataToExport: [],
    fileNameToExport: "",
    optsToExport: {},
  });
  const [filterDmarcRecordP, setFilterDmarcRecordP] = useState("all");
  const [filterADKIM, setFilterADKIM] = useState("all");
  const [filterASPF, setFilterASPF] = useState("all");

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [storedKey, setStoredKey] = useState<string | null>(null);

  useEffect(() => {
    setisLoader(true);
    const checkLocalStorage = () => {
      if (typeof window !== "undefined") {
        const key = localStorage.getItem("xlsFileId");

        if (key) {
          setStoredKey(key);
          setisLoader(false);
        }
        setisLoader(false);
      }
    };

    // Call the function
    checkLocalStorage();
  }, []);

  const firstIndex = 0;
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginateddata, setPaginatedData] = useState(
    data?.slice(firstIndex, pageSize)
  );

  const getFilteredData = (dataArray: any) => {
    return dataArray.filter((item: any) => {
      // Check if import_date exists and is valid
      const importDate = item.import_date;

      // Check each filter, if "all", return true, otherwise check for equality
      const searchMatch = searchDetails.trim()
        ? item.domain_name.toLowerCase().includes(searchDetails.toLowerCase())
        : true;
      const dmarcMatch =
        filterDmarcRecordP === "all" ||
        item.dmarc_record_p === filterDmarcRecordP;
      const adkimMatch = filterADKIM === "all" || item.adkim === filterADKIM;
      const aspfMatch = filterASPF === "all" || item.aspf === filterASPF;

      // Date range filtering
      const dateMatch =
        (importDate &&
          (!startDate || importDate.isSameOrAfter(startDate)) &&
          (!endDate || importDate.isSameOrBefore(endDate))) ||
        !importDate;

      return searchMatch && dmarcMatch && adkimMatch && aspfMatch && dateMatch;
    });
  };
  useEffect(() => {
    setPage(1);
    setData(getFilteredData(actualData));
  }, [
    searchDetails,
    filterDmarcRecordP,
    filterADKIM,
    filterASPF,
    startDate,
    endDate,
    actualData,
  ]);

  useEffect(() => {
    const opts = {
      fields: [
        {
          label: "Domain Name",
          value: "domain_name",
          default: "N/A",
        },
        {
          label: "DMARC Record Policy",
          value: "dmarc_record_p",
          default: "N/A",
        },
        {
          label: "ADKIM",
          value: "adkim",
          default: "N/A",
        },
        {
          label: "ASPF",
          value: "aspf",
          default: "N/A",
        },
        {
          label: "Rua",
          value: "rua",
          default: "N/A",
        },
        {
          label: "Ruf",
          value: "ruf",
          default: "N/A",
        },
        {
          label: "Import Date",
          value: "import_date",
          default: "N/A",
        },
      ],
    };

    // @ts-ignore
    setExportData((prevState) => {
      return {
        optsToExport: opts,
        dataToExport: data.map((item) => {
          return {
            domain_name: item.domain_name || "N/A",
            dmarc_record_p: item.dmarc_record_p || "N/A",
            adkim: item.adkim || "N/A",
            aspf: item.aspf || "N/A",
            rua: item.rua || "N/A",
            ruf: item.ruf || "N/A",
            import_date: item.import_date || "N/A",
          };
        }),
        fileNameToExport: "Domains_DMARC_Scanner",
      };
    });
  }, [data]);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setTotalData(data?.length);
    setPaginatedData(data?.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(data?.length / 10) || 1);

    setCurrentPageData(
      page * pageSize > data?.length ? data?.length : page * pageSize
    );
  }, [page, pageSize, data]);

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const handleClickOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredDomains = data?.filter((item) =>
      item.domain_name.toLowerCase().includes(value.toLowerCase())
    );
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(filteredDomains?.slice(startIndex, endIndex));
    setTotalData(filteredDomains?.length);

    setCurrentPageData(
      page * pageSize > filteredDomains?.length
        ? filteredDomains?.length
        : page * pageSize
    );
    setTotalPages(Math.ceil(filteredDomains?.length / 10) || 1);
  };

  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result as string;
          resolve(base64String.split(",")[1]);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (storedKey) {
      const handleUploadKey = async () => {
        setshowUpload(true);
        handleCloseUpload();
        setData([]);
        setActualData([]);
        setPaginatedData([]);
        setisLoader(true);

        const ws = new WebSocket(
          `${process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL}`
        );

        ws.onopen = () => {
          console.log("WebSocket connection opened");
          ws.send(JSON.stringify({ batch_id: storedKey }));
        };

        ws.onmessage = (event) => {
          console.log("Message from server:", event.data);
          const parsedData = JSON.parse(event.data);
          if (parsedData?.data) {
            setData(getFilteredData(parsedData?.data));
            setActualData(parsedData?.data);
            setTotalCount(parsedData?.data?.length);
            setShowProgressBar(true);
          }

          setProgress(parsedData?.progress?.processed);

          if (parsedData?.batch_id !== undefined) {
            localStorage.setItem("xlsFileId", parsedData?.batch_id.toString());
          }

          if (parsedData?.completed == true) {
            ws.close();
            setShowProgressBar(false);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          toast.error("WebSocket error occurred.");
          ws.close();
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed");
          setshowUpload(false);
          setisLoader(false);
        };

        // Ensure to handle closing of the WebSocket connection properly
        return () => {
          ws.close();
        };
      };

      // Call the async function
      handleUploadKey();
    }
  }, [storedKey]);

  const handleUpload = async () => {
    setshowUpload(true);
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    setisLoader(true);
    handleCloseUpload();
    setData([]);
    setActualData([]);
    setPaginatedData([]);
    // reset filters
    setSearchDetails("");
    setFilterDmarcRecordP("all");
    setFilterADKIM("all");
    setFilterASPF("all");

    try {
      const base64File = await fileToBase64(selectedFile);
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL}`
      );

      ws.onopen = () => {
        console.log("WebSocket connection opened");
        ws.send(JSON.stringify({ file: base64File }));
      };
      ws.onmessage = (event) => {
        console.log("Message from server:", event.data);
        const parsedData = JSON.parse(event.data);
        if (parsedData.status === "true" && parsedData.data) {
          setData((prevData: any) =>
            getFilteredData([...prevData, parsedData.data])
          );
          setActualData((prevData: any) => [...prevData, parsedData.data]);
          setTotalCount(parsedData?.progress?.total);
          setShowProgressBar(true);
        }
        setProgress(parsedData?.progress?.processed);
        if (parsedData?.batch_id !== undefined) {
          localStorage.setItem("xlsFileId", parsedData?.batch_id.toString());
        }

        if (parsedData?.completed == true) {
          ws.close();
          setShowProgressBar(false);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("WebSocket error occurred.");
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred during the file upload.");
    } finally {
      setisLoader(false);
      setshowUpload(false);
    }
  };

  const handleResetFilters = () => {
    setFilterDmarcRecordP("all");
    setFilterADKIM("all");
    setFilterASPF("all");
    setStartDate(null);
    setEndDate(null);
  };

  if (isLoader) {
    return <MainLoader />;
  }

  return (
    <div className="graphSection">
      <div className="dashboardTopCard">
        <div className="users">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card userCard">
                  <div className="card-header">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <span className="d-flex align-items-start gap-2"></span>
                        <h3 className="text-start">Domains DMARC Scanner</h3>
                        <p className="text-start">
                          Upload Excel File to verify
                        </p>
                        {showProgressBar && (
                          <ProgressBar
                            progress={progress}
                            totalCount={totalCount}
                          />
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="form-group mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchDetails}
                            onChange={(e) => {
                              setSearchDetails(e.target.value);
                              handleSearch(e);
                            }}
                          />
                        </div>
                        <div className="userButtons">
                          <Button
                            variant="contained"
                            color="primary"
                            className="ms-3 p-2 btn addDomain upload scandomainbtn"
                            onClick={() => handleClickOpenUpload()}
                            disabled={showUpload}
                          >
                            Upload File
                          </Button>
                          <ExportCsv
                            dataToExport={exportData.dataToExport}
                            fileNameToExport={exportData.fileNameToExport}
                            optsToExport={exportData.optsToExport}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ padding: "20px 0px 0" }}
                      className="text-start"
                    >
                      <h6
                        style={{ marginBottom: "15px", fontWeight: "bolder" }}
                      >
                        Filters:
                      </h6>
                      <Grid container columnSpacing={2}>
                        <Grid item lg={2} md={2} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{ background: "#fff", color: "#000" }}
                            >
                              DMARC Record Policy
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="DMARC Record Policy"
                              value={filterDmarcRecordP}
                              onChange={(event) =>
                                setFilterDmarcRecordP(event.target.value)
                              }
                            >
                              <MenuItem value="all">All</MenuItem>
                              <MenuItem value="quarantine">Quarantine</MenuItem>
                              <MenuItem value="reject">Reject</MenuItem>
                              <MenuItem value="none">None</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item lg={2} md={2} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label2"
                              sx={{ background: "#fff", color: "#000" }}
                            >
                              ADKIM
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label2"
                              id="demo-simple-select2"
                              label="ADKIM"
                              value={filterADKIM}
                              onChange={(event) =>
                                setFilterADKIM(event.target.value)
                              }
                            >
                              <MenuItem value="all">All</MenuItem>
                              <MenuItem value="r">R</MenuItem>
                              <MenuItem value="s">S</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item lg={2} md={2} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label3"
                              sx={{ background: "#fff", color: "#000" }}
                            >
                              ASPF
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label3"
                              id="demo-simple-select3"
                              label="ASPF"
                              value={filterASPF}
                              onChange={(event) =>
                                setFilterASPF(event.target.value)
                              }
                            >
                              <MenuItem value="all">All</MenuItem>
                              <MenuItem value="r">R</MenuItem>
                              <MenuItem value="s">S</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item lg={4} md={4} sm={6}>
                          <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                          />
                        </Grid>
                        <Grid item lg={2} md={2} sm={6}>
                          <div className="userButtons">
                            <Button
                              variant="contained"
                              color="primary"
                              className="p-3 btn addDomain upload scandomainbtn"
                              onClick={handleResetFilters}
                              disabled={showUpload}
                              size="large"
                            >
                              Reset Filters
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr style={{ textTransform: "capitalize" }}>
                            <th>
                              Domain Name
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>
                            <th style={{ width: "150px!important" }}>
                              DMARC Record Policy
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>
                            <th>
                              ADKIM
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>
                            <th>
                              ASPF
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>

                            <th>
                              rua
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>
                            <th>
                              ruf
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>
                            <th>
                              Import Date
                              <a href="">
                                <img
                                  src="/assets/images/arrange.svg"
                                  alt=""
                                  loading="lazy"
                                />
                              </a>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginateddata?.length === 0 ? (
                            <tr>
                              <td className="text-center" colSpan={6}>
                                <h5> No Record Found</h5>
                              </td>
                            </tr>
                          ) : (
                            paginateddata?.map((item: any, index: any) => (
                              <tr
                                key={index}
                                style={{ textTransform: "capitalize" }}
                              >
                                <td>{item.domain_name || "N/A"}</td>
                                <td style={{ width: "150px!important" }}>
                                  {item?.dmarc_record_p ? (
                                    <>
                                      {item?.dmarc_record_p == "quarantine" && (
                                        <span className="orangecompliant">
                                          {item?.dmarc_record_p}
                                        </span>
                                      )}
                                      {item?.dmarc_record_p == "none" && (
                                        <span className="greencompliant">
                                          {item?.dmarc_record_p}
                                        </span>
                                      )}
                                      {item?.dmarc_record_p == "reject" && (
                                        <span className="redcompliant">
                                          {item?.dmarc_record_p}
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    "N/A"
                                  )}
                                </td>
                                <td>{item.adkim || "N/A"}</td>
                                <td>{item.aspf || "N/A"}</td>
                                <td>{item.rua || "N/A"}</td>
                                <td>{item.ruf || "N/A"}</td>
                                <td>{item.import_date || "N/A"}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {paginateddata?.length == 0 ||
          (data?.length > 0 && (
            <div className="col-xl-12">
              <div className="search Pagination d-flex align-items-baseline justify-content-between mt-4">
                <div className="entries d-flex gap-2 ">
                  <p>
                    Showing {(page - 1) * pageSize + 1} to {currentPageData} of
                    {totalData} Entries
                  </p>
                </div>
                <div>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* ----------------------------- Upload Excel FIle  dialog ------------------------- */}
      <Dialog
        className="uploadModal"
        open={openUpload}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          background: "rgba(0, 0, 0, 0.03)",
        }}
      >
        <span className="cancelBtn" onClick={handleCloseUpload}>
          <img src="/assets/images/cancel-black.svg" loading="lazy"/>
        </span>
        <FileExcelUpload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handleUpload={handleUpload}
          isLoading={isLoader}
        />
      </Dialog>
    </div>
  );
};
export default ScanDomainTool;
