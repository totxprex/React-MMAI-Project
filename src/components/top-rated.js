import React from "react";
import "../styles/index.css"
import Card from "./card";
import { startLoading, stopLoading } from '../App.js';

const TopRated = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showBookAndGoBack: {},
    }
  }


  async componentDidMount() {
    startLoading()
    const { results } = await (await fetch(`https://gutendex.com/books`)).json()

    this.setState({ data: results.slice(0, 3), showBookAndGoBack: this.props.showBookAndGoBack })
    stopLoading()
  }

  render() {
    if (this.props.status === "off") return

    if (this.state.data.length === 0) return <div className="second"></div>


    const dataToShow = this.state.data.map((e, i) => {
      return <Card setId={this.props.setId} showModal = {this.props.showModal} abtFunction={this.state?.showBookAndGoBack?.showBook} id={e.id} key={i} dataa={e} />
    })

    return (
      <div className="second">
        <h3 style={{ "textAlign": "center", "letterSpacing": "10px" }}>{this.props.text} ⭐</h3>
        <div className="top-rated-cont">
          {dataToShow}
        </div>
      </div>
    )
  }
}



export default TopRated

