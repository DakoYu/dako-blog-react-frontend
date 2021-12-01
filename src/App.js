import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import Navbar from './components/Navbar';
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import AuthContext from "./store/AuthContext";
import Profile from './components/User/Profile';
import Blogs from './components/Blog/Blogs';
import NewBlog from "./components/Blog/NewBlog";
import './App.css';

function App() {
    const AuthCtx = useContext(AuthContext);
  
    const cookies = new Cookies();
  

   useEffect(() => {
     if (cookies.get('jwt')) {
       AuthCtx.login();
     }
   }, [AuthCtx.userState.isLogged])
  

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Route path='/' exact component={Blogs}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        {AuthCtx.userState.isLogged && 
          <Route path='/profile' component={Profile}></Route>
        }
        {AuthCtx.userState.isLogged && 
          <Route path='/newblog' component={NewBlog}></Route>
        }
      </Router>
    </React.Fragment>
  );
}

export default App;
