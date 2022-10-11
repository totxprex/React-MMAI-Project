import React from "react";
import "../styles/index.css"



const Testimonies = class extends React.Component {
  constructor() {
    super()

  }

  componentDidMount() {
    // setInterval(function () {
    //   if (document.querySelector(".testimonyCont").getBoundingClientRect().top <= 700) {
    //     document.querySelectorAll(".each-testimony").forEach(function (e, i) {
    //       setTimeout(function () {
    //         e.classList.remove("hide")
    //         e.classList.add("animate")
    //       }, i * 1000)
    //     })
    //   }
    // }, 500)
  }


  render() {
    if(this.props.status === "off") return
    
    return (
      <div className="fourth">
        <div className="testimonyCont">
          <div className="each-testimony">
            <img src="/images/user-12.jpg" alt="mmai"></img>
            <h6>Rose Galili</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-12.jpg" alt="mmai"></img>
            <h6>Rose Galili</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-13.jpg" alt="mmai"></img>
            <h6>Kate Middleston</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-14.jpg" alt="mmai"></img>
            <h6>Jack Baur</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-15.jpg" alt="mmai"></img>
            <h6>Yuma Kelb</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-16.jpg" alt="mmai"></img>
            <h6>Gry Huston</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-17.jpg" alt="mmai"></img>
            <h6>Julai Bleck</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>

          <div className="each-testimony">
            <img src="/images/user-18.jpg" alt="mmai"></img>
            <h6>Bim Jam</h6>
            <p>Great service!!</p>
            <img src="/images/5_star.png" alt="mmai"></img>
          </div>
        </div>
      </div>
    )
  }
}


export default Testimonies
