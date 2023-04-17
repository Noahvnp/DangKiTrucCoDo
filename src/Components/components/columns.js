import { format } from 'date-fns';

const COLUMNS = [
    {
        Header: "Tuần",
        accessor: 'week'
    },
    {
        Header: 'Thời gian',
        columns: [
            {
                Header: 'Thứ',
                accessor: 'register_date',
                Cell: ({ value }) => {
                    return format(new Date(value), 'EEEE') + " " + format(new Date(value), 'dd/MM/yyyy')
                }
            },
            {
                Header: 'Ca',
                accessor: 'shift',
            }
        ],
    },
    {
        Header: 'Thông tin',
        columns: [
            {
                Header: 'STT',
                accessor: 'id_user_create',
            },
            {
                Header: 'Họ Tên MSSV',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
        ]
    },
    {
        Header: 'Điểm danh',
        accessor: 'attendance',
        Cell:  ({ value }) => {
            if(value === false) return 'Chưa điểm danh'
            else if (value === true) return 'Đã điểm danh'
        }
    },
    {
        Header: 'BCH Phụ Trách',
        accessor: 'organization_in_charge',
    },
];

export default COLUMNS;