import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SideNavbar } from './components/NavBar/SideNavbar';
import { AddTask } from './pages/AddTask/AddTask';
import { TaskDetails } from './pages/TaskDetails/TaskDetails';
import { TaskList } from './pages/TaskList/TaskList';
import { UpdateTask } from './pages/UpdateTask/UpdateTask';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route element={<SideNavbar/>}>
          <Route path='/' element={<TaskList/> } />
          <Route path='/AddTask' element={<AddTask/> } />
          <Route path='/update/:taskId' element={<UpdateTask/> } />
            <Route path='/:taskId' element={<TaskDetails/> } />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
