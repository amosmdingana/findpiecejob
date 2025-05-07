import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './views/home/Catalog';
import JobDetail from './views/jobdetail/JobDetail';

const routing = (  <Router>
  <div>
    <Routes>
       <Route exact path="/piecejob" element={<Home />} />
       <Route exact path="/piecejob/detail" element={<JobDetail />} />
    </Routes>
    </div>
    </Router>
    );

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(routing);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
