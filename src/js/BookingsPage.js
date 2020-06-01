import React from 'react';
import Booking from './Booking'
import { withRouter } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react"
import '../css/BookingsPage.css'

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: null,
      isLoading: false
    }
    this.loadBookings = this.loadBookings.bind(this);
    this.Element = this.Element.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  componentDidMount() {
    if (this.getCookieValue("token") === undefined) {
      this.props.history.push("/");
      return;
    }
    console.log("cookie 'token' value: ", this.getCookieValue("token"))
    this.loadBookings();
  }

  loadBookings() {
    this.setState({
      isLoading: true
    });

    // fetch('http://localhost:3004/bookingsForms')
    fetch('http://nos2020.us-east-1.elasticbeanstalk.com/')
      .then(response => response.json())
      .then(data => this.setState({ bookings: data }))
      .then(() => this.setState({ isLoading: false }));
  }

  Element = (value) => {
    if (value === "Item info:") {
      return (
        <div className="ElementHeader">
          <text style={{ marginLeft: "1%" }}>{value}</text>
          <Icon name='info circle' onClick={() => alert("Click booking for detials;\n\nItem info for specific items:\n\nCar: Plate number\nFlat: Address\nParking: Street ParkingNumber")} />
        </div>
      )
    }
    else {
      return (
        <div className="ElementHeader">
          <text style={{ marginLeft: "1%" }}>{value}</text>
        </div>
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    const header = (
      <div className="Content">
        {this.Element("Id:")}
        {this.Element("Owner:")}
        {this.Element("Start date:")}
        {this.Element("End date:")}
        {this.Element("Cost per day:")}
        {this.Element("Postcode:")}
        {this.Element("City:")}
        {this.Element("Street:")}
        {this.Element("Username:")}
      </div>
    )

    if (this.state.bookings) {
      const listBookings = (
        this.state.bookings.length === 0 ? <div>No bookings</div> :
          <div>
            {this.state.bookings.map(item => (
              <Booking booking={item} className="Booking" key={item.id} />
            ))}
          </div>
      )

      return (
        <div className="Wrapper">
          {header}
          {listBookings}
        </div>
      )
    } else {
      return <div>Error</div>
    }

  }
}

export default withRouter(Bookings)