import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormDetailsreset() {
  const [message, setmessage] = useState(false);
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState("please enter the password");
  const { id, token } = useParams();

  const handleChange = (e) => {
    setpassword(e.target.value);
    // console.log(password);
  };

  const validation = (password) => {
    let error = "";

    let paswd1 = /^(?=.*[0-9])/;
    let paswd2 = /^(?=.*[!@#$%^&*])/;
    if (password.length < 7 || password.length > 15) {
      error = "range is between 7 to 15 characters";
    } else if (!password.match(paswd2)) {
      error = "include atleast 1 special character";
    } else if (!password.match(paswd1)) {
      error = "include atleast 1 Number";
    }
    return error;
  };

  let navigate = useNavigate();
  const userValid = async () => {
    const res = await fetch(`/forgetpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status == 201) {
      console.log("user Valid");
    } else {
      navigate("*");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validation(password);
    setErrors(err);
    // console.log(errors + "     " + password);
    if (errors.length === 0 && password !== "") {
      const res = await fetch(`/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      // console.log(data.status);
      if (data.status == 201) {
        setpassword("");
        setmessage(true);
      } else {
        console.log(data.status);
        // alert("Token expired, generate a new link");
      }
    } else {
      // alert("Solve the errors before submit");
      console.log("solve the errors");
    }
  };

  useEffect(() => {
    userValid();
  });

  return (
    <section>
      <div className="form_data">
        {message ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Password Succesfully Updated{" "}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
            {errors && (
              <div className="err">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <span style={{ color: "red" }}>{<p>{errors}</p>}</span>
              </div>
            )}
          </div>

          <button className="btn">Send</button>
        </form>
      </div>
    </section>
  );
}
