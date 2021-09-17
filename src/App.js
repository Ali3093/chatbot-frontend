import './App.css';
import LoginForm from './components/Top/loginForm';
import KommunicateChat from './components/Top/chat';
import {Route,withRouter,Link} from "react-router-dom";
import Header from './components/Top/header';
import PrivateRoute from './components/Top/privateRoute';
import PasswordReset from './components/Top/passwordReset';

const App = withRouter (({location})  =>  {
  return (
    <div className="App">
      {
        location.pathname !== '/chat' && location.pathname !== '/reset' && <Header/>
      }
      <div className="container d-flex align-items-center flex-column">
      <Route exact path ='/' component ={LoginForm} />
      <PrivateRoute path = '/chat' component = {KommunicateChat} />
      <Route path = '/reset' component={PasswordReset}/>
      </div>
      </div>
  )
})

export default withRouter(App);