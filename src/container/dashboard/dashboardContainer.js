import { borderRadius } from '@mui/system'
import React,{useEffect, useState} from 'react'
import "./index.css"
import DashboardCards from '../../components/dashboard/DashboardCards';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
  };
export default function DashboardContainer() {
    const [value, onChange] = useState(new Date());
    
    
    const [color,setColor] = useState("#69a5fe");
    const [color1,setColor1] = useState("#fffff");
    const [option,setOption] = useState("Subject");
    const [subName,setSubName] = useState();
    const [subCode,setSubCode] = useState();
    const [subSemester,setSubSemester] = useState();
    const [subType,setSubType] = useState();
    const [subStrength,setSubStrength] = useState();
    const [subTeacher,setSubTeacher] = useState();
    const [teacherEmail,setTeacherEmail] = useState();
    const [subjects,setSubjects] = useState();
    const [lectures,setLectures] = useState([]);
    const [subject,setSubject] = useState()
    const [lecture,setLecture] = useState()
    const [open,setOpen] = useState(false);
    const [temp, setTemp] = useState("");
    const [word, setWord] = useState("ma chudao attendance lagaoge");
    const [result1,setResult1] = useState();
    const [size, setSize] = useState(500);
    const [bgColor, setBgColor] = useState("ffffff");
    const [qrCode, setQrCode] = useState("");
    const [attendance,setAttendance] = useState([]);
    useEffect(() => {
        setQrCode
            (`http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`);
    }, [word, size, bgColor]);
    
 
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    useEffect(() => {
      if(option == "Subject"){
        fetchSubjects();
      }
  }, [option]);

  useEffect(() => {
    if(subjects == null ){
    fetchSubjects();
    setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`);
    }
  }, []);


async function setQr() {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"id": lecture
});
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("https://juit-attendance2-6640b71cefbe.herokuapp.com/lecture/generateTokens", requestOptions)
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

}
const refreshAttendance = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  fetch(`https://juit-attendance2-6640b71cefbe.herokuapp.com/attendance/lecture/${lecture}`, requestOptions)
    .then(response => response.text())
    .then(async result => {
      
      var final = JSON.parse(result);
      setAttendance(final)
      
    })
    .catch(error => console.log('error', error));
}
const fetchLectures = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  fetch(`https://juit-attendance2-6640b71cefbe.herokuapp.com/lecture/subject/${data}`, requestOptions)
    .then(response => response.text())
    .then(async result => {
      
      var final = JSON.parse(result);
      setLectures(final)
      
    })
    .catch(error => console.log('error', error));
  
}

    const fetchSubjects = async () => {
      var myHeaders = new Headers();
      const user = await JSON.parse(localStorage.getItem("credentials"))
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
           
      fetch(`https://juit-attendance2-6640b71cefbe.herokuapp.com/subject/teacher/${user.email}`, requestOptions)
        .then(response => response.text())
        .then(async result => {
          
          var final = JSON.parse(result);
          setSubjects(final);
          console.log("subjecssd ",final)
          
        })
        .catch(error => console.log('error', error));
    }
    const handleChange = async (event) => {
      console.log("selected Value",event.target.value);
      setSubject(event.target.value);
      await fetchLectures(event.target.value);
      
    };
    const createSubject = async () => {
      const user = await JSON.parse(localStorage.getItem("credentials"))
      const payload = JSON.stringify({
        "subName": subName,
        "subCode": subCode,
        "subSemester": subSemester,
        "subType":subType,
        'subStrength':subStrength,
        "subUser": user
        
      });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: payload,
      };
      
      fetch("https://juit-attendance2-6640b71cefbe.herokuapp.com/subject/create", requestOptions)
        .then(response => response.text())
        .then(async result => {
          
          var final = JSON.parse(result);
          console.log(final);
          setOpen(false);
          fetchSubjects();
        })
        .catch(error => console.log('error', error));
      

    }
    
   
    const change = (test) => {
        if(test == "Subject"){
            setColor("#69a5fe");
            setColor1("#ffff");
            setOption("Subject")
        }
        if(test == "Attendance"){
            setColor1("#69a5fe");
            setColor("#ffff");
            setOption("Attendance")
        }
       
    }




    const driverColumns = [
      {
        align: "center",
        flex: 0.4,
        headerAlign: "center",
        headerName: 'Student Name',
        field: 'studentName',
      },
      {
        align: "center",
        flex: 0.4,
        headerAlign: "center",
        headerName: 'Student RollNo',
        field: 'studentRollNo',
      },
      {
        align: "center",
        flex: 0.4,
        headerAlign: "center",
        headerName: 'Lecture Name',
        field: 'attendanceLec.lecTopic',
      },
      {
        align: "center",
        flex: 0.4,
        headerAlign: "center",
        headerName: 'Subject Name',
        field: 'subjectName',
      },
      {
        align: "center",
        flex: 0.4,
        headerAlign: "center",
        headerName: 'Subject Code',
        field: 'subjectCode',
      },
      {
        align: "center",
        flex: 0.4,
        headerAlign: "center",
        headerName: 'Status',
        field: 'status',
      },
      
    ];
  if(subjects && option == "Subject"){
  return (
    <div>
      <p style={{fontWeight:'bold',fontSize:'2.5vw'}}>Welcome User </p>
        <div className='dashboard-header'>
        <div className='dashboard-toggle'>
            <div onClick={() => change("Subject")} style={{width:"50%",height:'100%',backgroundColor:color,borderRadius:'1vw',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                <p style={{color:color == "#69a5fe" ? "white": "black",fontWeight:'bold',fontSize:"1.3vw"}}>Subjects</p>
            </div>
            <div onClick={() => change("Attendance")} style={{width:"50%",height:'100%',backgroundColor:color1,borderRadius:'1vw',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                <p style={{color:color1 == "#69a5fe" ? "white": "black",fontWeight:'bold',fontSize:"1.3vw"}}>Attendance</p>
            </div>
        </div>
        {
            option == "Subject" ?
            
            <div className="create-button" onClick={() => setOpen(true)}>
                <p style={{fontWeight:'bold',color:'white',fontSize:"1.3vw"}}>Create {option}</p>
            </div>
            
            :
            <>
            </>
        }
        

        </div>
        <div className='dashboard-container'>
        <div className='dashboard-body'>
        {
        subjects?.map(data=>{
          return(
            <>
              <DashboardCards subject={JSON.stringify(data)} />
              {/* <Organization name={post.groupName} id={post.id}/> */}
            </>
          )
        })
      }
        </div>
      
        </div>
        <Modal
          open={open}
          onClose={()=>{setOpen(false)}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        
        <Box sx={style}>
          <h2>Add Subject</h2>
          <br/>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'10px'}}>
          <TextField label="Name" onChange={(e)=>{setSubName(e.target.value)}} />
          <TextField label="Code" onChange={(e)=>{setSubCode(e.target.value)}} />
          <TextField label="Semester" onChange={(e)=>{setSubSemester(e.target.value)}} />
          <TextField label="Type" onChange={(e)=>{setSubType(e.target.value)}} />
          <TextField label="Strength" onChange={(e)=>{setSubSemester(e.target.value)}} />
          {/* <TextField label="Teacher" onChange={(e)=>{setSubTeacher(e.target.value)}} />
          <TextField label="Email" onChange={(e)=>{setTeacherEmail(e.target.value)}} /> */}
          {/* <FormControl style={{width:'100%'}}> */}
          {/* <InputLabel>Members</InputLabel> */}
          {/* <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
           
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput placeholder='Members' />}
            style={{width:'100%'}}
          >
          {users?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.id}
              
            >
              {name.userFirstName}
            </MenuItem>
          ))}
        </Select> */}
        {/* </FormControl> */}
          </div>
          <div className="create-button" onClick={()=> createSubject()} >
                <p style={{fontWeight:'bold',color:'white',fontSize:"1.3vw"}}>Create Subject</p>
            </div>
        </Box>
      </Modal>
    </div>
  )
      }
  else{
    return (
      <>
      <div>
        <div className='dashboard-header'>
        <div className='dashboard-toggle'>
            <div onClick={() => change("Subject")} style={{width:"50%",height:'100%',backgroundColor:color,borderRadius:'1vw',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                <p style={{color:color == "#69a5fe" ? "white": "black",fontWeight:'bold',fontSize:"1.3vw"}}>Subjects</p>
            </div>
            <div onClick={() => change("Attendance")} style={{width:"50%",height:'100%',backgroundColor:color1,borderRadius:'1vw',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                <p style={{color:color1 == "#69a5fe" ? "white": "black",fontWeight:'bold',fontSize:"1.3vw"}}>Attendance</p>
            </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:"10px",marginBottom:"2vw"}}>
          <p>Select Subject</p>
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"

            value={subject}
  
            onChange={handleChange}

            style={{height:'45px',width:'200px'}}
          >
          {subjects?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.id}
              
            >
              {name.subName}
            </MenuItem>
          ))}
        </Select>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:"10px",marginBottom:"2vw"}}>
          <p>Select Lecture</p>
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
          
            value={lecture}
  
            onChange={(e) => setLecture(e.target.value)}

            style={{height:'45px',width:'200px'}}
          >
          
          {lectures?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.id}
              
            >
              {name.lecTopic}
            </MenuItem>
          ))}
        </Select>
        </div>
        <div onClick={() => setQr()} style={{width:"150px",height:'45px',marginBottom:'0.7vw', backgroundColor:"#69a5fe",borderRadius:'10px',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                <p style={{color:"white",fontWeight:'bold'}}>Take Attendance</p>
        </div>
        </div>
        <div className='dashboard-container1'>
 
            <div className="qr-body">
                <div id="output" className="output-box">
                    <img id="QRimg" src={qrCode} alt="" />
                </div>
            </div>
            <div className="attendance-body"> 
                <div style={{display:'flex',flexDirection:'row',gap:'1vw'}}>
                <h1>Attendance</h1>
                <div onClick={() => refreshAttendance()} style={{width:"100px",height:'40px',marginBottom:'0.7vw', backgroundColor:"#69a5fe",borderRadius:'10px',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                <p style={{color:"white",fontWeight:'bold'}}>Refresh</p>
                </div>
                </div>
                <div style={{display:'flex',flexDirection:'row',gap:'1vw',flexWrap:'wrap',height:'500px'}}>
                <Box sx={{ height: 600, width: '100%' }}>
                  <DataGrid
                    sx={{border:'none'}}
                    rows={attendance}
                    columns={driverColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    // experimentalFeatures={{ newEditingApi: true }}
                    // onSelectionModelChange={(ids) => handleSelect(ids)}
                    components={{ Toolbar: GridToolbar }}
                    // componentsProps={{
                    //   toolbar: {
                    //     csvOptions: { disableToolbarButton: true },
                    //     printOptions: { disableToolbarButton: true },
                    //     // showQuickFilter: true,
                    //     // quickFilterProps: { debounceMs: 250 },
                    //   },
                    // }
                  // }
                    autoHeight
                  />
          </Box>
            </div>
            </div>

          </div>
    </div>
    </>
    )
  }
}
