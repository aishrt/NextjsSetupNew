"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Box, Card, Table, TableBody, TableContainer } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PAGINATION_OBJECT } from "@/constants/pagination";
import { _handleChangePage, _setPaginationObjectFn, createQueryString } from "@/@core/tableFunctions";
import { getFetcherWithAuth } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import * as Papa from "papaparse";
import { formatDateFn } from "@/@core/helper";
import { saveAs } from "file-saver";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, { StyledTableCell, StyledTableNoData, StyledTableRow } from "@/components/Table-ui/TableHeadRow";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import { headCellEmail } from "@/components/Table-ui/headCells";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import BootstrapDialogUi from "@/components/Modal/BootstrapDialogUi";
import CopyToClipboard from "@/components/Functions/CopyToClipboard";



const EmailInvestigation = () => {
  const router = useRouter();
  const [data, setData] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>({});
  const [openView, setOpenView] = useState(false);
  const [reloadLoader, setReloadLoader] = useState(false);
  const [paginationObject, setPaginationObject] = useState(PAGINATION_OBJECT);

  useEffect(() => {
    if (paginationObject.triggerApi) {
      getEmailData();
      reFetchEmailList();
    }
  }, [paginationObject.triggerApi]);
  useEffect(() => {
    getProfileData();
    _handleChangePage({}, 0, setPaginationObject);
  }, []);

  const handleOpenModal = () => {
    setOpenView(true);
  };
  const handleCloseView: any = () => {
    setOpenView(false);
  };

  const getProfileData = () => {
    getFetcherWithAuth(API_ROUTES.VIEW_PROFILE)
      .then((resData) => {
        if (!isEmpty(resData)) {
          resData.data.preview = resData.data.profile_image
            ? process.env.NEXT_PUBLIC_BACKEND_API_URL +
              resData.data.profile_image
            : "/assets/images/profile.png";
          setProfileData(resData.data);
        }
      })
      .catch((e) => {
        setProfileData({});
        toast.error("ERROR!");
      })
      .finally(() => {});
  };
  const getEmailData = () => {
    setLoading(true);
    let queryObject = {
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
    };
    const qryStr = createQueryString(queryObject);

    getFetcherWithAuth(`${API_ROUTES.EMAIL_INVESTIGATION_LIST}${qryStr}`)
      .then((resData: any) => {
        setData(resData.results);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, resData);
        });
      })
      .catch((err) => {
        setData([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchEmailData = () => {
    let queryObject = {
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
    };
    const qryStr = createQueryString(queryObject);

    getFetcherWithAuth(`${API_ROUTES.EMAIL_INVESTIGATION_LIST}${qryStr}`)
      .then((resData: any) => {
        setData(resData.results);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, resData);
        });
      })
      .catch((err) => {
        setData([...[]]);
        setPaginationObject(PAGINATION_OBJECT);
        toast.error(err.message);
      });
  };

  const reFetchEmailList = () => {
    setReloadLoader(true);
    let queryObject = {
      page: paginationObject.page,
      page_size: paginationObject.rowsPerPage,
    };
    const qryStr = createQueryString(queryObject);

    getFetcherWithAuth(`${API_ROUTES.CRON_EMAIL_INVESTIGATION}${qryStr}`)
      .catch((e) => {})
      .finally(() => {
        setReloadLoader(false);
        fetchEmailData();
      });
  };
  const downloadAllDataAsCSV = async () => {
    let allData: any = [];
    const rowsPerPage = 10000;
    const queryObject = {
      page: 1,
      page_size: rowsPerPage,
    };
    const qryStr = createQueryString(queryObject);

    try {
      const resData = await getFetcherWithAuth(
        `${API_ROUTES.EMAIL_INVESTIGATION_LIST}${qryStr}`
      );
      allData = resData.results;
      if (resData.totalPages > 1) {
        const additionalQueryStr = createQueryString({
          ...queryObject,
          page: 2,
        });
        const additionalData = await getFetcherWithAuth(
          `${API_ROUTES.EMAIL_INVESTIGATION_LIST}${additionalQueryStr}`
        );
        allData = allData.concat(additionalData.results);
      }
    } catch (error) {
      console.error("Error fetching data for CSV:", error);
    }

    const headCellSendEmailDashboard = [
      { id: "From_address", label: "FROM_ADDRESS" },
      { id: "compliance", label: "Compliance" },
      { id: "subject", label: "SUBJECT" },
      { id: "date", label: "DATE" },
    ];

    const formattedData = allData.map((item: any) => ({
      FROM_ADDRESS: item?.from_email ? item?.from_email : "N/A",
      Compliance: item?.overall_compliance,
      SUBJECT: item?.subject ? item?.subject : "N/A",
      DATE: item?.recived_date
      ? formatDateFn(item?.recived_date)
      : "Never logged-in",
    }));

    if (formattedData.length > 0) {
      const csvData = Papa.unparse({
        fields: headCellSendEmailDashboard.map((header) => header.label),
        data: formattedData,
      });
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "email.csv");
    } else {
      console.warn("No data available to download.");
    }
  };
  return (
    <>
      <Box>
        <div
          className="userButtons"
          style={{ textAlign: "right", marginTop: "20px" }}
        >
          <Button
            variant="contained"
            onClick={reFetchEmailList}
            className="btn mainButton"
            sx={{ marginRight: "10px" }}
          >
            {reloadLoader ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="fa-solid fa-repeat m-0"></i>
            )}
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            className="btn mainButton"
          >
            New Test
          </Button>
        </div>
        <div className="col-xl-12 exportButton mt-4">
                <button
                  type="submit"
                  className="btn main-button-dark"
                  onClick={downloadAllDataAsCSV}
                  // disabled={isSubmitting}
                >
                  Export CSV
                </button>
              </div>
        <Card className="cardFix mb-7">
          <TableToolbar title={`Email Investigation`} hideSearch={true} />
          <div style={{ padding: "10px 15px 15px 15px" }}>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHeadRow headCells={headCellEmail} />
                  <TableBody>
                    {isLoading ? (
                      <TableRowsLoader
                        rowsNum={10}
                        columnNum={headCellEmail.length}
                      />
                    ) : isEmpty(data) ? (
                      <StyledTableNoData colSpan={headCellEmail.length} />
                    ) : (
                      data?.map((item: any, idx: number) => (
                        <StyledTableRow
                          key={`row_idx${idx}`}
                          onClick={() => {
                            // setLoading(true);
                            router.push(
                              `/dashboard/investigation-results?id=${item?.message_id}`
                            );
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          <StyledTableCell>
                            {item?.from_email ? item?.from_email : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item?.overall_compliance ? (
                              <>
                                {item?.overall_compliance == "partial pass" && (
                                  <span className="orangecompliant">
                                    {item?.overall_compliance
                                      .charAt(0)
                                      .toUpperCase() +
                                      item?.overall_compliance.slice(1)}
                                  </span>
                                )}
                                {item?.overall_compliance == "pass" && (
                                  <span className="greencompliant">
                                    {item?.overall_compliance
                                      .charAt(0)
                                      .toUpperCase() +
                                      item?.overall_compliance.slice(1)}
                                  </span>
                                )}
                                {item?.overall_compliance == "fail" && (
                                  <span className="redcompliant">
                                    {item?.overall_compliance
                                      .charAt(0)
                                      .toUpperCase() +
                                      item?.overall_compliance.slice(1)}
                                  </span>
                                )}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item?.subject ? item?.subject : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item?.recived_date
                              ? formatDateFn(item?.recived_date)
                              : "Never logged-in"}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePaginationCompo
              paginationObject={paginationObject}
              setPaginationObject={setPaginationObject}
              className="alignPagination"
            />
          </div>
        </Card>
      </Box>
      <BootstrapDialogUi
        open={openView}
        onClose={handleCloseView}
        title="Raw Record"
        content={
          <div>
            <Typography gutterBottom>
              <h5>Send an email to the following email address:</h5>
              <p>
                In order to get your email analyzed from DMARC compliance
                perspective, send an email from the sending source you want to
                check or configure to the address below. Email will appear in
                the list as soon as we receive it.
              </p>
              <p>Make sure you have sent the email to the following address.</p>
              <div className="copy-text">
                <input
                  type="text"
                  className="text"
                  value={`${profileData?.id}@mark.yourdmarc.online`}
                />
                <CopyToClipboard
                  entryText={`${profileData?.id}@mark.yourdmarc.online`}
                />
              </div>
            </Typography>
          </div>
        }
        actions={
          <Button className="mainButton" autoFocus onClick={handleCloseView}>
            Done
          </Button>
        }
      />
    </>
  );
};

export default EmailInvestigation;
