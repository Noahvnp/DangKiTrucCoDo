import axios from "axios";
import React, { useMemo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { format } from "date-fns";
import "./registeredTable.css";

import RegisterUser from "../RegisterUser/RegisterUser";

import { updateRegisterUser, deleteRegisterUser } from "../../redux/apiRequest";
import COLUMNS from "./columns";

const RegisteredTable = ({ accessToken, jwt, user }) => {
  // const [data, setData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const { data: response } = await axios.get("/v1/register/list");
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    setIsLoading(false);
    setIsRefetching(false);
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    // if (!Object.keys(validationErrors).length) {
    data[row.index] = values;
    //send/receive api updates here, then refetch or update local table data for re-render

    updateRegisterUser(
      accessToken,
      values,
      dispatch,
      values._id,
      navigate,
      jwt
    );
    console.log(values);
    setData([...data]);
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
    console.log(row.original);
    //send api delete request here, then refetch or update local table data for re-render
    deleteRegisterUser(accessToken, dispatch, row.original._id, jwt);
    window.location.reload(false);
  };

  return (
    <>
      {user ? (
        user.admin ? (
          <>
            <RegisterUser
              accessToken={user?.accessToken}
              jwt={jwt}
              id={user?._id}
            />
            <MaterialReactTable
              columns={columns}
              data={data}
              enableStickyHeader
              enableGrouping
              enableGlobalFilterModes
              initialState={{
                isLoading,
                showGlobalFilter: true,
                columnVisibility: { _id: false },
                pagination: { pageSize: 100 },
                showProgressBars: isRefetching,
                density: "compact",
                expanded: true,
                grouping: ["week", "register_date"],
                sorting: [
                  { id: "week", desc: false },
                  { id: "register_date", desc: false },
                  { id: "shift", desc: true },
                ],
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
            />
          </>
        ) : (
          <>
            <RegisterUser
              accessToken={user?.accessToken}
              jwt={jwt}
              id={user?._id}
            />
            <MaterialReactTable
              columns={columns}
              data={data}
              enableStickyHeader
              enableGrouping
              initialState={{
                isLoading,
                showGlobalFilter: true,
                columnVisibility: { _id: false },
                pagination: { pageSize: 100 },
                showProgressBars: isRefetching,
                density: "compact",
                expanded: true,
                grouping: ["week", "register_date"],
                sorting: [
                  { id: "week", desc: false },
                  { id: "register_date", desc: false },
                  { id: "shift", desc: true },
                ],
              }}
              positionGlobalFilter="left"
              muiSearchTextFieldProps={{
                placeholder: `Tìm kiếm...`,
                sx: { minWidth: "300px" },
                variant: "outlined",
              }}
            />
          </>
        )
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableStickyHeader
          enableGrouping
          initialState={{
            isLoading,
            showGlobalFilter: true,
            columnVisibility: { _id: false },
            pagination: { pageSize: 100 },
            showProgressBars: isRefetching,
            density: "compact",
            expanded: true,
            grouping: ["week", "register_date"],
            sorting: [
              { id: "week", desc: false },
              { id: "register_date", desc: false },
              { id: "shift", desc: true },
            ],
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
