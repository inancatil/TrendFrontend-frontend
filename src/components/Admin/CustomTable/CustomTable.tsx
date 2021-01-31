import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

export interface ITableData {
  id: string;
  [x: string]: any;
}

type Order = "asc" | "desc";
type Align = "right" | "left";

export interface HeadCell {
  id: keyof ITableData;
  label: string;
  align?: Align;
  isSortable?: boolean;
  hidden?: boolean;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ITableData
  ) => void;
  order: Order;
  orderBy: string;
}

interface IProps<T extends ITableData> {
  headCells: HeadCell[];
  tableData: T[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export default function CustomTable<T extends ITableData>({
  headCells,
  tableData,
}: IProps<T>) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ITableData>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof ITableData) => (
      event: React.MouseEvent<unknown>
    ) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            if (headCell.hidden)
              return <React.Fragment key={headCell.id}></React.Fragment>;
            if (headCell.isSortable)
              return (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              );
            return (
              <TableCell key={headCell.id} align={headCell.align}>
                {headCell.label}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }

  function EnhancedTableCell(props: any) {
    if (Array.isArray(props.children)) {
      return (
        <TableCell {...props}>
          {props.children.map((el, i) => (
            <Chip key={i} label={el} size="small" />
          ))}
        </TableCell>
      );
    } else return <TableCell {...props}>{props.children}</TableCell>;
  }

  //Date Sort probably not working
  function compare(a: string | number, b: string | number, isAsc: boolean) {
    // Use toUpperCase() to ignore character casing

    const bandA =
      a === undefined ? "" : typeof a === "string" ? a.toUpperCase() : a;
    const bandB =
      b === undefined ? "" : typeof b === "string" ? b.toUpperCase() : b;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    if (isAsc) return comparison;
    else return comparison * -1;
  }

  const rows = tableData.sort((a, b) => {
    return compare(a[orderBy], b[orderBy], order === "asc");
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ITableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
            />
            {
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow tabIndex={-1} key={row.id}>
                        {Object.values(row)
                          .slice(1)
                          .map((value, index) => {
                            return (
                              <EnhancedTableCell
                                key={index}
                                align={headCells[index + 1].align}
                              >
                                {value}
                              </EnhancedTableCell>
                            );
                          })}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
