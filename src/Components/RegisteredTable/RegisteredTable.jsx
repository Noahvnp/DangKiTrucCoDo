import axios from "axios";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MaterialReactTable from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import CreateNewAccountModal from "./CreateNewAccountModal";
import {
  getAllRegisteredUser,
  deleteRegisterUser,
} from "../../redux/apiRequest";
import COLUMNS from "./columns";

const RegisteredTable = ({ accessToken, jwt, user }) => {
  const [data, setData] = useState([]);
  // const [createModalOpen, setCreateModalOpen] = useState(false);
  // const handleCreateNewRow = (values) => {
  //   tableData.push(values);
  //   setTableData([...tableData]);
  // };

  // const admin = useSelector((state) => state.auth.login?.currentUser?.admin);
  // const user = useSelector((state) => state.auth.login?.currentUser);
  const registeredTable = useSelector(
    (state) => state.registeredUser?.registeredList.allRegisteredList
  );
  const dispatch = useDispatch();
  let axiosJWT = axios.create();

  useEffect(() => {
    (async () => {
      getAllRegisteredUser(dispatch, axiosJWT);
      setData(registeredTable);
      // setTableData(registeredTable);
    })();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  // const handleSaveCell = (cell, value) => {
  //   //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
  //   tableData[cell.row.index][cell.column.id] = value;
  //   //send/receive api updates here
  //   setTableData([...tableData]); //re-render with new data
  // };

  const handleDeleteRow = (row) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      !confirm(
        `Bạn có chắc muốn xóa sinh viên đăng kí: ${row.getValue(
          "name"
        )}, Ngày trực: ${row.getValue(
          "register_date"
        )}, Ca trực: ${row.getValue("shift")}`
      )
    ) {
      return;
    }
    //send api delete request here, then refetch or update local table data for re-render
    deleteRegisterUser(accessToken, dispatch, user._id, axiosJWT);
  };

  return (
    <>
      {user ? (
        user.admin ? (
          <MaterialReactTable
            columns={columns}
            data={data}
            // state={{ isLoading: true }}
            editingMode="row"
            enableEditing
            muiTableBodyCellEditTextFieldProps={({ cell }) => ({
              //onBlur is more efficient, but could use onChange instead
              onBlur: (event) => {
                // handleSaveCell(cell, event.target.value);
              },
            })}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "0.2rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
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
        ) : (
          <MaterialReactTable columns={columns} data={data} />
        )
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          renderBottomToolbarCustomActions={() => (
            <Typography sx={{ fontStyle: "bold", p: "0 1rem" }}>
              <Link to="/login" style={{ color: "red" }}>
                Đăng nhập để đăng kí trực cờ đỏ
              </Link>
            </Typography>
          )}
        />
      )}
      {/* renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setCreateModalOpen(true)}
          >
            Create New Account
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      /> */}
    </>
  );
};

export default RegisteredTable;
