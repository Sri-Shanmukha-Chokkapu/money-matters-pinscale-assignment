import { Component } from "react"
import {Link,withRouter} from "react-router-dom"
import {AiFillHome} from 'react-icons/ai'
import {RiMoneyDollarBoxFill} from 'react-icons/ri'
import {CgProfile} from 'react-icons/cg'
import {LuLogOut} from 'react-icons/lu'
import {GrFormClose} from 'react-icons/gr'
import Popup from 'reactjs-popup'
import changeTabContex from "../../ContextActiveTab/ActiveTabContext";
import Cookies from 'js-cookie'

import './index.css'


class SideBar extends Component{
    state = {
        profileDetails: '',
    }
    componentDidMount = () => {
        this.fetchProfileDetails()
    }
    fetchProfileDetails= async () => {
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
            this.setState({profileDetails: data.users[0]})
        }
    }
    onClickLogout = () => {
        const {history} = this.props
        Cookies.remove('user_id')
        history.replace('/login')
    }
    render(){
        const {profileDetails} = this.state
        const userId = Cookies.get('user_id')
        const {activeTab} = this.props
        const TransactionsName = userId === '3' ? "All Transactions" : "Transactions"
        return(
            <changeTabContex.Consumer>
                {value => {
                    const {changeTab} = value
                    const onClickDashboard = () => {
                        changeTab('dashboard')
                    }
                    const onClickTransactions = () => {
                        changeTab('transactions')
                    }
                    const onclickProfile = () => {
                        changeTab('profile')
                    }
                    return (
                      <div className="side-bar">
                        <div>
                          <div className="logo-container">
                            <img
                              src="https://res.cloudinary.com/dpkxg8atl/image/upload/v1690613473/Logo_1_bbind2.png"
                              alt="website logo"
                              className="website-logo"
                            />
                          </div>
                          <ul className="side-bar-components-container">
                            <li
                              key="dashboard"
                              className="dashboard-container"
                              onClick={onClickDashboard}
                            >
                              <Link to="/dashboard" className="link">
                                <div
                                  className={
                                    activeTab === "dashboard"
                                      ? "active-name-icon-container"
                                      : "name-icon-container"
                                  }
                                >
                                  {activeTab === "dashboard" && (
                                    <div className="active"></div>
                                  )}
                                  <AiFillHome
                                    className={
                                      activeTab === "dashboard"
                                        ? "active-icon"
                                        : "icon"
                                    }
                                  />
                                  <p
                                    className={
                                      activeTab === "dashboard"
                                        ? "active-dashboard-name"
                                        : "dashboard-name"
                                    }
                                  >
                                    Dashboard
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li
                              key="transactions"
                              className="dashboard-container"
                              onClick={onClickTransactions}
                            >
                              <Link to="/transactions" className="link">
                                <div
                                  className={
                                    activeTab === "transactions"
                                      ? "active-name-icon-container"
                                      : "name-icon-container"
                                  }
                                >
                                  {activeTab === "transactions" && (
                                    <div className="active"></div>
                                  )}
                                  <RiMoneyDollarBoxFill
                                    className={
                                      activeTab === "transactions"
                                        ? "active-icon"
                                        : "icon"
                                    }
                                  />
                                  <p
                                    className={
                                      activeTab === "transactions"
                                        ? "active-dashboard-name"
                                        : "dashboard-name"
                                    }
                                  >
                                    {TransactionsName}
                                  </p>
                                </div>
                              </Link>
                            </li>
                            <li
                              key="profile"
                              className="dashboard-container"
                              onClick={onclickProfile}
                            >
                              <Link to="/profile" className="link">
                                <div
                                  className={
                                    activeTab === "profile"
                                      ? "active-name-icon-container"
                                      : "name-icon-container"
                                  }
                                >
                                  {activeTab === "profile" && (
                                    <div className="active"></div>
                                  )}
                                  <CgProfile
                                    className={
                                      activeTab === "profile"
                                        ? "active-icon"
                                        : "icon"
                                    }
                                  />
                                  <p
                                    className={
                                      activeTab === "profile"
                                        ? "active-dashboard-name"
                                        : "dashboard-name"
                                    }
                                  >
                                    Profile
                                  </p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="logout-container">
                          <Link to="/profile" className="link">
                            <div className="profile">
                              <img
                                className="sidebar-profile"
                                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                alt="profile-icon"
                              />
                              <div>
                                <p className="user-name">
                                  {profileDetails.name}
                                </p>
                                <p className="user-email">
                                  {profileDetails.email}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <Popup
                            modal
                            trigger={
                              <button className="logout-buttton" type="button">
                                <LuLogOut className="logout-icon" />
                              </button>
                            }
                            className="popup-content"
                            position="right center"
                          >
                            {(close) => (
                              <div className="model">
                                <div className="overlay">
                                  <div className="modal-container">
                                    <div className="close-button-container">
                                      <button
                                        className="close-btn"
                                        type="button"
                                        onClick={() => close()}
                                      >
                                        <GrFormClose size="20" />
                                      </button>
                                    </div>
                                    <div className="logout-description-icon-con">
                                      <div className="logout-icon-container-1">
                                        <div className="logout-icon-container-2">
                                          <LuLogOut className="logout-icon" />
                                        </div>
                                      </div>
                                      <div>
                                        <h3 className="logout-pop-heading">
                                          Are you sure you want to Logout?
                                        </h3>
                                        <p className="logout-pop-description">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit, sed{" "}
                                        </p>
                                        <div className="logout-btns-con">
                                          <button
                                            type="button"
                                            className="yes-logout-btn"
                                            onClick={this.onClickLogout}
                                          >
                                            Yes, Logout
                                          </button>
                                          <button
                                            type="button"
                                            className="cancel-logout-btn"
                                            onClick={() => close()}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </div>
                      </div>
                    );
                }}
            </changeTabContex.Consumer>
        )
    }
}

export default withRouter(SideBar)