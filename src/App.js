import React, { useState, useContext, useRef, useEffect } from "react";
import "./styles/index.css"
import FirstView from "./components/firstView.js";
import TopRated from "./components/top-rated.js";
import Children from "./components/children";
import Testimonies from "./components/testimonies";
import Profile from "./components/profile";
import { backEndServer } from "./login.js";
import usersDataContext from "./context";
import Book from "./components/book.js";
import Explore from "./components/explore";
import ShareModal from "./components/share";




const App = function (props, _ref) {
  const [status, _setStatus] = useState(props.status)
  const profileData = useContext(usersDataContext)
  const exploreRef = useRef(null)
  const [showBookAndGoBack, setShowBookAndGoBack] = useState({})
  const modal = useRef(null)


  useEffect(function () {
    setShowBookAndGoBack(exploreRef.current)
  }, [])



  return (
    <div className="loggedIn-cont">
      <FirstView status={status} />
      <TopRated showModal={modal?.current?.setBasicModal} setId={modal?.current?.setToRecommendID} showBookAndGoBack={showBookAndGoBack} text="Top-Rated" status={status} />
      <Children setId={modal?.current?.setToRecommendID} showModal={modal?.current?.setBasicModal} showBookAndGoBack={showBookAndGoBack} status={status} />
      <Testimonies status={status} />
      <Profile showModal={modal?.current?.setBasicModal} setId={modal?.current?.setToRecommendID} showBookAndGoBack={showBookAndGoBack} userDataToRender={profileData} status={status} />
      <Book status={status} />
      <Explore setId={modal?.current?.setToRecommendID} showModal={modal?.current?.setBasicModal} navFunctions={props.navFunctions} ref={exploreRef} status={status} />
      <ShareModal ref={modal} />
    </div>
  )
}



















const startLoading = function () {
  document.querySelector(".logo").classList.add("loading")
}

const stopLoading = function () {
  document.querySelector(".logo").classList.remove("loading")
}


const hideAllBoxes = function () {
  document.querySelector(".home")?.classList.add("hide")
  document.querySelector(".second")?.classList.add("hide")
  document.querySelector(".third")?.classList.add("hide")
  document.querySelector(".fourth")?.classList.add("hide")
  document.querySelector(".overall")?.classList.add("hide")
  document.querySelector(".explore-cont")?.classList.add("hide")
}


const getSignedAwsUrl = async function (name) {
  const { data } = await (await fetch(`${backEndServer}/file/1680/${localStorage.getItem("mmaiToken")}/photo/${name}`)).json()

  return data
}


const nav = function (state) {
  document.querySelectorAll(".nav-link").forEach(function (e) {
    e.classList.remove("makeGreen")
  })

  if (state === "explore") {
    document.querySelector(".exploreBtn").classList.add("makeGreen")
  }

  if (state === "home") {
    document.querySelector(".homeBtn").classList.add("makeGreen")
  }

  if (state === "profile") {
    document.querySelector(".profileBtn").classList.add("makeGreen")
  }
}


export { App, startLoading, stopLoading, hideAllBoxes, getSignedAwsUrl, nav }