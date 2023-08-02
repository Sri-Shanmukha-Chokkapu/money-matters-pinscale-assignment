import { Component } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts"
import Loader from "react-loader-spinner"
import Cookies from "js-cookie"

import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class BarCharts extends Component{
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysCreditsAndDebitsDate: [],
  }
  componentDidMount = () => {
    this.getLast7daysCreditsAndDebits()
  }
  getLast7daysCreditsAndDebits = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const userId = Cookies.get('user_id')
    const url = userId === '3' ? 'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin' : 'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days' 
    const accesToken = "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    const userOrAdmin = userId === '3' ? 'admin' : 'user'
    const options = {
      method: 'GET',
      headers:{
        "x-hasura-admin-secret": accesToken,
        'Content-Type' : "application/json",
        'x-hasura-role': userOrAdmin,
        'x-hasura-user-id': userId
      }
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok){
      if (userId === '3'){
        this.setState({last7DaysCreditsAndDebitsDate: data.last_7_days_transactions_totals_admin, apiStatus: apiStatusConstants.success})
      }else{
        this.setState({last7DaysCreditsAndDebitsDate: data.last_7_days_transactions_credit_debit_totals, apiStatus: apiStatusConstants.success})
      }
    }else{
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  onClickReTry = () => {
    this.getLast7daysCreditsAndDebits()
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
  renderBarchart = () => {
      const {last7DaysCreditsAndDebitsDate} = this.state
      const DataFormatter = (number) => {
        if (number > 1000) {
          return `${(number / 1000).toString()}k`
        }
        return number.toString()
      }
      let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
      let list_7_days = []
      let totalCreditSum = 0
      let totalDebitSum = 0
      for (let i = 0; i < 7; i++){
        const findDat = last7DaysCreditsAndDebitsDate.filter(each =>new Date(each.date).getDay() === i)
        const credit = findDat.find(each => each.type === 'credit')
        const debit = findDat.find(each => each.type === 'debit')
        const creditSum = credit === undefined ? 0 : credit.sum
        const debitSum = debit === undefined ? 0 : debit.sum
        totalCreditSum += creditSum
        totalDebitSum += debitSum
        const obj = {
          'day': days[i],
          'credit': creditSum,
          'debit': debitSum
        }
        list_7_days.push(obj)
      }
    return (
      <>
        <div className="top-align">
          <p className="credit-debit-in-this-week">
            ${totalDebitSum} <span className="debitted">Debited &</span> $
            {totalCreditSum}{" "}
            <span className="debitted">Credited in this Week</span>
          </p>
          <div className="credit-debit-checkbox">
            <div className="checkbox-container">
              <div className="debit-checkbox"></div>
              <p className="type">Credit</p>
            </div>
            <div className="checkbox-container">
              <div className="credit-checkbox"></div>
              <p className="type">Debit</p>
            </div>
          </div>
        </div>
        <BarChart
          width={1000}
          height={400}
          data={list_7_days}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="day"
            tick={{
              stroke: "#718EBF",
              strokeWidth: 1,
              fontFamily: "sans-serif",
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: "#718EBF",
              strokeWidth: 1,
              fontFamily: "sans-serif",
            }}
          />
          <Bar
            dataKey="credit"
            name="Credit"
            fill="#4C78FF"
            barSize="20%"
            radius={[10, 10, 10, 10]}
          />
          <Bar
            dataKey="debit"
            name="Debit"
            fill="#FCAA0B"
            barSize="20%"
            radius={[10, 10, 10, 10]}
          />
        </BarChart>
      </>
    );
  }
  onRenderBarChart = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
          return this.renderBarchart()
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
          <div className="debit-credit-overview-container">
            {this.onRenderBarChart()}
          </div>
      )
    }
}
export default BarCharts