import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton} from "@mui/material";

interface TableRowsLoaderProps {
  rowsNum: number;
  columnNum: number;
}

export default function TableRowsLoader({ rowsNum, columnNum }: TableRowsLoaderProps) {
  const TableCellSkeletonHtml = () => {
    return (
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text"/>
      </TableCell>
    )
  }
  return (
    <>
      {[...Array(rowsNum)].map((_, rowIndex) => (
        <TableRow key={`rows_${rowIndex}`}>
          {[...Array(columnNum)].map((_, colIndex) => (
            <TableCellSkeletonHtml key={`column_${colIndex}`} />
          ))}
        </TableRow>
      ))}
    </>
  );
};