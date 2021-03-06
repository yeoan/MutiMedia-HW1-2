import React, {Component} from 'react';
import {connect} from 'react-redux';
import {yourAction} from '../actions/yourActions.js';
import YourComponent1 from './your-component.js'
import YourComponent2 from './your-component2.js'
import { BrowserRouter, Route} from 'react-router-dom'; //{Link} to shift page;

class YourComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{padding:0}}>
          <Route path="/" component={YourComponent1} exact/>
          <Route path="/c2" component={YourComponent2} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  reduxProps: state.yourReducer.yourContent
});

export default connect(mapStateToProps, {yourAction})(YourComponent);
