import { TablePagination } from "@mui/material";
import React from "react";
import {
  _handleChangePage,
  _handleChangeRowsPerPage,
} from "@/@core/tableFunctions";

interface PaginationObject {
  totalItems: number;
  rowsPerPage: number;
  page: number;
  triggerApi:boolean
}

interface TablePaginationCompoProps {
  paginationObject: PaginationObject;
  setPaginationObject: any;
  // setPaginationObject: (pagination: PaginationObject) => void;
  className?: string;
  labelRowsPerPage?: string;
}

export const TablePaginationCompo: React.FC<TablePaginationCompoProps> = ({
  paginationObject,
  setPaginationObject,
  className = "",
  labelRowsPerPage = "Rows per page:",
}) => {
  return (
    <TablePagination
      disabled={paginationObject.triggerApi}
      className={className}
      labelRowsPerPage={labelRowsPerPage}
      rowsPerPageOptions={[10, 20, 50, 100]}
      component="div"
      count={paginationObject.totalItems} // Total number of items
      rowsPerPage={paginationObject.rowsPerPage} // Number of rows per page
      page={paginationObject.page - 1} // Page index (0-based)
      onPageChange={(event, newPage) => {
        _handleChangePage(event, newPage, setPaginationObject);
      }}
      onRowsPerPageChange={(event) => {
        _handleChangeRowsPerPage(event, setPaginationObject);
      }}
    />
  );
};
