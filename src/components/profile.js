import React, { useContext, useEffect, useRef, useState } from "react";
import { startLoading, stopLoading } from "../App";
import { MDBInputGroup, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBSwitch } from 'mdb-react-ui-kit';
import Card from "./card";
import usersDataContext from "../context";
import { backEndServer } from "../login";
import popup from "./modal";
import { getSignedAwsUrl } from "../App";
import { nav } from "../App";



const Profile = function (props) {
  const [onView, setOnView] = useState("profile")
  const [savedBooks, setSavedBooks] = useState([])
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [currUserData, setCurrUserData] = useState(props.userDataToRender)
  const contextData = useContext(usersDataContext)
  const fileInput = useRef(null)
  let usersData = currUserData
  const [theme, setTheme] = useState(false)
  //true dark mode, false light mode


  useEffect(() => {
    if (localStorage.getItem("mmaiTheme") === "dark") setTheme(!theme)
  }, [])

  function changeTheme() {
    if (theme) {
      document.getElementById("root").style = "background-color: white;"
      localStorage.setItem("mmaiTheme", "light")
    }

    else {
      document.getElementById("root").style = "background-color: rgb(103, 107, 107);"
      localStorage.setItem("mmaiTheme", "dark")
    }


  }


  function updateProfilePic(_e) {
    if (!fileInput.current.files[0]) return
    startLoading()
    const form = new FormData()
    form.append("photo", fileInput.current.files[0])

    fetch(`${backEndServer}/file/1680/${localStorage.getItem("mmaiToken")}/profile/${contextData.username}`, {
      method: "POST",
      headers: {
        "enctype": "multipart/form-data"
      },
      body: form,
      credentials: "include"
    }).then(async function (e) {

      if (e.status === 404) throw new Error()
      popup("Profile picture updated succesfully!")

      const { data } = await (await fetch(`${backEndServer}/user/1680/${localStorage.getItem("mmaiUsername")}`, {
        credentials: "include"
      })).json()

      if (data.photo !== "") {
        data.photo = await getSignedAwsUrl(data.photo)
      }
      else {
        data.photo = "/images/user_placeholder.png"
      }
      setCurrUserData(data)
      document.querySelector(".profileImg2").src = data.photo
      stopLoading()
    }).catch(function (_err) {
      popup("Error updating profile picture. My bad...")
      stopLoading()
    })
  }


  function showProfilePage() {
    setOnView("profile")
  }

  function showSettingsPage() {
    setOnView("settings")
  }

  async function showMyBooksPages() {
    setOnView("books")
    startLoading()

    const data = usersData.savedMovies.map(async function (e) {
      const { results } = await (await fetch(`https://gutendex.com/books?ids=${e.movieID}`)).json()

      return results[0]
    })

    const extractedData = await Promise.all(data)

    setSavedBooks(extractedData)

    stopLoading()
  }

  async function showRecomendPage() {
    setOnView("recommendations")
    startLoading()

    const data = usersData.myRecommendations.map(async function (e) {
      const { results } = await (await fetch(`https://gutendex.com/books?ids=${e.movieID}`)).json()

      return results[0]
    })

    const extractedData = await Promise.all(data)

    setRecommendedBooks(extractedData)

    stopLoading()
  }

  function showContatPage() {
    setOnView("contact")
  }


  async function changeEmail(e) {
    if (!document.querySelector(".p-email-input").value) return

    startLoading()

    try {
      await fetch(`${backEndServer}/user/1680/${usersData.username}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          oldEmail: usersData.email,
          newEmail: document.querySelector(".p-email-input").value
        }),
        credentials: "include"
      })

      popup("Email change succesful!")

      setTimeout(function () {
        document.location.reload()
      }, 2000)
    }

    catch (e) {
      popup("Internal Server Error")
      stopLoading()
    }
  }


  async function deleteAcc() {

    try {
      startLoading()
      await fetch(`${backEndServer}/user/1680/${usersData.username}`, {
        method: "DELETE",
        credentials: "include"
      })
      popup("Sorry to see you go :(")
      localStorage.removeItem("mmaiToken")
      localStorage.removeItem("mmaiUsername")

      setTimeout(function () {
        document.location.reload()
      }, 2000)
    }
    catch (e) {
      popup("Error deleting your account")
      stopLoading()
    }

  }





  if (props.status === "off") return
  

  let savedBooksArr
  let recommendedBooksArr

  if (savedBooks.length === 0) {
    savedBooksArr = <div></div>
  }

  else {
    savedBooksArr = savedBooks.map(function (e, i) {
      return <Card setId={props.setId} showModal={props.showModal} abtFunction={props?.showBookAndGoBack?.showBook} id={e.id} dataa={e} key={i} />
    })
  }

  if (recommendedBooks.length === 0) {
    recommendedBooksArr = <div></div>
  }

  else {

    recommendedBooksArr = recommendedBooks.map(function (e, i) {
      return <Card setId={props.setId} showModal={props.showModal} abtFunction={props?.showBookAndGoBack?.showBook} id={e.id} dataa={e} key={i} />
    })
  }


  return (
    <div className="overall hide">
      <div className="profile-cont">

        <div className="side-bar">
          <div className={onView === "profile" ? "a profile-details profileOnShow" : "a profile-details"} onClick={showProfilePage}>
            Profile
          </div>
          <div className={onView === "settings" ? "a settings profileOnShow" : "a settings"} onClick={showSettingsPage}>
            Settings
          </div>
          <div className={onView === "books" ? "a myBooks profileOnShow" : "a myBooks"} onClick={showMyBooksPages}>
            Your Books
          </div>
          <div className={onView === "recommendations" ? "a recommendations profileOnShow" : "a recommendations"} onClick={showRecomendPage}>
            Recommendations
          </div>

          <div className={onView === "contact" ? "a contactUs profileOnShow" : "a contactUs"} onClick={showContatPage}>
            Contact Us
          </div>
        </div>

        <div className={onView === "profile" ? "profile" : "profile hide"}>

          <img className="bg" src="/images/bg.jpg"></img>
          <img className="profile-pic" src={usersData.photo}></img>

          <MDBInputGroup className='p-cont p-name-cont'>
            <MDBDropdown>
              <MDBDropdownToggle className="dd p-name-button">Dropdown</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link>No Action</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <input className='p-input p-name-input' type='text' placeholder={usersData.name} />
          </MDBInputGroup>

          <MDBInputGroup className='p-cont p-email-cont'>
            <MDBDropdown>
              <MDBDropdownToggle className="dd p-email-btn">Dropdown</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={changeEmail} link>Update Email</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <input className='p-input p-email-input' type='email' placeholder={usersData.email} />
          </MDBInputGroup>

          <MDBInputGroup className='p-cont p-password-cont'>
            <MDBDropdown>
              <MDBDropdownToggle className="dd p-password-btn">Dropdown</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link>No Action</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <input className='p-input p-password-input' type='password' placeholder="************" />
          </MDBInputGroup>


          <div className="image-work">

            <img src={usersData.photo} className="profileImg2"></img>

            <input ref={fileInput} className="photoInput_profile" name="profilePic" type="file" accept="image/jpg,image/png"></input>

            <button onClick={updateProfilePic} className="uu">
              Update Picture
            </button>

          </div>

        </div>


        <div className={onView === "settings" ? "settings-cont" : "settings-cont hide"}>

          <img className="bg" src="/images/bg.jpg"></img>

          <h4>SETTINGS</h4>

          <MDBSwitch onClick={changeTheme} defaultChecked={theme} id='flexSwitchCheckChecked' label='Dark Mode' />

          <MDBSwitch id='flexSwitchCheckChecked' label='Would you like to recieve monthly catalogue updates?' />

          <MDBSwitch id='flexSwitchCheckChecked' label='Would you like to recieve  recommendations from other users?' />


          <MDBSwitch id='flexSwitchCheckChecked' label='Child mode on/off' />

          <button onClick={deleteAcc} className="deleteAcc">
            Delete your account
          </button>

        </div>

        <div className={onView === "books" ? "books-cont" : "books-cont hide"}>

          <img className="bg" src="/images/bg.jpg"></img>

          <h4>SAVED BOOKS</h4>

          <div className="rendered-saved-books-cont">
            {savedBooksArr}
          </div>

        </div>


        <div className={onView === "recommendations" ? "recommend-cont" : "recommend-cont hide"}>

          <img className="bg" src="/images/bg.jpg"></img>

          <h4>RECOMMENDED BOOKS</h4>

          <div className="rendered-recommended-books-cont">
            {recommendedBooksArr}
          </div>

        </div>




        <div className={onView === "contact" ? "contact-cont" : "contact-cont hide"}>

          <img className="bg" src="/images/bg.jpg"></img>


          <div className="contact-cont-modal">
            <h4>CONTACT US</h4>
            <input className="c-email-input" placeholder="Your Email" type="email"></input>
            <textarea className="c-message-input" placeholder="Your Message Here" type="password"></textarea>

            <button className="contact-btn">Go</button>

            <p>Copyrights©️ 2022, All rights reserved.</p>
          </div>

        </div>

      </div>

    </div >

  )

}





export default Profile