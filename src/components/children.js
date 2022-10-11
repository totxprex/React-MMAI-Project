import React, { useState, useEffect } from "react";
import "../styles/index.css"
import Card from "./card";
import { startLoading, stopLoading } from '../App.js';


function Children(props) {
  const [arr, setArr] = useState([])

  useEffect(function () {
    startLoading()
    fetch(`https://gutendex.com//books?topic=children`).then(function (e) {
      return e.json()
    }).then(function (data) {
      const toShow = data.results.slice(0, 3).map(function (e, i) {
        return <Card setId={props.setId} showModal = {props.showModal} abtFunction={props?.showBookAndGoBack?.showBook} id={e.id} key={i} dataa={e} />
      })
      stopLoading()
      return setArr(toShow)
    })
  }, [props])

  if (props.status === "off") return

  return (
    <div className="third">
      <h3 style={{ "textAlign": "center", "letterSpacing": "10px" }}>Top Children Books ⭐</h3>
      <div className="top-rated-cont">
        {arr.length !== 0 ? arr : <div></div>}
      </div>
    </div>
  )
}


export default Children