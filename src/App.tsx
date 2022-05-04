import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { MainPage } from './pages/MainPage';
import { addTables } from './Redux/tableSlice';

function App() {
  const dispatch = useDispatch()
  const searchString = new URLSearchParams(window.location.search);
  let truePage:any = searchString.get('page');
  if(truePage==null){
    truePage = 1
  }
  const [active, setActive] = useState(truePage)
  useEffect(() => {
    
    axios.get('https://jsonplaceholder.typicode.com/posts').then((data:any)=>{            
        dispatch(addTables(data={'data':data.data, 'truePage':Number(truePage)}))
    } )
}, [])
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<div className='main_div_home'><Header active={active} setActive={setActive}/><MainPage active={active} setActive={setActive}/></div>} />
      </Routes>
    </div>
  );
}

export default App;
