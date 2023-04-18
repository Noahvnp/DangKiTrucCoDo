import { format } from "date-fns";

const COLUMNS = [
  {
    header: "Tuần",
    accessorKey: "week",
    size: 10,
  },

  {
    header: "Thứ",
    accessorKey: "register_date",
    size: 120,
    Cell: ({ cell }) => format(new Date(cell.getValue()), 'EEEE') + " " + format(new Date(cell.getValue()), 'dd/MM/yyyy')
  },
  {
    header: "Ca",
    accessorKey: "shift",
    size: 20,
  },
  {
    header: "STT",
    accessorKey: "id_user_create",
    size: 20,
  },
  {
    header: "Họ Tên MSSV",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },

  {
    header: "Điểm danh",
    accessorKey: "attendance",
    size: 20,
    Cell: ({cell}) => {
      if(cell.getValue() === false) return 'Chưa điểm danh';
    }
  },
  {
    header: "BCH Phụ Trách",
    accessorKey: "organization_in_charge",
  },
];

export default COLUMNS;
