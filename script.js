var t = new SimpleTester();
var img;
var canvas = document.getElementById('cnvs');
var ctx = canvas.getContext('2d');
var globals = {};

function loadFile(){}


t.time('t1');
for (var i=0;i<100;i++)
{
    Math.pow(i,2)
}
console.log(t.time('t1') + 'ms')
/*function loadFile() {
    img = $('img')[0];
    const file = $('input')[0].files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      img.src = reader.result;
      $(img).on('load',transferToCanvas);
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}*/

function transferToCanvas()
{
    if (img.style.height > img.style.width)
        img.style.maxHeight = '50vh';
    else
        img.style.maxWidth = '50vw';

    canvas.height = img.height;
    canvas.width = img.width;;
    ctx.drawImage(img, 0, 0,img.width,img.height);

}

function hcurve(points=[],start=[0,0],dx=null,dy=null)
{
    var x = start[0];
    var y = start[1];

    if(points.length >= img.height*img.width)
        return points;
    if (!points.length)
    {
        dx = img.width;
        dy = img.height;
        var quarterHeight = img.height/4;
        var quaterWidth = img.width/4;
        points.concat([[quaterWidth,quarterHeight],[quaterWidth,3*quarterHeight],[3*quaterWidth,3*quarterHeight],[3*quaterWidth,quarterHeight]]);
    }
    //Get top left coordinates of each quadrant
    var coords = {
        tl:[x,y],
        tr:[x+dx/2,y],
        bl:[x,y+dy/2],
        br:[x+dx/2,y+dy/2]
    };
    //Get Point Rotations
    //var tl = points.map((p)=>{p+coords.tl});

    //Get Relative points in each quadrant
    //Connect them

    var result=[];
    return result.concat(
        hcurve(points,coords.bl,dx/2,dy/2),
        hcurve(points,coords.tl,dx/2,dy/2),
        hcurve(points,coords.tr,dx/2,dy/2),
        hcurve(points,coords.br,dx/2,dy/2)
    );


    
}
function rotatePoints(points,angle)
{

}

t.viewLog()