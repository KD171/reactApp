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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import API from '../../main/api'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'
import { FormControlUnstyledContext } from '@mui/material';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'deviceName',
    headerName: 'Name',
    width: 140,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 160,
  },
  {
    field: 'isReachable',
    headerName: 'Online',
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

export default function LaboratoryDeviceList() {
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
        getLaboratoryDevicesFromApi();
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


    const getLaboratoryDevicesFromApi = () => {
        API
          .get('/laboratory/' + id + '/getDevices/')
          .then((response) => response.data)
          .then((data) => {
            data.map((exam) => {
                exam['id'] = exam.deviceId
                console.info(exam)
            })
            setRows(data);
          });


    };




  return (
    <React.Fragment>
          <div style={{ display: 'inline-block', height: '350px', width: '670px', margin: '25px 25px 25px 25px' }}>
            <Typography component="h1" variant="h6" align="center" white-space='post-wrap'>
              Devices in Lab
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={4}
              rowsPerPageOptions={[20]}
              disableSelectionOnClick
            >
            </DataGrid>
          </div>
    </React.Fragment>
  );
}

