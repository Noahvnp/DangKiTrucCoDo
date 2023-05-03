import { format } from "date-fns";

import { Box, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const shifts = [
  { value: "sáng", label: "Sáng" },
  { value: "chiều", label: "Chiều" },
];

const attendanceStat = [
  { value: true, label: "Đã điểm danh" },
  { value: false, label: "Chưa điểm danh" },
];

const COLUMNS = [
  {
    header: "ID",
    accessorKey: "_id",
    enableEditing: false,
    Edit: ({ cell }) => <></>,
  },
  {
    header: "Tuần",
    accessorKey: "week",
    size: 10,
    enableEditing: false,
    Edit: ({ cell }) => <></>,  
    GroupedCell: ({ cell, row }) => (
      <Box sx={{ color: "primary.main" }}>
        <strong>{`Tuần ${cell.getValue()}`} </strong>
      </Box>
    ),
  },
  {
    header: "Ngày",
    accessorKey: "register_date",
    size: 120,
    Cell: ({ cell }) =>
      format(new Date(cell.getValue()), "EEEE") + " " + cell.getValue(),
    Edit: ({ cell }) => (
      <>
        <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root">
          <label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-standard MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-standard css-1c2i806-MuiFormLabel-root-MuiInputLabel-root"
            data-shrink="true"
            for="mui-100"
            id="mui-100-label"
          >
            Ngày trực
          </label>
          <div class="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary css-l4u8b9-MuiInputBase-root-MuiInput-root">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                format="MM/dd/yyyy"
                value={new Date(cell.getValue())}
                onChange={(date) => {
                  const value = new Date(date).toLocaleDateString()
                  return value
                }}
                clearable
                InputProps={{
                  style: {
                    fontSize: 13,
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </>
    ),
  },
  {
    header: "Ca",
    accessorKey: "shift",
    size: 10,
    Cell: ({ cell }) => (
      <Box
        component="span"
        sx={(theme) => ({
          backgroundColor:
            cell.getValue() === "sáng"
              ? theme.palette.error.dark
              : theme.palette.success.dark,
          borderRadius: "0.25rem",
          color: "#fff",
          maxWidth: "9ch",
          p: "0.4rem",
        })}
      >
        {cell.getValue()}
      </Box>
    ),
    muiTableBodyCellEditTextFieldProps: {
      select: true, //change to select for a dropdown
      children: shifts.map((shift) => (
        <MenuItem key={shift} value={shift.value}>
          {shift.label}
        </MenuItem>
      )),
    },
  },
  {
    header: "Họ Tên",
    accessorKey: "name",
    size: 180,
  },
  {
    header: "MSSV",
    accessorKey: "mssv",
    size: 20,
  },
  {
    header: "Email",
    accessorKey: "email",
    size: 200,
  },
  {
    header: "Điểm danh",
    accessorKey: "attendance",
    size: 20,
    Cell: ({ cell }) => {
      if (cell.getValue() === false) return "Chưa điểm danh";
      else if (cell.getValue() === true) return "Đã điểm danh";
    },
    muiTableBodyCellEditTextFieldProps: {
      select: true, //change to select for a dropdown
      children: attendanceStat.map((attendance) => (
        <MenuItem key={attendance} value={attendance.value}>
          {attendance.label}
        </MenuItem>
      )),
    },
  },
  {
    header: "BCH Phụ Trách",
    accessorKey: "organization_in_charge",
  },
];

export default COLUMNS;
