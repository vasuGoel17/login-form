import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetailslogin() {
  let navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("userDataToken");
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });
    // console.log("this is " + token + "dashboard vaslid");
    const data = await res.json();
    if (data.status == 401 || !data) {
      navigate("../*");
    } else {
      console.log("user verify");
      navigate("/dash");
    }
  };

  const goError = () => {
    navigate("*");
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("userDataToken");
    console.log("naya vaala " + token);

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("loggout out user" + token);
    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("userDataToken");
      navigate("/");
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <div>
      <button onClick={logoutuser} id="logout" type="submit">
        LogOut
      </button>
    </div>
  );
}
