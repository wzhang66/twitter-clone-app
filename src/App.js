import React,{Component} from 'react';
import {connect} from 'react-redux';
import {LoadingBar} from 'react-redux-loading';

import {handleInitialData} from './store/actions/shared';
import './App.css';
import Dashboard from './components/Dashboard';
import NewTweet from './components/NewTweet';
import TweetPage from './components/TweetPage';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }


  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <TweetPage match={{params: {id:"2mb6re13q842wu8n106bhk"}}} />}
      </div>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  return{
    loading: authUser === null
  }
}

export default connect(mapStateToProps)(App);
