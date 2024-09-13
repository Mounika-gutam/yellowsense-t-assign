import { Component } from "react";
import {Link} from "react-router-dom"
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import NavBar from "../NavBar"
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class Jobs extends Component{
    state = {
        jobsList: [],
        isLoading: false,
        error: '',
        apiStatus: apiStatusConstants.initial,
    }

    componentDidMount(){
        this.getJobsList()
    }

    getJobsList = async () => {
        this.setState({
            isLoading: true,
            apiStatus: apiStatusConstants.inProgress,
        })

        const apiUrl = " https://testapi.getlokalapp.com/common/jobs?page=1"
        const options = { method: "GET" }

        const response = await fetch(apiUrl, options)
        const data = await response.json()

        const jobData = data.results.map(jobDetails => ({
            id: jobDetails.id,
            jobTitle: jobDetails.title,
            primaryDetails: jobDetails.primary_details,
            phone: jobDetails.custom_link
            
        }))

        if(response.ok === true){
            this.setState({
                jobsList: jobData,
                isLoading: false,
                apiStatus: apiStatusConstants.success,
            })
        }else{
            this.setState({
                error: data.message,
                isLoading: false,
                apiStatus: apiStatusConstants.failure,
            })
        }

    }

    renderInProgressView = () => (
        <div className="loader-container">
            <h1>Loading....</h1>
        </div>
    )

    renderFailureView = () => (
        <div>
            <h1>Failure</h1>
        </div>
    )

    renderSuccessView = () => {
        const { jobsList } = this.state
        return(
            <div>
                <ul className="job-card-list">
                    {jobsList.map(eachJob => (
                        <Link to={`/job-details/${eachJob.id}`}>
                            <li key={eachJob.id} className="job-card-item">
                                <h1 className="job-card-item-title">{eachJob.jobTitle}</h1>
                                <hr className="line-bar" />
                                <div className="card-item-content">
                                    <p className="job-card-item-salary"><FaRupeeSign />:<span className="salary-value">{eachJob.primaryDetails?.Salary}</span></p>
                                    <p className="job-card-item-location"> <FaLocationDot /> : {eachJob.primaryDetails?.Place}</p>
                                    <p className="job-card-item-contact"> <FaPhoneAlt /> {eachJob.phone}</p>
                                </div>
                                <button className="job-card-item-button">More Details</button>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        )
    }

    renderAllResults = () => {
        const {apiStatus} = this.state

        switch(apiStatus){
            case apiStatusConstants.inProgress:
                return this.renderInProgressView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.success:
                return this.renderSuccessView()
            default:
                return null
        }
        
    }

    render(){
        return(
            <div className="job-bg-container">
                <NavBar />
                <div>
                    {this.renderAllResults()}
                </div>
            </div>
        )
    }
}

export default Jobs