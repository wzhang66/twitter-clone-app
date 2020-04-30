import React,{Component} from 'react';
import {connect} from 'react-redux';
import {LoadingBar} from 'react-redux-loading';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {handleInitialData} from './store/actions/shared';
import './App.css';
import Dashboard from './components/Dashboard';
import NewTweet from './components/NewTweet';
import TweetPage from './components/TweetPage';
import Nav from './components/Nav';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }


  render() {
    return (
      <Router>
        <div className="container">
          <LoadingBar />
          <Nav />
          {this.props.loading === true 
            ? null 
            : <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage}/>
                <Route path="/new" exact component={NewTweet} />
              </div>
          }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  return{
    loading: authUser === null
  }
}

export default connect(mapStateToProps)(App);
