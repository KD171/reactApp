import React, {useState, useEffect, Component, Link } from 'react';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControlUnstyledContext } from '@mui/material';
import {mapStatus} from '../../main/functions'



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'dayOfWeek',
    headerName: 'Day Of Week',
    width: 140,
  },
  {
    field: 'timeStart',
    headerName: 'From:',
    type: 'datetime',
    width: 160,
  },
  {
    field: 'timeEnd',
    headerName: 'To:',
    width: 160,
  },
  {
    field: "",
    renderCell: (cellValues) => {
        const handleClickShow = () => {
          // api aby usunąć access
          //window.open("/device/" + cellValues.id, "_self");
        };
      return (
        <IconButton
          variant="contained"
          color="primary"
          onClick={handleClickShow}
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  },
];

export default function DeviceDetailsBox() {
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
    const [action, setAction] = useState();
    const [urlApiButton, setUrlApiButton] = useState();
    const [isReachable, setIsReachable] = useState();
    const [device, setDevice] = useState();

    useEffect(() => {
        getDeviceAccessFromApi();
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


    const getDeviceAccessFromApi = () => {
        API
          .get('/device/getDevice/' + id)
          .then((response) => response.data)
          .then((data) => {
            console.info(data);
            if (data.status == 4) {
            setAction('Unblock');
            setStatus('success');
            setUrlApiButton('/device/unlockDevice/' + id);
            } else {
            setAction('Block');
            setStatus('error');
            setUrlApiButton('/device/blockDevice/' + id);
            }
            data.status = mapStatus(data.status);
            setRows(data);
          });
    };

    if(!rows)
    return <React.Fragment>
            <Box sx={{ display: 'center' , 'justify-content': 'center'}}>
              <CircularProgress />
            </Box>
           </React.Fragment>

    const handleClickShow = () => {
      window.open("/device/edit/" + id, "_self");
    };

    const handleClickBlockButton = () => {
        API.post(urlApiButton).then(response => {
          console.log(open)
            if (response.status === 200) {
                setOpen(true)
            }
        }).catch(error => console.error(error))
    };




  return (
    <React.Fragment>
          { open && <AlertDialogSlide/>}
          <div style={{ height: '250px', width: '620px', margin: '25px 25px 25px 25px' }}>

            <Typography component="h1" variant="body1" align="left">
            <table>
              <tr>
                <td>Id:</td>
                <td>{rows.deviceId}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{rows.deviceName}</td>
              </tr>
              <tr>
                <td>Address IP:</td>
                <td>{rows.addressIp}</td>
              </tr>
              <tr>
                <td>Physical address:</td>
                <td>{rows.physicalAddress}</td>
              </tr>
              <tr>
                <td>Lab ID:</td>
                <td><Button
                  variant='inherit'
                  onClick={() => {
                    window.open('/laboratory/' + rows.laboratoryId, '_self');
                  }}>{rows.laboratoryId}</Button></td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{rows.description}</td>
              </tr>
              <tr>
                <td>Created date:</td>
                <td>{new Date(rows.createdDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{rows.status}</td>
              </tr>
              <tr>
                <td>Is reachable:</td>
                <td>{rows.isReachable.toString()}</td>
              </tr>
            </table>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickShow}
              style={{margin: '5px 5px 5px 5px' }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color={status}
              onClick={handleClickBlockButton}
              style={{margin: '5px 5px 5px 5px' }}
            >
              {action}
            </Button>
          </div>
    </React.Fragment>
  );
}

