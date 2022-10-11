import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { hideAllBoxes } from "./App";
import "./styles/index.css"
import { nav } from "./App";
import { startLoading } from "./App";

import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav
} from 'mdb-react-ui-kit';


const Nav = forwardRef(function (props, ref) {
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  const [onView, setOnview] = useState("home")

  const [userImage, setUserImage] = useState("/images/user_placeholder.png")


  useImperativeHandle(ref, () => {

    return {
      showExplore,
      showHome,
      setOnview
    }
  })


  useEffect(function () {
    if (props.userImage) {
      setUserImage(props.userImage)
    }
  }, [props.userImage])



  function showProfile() {
    hideAllBoxes()

    document.querySelector(".overall").classList.remove("hide")
    setOnview("profile")
    nav("profile")
  }

  function showHome() {
    hideAllBoxes()

    document.querySelector(".home").classList.remove("hide")
    document.querySelector(".second")?.classList.remove("hide")
    document.querySelector(".third")?.classList.remove("hide")
    document.querySelector(".fourth")?.classList.remove("hide")

    setOnview("home")
    nav("home")
  }

  function showExplore() {
    hideAllBoxes()
    document.querySelector(".explore-cont")?.classList.remove("hide")
    setOnview("explore")
    nav("explore")
  }

  function logOut(){
    startLoading()
    localStorage.removeItem("mmaiToken")
    localStorage.removeItem("mmaiUsername")

    setTimeout(function(){
      document.location.reload()
    }, 2000)
  }


  return (
    <>
      <MDBNavbar style={{ "position": "fixed", "width": "100%", "zIndex": "400" }} className="nav" expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'><img className={props.loading ? "logo loading" : "logo"} src="/images/logo.png" alt="mmai" /></MDBNavbarBrand>
          <MDBNavbarBrand href='#'><img src={userImage} className="profileImg2" alt=""></img></MDBNavbarBrand>

          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>

            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink style={{ "fontFamily": "'Poppins', sans-serif", "fontSize": "small" }} className={onView === "home" ? "homeBtn makeGreen" : "homeBtn"} active aria-current='page' href='#' onClick={showHome}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink style={{ "fontFamily": "'Poppins', sans-serif", "fontSize": "small" }} href='#' className={onView === "explore" ? "exploreBtn makeGreen" : "exploreBtn"} onClick={showExplore}>Explore</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink style={{ "fontFamily": "'Poppins', sans-serif", "fontSize": "small" }} href='#' onClick={showProfile} className={onView === "profile" ? "profileBtn makeGreen" : "profileBtn"}>Profile</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={logOut} style={{ "fontFamily": "'Poppins', sans-serif", "fontSize": "small" }} href='#'>{props.loogedIn ? "Log Out" : "Log In"}</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
})





export default Nav