import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormDetailsreg() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    number: "",
  });

  const validation = (values) => {
    const errors = {};
    let usernm1 = /^(?=.*[0-9])/;
    if (values.username.length < 5 || values.username.length > 10) {
      errors.username = "range is between 5 to 10 characters";
    } else if (!values.username.match(usernm1)) {
      errors.username = "include atleast 1 number";
    }

    let paswd1 = /^(?=.*[0-9])/;
    let paswd2 = /^(?=.*[!@#$%^&*])/;
    if (values.password.length < 7 || values.password.length > 15) {
      errors.password = "range is between 7 to 15 characters";
    } else if (!values.password.match(paswd2)) {
      errors.password = "include atleast 1 special character";
    } else if (!values.password.match(paswd1)) {
      errors.password = "include atleast 1 Number";
    }

    let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email.match(mail)) {
      errors.email = "invalid mail";
    }

    let nmbr = /^\d{10}$/;
    if (!values.number.match(nmbr)) {
      errors.number = "invalid number";
    }

    return errors;
  };

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validation(values));

    if (
      Object.keys(errors).length === 0 &&
      values.username !== "" &&
      values.password !== "" &&
      values.number !== "" &&
      values.email !== ""
    ) {
      const { username, password, email, number } = values;
      const res = await fetch("/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          number: number,
        }),
      });
      const data = await res.json();

      // console.log(data);
      // console.log(res.status);
      if (res.status === 404 || !data) {
        alert("this is already used, please select something different");
        console.log("invalid registration");
      } else {
        alert("You are Registred successfully, now login");
        setValues({
          ...values,
          username: "",
          password: "",
          number: "",
          email: "",
        });
      }
    } else {
      alert("Solve the errors before submit");
    }
  };

  let navigate = useNavigate();
  const routeChangelogin = () => {
    let path = `../login`;
    navigate(path);
  };

  return (
    <div>
      <form className="reg" method="post" onSubmit={handleSubmit}>
        <div className="first">
          <div className="forErr">
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Your User Name"
              required
            />
            {errors.username && (
              <div className="err">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <span style={{ color: "red" }}>
                  <p>{errors.username}</p>
                </span>
              </div>
            )}
          </div>

          <div id="email" className="forErr">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            {errors.email && (
              <div className="err">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <span style={{ color: "red" }}>
                  <p>{errors.email}</p>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="first">
          <div className="forErr">
            <input
              type="number"
              name="number"
              value={values.number}
              onChange={handleChange}
              maxLength="10"
              required
              placeholder="Your Mobile Number"
            />
            {errors.number && (
              <div className="err">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <span style={{ color: "red" }}>
                  <p>{errors.number}</p>
                </span>
              </div>
            )}
          </div>

          <div className="forErr">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Your Password"
              required
            />
            {errors.password && (
              <div className="err">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <span style={{ color: "red" }}>{<p>{errors.password}</p>}</span>
              </div>
            )}
          </div>
        </div>

        <div id="loginR">
          Have an account?{" "}
          <button className="btn1" onClick={routeChangelogin}>
            Login
          </button>
        </div>
        <div id="btnR">
          <button className="btn1" type="submit">
            Regsiter
          </button>
        </div>
      </form>
    </div>
  );
}
