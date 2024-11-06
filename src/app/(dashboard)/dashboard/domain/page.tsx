"use client";
import { isEmpty } from "@/utils/isEmpty";
import { isOnboarded } from "@/@core/user-functions";
import getCurrentUser from "@/lib/session";
import React, { Suspense, useEffect, useState } from "react";
import RecordValuesCompo from "@/app/pageComponents/Tools/ui/RecordValuesCompo";
import RecordWarningCompo from "@/app/pageComponents/Tools/ui/RecordWarningCompo";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  capitalize,
  CircularProgress,
  Grid,
  InputLabel,
  Pagination,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import CopyToClipboard from "@/components/Functions/CopyToClipboard";
import {
  deleteFetcher,
  isTokenExpired,
  postFetcher,
  postFetcherFormData,
} from "@/@core/apiFetcher";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import FileUpload from "@/components/View/common/FileUpload";
import { API_ROUTES } from "@/@core/apiRoutes";
import LicenseWarningsCompo from "@/components/UI/LicenseWarningsCompo";
import TableToolbar from "@/components/Table-ui/TableToolbar";
import Scrollbar from "@/components/Layout/scrollbar/Scrollbar";
import TableHeadRow, {
  StyledTableCell,
  StyledTableNoData,
  StyledTableRow,
} from "@/components/Table-ui/TableHeadRow";
import { headCellDomain } from "@/components/Table-ui/headCells";
import TableRowsLoader from "@/components/Table-ui/TableRowsLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { PAGINATION_OBJECT } from "@/constants/pagination";
import {
  _handleChangePage,
  _setPaginationObjectFn,
  createQueryString,
} from "@/@core/tableFunctions";
import { TablePaginationCompo } from "@/components/Table-ui/TablePaginationCompo";
import { BootstrapTooltipUi } from "@/components/UI/BootstrapToolTip";
import CircularSpinner from "@/components/Loaders/CircularSpinner";
import Loader from "@/app/pageComponents/BlogComponent/Loader";
import { useStore } from "@/utils/store";
import UpgradePlanComponent from "@/app/pageComponents/Others/UpgradePlanComponent";
import dayjs from "dayjs";
function debounce(func: any, wait: any) {
  let timeout: any;
  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const DomainPageList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DomainPage />
    </Suspense>
  );
};

const DomainPage = () => {
  const router = useRouter();
  const { licenseValidation } = useStore();
  const [resData, setResData] = React.useState({} as any);
  const [data, setData] = useState({} as any);
  const [tlsData, setTLSData] = useState({} as any);

  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  // const [open, setOpen] = useState(false);
  const [inputDomain, setInputDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, update } = useSession();
  const [deleteDomain, setDeleteDomain] = useState(false);
  const [deleteId, setDeleteId] = useState("" as any);
  const [domainName, setDomainName] = useState("" as any);
  const [clickedButton, setClickedButton] = useState("" as any);
  const [selectedValue, setSelectedValue] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const [paginationObject, setPaginationObject] = useState(PAGINATION_OBJECT);

  const [isLoadingDelete, setIsLoadingDelete] = useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenUpload = (domainName: string) => {
    setDomainName(domainName);
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setSelectedFile(null);
    setOpenUpload(false);
  };
  useEffect(() => {
    _handleChangePage({}, 0, setPaginationObject);
  }, [searchTerm, selectedValue]);

  async function getResponseData() {
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      if (!isOnboarded(user)) {
      }
      const isTokenValid = await isTokenExpired(user.token);
      if (!isTokenValid) {
        signOut({ callbackUrl: "/" });
        return;
      }

      const users = await getCurrentUser();
      let headers: any = {
        "Content-Type": "application/json",
      };
      if (!isEmpty(users) && !isEmpty(users.token)) {
        headers["Authorization"] = `Bearer ${users.token}`;
      }

      let url = "";
      let queryObject = {
        search_text: searchTerm || "",
        page: paginationObject.page,
        page_size: paginationObject.rowsPerPage,
        is_verify: selectedValue || "all",
      };
      const qryStr = createQueryString(queryObject);
      url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${API_ROUTES.LIST_ALL_DOMAINS}${qryStr}`;
      const res = await fetch(url, {
        method: "GET",
        headers,
        next: {
          revalidate: 0,
        },
      });
      let finalResponse = await res.json();

      if (finalResponse != undefined || {}) {
        setResData(finalResponse);
        // setResData([...[]]);
        setPaginationObject((prevState) => {
          return _setPaginationObjectFn(prevState, finalResponse);
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error occured : ", error);
      setResData([...[]]);
      setPaginationObject(PAGINATION_OBJECT);
    }
  }

  useEffect(() => {
    if (paginationObject.triggerApi) {
      getResponseData();
    }
  }, [paginationObject.triggerApi]);
  const handleClose = () => {
    setOpen(false);
    setIsLoadingDelete(null);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const onVerify = (domain: string, showToast: boolean) => {
    setOpen(false);
    setIsLoadingVerify(true);
    postFetcher(API_ROUTES.ONBOARD_ACCOUNT, {
      domain: domain,
    })
      .then(async (res: any) => {
        setData(res?.data);

        if (!res.status) {
          toast.error(res.message);
        } else {
          if (res.data.is_verify) {
            await update({ is_onboarded: true });
            getResponseData();
            // router.push("/dashboard/domain");
          } else {
            setOpen(true);
          }
          if (showToast) {
            if (res.data.is_verify) {
              toast.success("The domain is verified.");
              getResponseData();

              setOpen(false);
            } else if (!res.data.is_verify) {
              toast.success(
                "DNS propagation may take some time .We will email you once the domain gets verified."
              );
              setOpen(true);
            }
          }
        }
      })
      .catch((res) => {
        console.log("Error occured : ", res);
      })
      .finally(async () => {
        setInputDomain(domain);
        setIsLoading(false);
        setIsLoadingVerify(false);
      });
  };
  const handleDelete = (domain: any) => {
    setIsLoadingDelete(domain);
    setIsLoadingVerify(true);
    setDeleteDomain(false);
    deleteFetcher(`${API_ROUTES.LIST_ALL_DOMAINS}/${domain}/`)
      .then(async (res: any) => {
        if (!res.status) {
          toast.error(res.message);
        } else {
          getResponseData();
          toast.success(res.message);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingDelete(null);
      });
  };

  useEffect(() => {
    if (resData) {
    }
  }, [resData]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a zip file first.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("domain", domainName);

      const response = await postFetcherFormData(
        API_ROUTES.UPLOAD_REPORT,
        formData,
        "multipart/form-data"
      );

      const result = response;

      if (response.ok) {
        toast.success("File uploaded successfully.");
        setSelectedFile(null);
        handleCloseUpload();
      } else {
        toast.error("File upload failed.");
      }
    } catch (error) {
      toast.error("An error occurred during the file upload.");
    } finally {
      setIsLoading(false);
    }
  };
  const routeChange = () => {
    let path = `/dashboard/add-domain`;
    router.push(path);
  };

  const [routeBtn, setRouteBtn] = useState("");
  const [routeLoader, setRouteLoader] = useState(false);
  const handleRouting = (domainName: any) => {
    setRouteLoader(true);
    router.push(
      `/dashboard/sender-dashboard?policy_published_domain=${domainName}&fromDashboard=true`
    );
  };

  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };
  return (
    <>
      {showUpgrade && (
        <UpgradePlanComponent
          initialOpenModal={showUpgrade}
          onClose={handleCloseUpgradePlan}
        />
      )}
      <Box className="domainList">
        <LicenseWarningsCompo />
        <div
          className="userButtons"
          style={{
            textAlign: "right",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          {licenseValidation?.domainLimitCrossed ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowUpgrade(true)}
              className="btn mainButton"
            >
              Add Domain
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={routeChange}
              className="btn mainButton"
            >
              Add Domain
            </Button>
          )}
        </div>
        <div className="card mb-7">
          <div className="card-header">
            <TableToolbar
              title={`Domains`}
              onSearch={(query) => setSearchTerm(query)}
            />
            <div style={{ padding: "10px 15px 15px 15px" }}>
              {/* <h6 style={{ marginBottom: "15px" }}>Filters:</h6> */}
              <Grid container columnSpacing={2}>
                <Grid item lg={3}>
                  <FormControl sx={{ width: "100%", marginBottom: "5px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Filter:
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      value={selectedValue}
                      onChange={(e: any) => {
                        setSelectedValue(e.target.value);
                      }}
                      variant={`outlined`}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"true"}>Configured</MenuItem>
                      <MenuItem value={"false"}>Not Configured</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="card-body">
            <Scrollbar>
              <TableContainer>
                <Table
                  // className="table"
                  sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <TableHeadRow headCells={headCellDomain} />
                  <TableBody>
                    {isLoading ? (
                      <TableRowsLoader
                        rowsNum={10}
                        columnNum={headCellDomain.length}
                      />
                    ) : isEmpty(resData?.results) ? (
                      <StyledTableNoData colSpan={headCellDomain.length} />
                    ) : (
                      resData?.results?.map((item: any, idx: number) => (
                        <StyledTableRow key={`row_idx${idx}`}>
                          <StyledTableCell>
                            <div className="tableDataFlex">
                              <span>
                                <img
                                  className="favIconImage"
                                  loading="lazy"
                                  src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${item?.domain}&size=128`}
                                  alt={`${item?.domain} favicon`} // Added alt text for accessibility
                                />
                                <span
                                  className={
                                    item?.blacklist_report?.blacklisted_status
                                      ? "redColor"
                                      : ""
                                  }
                                >
                                  {item?.domain}
                                </span>
                              </span>
                              <span>
                                {item?.blacklist_report?.blacklisted_status ==
                                true ? (
                                  <>
                                    {/* <span className="tooltipSpan"> */}
                                    <Tooltip
                                      title={
                                        <React.Fragment>
                                          <b>Blacklisted</b>
                                          {item?.blacklist_report
                                            ?.created_at && (
                                            <>
                                              <br />
                                              <b>
                                                {"Last checked  : "}{" "}
                                                {dayjs(
                                                  item?.blacklist_report
                                                    ?.created_at
                                                ).format("DD-MM-YYYY")}
                                              </b>
                                            </>
                                          )}
                                        </React.Fragment>
                                      }
                                      placement="left"
                                    >
                                      <img
                                        src="/assets/images/crosscircle.svg"
                                        alt=""
                                        loading="lazy"
                                      />
                                    </Tooltip>
                                    {/* </span> */}
                                  </>
                                ) : (
                                  <>
                                    {/* <span className="tooltipSpan"> */}
                                    <Tooltip
                                      title={
                                        <React.Fragment>
                                          <b>Not Blacklisted</b>
                                          {item?.blacklist_report
                                            ?.created_at && (
                                            <>
                                              <br />
                                              <b>
                                                {"Last checked  : "}{" "}
                                                {dayjs(
                                                  item?.blacklist_report
                                                    ?.created_at
                                                ).format("DD-MM-YYYY")}
                                              </b>
                                            </>
                                          )}
                                        </React.Fragment>
                                      }
                                      placement="top"
                                    >
                                      <img
                                        src="/assets/images/checkarrowFilled.svg"
                                        alt=""
                                        loading="lazy"
                                      />
                                    </Tooltip>
                                    {/* </span> */}
                                  </>
                                )}
                              </span>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            {item?.is_verify == false ? (
                              <div className="domainstatus">
                                {isLoadingVerify &&
                                clickedButton == `row_idx${idx}` ? (
                                  <button className="btn notConfig d-flex align-items-center justify-content-center">
                                    <CircularSpinner />
                                  </button>
                                ) : (
                                  <>
                                    {" "}
                                    <button
                                      className="btn notConfig"
                                      title="Under Review"
                                      disabled={isLoadingVerify}
                                      onClick={() => {
                                        setClickedButton(`row_idx${idx}`);
                                        onVerify(item?.domain, false);
                                        setDomainName(item?.domain);
                                        setModalType("DMARC");
                                      }}
                                    >
                                      <img
                                        src="/assets/images/redMinusIcon.svg"
                                        alt=""
                                        loading="lazy"
                                      />
                                      <span>Under Review</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="domainstatus">
                                <button
                                  className="btn config"
                                  title="Configured"
                                  style={{ cursor: "default" }}
                                >
                                  <img
                                    src="/assets/images/greenTick.svg"
                                    alt=""
                                    loading="lazy"
                                  />
                                  <span>Configured</span>
                                </button>
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item?.tls_verify == false ? (
                              <div className="domainstatus">
                                {isLoadingVerify &&
                                clickedButton == `row_idx${idx}_tls` ? (
                                  <button className="btn notConfig d-flex align-items-center justify-content-center">
                                    <CircularSpinner />
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      className="btn notConfig"
                                      title="Under Review"
                                      disabled={isLoadingVerify}
                                      onClick={() => {
                                        setClickedButton(`row_idx${idx}_tls`);
                                        setModalType("TLS");
                                        setOpen(true);
                                        setTLSData(item);
                                        setInputDomain(item?.domain);
                                        setDomainName(item?.domain);
                                      }}
                                    >
                                      <img
                                        src="/assets/images/redMinusIcon.svg"
                                        alt=""
                                        loading="lazy"
                                      />
                                      <span>Under Review</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="domainstatus">
                                <button
                                  className="btn config"
                                  title="Configured"
                                  style={{ cursor: "default" }}
                                >
                                  <img
                                    src="/assets/images/greenTick.svg"
                                    alt=""
                                    loading="lazy"
                                  />
                                  <span>Configured</span>
                                </button>
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item?.is_verify == false
                              ? "N/A"
                              : item?.report_received}
                          </StyledTableCell>
                          <StyledTableCell>
                            <BootstrapTooltipUi title={`Delete`}>
                              <IconButton
                                className="outerborder _dangerIcon me-2"
                                disabled={isLoadingDelete === item.id}
                                onClick={(e) => {
                                  setDeleteId(item.id);
                                  setDeleteDomain(true);
                                }}
                              >
                                {isLoadingDelete === item.id ? (
                                  <CircularProgress size={20} />
                                ) : (
                                  <DeleteIcon />
                                )}
                              </IconButton>
                            </BootstrapTooltipUi>
                            <BootstrapTooltipUi title={`Upload File`}>
                              <IconButton
                                className="outerborder me-2"
                                onClick={(e) => {
                                  handleClickOpenUpload(item?.domain);
                                }}
                              >
                                <FileUploadIcon />
                              </IconButton>
                            </BootstrapTooltipUi>

                            {item?.is_verify == true && (
                              <>
                                {routeLoader && routeBtn == `row_idx${idx}` ? (
                                  <BootstrapTooltipUi title={`View`}>
                                    <IconButton
                                      className="outerborder me-2"
                                      sx={{ borderColor: "#f43f5e" }}
                                    >
                                      <CircularSpinner />
                                    </IconButton>
                                  </BootstrapTooltipUi>
                                ) : (
                                  <BootstrapTooltipUi title={`View`}>
                                    <IconButton
                                      className="outerborder me-2 viewouterborder"
                                      onClick={() => {
                                        setRouteBtn(`row_idx${idx}`);
                                        handleRouting(item?.domain);
                                      }}
                                      sx={{ borderColor: "#f43f5e" }}
                                      disabled={routeLoader}
                                    >
                                      <VisibilityIcon
                                        style={{
                                          borderColor: "#08bd00",
                                          color: "#08bd00",
                                        }}
                                      />
                                    </IconButton>
                                  </BootstrapTooltipUi>
                                )}
                              </>
                            )}
                          </StyledTableCell>
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
                            <span
                              className="cancelBtn"
                              onClick={handleCloseUpload}
                            >
                              <img
                                src="/assets/images/cancel-black.svg"
                                loading="lazy"
                              />
                            </span>
                            <FileUpload
                              selectedFile={selectedFile}
                              setSelectedFile={setSelectedFile}
                              handleUpload={handleUpload}
                              isLoading={isLoading}
                              domainName={item.domain}
                              setDomainName={setDomainName}
                            />
                          </Dialog>
                        </StyledTableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </div>
          <TablePaginationCompo
            paginationObject={paginationObject}
            setPaginationObject={setPaginationObject}
            className="alignPagination"
          />
          {open == true && (
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              className="configureModal"
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <div className="col-12">
                    {!isEmpty(modalType == "DMARC" ? data : tlsData) && (
                      <div className="generatorSection__Result domainListModal">
                        <div className="d-flex align-items-center modalLeading">
                          <h3 className="mt-0 d-block">
                            <span>
                              {modalType == "DMARC" ? "DMARC" : "TLS"}&nbsp;
                              lookup results for
                              {!!inputDomain && <>&nbsp;{inputDomain}&nbsp;</>}
                              domain
                            </span>
                          </h3>
                          {modalType == "DMARC" && (
                            <Button
                              onClick={() => onVerify(domainName, true)}
                              type="submit"
                              className="btn blueButton mt-0"
                              disabled={isLoadingVerify}
                            >
                              Verify
                            </Button>
                          )}
                        </div>
                        <RecordValuesCompo
                          hostName={
                            modalType == "DMARC"
                              ? inputDomain
                              : tlsData?.tls_host_name
                          }
                          typeVal="TXT"
                          recordValue={
                            modalType == "DMARC"
                              ? resData?.record_value
                              : tlsData?.tls_record_value
                          }
                          titleText={`DMARC Record`}
                        />
                        {modalType == "DMARC" && (
                          <div>
                            Publish the following DMARC records to your DNS and
                            come back to verify.
                          </div>
                        )}
                        {modalType == "DMARC" && (
                          <div className={`recordsBox col-12`}>
                            <h5>DMARC Record</h5>
                            {data?.dmarc_records_table.map(
                              (val: any, idx: number) => {
                                return (
                                  <>
                                    <div
                                      className="recordValueBox mb-3 pe-3 row"
                                      key={`record_table_${idx}`}
                                    >
                                      {Object.keys(val).map(
                                        (row, idx2: number) => {
                                          const rowValue = val[row];
                                          return (
                                            <div
                                              className="row_divider recordSec position-relative col-lg-4"
                                              key={`row_divider_${idx2}`}
                                            >
                                              <div className="recordSecInner">
                                                <p className="record_value">
                                                  <span className="">
                                                    <b>
                                                      {capitalize(row)}&nbsp;:
                                                    </b>
                                                    &nbsp;
                                                  </span>
                                                  <span className="">
                                                    {rowValue}
                                                  </span>
                                                </p>
                                                {row !== "type" && (
                                                  <CopyToClipboard
                                                    disabledButton={!rowValue}
                                                    entryText={rowValue}
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </>
                                );
                              }
                            )}
                          </div>
                        )}
                        <RecordWarningCompo warningText={resData?.warnings} />
                        <RecordWarningCompo
                          isError
                          warningText={resData?.errors}
                        />
                        {modalType == "DMARC" && (
                          <div className="alert alert-primary" role="alert">
                            <b>Note: </b> DNS propagation may take upto several
                            hours.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Typography>
              </DialogContent>
            </BootstrapDialog>
          )}
          {deleteDomain == true && (
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={deleteDomain}
              className="deleteDialogOuter"
            >
              <DialogContent className="dialogHeader" dividers>
                <Typography gutterBottom>
                  <>
                    <img src="/assets/images/binIcon.svg" loading="lazy" />
                    <span style={{ display: "block" }}>
                      Are you sure You want to delete ?
                    </span>
                  </>
                </Typography>
              </DialogContent>
              <DialogActions className="dialogBtns">
                <Button
                  className="delBtn"
                  onClick={() => handleDelete(deleteId)}
                >
                  Sure
                </Button>
                <Button
                  className="cancelBtn"
                  onClick={() => {
                    setDeleteDomain(false);
                    setIsLoadingDelete(null);
                  }}
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </BootstrapDialog>
          )}
        </div>
      </Box>
    </>
  );
};

export default DomainPageList;
