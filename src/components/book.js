import React, { useEffect, useRef, useContext } from "react";
import "../styles/index.css"
import { startLoading, stopLoading } from "../App";
import popup from "./modal";
import usersDataContext from "../context"
import { backEndServer } from "../login";




function Book(props) {

  const firstImage = useRef(null)
  const usersData = useContext(usersDataContext)

  const dataToShow = props.data
  const goBack = props.backFunction

  function showModal(){
    props.showModal(true)
    props.setId(dataToShow.id)
  }

 async function save(){
    startLoading()
    const id = dataToShow.id

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

  useEffect(()=>{
    firstImage?.current?.scrollIntoView({
      behaviour: "smooth"
    })
  }, [dataToShow])

  if (props.status === "off") return
  if (!props.display) return

    return (
      <div className={"book-details"}>
        <img title="Back" className="back-btn-books" alt="Back" onClick={goBack} src="/images/back.png"></img>
        <img src={dataToShow.formats["image/jpeg"]} alt={dataToShow.title} className="details-image-large" ref={firstImage}></img>

        <h3 className="details-name">{dataToShow.title}</h3>

        <div className="actions-details books-details-action">
          <button onClick={save} className="btn1 yelloww">
            Save
          </button>
          <button onClick={showModal} className="btn1 greenn">
            Share
          </button>
        </div>

        <div className="details">

          <div className="in-d resources">
            <img src="/images/resources.png" alt="" className="details-image-large"></img>

            <ul className="resources-list">
              <li>
                ePub: <a href={dataToShow.formats["application/epub+zip"]}>Link</a>
              </li>
              <li>
                rdf+xml: <a href={dataToShow.formats["application/rdf+xml"]}>Link</a>
              </li>
              <li>
                x-mobipocket-ebook: <a href={dataToShow.formats["application/x-mobipocket-ebook"]}>Link</a>
              </li>
              <li>
                image: <a href={dataToShow.formats["image/jpeg"]}>Link</a>
              </li>
              <li>
                text/html: <a href={dataToShow.formats["text/html"]}>Link</a>
              </li>
              <li>
                text/plain: <a href={dataToShow.formats["text/plain"]}>Link</a>
              </li>
            </ul>

          </div>

          <div className="in-d book-info">
            <img src="/images/details.png" alt="" className="details-image-large"></img>

            <p>
              Subject: {dataToShow.title}
            </p>

            <p>
              Author(s): {dataToShow.authors.length > 1 ? `${dataToShow.authors[0].name}, ${dataToShow.authors[1].name}` : `${dataToShow.authors[0].name}` }
            </p>

            <p>
              Full Title: {dataToShow.title}
            </p>

            <p>
              Translators: {dataToShow.translators.length === 0 ? "None" : dataToShow.translators[0]}
            </p>

            <p>
              Book Shelves: {dataToShow.bookshelves}
            </p>
          </div>

          <div className="in-d copyrights-and-co">
            <img src="/images/miscal.png" alt="" className="details-image-large"></img>

            <p>
              Copyright Details: {dataToShow.copyright ? dataToShow.copyright : "Not Copyright Protected" }
            </p>

            <p>
              Language: '{dataToShow.languages.join(",")}'
            </p>

            <p>
              Media Type: {dataToShow.media_type}"
            </p>

            <p style={{ "fontSize": "small" }}>
              For books not subjected to copyright, we do not own this content and it is assumed that the Author as statted in this page owns full right of the content therein. For more information, contact the Author.
            </p>
          </div>

        </div>

      </div>
    )
}


export default Book