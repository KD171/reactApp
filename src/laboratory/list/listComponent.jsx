import React, {useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {mapStatus} from '../../main/functions'



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'buildingId',
    headerName: 'Building Id',
    width: 100,
  },
  {
    field: 'floor',
    headerName: 'Floor',
    width: 60,
  },
  {
    field: 'roomNumber',
    headerName: 'Room Number',
    sortable: false,
    width: 160,
  },
  {
    field: 'numberOfLaboratoryStation',
    headerName: 'Labs',
    sortable: false,
    width: 160,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'createdDate',
    headerName: 'Create date',
    width: 110,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    width: 160,
  },
  {
    field: "Show",
    renderCell: (cellValues) => {
        const handleClickShow = () => {
          window.open("/laboratory/" + cellValues.id, "_self");
        };
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickShow}
        >
          Show
        </Button>
      );
    }
  },
];

export default function LaboratoryComponent() {
    const [rows, setRows] = useState();

    useEffect(() => {
        getLaboratoryFromApi();
    }, []);


    const getLaboratoryFromApi = () => {
        API
          .get('/laboratory/getAll/')
          .then((response) => response.data)
          .then((data) => {
            data.map((exam) => {
                exam['id'] = exam.laboratoryId;
                exam['createdDate'] = new Intl.DateTimeFormat('pl-PL',
                { year: 'numeric', month: '2-digit', day: '2-digit'}).format(exam['createdDate'])
                exam['status'] = mapStatus(exam['status']);
            })
            setRows(data);
          });
    };

  if(!rows)
  return <React.Fragment>
          <Box sx={{ display: 'center' , 'justify-content': 'center'}}>
            <CircularProgress />
          </Box>
         </React.Fragment>


  return (
    <React.Fragment>
          <div style={{ height: 640, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[20]}
              disableSelectionOnClick
            >
            </DataGrid>
          </div>
    </React.Fragment>
  );
}

