import React, { useContext, useState } from "react"
import "../styles/index.css"
import { startLoading, stopLoading } from "../App"
import popup from "./modal"
import { backEndServer } from "../login"
import usersDataContext from "../context"
import ShareModal from "./share"



function Card(props) {

  const data = props.dataa
  const id = props.id

  const usersData = useContext(usersDataContext)


  const abtFunction = props.abtFunction

  const saveFunction = async function (e) {
    startLoading()
    const id = e.target.closest(".each-books").getAttribute("id")

    try {
      const { results } = await (await fetch(`https://gutendex.com/books?ids=${id}`)).json()

      const obj =
      {
        movieName: results[0].title,
        movieID: id,
        extraInfo: results[0].formats["image/jpeg"]
      }

      await fetch(`${backEndServer}/movie/1680/${localStorage.getItem("mmaiToken")}/save/${usersData.username}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      })
      popup("Movie saved to your collection!")
      stopLoading()
    }

    catch (e) {
      popup("Error saving movie")
      stopLoading()
    }


  }

  async function showModal(e) {
    props.showModal(true)
    props.setId(e.target.closest(".each-books").getAttribute("id"))
  }


  return (
    <div className="each-books" id={id ? id : ""}>
      <img src={data.formats["image/jpeg"]} alt="A book"></img>
      <h6 className="name">{data.title.length > 30 ? data.title.slice(0, 30).padEnd(32, ".") : data.title}</h6>
      <p className="author">👩&nbsp;&nbsp;&nbsp;&nbsp;Author - <span>{data.authors[0] ? data.authors[0]?.name : "none"}</span></p>
      <p className="lang">📢&nbsp;&nbsp;&nbsp;&nbsp;Language - <span>{data.languages[0]}</span></p>
      <p className="download">⛺&nbsp;&nbsp;&nbsp;&nbsp;Downloads - <span>{data.download_count}</span></p>

      <div className="btns1">
        <button onClick={abtFunction} className="btn1 bluee">
          About
        </button>
        <button className="btn1 yelloww" onClick={saveFunction}>
          Save
        </button>
        <button onClick={showModal} className="btn1 greenn">
          Share
        </button>
      </div>


    </div>
  )
}



export default Card