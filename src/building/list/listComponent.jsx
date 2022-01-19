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
import { FormControlUnstyledContext } from '@mui/material';




const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'buildingName',
    headerName: 'Name',
    width: 350,
  },
  {
    field: 'shortName',
    headerName: 'Short Name',
    width: 140,
  },
  {
    field: 'city',
    headerName: 'City',
    sortable: false,
    width: 160,
  },
  {
    field: 'street',
    headerName: 'Street',
    sortable: false,
    width: 160,
  },
  {
    field: 'number',
    headerName: 'Number',
    width: 150,
  },
  {
    field: 'postCode',
    headerName: 'Post Code',
    width: 110,
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    width: 160,
  },
  {
    field: "Show",
    renderCell: (cellValues) => {
        const handleClickShow = () => {
          window.open("/building/" + cellValues.id, "_self");
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

export default function BuildingComponent() {
    const [open, setOpen] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [deviceName, setDeviceName] = useState();
    const [addressIp, setAddressIp] = useState();
    const [physicalAddress, setPhysicalAddress] = useState();
    const [rows, setRows] = useState();
    const [buildingId, setBuildingId] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [status, setStatus] = useState();
    const [isReachable, setIsReachable] = useState();
    const [device, setDevice] = useState();

    useEffect(() => {
        getBuildingFromApi();
    }, []);

    const { id } = useParams();

    const handleChangeBuilding = (event) => {
        setBuildingId(event.target.value);
    };

    const handleChangeDeviceName = (event) => {
      setDeviceName(event.target.value);
    };

    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };

    const handleChangeBuildingId = (event) => {
      setBuildingId(event.target.value);
    };

    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };

    const getBuildingFromApi = () => {
        API
          .get('/building/getAll/')
          .then((response) => response.data)
          .then((data) => {
            data.map((exam) => {
                exam['id'] = exam.buildingId
                exam['createdDate'] = new Intl.DateTimeFormat('pl-PL',
                { year: 'numeric', month: '2-digit', day: '2-digit'}).format(exam['createdDate'])
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

