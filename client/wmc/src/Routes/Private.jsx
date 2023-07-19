import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth";

import { Outlet } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/protected`);
      if(res.data.ok){
        setOk(true);
      }
      else{
        setOk(false);
      }
    };

    if(auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> :"Loading...";
}
