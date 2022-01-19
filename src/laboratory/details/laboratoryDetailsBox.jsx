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

export default function LaboratoryDetailsBox() {
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
        getLaboratoryFromApi();
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

    const handleDownload = () => {
      window.open("http://localhost:8080/laboratory/getLogs/" + id + ".csv");
    };


    const getLaboratoryFromApi = () => {
        API
          .get('/laboratory/' + id)
          .then((response) => response.data)
          .then((data) => {
            console.info(data);
            data['createdDate'] = new Intl.DateTimeFormat('pl-PL',
            { year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(data['createdDate'])
            if (data.status == 4) {
            setAction('Unblock');
            setStatus('success');
            setUrlApiButton('/laboratory/unblockLaboratory/' + id);
            } else {
            setAction('Block');
            setStatus('error');
            setUrlApiButton('/laboratory/blockLaboratory/' + id);
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
      window.open("/laboratory/edit/" + id, "_self");
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
          <div style={{ height: '250px', width: '1620px', margin: '25px 25px 25px 25px' }}>

            <Typography component="h1" variant="body1" align="left">
            <table>
              <tr>
                <td>Id:</td>
                <td>{rows.laboratoryId}</td>
              </tr>
              <tr>
                <td>Building Id:</td>
                <td><Button
                  variant='inherit'
                  onClick={() => {
                    window.open('/building/' + rows.buildingId, '_self');
                  }}>{rows.buildingId}</Button></td>
              </tr>
              <tr>
                <td>Floor:</td>
                <td>{rows.floor}</td>
              </tr>
              <tr>
                <td>Room number:</td>
                <td>{rows.roomNumber}</td>
              </tr>
              <tr>
                <td>Number of stations:</td>
                <td>{rows.numberOfLaboratoryStation}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{rows.description}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{rows.status}</td>
              </tr>
              <tr>
                <td>Created Date:</td>
                <td>{rows.createdDate}</td>
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

