import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css"
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Login } from './login';
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById("root"))


root.render(
  <div>
    <Login />
    <Footer />
  </div>
)




