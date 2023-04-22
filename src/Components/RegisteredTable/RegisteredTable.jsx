import axios from "axios";
import React, { useMemo, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip, Typography, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { format } from "date-fns";
import "./registeredTable.css";

import  UpdateRegisterUser  from "../UpdateRegisterUser/UpdateRegisterUser" 

import {
  updateRegisterUser,
  deleteRegisterUser,
  fetchData,
} from "../../redux/apiRequest";
import COLUMNS from "./columns";

const RegisteredTable = ({ accessToken, jwt, user }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/v1/register/list");
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  // const csvExporter = new ExportToCsv(csvOptions);

  // const handleExportRows = (rows) => {
  //   console.log(rows);
  //   // csvExporter.generateCsv(rows.map((row) => row.original));
  // };

  // const handleExportData = () => {
  //   csvExporter.generateCsv(data);
  // };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    // if (!Object.keys(validationErrors).length) {
    data[row.index] = values;
    //send/receive api updates here, then refetch or update local table data for re-render
    // setTableData([...tableData]);
    console.log(data[row.index]);
    console.log(row);
    console.log(values);

    // updateRegisterUser(accessToken, values, dispatch, values._id, navigate, jwt);
    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleDeleteRow = (row) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      !confirm(
        `Bạn có chắc muốn xóa sinh viên đăng kí: ${row.getValue(
          "name"
        )}, Ngày trực: ${
          format(new Date(row.getValue("register_date")), "EEEE") +
          " " +
          format(new Date(row.getValue("register_date")), "dd/MM/yyyy")
        }, Ca trực: ${row.getValue("shift")}`
      )
    ) {
      return;
    }
    //send api delete request here, then refetch or update local table data for re-render
    deleteRegisterUser(accessToken, dispatch, user._id, jwt);
  };

  return (
    <>
      {user ? (
        user.admin ? (
          <MaterialReactTable
            columns={columns}
            data={data}
            enableStickyHeader
            enableGrouping
            enableGlobalFilterModes
            initialState={{
              showGlobalFilter: true,
              columnVisibility: { _id: false },
              density: "compact",
              expanded: true,
              grouping: ["week"],
            }}
            positionGlobalFilter="left"
            muiSearchTextFieldProps={{
              placeholder: `Tìm kiếm...`,
              sx: { minWidth: "300px", padding: "8px" },
              variant: "standard",
            }}
            editingMode="modal"
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            muiTableBodyCellEditTextFieldProps={({ cell }) => ({
              //onBlur is more efficient, but could use onChange instead
              onBlur: (event) => {
                // handleSaveCell(cell, event.target.value);
              },
            })}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "0.2rem" }}>
                <Tooltip arrow placement="left" title="Chỉnh sửa">
                  <IconButton
                    sx={{ maxWidth: "20px" }}
                    onClick={() => table.setEditingRow(row)}
                  >
                    <Edit />
                  </IconButton>
                  {/* <UpdateRegisterUser data={row} /> */}
                </Tooltip>
                <Tooltip arrow placement="right" title="Xóa">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            // renderBottomToolbarCustomActions={({ table, row, values }) => (
            //   <Box
            //     sx={{
            //       display: "flex",
            //       gap: "1rem",
            //       p: "0.5rem",
            //       flexWrap: "wrap",
            //     }}
            //   >
            //     <Button
            //       color="primary"
            //       //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            //       onClick={handleExportData}
            //       startIcon={<FileDownloadIcon />}
            //       variant="contained"
            //     >
            //       Export All Data
            //     </Button>
            //     <Button
            //       disabled={table.getPrePaginationRowModel().rows.length === 0}
            //       //export all rows, including from the next page, (still respects filtering and sorting)
            //       onClick={() =>
            //         // handleExportRows(table.getPrePaginationRowModel().rows)
            //         console.log(table.getState())
            //       }
            //       startIcon={<FileDownloadIcon />}
            //       variant="contained"
            //     >
            //       Export All Rows
            //     </Button>
            //   </Box>
            // )}
          />
        ) : (
          <MaterialReactTable
            columns={columns}
            data={data}
            initialState={{
              showGlobalFilter: true,
              columnVisibility: { _id: false },
            }}
            positionGlobalFilter="left"
            muiSearchTextFieldProps={{
              placeholder: `Tìm kiếm...`,
              sx: { minWidth: "300px" },
              variant: "outlined",
            }}
          />
        )
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            showGlobalFilter: true,
            columnVisibility: { _id: false },
          }}
          positionGlobalFilter="left"
          muiSearchTextFieldProps={{
            placeholder: `Tìm kiếm...`,
            sx: { minWidth: "300px" },
            variant: "outlined",
          }}
          renderBottomToolbarCustomActions={() => (
            <Typography sx={{ fontStyle: "bold", p: "0 1rem" }}>
              <Link to="/login" style={{ color: "red" }}>
                Đăng nhập để đăng kí trực cờ đỏ
              </Link>
            </Typography>
          )}
        />
      )}
    </>
  );
};

export default RegisteredTable;
