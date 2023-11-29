import React,{useState,useEffect} from 'react'
import "./index.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LectureCard from './LectureCard';
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
export default function DashboardCards({subject}) {
  const data = JSON.parse(subject);
  console.log("ASDASD ", data);
  const [lectures,setLectures] = useState();
  const [lecTopic,setLecTopic] = useState();
  const [lecStartTime,setLecStartTime] = useState();
  const [lecEndTime,setLecEndTime] = useState();
  const [lecTeacherEmail,setLecTeacherEmail] = useState();
  const [open,setOpen] = useState(false)
  const createLecture = async () => {
    const payload = JSON.stringify({
      "lecSubject": data,
      "lecTopic": lecTopic,
      "lecStartTime": lecStartTime,
      "lecEndTime":lecEndTime,
      "teacherEmail":lecTeacherEmail
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: payload,
    };
    
    fetch("https://juit-attendance-acd05c65db38.herokuapp.com/lecture/create", requestOptions)
      .then(response => response.text())
      .then(async result => {
        
        var final = JSON.parse(result);
        console.log(final);
        setOpen(false);
        fetchLectures()
      })
      .catch(error => console.log('error', error));
    

  }
  const fetchLectures = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(`https://juit-attendance-acd05c65db38.herokuapp.com/lecture/subject/${data.id}`, requestOptions)
      .then(response => response.text())
      .then(async result => {
        
        var final = JSON.parse(result);
        setLectures(final)
        
      })
      .catch(error => console.log('error', error));
    
  }
  useEffect(() => {
    fetchLectures();
 
  }, []);
  // <FormControl tw="">
  //         <InputLabel shrink htmlFor="">
  //           ETD
  //         </InputLabel>
  //         <br />
  //         <Field
  //           name="ftl.marketplace.etd"
  //           component={KeyboardDateTimePicker}
  //           disablePast={!id}
  //           format="dd-MM-yyyy HH:mm"
  //           inputVariant="outlined"
  //           size="small"
  //         />
  //       </FormControl>
  //       <FormControl tw="">
  //         <InputLabel shrink htmlFor="">
  //           ETA
  //         </InputLabel>
  //         <br />
  //         <Field
  //           name="ftl.marketplace.eta"
  //           component={KeyboardDateTimePicker}
  //           disablePast={!id}
  //           format="dd-MM-yyyy HH:mm"
  //           inputVariant="outlined"
  //           size="small"
  //         />
  //       </FormControl>
  return (
    <div className='dashboard-card'>
      <div className='upper-body'>
        <div className='card-text'>
           <p style={{fontWeight:'bold',fontSize:'25px'}}>{data?.subName}</p> 
           <p>{data?.subCode} - {data?.subType}</p>
        </div>
        <div className='card-button' onClick={() => setOpen(true)}>
            Lecture
        </div>
      </div>
     
      {
        lectures?.map(data=>{
          return(
            <>
              <LectureCard lecture={JSON.stringify(data)} />
              {/* <Organization name={post.groupName} id={post.id}/> */}
            </>
          )
        })
      }
  
       <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <h2>Add Lecture</h2>
          <br/>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'10px'}}>
          <TextField label="Topic" onChange={(e)=>{setLecTopic(e.target.value)}} />
          {/* <TextField label="Teacher Email" onChange={(e)=>{setLecTeacherEmail(e.target.value)}} /> */}
          <TextField label="Start Time" onChange={(e)=>{setLecStartTime(e.target.value)}} />
          <TextField label="End Time" onChange={(e)=>{setLecEndTime(e.target.value)}} />
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
          <div className="create-button" onClick={()=> createLecture()} >
                <p style={{fontWeight:'bold',color:'white',fontSize:"1.3vw"}}>Create Subject</p>
            </div>
        </Box>
      </Modal>
    </div>
  )
}
