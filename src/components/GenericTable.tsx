import { Fragment, useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  HeaderGroup,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnFilter,
  ColumnDef,
} from "@tanstack/react-table";

// Material UI
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Button,
} from "@mui/material";

// Third-party components
import {
  CSVExport,
  ScrollX,
  MainCard,
  TablePagination,
  DebouncedInput,
  EmptyTable,
} from "./react-table";
import "src/assets/third-party/react-table.css";
// Types
// import { Products } from "src/types/e-commerce";
import { LabelKeyObject } from "react-csv/lib/core";
import {
  DownOutlined,
  PlusOutlined,
  RightOutlined,
  StopOutlined,
} from "@ant-design/icons";
import IconButton from "src/components/@extended/IconButton";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { KeyedObject } from "src/types/root";
import { v4 as uuidv4 } from "uuid";
import { Products } from "src/types/e-commerce";
interface GenericTableProps<T> {
  columns: ColumnDef<T>[];
  isSearchable?: boolean;
  expandable?: boolean;
  columnResizing?: boolean;
  emptyTableMessage?: string;
  topPagination?: boolean;
  bottomPagination?: boolean;
  loading?: boolean;
  title?: string;
  button?: boolean;
  buttonName?: string;
  onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
  actions?: boolean;
  urlTable?: string;
  datas?: T[];
  isDownloaded?: boolean;
  isBackButton?: boolean;
  onClickBackButton?: React.MouseEventHandler<HTMLButtonElement>;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
  onFunction?: (data: T[]) => Promise<Products[]>; 
  sticky?: boolean;
  maxHeight?: number | string;
}

const GenericTable = <T extends KeyedObject>({
  datas,
  columns,
  isSearchable = false,
  expandable = false,
  // columnResizing = false,
  emptyTableMessage = "No Data",
  topPagination = false,
  bottomPagination = false,
  title,
  button = false,
  buttonName = "",
  onClickAdd,
  actions = false,
  urlTable = "",
  onEdit,
  onDelete,
  onFunction,
  isDownloaded = false,
  isBackButton = false,
  onClickBackButton,
  sticky = false,
  maxHeight = "100%",
}: GenericTableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [hasId, setHasId] = useState<boolean>(true);
  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (onFunction) {
          // Si se define `onFunction`, úsalo para obtener los datos
          const fetchedData = await onFunction([]);
          processData(fetchedData);
        } else if (!datas && urlTable) {
          const response = await fetch(urlTable);
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          const fetchedData = await response.json();
          processData(fetchedData);
        } else if (datas) {
          processData(datas);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [datas, urlTable, onFunction]);

  const processData = (dataToProcess: any[]) => {
    // Verificar si alguno de los objetos tiene la propiedad 'id'
    const hasIdInData = dataToProcess.some((item) => item.hasOwnProperty("id"));

    if (!hasIdInData) {
      console.log("No tiene id, creando una...");
      setHasId(false);
      const dataWithIds = dataToProcess.map((item) => ({
        id: item.id || uuidv4(),
        ...item,
      }));
      setData(dataWithIds);
    } else {
      console.log("El JSON tiene la columna id");
      setHasId(true);
      setData(dataToProcess);
    }
  };

  const Addcolumns = useMemo(() => {
    const baseColumns: ColumnDef<T, any>[] = [];

    if (expandable) {
      baseColumns.push({
        id: "expander",
        header: () => null,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? (
            <IconButton
              color={row.getIsExpanded() ? "primary" : "secondary"}
              onClick={row.getToggleExpandedHandler()}
              size="small"
            >
              {row.getIsExpanded() ? <DownOutlined /> : <RightOutlined />}
            </IconButton>
          ) : (
            <IconButton color="secondary" size="small" disabled>
              <StopOutlined />
            </IconButton>
          ),
      });
    }
    if (!hasId) {
      baseColumns.push({
        id: "tempId",
        header: "Index",
        cell: ({ row }: { row: any }) => row.original.id,
        enableColumnFilter: false,
        enableSorting: false,
        enableResizing: false,
      });
    }
    const dynamicColumns = columns.filter(
      (col) =>
        col.id !== "expander" && col.id !== "actions" && col.id !== "tempId"
    );

    const finalColumns = [...baseColumns, ...dynamicColumns];
    return finalColumns;
  }, [expandable, actions, columns, hasId]);

  const expandedColumns = useMemo(() => [...Addcolumns], [Addcolumns]);

  const table = useReactTable({
    data,
    columns: expandedColumns,
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: expandable ? getExpandedRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    columnResizeMode: "onChange",
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getRowCanExpand: () => true,
  });

  // Establecemos la visibilidad de la columna tempId a false
  useEffect(() => {
    if (!hasId) {
      setColumnVisibility((prev) => ({
        ...prev,
        tempId: false,
      }));
    }
  }, [hasId]);

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map(
    (columns) =>
      //@ts-ignore
      columns.columnDef.accessorKey &&
      headers.push({
        label:
          typeof columns.columnDef.header === "string"
            ? columns.columnDef.header
            : "#",
        //@ts-ignore
        key: columns.columnDef.accessorKey,
      })
  );
  return (
    <MainCard
      showBackButton={true}
      title={title}
      content={false}
      secondary={
        isDownloaded ? (
          <CSVExport data={data} headers={headers} filename={`${title}.csv`} />
        ) : (
          false
        )
      }
      backButton={
        isBackButton ? (
          <IconButton color="primary" size="small" onClick={onClickBackButton}>
            {" "}
            <ArrowLeftIcon />
          </IconButton>
        ) : (
          false
        )
      }
      divider={true}
    >
      <Stack>
        {topPagination && (
          <Box sx={{ p: 2 }}>
            <TablePagination
              setPageSize={table.setPageSize}
              setPageIndex={table.setPageIndex}
              getState={table.getState}
              getPageCount={table.getPageCount}
            />
          </Box>
        )}

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 2 }}
        >
          {isSearchable && (
            <DebouncedInput
              value={globalFilter ?? ""}
              onFilterChange={(value) => setGlobalFilter(String(value))}
              placeholder={`Buscar en ${data.length} registros...`}
            />
          )}
          {button && (
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={onClickAdd}
              style={{ backgroundColor: "#31be0e" }}
            >
              {buttonName}
            </Button>
          )}
        </Stack>

        <ScrollX>
          <TableContainer component={Paper} sx={{ maxHeight: maxHeight }}>
            <Table>
              <TableHead className={sticky ? "sticky-header" : ""}>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          {...header.column.columnDef.meta}
                          style={{ textAlign: "center" }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableHead>

              <TableBody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <TableRow>
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            {...cell.column.columnDef.meta}
                            sx={{
                              textAlign: 'start',
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && expandable && (
                        <TableRow>
                          <TableCell>s</TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length}>
                      <EmptyTable msg={emptyTableMessage} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>

        {bottomPagination && (
          <Box sx={{ p: 2 }}>
            <TablePagination
              setPageSize={table.setPageSize}
              setPageIndex={table.setPageIndex}
              getState={table.getState}
              getPageCount={table.getPageCount}
            />
          </Box>
        )}
      </Stack>
    </MainCard>
  );
};

export default GenericTable;