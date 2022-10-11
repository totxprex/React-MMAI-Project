import React, { useState, useEffect, useRef } from "react";
import "./styles/index.css"
import Nav from "./nav.js";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { startLoading, stopLoading } from "./App";
import popup from "./components/modal";
import { getSignedAwsUrl, App } from "./App";
import usersDataContext from "./context"


const backEndServer = `http://127.0.0.1:5500`


const Login = function (props) {

  const [onView, setOnView] = useState("login")
  const [loggedIn, setLoggedIn] = useState(false)
  const [usersData, setUsersData] = useState({})
  const [userImage, setUserImage] = useState(false)
  const [status, setStatus] = useState("off")
  const nav = useRef(null)

  const showSignUp = (e) => {
    e.preventDefault()
    setOnView("signup")
  }

  const showLogin = (e) => {
    e.preventDefault()
    setOnView("login")
  }

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("mmaiToken")) {
        startLoading()
        popup("Please wait. Logging in you in...")
        try {
          let { data } = await (await fetch(`${backEndServer}/user/1680/${localStorage.getItem("mmaiUsername")}`, {
            credentials: "include"
          })).json()

          if (localStorage.getItem("mmaiTheme")) {
            if (localStorage.getItem("mmaiTheme") === "dark")
              document.getElementById("root").style = "background-color: rgb(103, 107, 107);"

            else document.getElementById("root").style = "background-color: white;"
          }

          popup(`Welcome back ${data.name}!`)

          if (data.photo !== "") {
            data.photo = await getSignedAwsUrl(data.photo)
          }
          else {
            data.photo = "/images/user_placeholder.png"
          }
          console.log(data)

          setUsersData(data)
          setLoggedIn(true)
          setUserImage(data.photo)
          setStatus("on")
          stopLoading()
        }
        catch (e) {
          popup("Login state expired. Please log in again")
          localStorage.removeItem("mmaiToken")
          setTimeout(function () {
            document.location.reload()
          }, 2000)
        }
      }
    })()
  }, [])

  const login = async () => {
    const usernameIn = document.querySelector(".username-input")
    const passwordIn = document.querySelector(".password-input")

    if (!usernameIn.value || !passwordIn.value) return
    startLoading()

    try {
      let { token, username } = await (await fetch(`${backEndServer}/1680/login/${usernameIn.value}/${passwordIn.value}`, {
        credentials: "include"
      })).json()

      localStorage.setItem("mmaiToken", token)
      localStorage.setItem("mmaiUsername", username)
      localStorage.setItem("mmaiTheme", "light")

      if (localStorage.getItem("mmaiTheme")) {
        if (localStorage.getItem("mmaiTheme") === "dark")
          document.getElementById("root").style = "background-color: rgb(103, 107, 107);"

        else document.getElementById("root").style = "background-color: white;"
      }



      let { data } = await (await fetch(`${backEndServer}/user/1680/${localStorage.getItem("mmaiUsername")}`, {
        credentials: "include"
      })).json()

      popup(`Welcome back ${data.name}`)

      if (data.photo !== "") {
        data.photo = await getSignedAwsUrl(data.photo)
      }
      else {
        data.photo = "/images/user_placeholder.png"
      }
      console.log(data)
      setUsersData(data)
      setLoggedIn(true)
      setUserImage(data.photo)
      setStatus("on")
      stopLoading()

    }

    catch (err) {
      popup("Oops, there was error loggin you in, sorry :(")
    }
  }

  if (status === "on") return (
    <usersDataContext.Provider value={usersData}>
      <div className="cont">
        <Nav ref={nav} loogedIn={loggedIn} loading={props.loading} userImage={userImage} />

        <App navFunctions={nav.current} status={status} />

      </div>
    </usersDataContext.Provider>
  )

  return (
    <div className="cont">
      <Nav ref={nav} loogedIn={loggedIn} loading={props.loading} userImage={userImage} />

      <div className={loggedIn ? "login-signup-cont hide" : "login-signup-cont"}>
        <div className={`login-cont ${onView === "login" ? "" : "hide"}`}>
          <h4>Log In</h4>
          <input className="username-input" placeholder="username" type="text"></input>
          <input className="password-input" placeholder="password" type="password"></input>

          <button className="login-btn" onClick={login}>Go</button>

          <a href="#" onClick={showSignUp}>Sign Up?</a>
          <p>Copyrights©️ 2022, All rights reserved.</p>
        </div>

        <div className={`signup-cont ${onView === "signup" ? "" : "hide"}`}>
          <h4>Signup</h4>
          <input className="s-fullname-input" placeholder="Full Name" type="text"></input>
          <input className="s-username-input" placeholder="username - lowercase" type="text"></input>
          <input className="s-password-input" placeholder="password" type="password"></input>
          <input className="s-email-input" placeholder="johndow@gmail.com" type="email"></input>

          <button className="signup-btn">Sign Up</button>

          <a href="#" onClick={showLogin}>Log In?</a>
          <p>Copyrights©️ 2022, All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}



export { Login, backEndServer }