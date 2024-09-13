import { Component } from "react";
import {useParams} from "react-router-dom"
import BookMarkedContext from '../../context/BookMarkedContext'
import NavBar from "../NavBar"

import "./index.css"

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

  class JobDetails extends Component{
    state = {
        jobDetailsData: {},
        apiStatus: apiStatusConstants.initial,
        isLoading: false,
        error: '',
        isBookmarked: false,
      }

    componentDidMount(){
        this.getJobDetails()
    }

    getJobDetails = async () => {
        this.setState({
            isLoading: true,
            apiStatus: apiStatusConstants.inProgress,
        })
        const { id } = this.props.match.params
        console.log(this.props)
        const apiUrl = `https://testapi.getlokalapp.com/common/jobs/${id}`
        const options = { method: "GET" }

        const response = await fetch(apiUrl, options)
        const data = await response.json()
        
        const jobData = data.results.map(jobDetails => ({
            id: jobDetails.id,
            jobTitle: jobDetails.title,
            primaryDetails: jobDetails.primary_details,
            phone: jobDetails.custom_link
            
        }))
        if (response.ok === true) {
            this.setState({
                jobDetailsData: jobData[0],
                isLoading: false,
                apiStatus: apiStatusConstants.success,
            })
        } else {
            this.setState({
                error: data.message,
                isLoading: false,
                apiStatus: apiStatusConstants.failure,
            })
        }

    }

    renderLoadingView = () => (
        <div className="loader-container">
            <h1>Loading....</h1>
        </div>
    )

    renderFailureView = () => (
        <div>
            <h1>Something Went Wrong Try Again Later...</h1>
        </div>
    )

    renderJobDetailsView = () => (
        <BookMarkedContext.Consumer>
            {value => {
                const {jobDetailsData} = this.state
                const {title, primary_details, phone} = jobDetailsData
                const {isBookmarked} = value
                const addBookMark = value.addBookMark

                return(
                    <div>
                        <h1>{title}</h1>
                        <p>{phone}</p>
                        <p>{primary_details?.Experience}</p>
                        <p>{primary_details?.Salary}</p>
                        <p>{primary_details?.Place}</p>
                    </div>
                )
            }}
        </BookMarkedContext.Consumer>
    )

    renderAllviews = () => {
        const {apiStatus} = this.state

        switch(apiStatus){
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.success:
                return this.renderJobDetailsView()
            default:
                return null
        }
    }
 
    render(){
        return(
            <div className="detail-bg-container">
                <NavBar />
                <div>
                    {this.renderAllviews()}
                </div>
            </div>
        )
    }
  }

  export default JobDetails

