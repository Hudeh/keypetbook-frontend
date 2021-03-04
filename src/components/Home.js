import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { checkAuthenticated, load_user,logout } from '../actions/auth';
const Home = (props) =>{
const dispatch = useDispatch()
 useEffect(() => {
        dispatch(checkAuthenticated());
        dispatch(load_user());
    }, []);

const logoutButton = ()=>{
	dispatch(logout())
}
const authuser = useSelector(state=>state.auth);
const {isAuthenticated, user} = authuser;
	return(
		<>
		<div className="sidenav">
		  <a href="#report">Report</a>
		</div>

		<div className="main">
		<header className="nav">
		<ul>
		<li>Welcome: {user.first_name} {user.last_name}</li>
		<li onClick={()=>{logoutButton();props.history.push('/')}}>Logout</li>
		</ul>

		</header>
		  <h2>Sidebar</h2>
		  <p>This sidebar is of full height (100%) and always shown.</p>
		  <p>Scroll down the page to see the result.</p>
		    <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by --
          <a target="_blank" href="https://github.com/hudeh">
            Henry Udezuligbo
          </a>
        </p>
      </footer>
		</div>
	</>
	)
}

export default Home;