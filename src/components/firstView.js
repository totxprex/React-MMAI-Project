import React from "react";
import "../styles/index.css"



const FirstView = class extends React.Component {
  constructor() {
    super()
    this.state = {
      onView: "one"
    }
  }

  componentDidMount() {
    setInterval(() => {
      const determine = () => {
        if (this.state.onView === "one") return "two"
        if (this.state.onView === "two") return "three"
        if (this.state.onView === "three") return "one"
      }
      this.setState({ onView: `${determine()}` })
    }, 3000)
  }


  render() {
    if(this.props.status === "off") return
    
    return (
      <div className="home">
        <div className={`first-cont yellow one ${this.state.onView === "one" ? "" : "hide"}`}>
          <div className="first">
            <img src="/images/search.png" alt="browse"></img>
            <h4>Browse our amazing book catalogue</h4>
            <p>We have the best library! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  </p>
          </div>
          <img src="/images/browse.jpg" alt="browse"></img>
        </div>

        <div className={`first-cont blue two ${this.state.onView === "two" ? "" : "hide"}`}>
          <div className="first">
            <img src="/images/add.png" alt="add"></img>
            <h4>Add a book to your shelf</h4>
            <p>Your own personal shelf! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  </p>
          </div>
          <img src="/images/bookshelf.jpg" alt="bookslef"></img>
        </div>

        <div className={`first-cont pink three ${this.state.onView === "three" ? "" : "hide"}`}>
          <div className="first">
            <img src="/images/recommend.png" alt="recommend"></img>
            <h4>Browse our amazing book catalogue</h4>
            <p>We have the best library! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  </p>
          </div>
          <img src="/images/friend.jpg" alt="recommend"></img>
        </div>
      </div>
    )
  }
}



export default FirstView