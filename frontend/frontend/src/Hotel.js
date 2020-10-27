import React, { Component } from "react";
import axios from "axios";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './style.css';


export default class Hotel extends Component {
    constructor() {
        super()
        this.state = {
            hotels: "not yet gotten",
            hotelName: "not yet gotten",
            hotelPrice: "",
            hotelAddress: "",
            hotelRate: "",
            guestReviews: "",
            adult: [1, 2, 3],
            adultNo: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // showHotelName = () => {
    //     axios.get("getData").then(response => {
    //         console.log(response)
    //         this.setState({
    //             hotelName: response.data

    //         })
    //     })
    // }

    componentDidMount = () => {
        axios.get("getData").then(response => {
            //console.log(response);
            this.setState({
                hotels: response.data
            });
        });
    }

    handleChange = (e) => {
        this.setState({
            hotelName: e.value,
            adultNo: e.value
        });
    }

    handleSubmit = () => {
        // axios.get("getPrice/" + this.state.hotelName).then(response => {
        //     console.log(response)
        //     this.setState({
        //         hotelPrice: response.data.ratePlan.price.current,
        //     })
        // })
        axios.get("getAddress/" + this.state.hotelName).then(response => {
            console.log(response)
            this.setState({
                hotelAddress: response.data.address.streetAddress,
                hotelPrice: response.data.ratePlan.price.current,
                hotelRate: response.data.starRating,
                guestReviews: response.data.guestReviews.rating
            })
        })
    }

    render() {
        return (

            <div>

                <div>
                    <header className="header">
                        <span id="head"></span><span id="hotels">NewYork Hotels</span>

                    </header>

                    <div className="dropdownContainer">
                        <Dropdown options={this.state.hotels} placeholder="Select a hotel" onChange={this.handleChange} />
                    </div>
                    <label>Check In</label>
                    <input type="text" defaultValue="check-in" className="checkinp" />

                    <label>Check Out</label>
                    <input type="text" defaultValue="check-out" className="checkinp" />
                    <div className="dropdown">
                        <label>No of adult person</label>
                        <Dropdown options={this.state.adult} onChange={this.handleChange} />
                    </div>

                    <input type="button" onClick={this.handleSubmit} defaultValue="SEARCH" />
                    <div className="rate"> Hotel Address : {this.state.hotelAddress} <br></br>
                        Price Per Night : {this.state.hotelPrice}<br></br>
                        Hotel Ratings : {this.state.hotelRate}<br></br>
                        Guest Reviews : {this.state.guestReviews}
                    </div>
                    {/* <div className="rate"> Price Per Night : {this.state.hotelPrice} </div> */}
                </div>
            </div>
        );
    }

}





