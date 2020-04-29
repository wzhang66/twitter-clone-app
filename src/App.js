import React,{Component} from 'react';
import {connect} from 'react-redux';
import {LoadingBar} from 'react-redux-loading';

import {handleInitialData} from './store/actions/shared';
import './App.css';
import Dashboard from './components/Dashboard';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }


  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <Dashboard />}
      </div>
    );
  }
}

export default connect()(App);
