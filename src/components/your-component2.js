import React, {Component} from 'react';
import {connect} from 'react-redux';
import {yourAction} from '../actions/yourActions.js';
import { Link } from 'react-router-dom';

class YourComponent extends React.Component {

  componentDidMount(){
    var canvas = document.getElementById('myCanvasCircle'),
    ctx = canvas.getContext('2d'),
    circle = {},
    drag = false,
    circleMade = false,
    counter = 1,
    whichPoint = '';

function draw(x,y) {
    ctx.beginPath();
    ctx.fillRect(x,y,10,10);
    ctx.stroke();
}

function mouseDown(e) {

    circle.startX = e.pageX - this.offsetLeft;
    circle.startY = e.pageY - this.offsetTop;

    drag = true;
    switch (counter) {
      case 1:
        circle.X1 = circle.startX;
        circle.Y1 = circle.startY;
        draw(circle.X1,circle.Y1);
        break;
      case 2:
        circle.X2 = circle.startX;
        circle.Y2 = circle.startY;
        draw(circle.X2,circle.Y2);
        break;
      case 3:
        circle.X3 = circle.startX;
        circle.Y3 = circle.startY;
        draw(circle.X3,circle.Y3);
        break;
      case 4:
        circle.X4 = circle.startX;
        circle.Y4 = circle.startY;
        draw(circle.X4,circle.Y4);
        break;
      default:
    }
    if(counter>=4){
        drawBezier({x:circle.X1,y:circle.Y1},{x:circle.X2,y:circle.Y2},{x:circle.X3,y:circle.Y3},{x:circle.X4,y:circle.Y4});
    }
    counter++;
}

function mouseUp() {
    drag = false;
}

function mouseMove(e) {
    if (drag&&counter>=5) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        if(counter>=5){
          if(x>=circle.X1&&(circle.X1+10)>=x&&y>=circle.Y1&&(circle.Y1+10)>=y){
            whichPoint = 'p1';
          }
          if(x>=circle.X2&&(circle.X2+10)>=x&&y>=circle.Y2&&(circle.Y2+10)>=y){
            whichPoint = 'p2';
          }
          if(x>=circle.X3&&(circle.X3+10)>=x&&y>=circle.Y3&&(circle.Y3+10)>=y){
            whichPoint = 'p3';
          }
          if(x>=circle.X4&&(circle.X4+10)>=x&&y>=circle.Y4&&(circle.Y4+10)>=y){
            whichPoint = 'p4';
          }
        }
        switch (whichPoint) {
          case 'p1':
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circle.X1 = x;
            circle.Y1 = y;
            draw(x,y);
            draw(circle.X2,circle.Y2);
            draw(circle.X3,circle.Y3);
            draw(circle.X4,circle.Y4);
            drawBezier({x:x,y:y},{x:circle.X2,y:circle.Y2},{x:circle.X3,y:circle.Y3},{x:circle.X4,y:circle.Y4});
            break;
          case 'p2':
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circle.X2 = x;
            circle.Y2 = y;
            draw(x,y);
            draw(circle.X1,circle.Y1);
            draw(circle.X3,circle.Y3);
            draw(circle.X4,circle.Y4);
            drawBezier({x:circle.X1,y:circle.Y1},{x:x,y:y},{x:circle.X3,y:circle.Y3},{x:circle.X4,y:circle.Y4});
            break;
          case 'p3':
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circle.X3 = x;
            circle.Y3 = y;
            draw(x,y);
            draw(circle.X1,circle.Y1);
            draw(circle.X2,circle.Y2);
            draw(circle.X4,circle.Y4);
            drawBezier({x:circle.X1,y:circle.Y1},{x:circle.X2,y:circle.Y2},{x:x,y:y},{x:circle.X4,y:circle.Y4});
            break;
          case 'p4':
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circle.X4 = x;
            circle.Y4 = y;
            draw(x,y);
            draw(circle.X1,circle.Y1);
            draw(circle.X2,circle.Y2);
            draw(circle.X3,circle.Y3);
            drawBezier({x:circle.X1,y:circle.Y1},{x:circle.X2,y:circle.Y2},{x:circle.X3,y:circle.Y3},{x:x,y:y});
            break;
          default:
        }
    }
}

function init() {
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);

}


init();

 function bezier(t, p0, p1, p2, p3){
      var cX = 3 * (p1.x - p0.x),
          bX = 3 * (p2.x - p1.x) - cX,
          aX = p3.x - p0.x - cX - bX;

      var cY = 3 * (p1.y - p0.y),
          bY = 3 * (p2.y - p1.y) - cY,
          aY = p3.y - p0.y - cY - bY;

      var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
      var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

      return {x: x, y: y};
    }

    function drawBezier(p0,p1,p2,p3){
      var accuracy = 0.01; //this'll give the bezier 100 segments
           //use whatever points you want obviously
      ctx.moveTo(p0.x, p0.y);
      for (var i=0; i<1; i+=accuracy){
         var p = bezier(i, p0, p1, p2, p3);
         ctx.lineTo(p.x, p.y);
      }
      ctx.stroke()
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h1>Bezier Curve</h1>
      <Link to="/">back to Fractal</Link>
        <div class="circle">
          <canvas id="myCanvasCircle" width="500" height="500" style={{border:"1px solid #000000",marginTop:10}}>your browser does not support HTML5 canvas tag.</canvas>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reduxProps: state.yourReducer.yourContent
});

export default connect(mapStateToProps, {yourAction})(YourComponent);
