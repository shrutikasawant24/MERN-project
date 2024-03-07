
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Componants/Login';
import Dashboard from './Componants/Dashboard';
import Sidebar from './Componants/Sidebar';
// import Users from './Componants/Users';
import Products from './Componants/Products';
import Sales from './Componants/Sales';
import Saledetails from './Componants/Saledetails';
import Envoice from './Componants/Envoice';
import Admin from './Componants/Admin';
import Userstate from './context/Userstate';

function App() {
  return (
    <>
    {/* <Login/> */}
    <Userstate>
    <Routes>

      
       <Route path ='/' element={<Login/>}/> 
      <Route path='/sidebar'element={<Sidebar/>}>    
        <Route path ='/sidebar' element={<Dashboard/>}/>
        {/* <Route path='/sidebar/users' element={<Users/>}/> */}
        <Route path='/sidebar/products' element={<Products/>}/>
        <Route path='/sidebar/sales' element={<Sales/>}/>
        <Route path='/sidebar/saledetails' element={<Saledetails/>}/>
        
      </Route>
      <Route path='/envoice/:id' element={<Envoice/>}/>
    </Routes>

    </Userstate>
    </>
  );
}

export default App;
