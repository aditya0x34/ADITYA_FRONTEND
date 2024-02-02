import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SideNavbar } from './components/NavBar/SideNavbar';
import { AddTask } from './pages/AddTask/AddTask';
import { TaskDetails } from './pages/TaskDetails/TaskDetails';
import { TaskList } from './pages/TaskList/TaskList';
import { UpdateTask } from './pages/UpdateTask/UpdateTask';
import { HashRouter as Router,  } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SideNavbar/>}>
          <Route index element={<TaskList/>} />
          <Route path='AddTask' element={<AddTask/>} />
          <Route path='update/:taskId' element={<UpdateTask/>} />
          <Route path=':taskId' element={<TaskDetails/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
