import React, { useEffect, useState } from 'react';
import './qr.css';


function QR() {
    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("");
    const [result1,setResult1] = useState();
    const [size, setSize] = useState(400);
    const [bgColor, setBgColor] = useState("ffffff");
    const [qrCode, setQrCode] = useState("");

    useEffect(() => {
        setQrCode
            (`http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`);
    }, [word, size, bgColor]);
    function handleClick() {
        setWord(temp);
    }
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    async function setQr() {
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": 1
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8086/lecture/generateTokens", requestOptions)
  .then(response => response.text())
  .then(async result => {
    
    var final = JSON.parse(result);
    console.log(final.tokens);
    for(var i=0;i<final?.tokens.length;i++){
        setWord(final?.tokens[i]);
        console.log(final?.tokens[i]);
        await delay(5000);
       
    }
  })
  .catch(error => console.log('error', error));


       
            
                
            
            // alert(`Your attendance has been succesfully uploaded!` + result);
    
          
    }

    return (
        <div className="QR">

            <center>
                <h1 id="heading">QR Code Generator</h1>
                <div className="input-box">
                    <div className="gen">
                        <button id="gen-button" className="button p-1"
                            onClick={() => setQr()}>
                            Take Attendace
                        </button>
                    </div>
                </div>
                <div id="output" className="output-box">
                    <img id="QRimg" src={qrCode} alt="" />
                </div>
                <div id="myDiv">
                    <label for="Roll_NO" id="roll">Roll No. : </label>
                    <input type="text" name="Roll Number"></input>
                    <label for="name" id="name">Name : </label>
                    <input id="name" type="text" name="name"></input>
                    <input type="submit" value="Submit" className="my-2"></input>
                </div>
            </center>
        </div>
    );
}

export default QR;