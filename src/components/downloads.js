import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

function Button(props) {
  return (
    <>
      <MDBBtn color='success'>{props.name}</MDBBtn>
    </>
  );
}

function ButtonYellow(props) {
  return (
    <>
      <MDBBtn color='warning'>{props.name}</MDBBtn>
    </>
  );
}

function ButtonLight(props) {
  return (
    <>
      <MDBBtn className='mx-2' color='info'>
        {props.name}
      </MDBBtn>
    </>
  );
}




export { Button, ButtonYellow, ButtonLight }