import React,{useState} from 'react'
import './Dashboard.css'
import Navbar from '../../container/navbar/Navbar'
import DashboardContainer from '../../container/dashboard/dashboardContainer'
import { useHistory } from 'react-router-dom'


    
export default function Dashboard() {
  // const history = useHistory();
  //   if(!localStorage.getItem('credentials')) {
  //       history.push("/")
  //   }      
  return (            
    <div className="dashboard">
      <div className="dashboard-container">
        <Navbar/>
        <div className="main-dashboard">
            <div className='row'>
              <DashboardContainer/>
            </div>
        </div>
      </div>
    </div>
  )
}
