import React,{useEffect}  from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout} from "../actions/actions";
import Report from './Report'
import { import_csv } from '../actions/actions';

const Home = ({ match, history }) => {
  const dispatch = useDispatch();
  const logoutButton = () => {
    dispatch(logout());
  };
  useEffect(() => {
      dispatch(import_csv())
  }, []);

  const authuser = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <>
      <div className="sidenav">
        <ul className="ul">
          <li>
            <Link exact to={`${match.url}`}>
              Report
            </Link>
          </li>
        </ul>
      </div>

      <div className="main">
        <header className="nav">
          <ul>
            <li>{authuser ? ` Welcome to your Dashboard`: null}</li>
            <li
              onClick={() => {
                logoutButton();
                history.push("/");
              }}
            >
              Logout
            </li>
          </ul>
        </header>
         <Report />
        <footer>
          <p>
            Created with <i className="fa fa-heart"></i> by --
            <a target="_blank" href="https://github.com/hudeh" rel="noreferrer">
              Henry Udezuligbo
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
