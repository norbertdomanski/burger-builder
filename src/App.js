import React, {Component, Suspense} from 'react';
import { connect } from 'react-redux'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'))
const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'))
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'))


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  render(){
    let routes = (
        <Switch>
          <Route path='/auth' render={() => <Suspense fallback='Loading'><AsyncAuth/></Suspense>}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
     
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/checkout' render={() => <Suspense fallback='Loading'><AsyncCheckout/></Suspense>}/>
          <Route path='/orders' render={() => <Suspense fallback='Loading'><AsyncOrders/></Suspense>}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' render={() => <Suspense fallback='Loading'><AsyncAuth/></Suspense>}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div> 
      
    );
  }
  
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
