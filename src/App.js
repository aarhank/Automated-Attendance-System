import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './screens/login/Login';
import Dashboard from './screens/dashboard/Dashboard'
function App() {
  // const [userid, setUserID] = useState("");
  // const [userpass, setUserPass] = useState("");
  // const [allEntry, setAllEntry] = useState([]);


  // let navigate = useNavigate();

  return (
    <Router>
    <Switch>
      <Route path="/dashboard">
        <Dashboard/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/">
        <Login/>
      </Route>
    </Switch>
  </Router>
    // <div className="container mt-5 shadow p-3 mb-5 bg-white rounded">
    //   <Form className="login-form">
    //     <h1 className='font-weight-bold text-center mt-5'>Login</h1>
    //     <div className="mt-5">
    //       <FormGroup>
    //         <Label>User ID</Label>
    //         <Input type="ID" placeholder="User ID" name="userid" value={userid} onChange={(e) => { setUserID(e.target.value) }}></Input>
    //       </FormGroup>

    //       <FormGroup>
    //         <Label>Password</Label>
    //         <Input type="password" placeholder="Password" name="userpass" value={userpass} onChange={(e) => { setUserPass(e.target.value) }}></Input>
    //       </FormGroup>

    //       <div className="mybutton">
    //         <Button block color="primary" size="md" onClick={() => {
    //           navigate("/qr_code");
    //         }}>Login</Button>
    //       </div>
    //     </div>
    //   </Form>
    // </div>
  );
}

export default App;