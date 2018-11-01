

var isFirstClick = true,
      lastMouseX = 0,
      lastMouseY = 0,
      polygons = 3,
      level = 1;

mouseEventHandler();

function mouseEventHandler()
{
  var canvas = document.getElementById('myCanvas'),
      context = canvas.getContext('2d');
  canvas.addEventListener("mousedown", function (e) {
      context.strokeStyle = "black";
      let x=e.pageX-8,y=e.pageY-60;
      context.fillRect(x,y,5,5);
      context.stroke();
        if(isFirstClick){
            lastMouseX = x;
            lastMouseY = y;
            isFirstClick = false;
        }else{
          let distantBetweenX = (x-lastMouseX)/3;
          let distantBetweenY = (y-lastMouseY)/3;
          init(context,level,lastMouseX,lastMouseY,parseInt(polygons)+1,distantBetweenX,distantBetweenY)
            lastMouseX = x;
            lastMouseY = y;
        }
  }, false);
}




function init(context,n,x,y,p,sideLength,sideLengthY)
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


function DropdownHandler(event)
{
    document.getElementById("select1").value=event.target.value;
    polygons = event.target.value;
}

function LevelHandler(event)
{
document.getElementById("select2").value=event.target.value;
level =event.target.value;
}
