import axios from "axios";
import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialReactTable from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import CreateNewAccountModal from "./CreateNewAccountModal";
import { getAllRegisteredUser } from "../../redux/apiRequest";
import COLUMNS from "./columns";

const RegisteredTable = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(() => data);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const admin = useSelector((state) => state.auth.login?.currentUser?.admin);
  const registeredTable = useSelector(
    (state) => state.registeredUser?.registeredList.allRegisteredList
  );
  const dispatch = useDispatch();
  let axiosJWT = axios.create();

  useEffect(() => {
    (async () => {
      getAllRegisteredUser(dispatch, axiosJWT);
      setData(registeredTable);
    })();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  return (
    <>
      {admin ? (
        <MaterialReactTable
          columns={columns}
          data={data}
          editingMode="modal"
          enableEditing
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "0.2rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      ) : (
        <MaterialReactTable columns={columns} data={data} />
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
