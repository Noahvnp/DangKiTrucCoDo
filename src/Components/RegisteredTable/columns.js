import { format, parse } from "date-fns";
import Select from "react-select";

import { Box, MenuItem } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
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
    GroupedCell: ({ cell, row }) => (
      <Box sx={{ color: "primary.main" }}>
        <strong>{`Tuần ${cell.getValue()}`} </strong>
      </Box>
    ),
  },
  {
    header: "Thứ",
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
          <div class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-l4u8b9-MuiInputBase-root-MuiInput-root">
            <input
              aria-invalid="false"
              name="register_date"
              placeholder="Ngày trực"
              type="date"
              class="MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input"
              defaultValue={format(new Date(cell.getValue()), "yyyy-MM-dd")}
              onChange={(e) => {
                console.log(e.target.value);
                return e.target.value;
              }}
              id="mui-100"
            ></input>
          </div>
        </div>
      </>
    ),

    // Edit: ({ props }) => { return (
    //   <LocalizationProvider dateAdapter={AdapterDateFns}>
    //     <DatePicker
    //       format="MM/dd/yyyy"
    //       // value={format(new Date(props.getValue()), "yyyy-MM-dd") || null}
    //       onChange= {(e, {props}) => console.log(e)}
    //       clearable
    //       InputProps={{
    //         style: {
    //           fontSize: 13,
    //         },
    //       }}
    //     />
    //   </LocalizationProvider>
    // )}, 
  },
  {
    header: "Ca",
    accessorKey: "shift",
    size: 10,
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
