import { TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import * as React from "react";
import { styled } from "@mui/material/styles";

interface HeadCell {
  id: string;
  label: string;
}

interface TableHeadRowProps {
  headCells: any;
}

export default function TableHeadRow({ headCells }: TableHeadRowProps) {
  return (
    <TableHead
      className="tableHead"
      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
    >
      <TableRow>
        {headCells?.map((hCell: any) => (
          <TableCell
            key={hCell.id}
            className="nowrap"
            sx={{
              padding: "16px", // Customize the padding as per your design
              border: "1px solid rgba(224, 224, 224, 1)", // Add border to each cell
              borderRight: "1px solid rgba(224, 224, 224, 1)", // Ensure right border is visible
              "&:last-child": {
                borderRight: "1px solid rgba(224, 224, 224, 1)", // Ensure right border for last item
              },
            }}
          >
            {hCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface StyledTableNoDataProps {
  colSpan: number; // Define colSpan as a number
}
export const StyledTableNoData: React.FC<StyledTableNoDataProps> = ({
  colSpan,
}) => {
  return (
    <StyledTableRow
      style={{
        height: 53,
      }}
    >
      <TableCell
        align="center"
        colSpan={colSpan}
        sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
      >
        No Data Found
      </TableCell>
    </StyledTableRow>
  );
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    border: "1px solid rgba(224, 224, 224, 1)", // Adding border
    backgroundColor: theme.palette.grey[200], // Optional: Add background color
  },
  // Styling for body cells
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid rgba(224, 224, 224, 1)", // Adding border
  },
  // Ensure the last cell has a right border
  "&:last-child": {
    borderRight: "1px solid rgba(224, 224, 224, 1)", // Right border for the last column
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({}));
