import React, {Component} from 'react';
import {connect} from 'react-redux';
import {yourAction} from '../actions/yourActions.js';
import { Link } from 'react-router-dom';

class YourComponent extends React.Component {

  componentDidMount()
{
    this.mouseEventHandler();
}

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.mouseEventHandler = this.mouseEventHandler.bind(this);
    this.DropdownHandler = this.DropdownHandler.bind(this);
    this.LevelHandler = this.LevelHandler.bind(this);

    this.state = {
      isFirstClick : true,
      lastMouseX : 0,
      lastMouseY : 0,
      polygons : 3,
      level : 1,
      colorArray: ['balck','blue','red','green']
    }
  }

  mouseEventHandler()
{
    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d'),
        thisComponent = this;
    canvas.addEventListener("mousedown", function (e) {
        context.strokeStyle = "black";
        let x=e.pageX-8,y=e.pageY-60;
        context.fillRect(x,y,5,5);
        context.stroke();
          if(thisComponent.state.isFirstClick){
            thisComponent.setState({
              lastMouseX : x,
              lastMouseY : y,
              isFirstClick : false
            })
          }else{
            let distantBetweenX = (x-thisComponent.state.lastMouseX)/3;
            let distantBetweenY = (y-thisComponent.state.lastMouseY)/3;
            thisComponent.init(context,thisComponent.state.level,thisComponent.state.lastMouseX,thisComponent.state.lastMouseY,parseInt(thisComponent.state.polygons)+1,distantBetweenX,distantBetweenY)
            thisComponent.setState({
              lastMouseX : x,
              lastMouseY : y
            })
          }
    }, false);
}


  init(context,n,x,y,p,sideLength,sideLengthY)
{

    var degree = Math.PI / 180;
    snowflake(n, x, y, sideLength,sideLengthY);
    context.stroke();

    function snowflake(n, x, y, sideLength,sideLengthY)
    {
        context.save();
        context.translate(x, y);
        context.moveTo(0, 0);
        for(let x = p; x > 0 ; x--){
          if(x==p){
            leg(n - 1);
            context.rotate((180 - 360/(p-1)) * degree);
          }else if(x==2){
            leg(n - 1);
            context.rotate((180 - 360/(p-1)) * degree);
          }else if(x==1){
            leg(n - 1);
          }else{
            leg(n - 1);
            context.rotate(-1 * 360/(p-1) * degree);
          }
        }
        context.restore();

        function leg(n)
        {
            context.save();
            if(n == 0){
                context.lineTo(sideLength, sideLengthY);
            }
            else {
                context.scale(1/3,1/3);
                for(let x = p; x > 0 ; x--){
                  if(x==p){
                    leg(n - 1);
                    context.rotate((180 - 360/(p-1)) * degree);
                  }else if(x==2){
                    leg(n - 1);
                    context.rotate((180 - 360/(p-1)) * degree);
                  }else if(x==1){
                    leg(n - 1);
                  }else{
                    leg(n - 1);
                    context.rotate(-1 * 360/(p-1) * degree);
                  }
                }
            }
            context.restore();
            context.translate(sideLength, sideLengthY);
        }
    }
}


  DropdownHandler(e)
{
    this.setState({
      polygons: e.target.value
    })
}
  LevelHandler(e)
{
    this.setState({
      level: e.target.value
    })
}

  render() {
    return (
      <div style={{padding:8,width:'40%'}}>
        <div class="container">
          <div class="row">
            <label>Polygons:</label>
            <div class="col-sm">
                <select class="form-control" value={this.state.polygons} onChange={this.DropdownHandler}>
                  <option class="dropdown-item" value="4">3</option>
                  <option class="dropdown-item" value="5">4</option>
                  <option class="dropdown-item" value="6">5</option>
                </select>
            </div>
            <label>level:</label>
            <div class="col-sm">
                <select class="form-control col-sm" value={this.state.level} onChange={this.LevelHandler}>
                  <option class="dropdown-item" value="0">0</option>
                  <option class="dropdown-item" value="1">1</option>
                  <option class="dropdown-item" value="2">2</option>
                  <option class="dropdown-item" value="3">3</option>
                  <option class="dropdown-item" value="4">4</option>
                  <option class="dropdown-item" value="5">5</option>
                  <option class="dropdown-item" value="6">6</option>
                </select>
            </div>
            <Link to="/c2">go to Bezier Curve</Link>
          </div>
        </div>
        <canvas id="myCanvas" width="1200" height="700" style={{border:"1px solid #000000",marginTop:10}}>
        </canvas>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reduxProps: state.yourReducer.yourContent
});

export default connect(mapStateToProps, {yourAction})(YourComponent);
