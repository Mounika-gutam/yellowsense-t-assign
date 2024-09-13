import { Component } from "react"
import NavBar from "../NavBar"
import "./index.css"

class Home extends Component {
    render() {
        return(
            <div className="bg-container">
                <NavBar />
                <div className="content-container">
                    <div className="content">
                        <h1 className="home-title">Find the perfect Job for you...</h1>
                        <p className="home-para">Learn more about potential employers through our detailed company profile, which include information 
                        about company culture, benefits and Job openings.</p>
                    </div>
                    <img src="https://i.pinimg.com/236x/d1/88/da/d188da345a1aa258f410cae6f82d4818.jpg" alt="home-img" className="home-image" />
                </div>
            </div>
        )
    }
}

export default Home

