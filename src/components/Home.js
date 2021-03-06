import React  from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout} from "../actions/actions";
import Report from './Report'


const Home = ({ match, history }) => {
  const dispatch = useDispatch();
  const logoutButton = () => {
    dispatch(logout());
  };

  const authuser = useSelector((state) => state.auth);
  const {isAuthenticated, user, covid_csv } = authuser;
  // const {first_name, last_name} = user;
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
            {/* <li>{isAuthenticated ? ` Welcome: ${first_name} ${last_name}`: null}</li> */}
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
         <Report covid_csv={covid_csv} />
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
