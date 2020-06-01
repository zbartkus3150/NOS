import React from 'react';
import { withRouter } from "react-router-dom";
import '../css/Booking.css';
import '../css/Details.css';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    props.booking.startDateTime = new Date(props.booking.startDateTime);
    props.booking.endDateTime = new Date(props.booking.endDateTime);
    this.state = {
      showDetails: false,
      details: null
    }
    this.buttonHandler = this.buttonHandler.bind(this)
  }

  element = (value) => {
    return (
      <div className="Element">
        <text style={{ marginLeft: "1%" }}>{value}</text>
      </div>
    )
  }

  buttonHandler = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }))
  }

  render() {
    const { booking } = this.props

    const preDetails = (
      <div className="WrapperDetails">
        <div className="ElementDetails">
          Details: {booking.details}
        </div>
    </div>
    )

    return (
      <div>
        <div className="Booking" onClick={this.buttonHandler}>
          {this.element(booking.id)}
          {this.element(booking.owner)}
          {this.element(`${booking.startDateTime.getDate()}.${booking.startDateTime.getMonth() + 1}.${booking.startDateTime.getFullYear()}`)}
          {this.element(`${booking.endDateTime.getDate()}.${booking.endDateTime.getMonth() + 1}.${booking.endDateTime.getFullYear()}`)}
          {this.element(booking.costPerDay)}
          {this.element(booking.postCode)}
          {this.element(booking.city)}
          {this.element(booking.street)}
          {this.element(booking.username)}
        </div>
        {this.state.showDetails && preDetails}
      </div>
    )
  }
}

export default withRouter(Booking)