import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/actions";
import Report from "./Report";
import { import_csv } from "../actions/actions";

const Home = ({ match, history }) => {
  const dispatch = useDispatch();
  const csvData = useSelector((state) => state.auth.covid_csv);
  const logoutButton = () => {
    dispatch(logout());
  };
  useEffect(() => {
    dispatch(import_csv());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const getCsv = () => {
    dispatch(import_csv());
    processData(csvData);
  };
  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
  };
  const authuser = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div className="sidenav">
        <ul className="ul">
          <li>
            <button onClick={getCsv}>RECORD</button>
          </li>
        </ul>
      </div>

      <div className="main">
        <header className="nav">
          <ul>
            <li>{authuser ? ` Welcome to your Dashboard` : null}</li>
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
        <Report columns={columns} data={data} />
      </div>
    </>
  );
};

export default Home;
