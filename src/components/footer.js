import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
<link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />


const Footer = class extends React.Component {
  constructor() {
    super()
  }


  render() {
    return (
      <MDBFooter color='white' bgColor='dark' className="footer-cont text-center">
        <img src="/images/logo.png" alt="logo"></img>

      <MDBContainer className='p-4'>
          <section className='mb-4'>
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>

          <section className=''>
            <form action=''>
              <MDBRow className='d-flex justify-content-center'>
                <MDBCol size="auto">
                  <p className='pt-2'>
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </MDBCol>

                <MDBCol md='5' start='12'>
                  <MDBInput contrast type='email' label='Email address' className='mb-4' />
                </MDBCol>

                <MDBCol size="auto">
                  <MDBBtn outline color='light' type='submit' className='mb-4'>
                    Subscribe
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </section>

          <section className='mb-4'>
            <p style={{"fontSize": "small", "marginTop": "30px"}}>
            All books in this platform are sibject to Copyright by the owner. We do not own or claim to own any of the projects in MMAI.
            </p>
          </section>


          <section className='links'>
            <a href="">
              Home
            </a>
            <a href="">
              About
            </a>
            <a href="">
              Contact
            </a>
            <a href="">
              Terms of Service
            </a>
          </section>

          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', fontSize: "small" }}>
            © 2022 Copyright:
            <a className='text-white' href='https://mdbootstrap.com/'>
              MMAI INC. Parent Company: Vertical Global Tech
            </a>
          </div>

        </MDBContainer>

      </MDBFooter>
    );
  }
}



export default Footer