import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import CreateNewLaboratory from './laboratory/create/createLaboratory'
import EditDevice from './device/edit/editDevice'
import DeviceList from './device/deviceList/deviceList'
import NewAccess from './device/details/newAccessRole'
import DeviceAccessList from './device/details/deviceAccessList'
import DeviceDetail from './device/details/deviceDetails'
import LaboratoryList from './laboratory/list/laboratoryList'
import BuildingList from './building/list/buildingList'
import LaboratoryDetail from './laboratory/details/laboratoryDetails'
import CreateNewBuilding from './building/create/createBuilding'
import BuildingDetail from './building/details/buildingDetails'
import EditBuilding from './building/edit/editBuilding'
import EditLaboratory from './laboratory/edit/editLaboratory'
import Reservation from './reservation/reservation'

function App() {
  return(
    <div>
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Reservation/>}/>
      <Route exact path="/device" element={<DeviceList/>}/>
      <Route exact path="/device/:id" element={<DeviceDetail/>}/>
      <Route exact path="/device/newRole/:id" element={<NewAccess/>}/>
      <Route exact path="/device/edit/:id" element={<EditDevice/>}/>
      <Route exact path="/laboratories" element={<LaboratoryList/>}/>
      <Route exact path="/laboratory/:id" element={<LaboratoryDetail/>}/>
      <Route exact path="/laboratory/edit/:id" element={<EditLaboratory/>}/>
      <Route exact path="/laboratory/create/" element={<CreateNewLaboratory/>}/>
      <Route exact path="/buildings" element={<BuildingList/>}/>
      <Route exact path="/building/:id" element={<BuildingDetail/>}/>
      <Route exact path="/building/edit/:id" element={<EditBuilding/>}/>
      <Route exact path="/building/create/" element={<CreateNewBuilding/>}/>
      <Route exact path="/building/create/" element={<CreateNewBuilding/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

