import { TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import { styled } from "@mui/material/styles";

interface HeadCell {
  id: string;
  label: string;
}

interface TableHeadRowProps {
  // numSelected: number;
  // rowCount: number;
  headCells: any;
  // permissionType: string;
  // listData: { id: string | number }[]; 
  // setSelected: (selected: (string | number)[]) => void; 
}

export default function TableHeadRow({
  // numSelected,
  // rowCount,
  headCells,
  // permissionType,
  // listData,
  // setSelected,
}: TableHeadRowProps) {
  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelected = listData.map((n) => n.id);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]); // Empty array to deselect all
  // };

  return (
    <TableHead className="tableHead" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
      <TableRow>
        {headCells?.map((hCell: any) => (
          <TableCell
            key={hCell.id}
            className="nowrap"
            sx={{
              padding: '16px', // Customize the padding as per your design
              border: '1px solid rgba(224, 224, 224, 1)', // Add border to each cell
              borderRight: '1px solid rgba(224, 224, 224, 1)', // Ensure right border is visible
              '&:last-child': {
                borderRight: '1px solid rgba(224, 224, 224, 1)', // Ensure right border for last item
              },
            }}
          >
            {hCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    /*<TableHead className="tableHead"  sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
      <TableRow>
        {headCells?.map(
          (hCell:any) => (
            // hCell.id === "checkbox" ? (
            //   <TableCell padding="checkbox" key={hCell.id}>
            //     <Checkbox
            //       indeterminate={numSelected > 0 && numSelected < rowCount}
            //       checked={rowCount > 0 && numSelected === rowCount}
            //       onChange={handleSelectAllClick}
            //       inputProps={{ "aria-label": "select all forms" }}
            //     />
            //   </TableCell>
            // ) : (
            <TableCell key={hCell.id} className="nowrap">
              {hCell.label}
            </TableCell>
          )
          // )
        )}
      </TableRow>
    </TableHead>*/
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
        // borderBottom:"1px solid rgba(224, 224, 224, 1)"
      }}
    >
      <TableCell align="center" colSpan={colSpan} sx={{borderBottom:"1px solid rgba(224, 224, 224, 1)"}}>
        No Data Found
      </TableCell>
    </StyledTableRow>
  );
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Styling for header cells
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold',
    border: '1px solid rgba(224, 224, 224, 1)',  // Adding border
    backgroundColor: theme.palette.grey[200], // Optional: Add background color
  },
  // Styling for body cells
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid rgba(224, 224, 224, 1)',  // Adding border
  },
  // Ensure the last cell has a right border
  '&:last-child': {
    borderRight: '1px solid rgba(224, 224, 224, 1)',  // Right border for the last column
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(even)": {
  //   backgroundColor: theme.palette.action.hover,
  // },
  /*"&:last-child td, &:last-child th": {
    border: 0,
  },*/
}));
