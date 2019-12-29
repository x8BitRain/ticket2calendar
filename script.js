var image = document.getElementById('image');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = image.width;
canvas.height = image.height;
ctx.drawImage(image, 
              0, 0, image.width, image.height,
              0, 0, canvas.width, canvas.height);

const scale = canvas.width / image.width;

function detect() {
  if (window.BarcodeDetector == undefined) {
    var footer = document.getElementsByTagName('footer')[0];
    footer.innerHTML = "Barcode Detection not supported";
    console.error('Barcode Detection not supported');
    return;
  }
  
  var barcodeDetector = new BarcodeDetector();
  barcodeDetector.detect(image)
    .then(barcodes => {
      // Draw the boxes on the <canvas>.
      var ctx = document.getElementById('canvas').getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      for(var i = 0; i < barcodes.length; i++) {
        ctx.rect(Math.floor(barcodes[i].boundingBox.x * scale), 
                 Math.floor(barcodes[i].boundingBox.y * scale),
                 Math.floor(barcodes[i].boundingBox.width * scale), 
                 Math.floor(barcodes[i].boundingBox.height * scale));
        ctx.stroke();
      }
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      for(var i = 0; i < barcodes.length; i++) {
        ctx.moveTo(Math.floor(barcodes[i].cornerPoints[0].x * scale), 
                   Math.floor(barcodes[i].cornerPoints[0].y * scale));
        ctx.lineTo(Math.floor(barcodes[i].cornerPoints[1].x * scale), 
                   Math.floor(barcodes[i].cornerPoints[1].y * scale));
        ctx.lineTo(Math.floor(barcodes[i].cornerPoints[2].x * scale), 
                   Math.floor(barcodes[i].cornerPoints[2].y * scale));
        ctx.lineTo(Math.floor(barcodes[i].cornerPoints[3].x * scale), 
                   Math.floor(barcodes[i].cornerPoints[3].y * scale));
        ctx.lineTo(Math.floor(barcodes[i].cornerPoints[0].x * scale), 
                   Math.floor(barcodes[i].cornerPoints[0].y * scale));
        ctx.stroke();
      }
      ctx.closePath();
    
      // Add the barcodes as strings to the <footer>
      var footer = document.getElementsByTagName('footer')[0];
      footer.innerHTML = 
          '<p>Detected ' + barcodes.length + ' barcodes</p><ul>';
      for(var i = 0; i < barcodes.length; i++) {
        footer.innerHTML += 
            '<li>@ (' + barcodes[i].boundingBox.x + ',' + 
            barcodes[i].boundingBox.y + '), size (' + 
            barcodes[i].boundingBox.width + 'x' + 
            barcodes[i].boundingBox.height + ')' + 
            '; rawValue=' + barcodes[i].rawValue + '</li>';
      }
      footer.innerHTML += '</ul>';
  
    }).catch((e) => {
      var footer = document.getElementsByTagName('footer')[0];
      footer.innerHTML = "Boo, Barcode Detection failed: " + e;
      console.error("Boo, Barcode Detection failed: " + e);
    })
}