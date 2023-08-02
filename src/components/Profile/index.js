import { Component } from "react";
import SideBar from "../SideBar";
import AddTransaction from '../AddTransaction'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}
class Profile extends Component{
    state = {
        profileDetails: '',
        apiStatus: apiStatusConstants.initial
    }

    componentDidMount = () => {
        this.fetchProfileData()
    }

    fetchProfileData= async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
        const userId = Cookies.get('user_id')
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                'x-hasura-role': 'user',
                'x-hasura-user-id': userId
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            this.setState({profileDetails: data.users[0], apiStatus: apiStatusConstants.success})
        }else{
            this.setState({apiStatus: apiStatusConstants.failure})
        }
    }

    onClickReTry = () => {
        this.fetchProfileData()
    }
    
    renderFailureView = () => (
        <div className="failure-container">
            <img
            src="https://res.cloudinary.com/daflxmokq/image/upload/v1677128965/alert-triangle_yavvbl.png"
            alt="failure view"
            className="failure view"
            />
            <p className="alert-msg">Something went wrong. Please try again</p>
            <button
            className="tryagain-btn"
            type="button"
            onClick={this.onClickReTry}
            >
            Try again
            </button>
        </div>
    )

    renderLoadingView = () => (
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
        </div>
    )

    renderSuccessView = () => {
        const {profileDetails} = this.state
        return (
          <div className="profile-details-container">
            <img
              className="profile-icon"
              src="https://res.cloudinary.com/dpkxg8atl/image/upload/v1690961677/pexels-christina-morillo-1181690_1_o5tvwc.png"
              alt="profile-icon"
            />
            <div>
              <div className="c2">
                <div className="c1">
                  <label className="profile-label">Your Name</label>
                  <div className="profile-input">
                    <p>{profileDetails.name}</p>
                  </div>
                </div>
                <div className="c1">
                  <label className="profile-label">User Name</label>
                  <div className="profile-input">
                    <p>{profileDetails.name}</p>
                  </div>
                </div>
              </div>
              <div className="c2">
                <div className="c1">
                  <label className="profile-label">Email</label>
                  <div className="profile-input">
                    <p>{profileDetails.email}</p>
                  </div>
                </div>
                <div className="c1">
                  <label className="profile-label">Password</label>
                  <div className="profile-input">
                    <p>*********</p>
                  </div>
                </div>
              </div>
              <div className="c2">
                <div className="c1">
                  <label className="profile-label">Date of Birth</label>
                  <div className="profile-input">
                    <p>{profileDetails.date_of_birth}</p>
                  </div>
                </div>
                <div className="c1">
                  <label className="profile-label">Present Address</label>
                  <div className="profile-input">
                    <p>San Jose, California, USA</p>
                  </div>
                </div>
              </div>
              <div className="c2">
                <div className="c1">
                  <label className="profile-label">Permanent Address</label>
                  <div className="profile-input">
                    <p>San Jose, California, USA</p>
                  </div>
                </div>
                <div className="c1">
                  <label className="profile-label">City</label>
                  <div className="profile-input">
                    <p>San Jose</p>
                  </div>
                </div>
              </div>
              <div className="c2">
                <div className="c1">
                  <label className="profile-label">Postal Code</label>
                  <div className="profile-input">
                    <p>45962</p>
                  </div>
                </div>
                <div className="c1">
                  <label className="profile-label">Country</label>
                  <div className="profile-input">
                    <p>USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }

    onRenderProfile = () => {
        const {apiStatus} = this.state
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderSuccessView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            default:
                return null
        }
    }
    render(){
        return(
            <div className="main-container">
                <SideBar activeTab="profile"/>
                <div>
                    <div className="heading-container">
                        <h1 className="accounts-heading">Profile</h1>
                        <AddTransaction/>
                    </div>
                    <div className="profile-container">
                        {this.onRenderProfile()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile