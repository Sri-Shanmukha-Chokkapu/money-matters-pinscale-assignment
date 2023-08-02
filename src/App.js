import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Dashboard} />
    <ProtectedRoute exact path="/transactions" component={Transactions} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
