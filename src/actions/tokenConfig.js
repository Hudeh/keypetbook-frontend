import axios from "axios";

export const tokenConfig = getState=> {
    const acess = getState().auth.acess;
  if (typeof acess  !== "undefined" && acess ) {
    // Apply for every request
    axios.defaults.headers.common["Authorization"] = "JWT" + acess;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};