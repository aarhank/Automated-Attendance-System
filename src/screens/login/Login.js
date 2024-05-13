import React, { useEffect, useState } from 'react';
import './Login.css'
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom'
export default function Login() {
    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("");
    const [result1,setResult1] = useState();
    const [size, setSize] = useState(250);
    const [bgColor, setBgColor] = useState("ffffff");
    const [qrCode, setQrCode] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory();
  if(localStorage.getItem('credentials')){
    history.push('/dashboard')
    window.location.reload();
}
    const login = async () => {
        setLoading(true);
        const payload = JSON.stringify({
            "email":email,
            "password":password
          });
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
          };
          
          fetch("https://juit-attendance2-6640b71cefbe.herokuapp.com/user/authorize", requestOptions)
            .then(response => response.text())
            .then(async result => {
              
              var final = JSON.parse(result);
              localStorage.setItem("credentials",JSON.stringify(final));
              setLoading(false);
              history.push('/dashboard')
              
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            });
          
    }
    useEffect(() => {
        
        setQr();
        
    },[])
    useEffect(async () => {
        
        setQrCode
            (`http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`);
        
    }, [word, size, bgColor]);
    
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
      async function setQr () {
        let words = ["hello","byee","something","Are you even scanning this ?"];
        for(var i=0;i<words.length;i++){
            setWord(words[i]);
            await delay(5000);
        }
        setQr()

    }
    const createLecture = async () => {
        
    
      }
  
 
    return (
      loading ? 
      (
          <div>
            <h1>Loading</h1>
          </div>
      )
      :
      (
      <div className='login-main'>
          <div className='login-main-container'>
              <div className='login-image-container'>
                  <div className='text-box'>
                      <p className='big'>Automated</p>
                      <p className="big">Attendance</p>
                      <p className="big">System.</p>
                  </div>
                  <div className="qrs">
                      {/* <img src={qr} alt="loading..." style={{height:'300px',width:'300px'}} /> */}
                      {/* <p style={{fontSize:'3vw',fontWeight:'bold'}}>"---{'>'}"</p> */}
                      <img id="QRimg" src={qrCode} alt="" />
  
                  </div>
                  {/* <p >Attendance simply through a scan of an QR !</p> */}
              </div>
              <div className="login-box">
              <h3>Login Through Webkiosk</h3>
                  <div className='login-inputs'>
                  
                  <TextField onChange={(e)=> setEmail(e.target.value)}  size="large" className="login-input"  label="Email"/>
                  <TextField onChange={(e)=> setPassword(e.target.value)} size="large" className="login-input" label="Password" type="password" />
                  </div>
                  <div className="login-button" onClick={() => login()}>
                      <p className='title'>Login</p>
                  </div>
              </div>
          </div>
      </div>
      )
    )
  
 
}
