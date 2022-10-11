import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import popup from "./modal";
import { startLoading, stopLoading, nav } from "../App";
import "../styles/index.css"
import TopRated from "./top-rated";
import Card from "./card";
import Children from "./children";
import { MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Book from "./book";





const Explore = forwardRef(function (props, ref) {

  const [forYouData, setForYouData] = useState([])
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const btn = useRef(null)
  const [currCount, setCurrCount] = useState(0)
  const [bookListShow, setBookListShow] = useState(true)
  const [bookDetailsShow, setBookDetailsShow] = useState(false)
  const [currBookDetailsOnShow, setCurrBookDetailsOnShow] = useState({})


  useImperativeHandle(ref, () => {
    return {
      showBook,
      goBack
    }
  })



  useEffect(() => {
    (async function () {
      try {
        startLoading()
        const { results, count } = await (await fetch(`https://gutendex.com/books`)).json()

        const toShow = results.map(function (e, i) {
          return <Card setId={props.setId} showModal={props.showModal} id={e.id} abtFunction={showBook} key={i} dataa={e} />
        })
        setForYouData(toShow)
        if (count <= 500) setCurrCount(count)
        else setCurrCount(count / 100)
        stopLoading()
      }
      catch (e) {
        popup("Some error occured. Sorry!")
      }
    })()

  }, [props])

  async function change(e) {
    try {
      setFilter(e.target.textContent)
      startLoading()
      const { results, count } = await (await fetch(`https://gutendex.com/books?topic=${e.target.textContent.toLowerCase()}`)).json()

      const toShow = results.map(function (e, i) {
        return <Card setId={props.setId} showModal={props.showModal} id={e.id} abtFunction={showBook} key={i} dataa={e} />
      })
      setForYouData(toShow)

      if (count <= 500) setCurrCount(count)
      else setCurrCount(count / 100)
      stopLoading()
    }

    catch (e) {
      popup("Some error occured")
    }
  }


  function renderPageNumberNav() {
    const length = Math.trunc(Math.trunc(currCount) / 32)

    const componentNavArr = []

    for (let loop = 0; loop <= length; loop++) {
      const comp = <a style={{ "color": `${page === (loop + 1) ? "green" : "blue"}`, "border": `${page === (loop + 1) ? "solid 0.5px blue" : "none"}`, "borderRadius": "5px", "padding": "5px" }} onClick={changePage} key={loop} href="#">&nbsp;{loop + 1} {loop === length || page === (loop + 1) ? "" : ","}</a>
      componentNavArr.push(comp)
    }

    return componentNavArr
  }


  async function changePage(e) {
    try {
      const page = Number(e.target.textContent.replace(",", "").trim())
      let link
      if (filter === "") {
        link = `https://gutendex.com/books/?page=${page}`
      }
      else {
        link = `https://gutendex.com/books/?page=${page}&topic=${filter.toLowerCase()}`
      }

      startLoading()
      const { results, count } = await (await fetch(`${link}`)).json()

      const toShow = results.map(function (e, i) {
        return <Card setId={props.setId} showModal={props.showModal} id={e.id} abtFunction={showBook} key={i} dataa={e} />
      })
      setForYouData(toShow)
      setPage(page)
      if (count <= 500) setCurrCount(count)
      else setCurrCount(count / 100)
      stopLoading()
    }

    catch (e) {
      popup("Some error occured")
    }
  }


  async function showBook(e) {
    props.navFunctions.showExplore()
    try {
      startLoading()
      const id = e.target.closest(".each-books").getAttribute("id")

      const { results } = await (await fetch(`https://gutendex.com/books?ids=${id}`)).json()

      setCurrBookDetailsOnShow(results[0])
      setBookListShow(false)
      setBookDetailsShow(true)
      stopLoading()
      nav("explore")
    }

    catch (e) {
      popup("Error displaying this book")
    }

  }

  function goBack() {
    setBookListShow(true)
    setBookDetailsShow(false)
  }






  if (props.status === "off") return

  if (forYouData.length === 0) return


  return (
    <div className="explore-cont hide">
      <div className={bookListShow ? "explore-second" : "explore-second hide"}>
        <MDBBtnGroup style={{ "width": "70%" }} shadow='0'>
          <MDBBtn onClick={change} ref={btn} style={{ "opacity": `${filter === "Children" ? "1" : "0.6"}` }} color='success'>Children</MDBBtn>
          <MDBBtn onClick={change} ref={btn} style={{ "opacity": `${filter === "Romance" ? "1" : "0.6"}` }} color='success'>Romance</MDBBtn>
          <MDBBtn onClick={change} ref={btn} style={{ "opacity": `${filter === "Drama" ? "1" : "0.6"}` }} color='success'>Drama</MDBBtn>
          <MDBBtn onClick={change} ref={btn} style={{ "opacity": `${filter === "Thriller" ? "1" : "0.6"}` }} color='success'>Thriller</MDBBtn>
          <MDBBtn onClick={change} ref={btn} style={{ "opacity": `${filter === "Adventure" ? "1" : "0.6"}` }} color='success'>Adventure</MDBBtn>
        </MDBBtnGroup>

        <h3 style={{ "textAlign": "center", "letterSpacing": "10px", "marginBottom": "20px" }}>{filter !== "" ? `${filter} Books` : "For You"} ⛺</h3>
        <div className="top-rated-cont">
          {forYouData}
          <p style={{ "fontSize": "small", "marginTop": "6%" }} className="page-nav">Page &nbsp;&nbsp;&nbsp;  {renderPageNumberNav()} </p>
        </div>
      </div>

      <Book setId={props.setId} showModal={props.showModal} status={props.status} data={currBookDetailsOnShow} display={bookDetailsShow} backFunction={goBack} />

    </div>
  )
})


export default Explore