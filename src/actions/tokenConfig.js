import axios from "axios";

export const tokenConfig = getState=> {
    const token = getState().auth.acess;
  if (typeof token  !== "undefined" && token ) {
    // Apply for every request
    axios.defaults.headers.common["Authorization"] = "JWT" + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};