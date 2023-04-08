// import{App,GlobalGeoJsonContext} from "./App";

import React from "react";
import ReactDOM from "react-dom";

import './index.css';
import FakeStackOverflow from './fakestackoverflow';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ShowUser from './showuser';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FakeStackOverflow/>}>
        <Route path='/showuser' element={<ShowUser/>}/>
        <Route path={'/register'} element={<RegisterPage/>}/>
        <Route index element={<LoginPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
