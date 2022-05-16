import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from '../components/Header/Header';
import Map from '../components/Map/Map';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import LandingPage from '../components/LandingPage/LandingPage';

function PageRouter() {
  return (
    <>
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/dashboard' element={<Map/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default PageRouter;