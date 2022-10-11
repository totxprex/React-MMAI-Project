import React, { useState, useContext, forwardRef, useImperativeHandle } from 'react';
import "../styles/index.css"
import { startLoading, stopLoading } from '../App';
import popup from './modal';
import { backEndServer } from '../login';
import usersDataContext from '../context';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';





const ShareModal = forwardRef(function (props, ref) {
  const [basicModal, setBasicModal] = useState(false);
  const [toRecommendID, setToRecommendID] = useState("")
  const usersData = useContext(usersDataContext)

  const toggleShow = () => setBasicModal(!basicModal);

  useImperativeHandle(ref, () => {
    return {
      setBasicModal,
      setToRecommendID
    }
  })


  const recommendBook = async function (e) {

    if (!document.querySelector(".username-input-share").value) return

    startLoading()
    
    try {
      const { results } = await (await fetch(`https://gutendex.com/books?ids=${toRecommendID}`)).json()

      const obj =
      {
        movieName: results[0].title,
        movieID: toRecommendID,
        extraInfo: results[0].formats["image/jpeg"],
        byWho: usersData._id
      }

      await fetch(`${backEndServer}/movie/1680/${localStorage.getItem("mmaiToken")}/send/${document.querySelector(".username-input-share").value.trim()}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      })
      popup("We have sent your recommendation!")
      stopLoading()
      setBasicModal(false)
      document.querySelector(".username-input-share").value = ``
    }

    catch (e) {
      popup("Ooopps, we couldn't share that book. Either that user does not exist, or it's just us....")
    }
  }

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog >
          <MDBModalContent >
            <MDBModalHeader>
              <MDBModalTitle>We hope he/she likes it! 💓</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody> <input className="username-input-share" placeholder="username" type="text"></input></MDBModalBody>
            <MDBModalFooter>
              <button onClick={recommendBook} className="btnShare greenn">
                Share
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
})



export default ShareModal