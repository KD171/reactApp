import React, {useState, useEffect, Component } from 'react';
import { useParams } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'
import { FormControlUnstyledContext } from '@mui/material';
import {mapStatus} from '../../main/functions'



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'deviceName',
    headerName: 'Name',
    width: 180,
  },
  {
    field: 'addressIp',
    headerName: 'Address Ip',
    width: 140,
  },
  {
    field: 'physicalAddress',
    headerName: 'Physical Address',
    sortable: false,
    width: 160,
  },
  {
    field: 'laboratoryId',
    headerName: 'Lab ID',
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
    field: 'isReachable',
    headerName: 'Online',
    sortable: false,
    width: 160,
    type: 'boolean',
  },
  {
    field: "Show",
    renderCell: (cellValues) => {
        const handleClickShow = () => {
          window.open("/device/" + cellValues.id, "_self");
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

export default function DeviceComponent() {
    const [open, setOpen] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [deviceName, setDeviceName] = useState();
    const [addressIp, setAddressIp] = useState();
    const [physicalAddress, setPhysicalAddress] = useState();
    const [rows, setRows] = useState();
    const [laboratoryId, setLaboratoryId] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [status, setStatus] = useState();
    const [isReachable, setIsReachable] = useState();
    const [device, setDevice] = useState();

    useEffect(() => {
        getDeviceFromApi();
    }, []);

    const { id } = useParams();

    const handleChangeLaboratory = (event) => {
        setLaboratoryId(event.target.value);
    };

    const handleChangeDeviceName = (event) => {
      setDeviceName(event.target.value);
    };

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };

    const handleChangeLaboratoryId = (event) => {
      setLaboratoryId(event.target.value);
    };

    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };

    const getDeviceFromApi = () => {
    console.info(id)
        API
          .get('/device/getAll/')
          .then((response) => response.data)
          .then((data) => {
            data.map((exam) => {
                exam['id'] = exam.deviceId;
                exam['status'] = mapStatus(exam['status']);
                exam['createdDate'] = new Date(exam.createdDate).toLocaleDateString()
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

