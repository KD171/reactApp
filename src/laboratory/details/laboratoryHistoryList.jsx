import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import API from '../../main/api'
import { FormControlUnstyledContext } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'details',
    headerName: 'Event Type',
    width: 140,
  },
  {
    field: 'date',
    headerName: 'Date:',
    type: 'date',
    width: 160,
  },
  {
    field: 'addField01',
    headerName: 'Extra 01',
    width: 160,
  },
  {
    field: 'addField02',
    headerName: 'Extra 02',
    width: 160,
  },
  {
    field: 'addField03',
    headerName: 'Extra 03:',
    width: 160,
  },
];

export default function LaboratoryHistoryList() {
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
        getLaboratoryLogsFromApi();
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


    const getLaboratoryLogsFromApi = () => {
        API
          .get('/laboratory/getLogs/' + id)
          .then((response) => response.data)
          .then((data) => {
            data.map((exam) => {
            console.info(exam.data)
                exam['id'] = exam[0]
                exam['details'] = exam[1]
                exam['date'] = new Intl.DateTimeFormat('pl-PL',
                { year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(exam[2])
                exam['addField01'] = exam[3]
                exam['addField02'] = exam[4]
                exam['addField03'] = exam[5]
               // exam[]
            })
            setRows(data);
          });


    };

  return (
    <React.Fragment>
          <div style={{ display:'inline-block', height: '350px', width: '900px',  margin: '25px 25px 25px 25px'}}>
            <Typography component="h1" variant="h6" align="center" white-space='post-wrap'>
             Laboratory History
             <IconButton aria-label="delete" size="small">
               <DownloadIcon fontSize="inherit" onClick={handleDownload} />
             </IconButton>
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

