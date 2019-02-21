import { initConfig } from './config/init.js';
import { decodeSingleConfig } from './config/decodeSingle.js';

function startScanner(){  
  document.querySelector("#image-view").style.display = 'none';
  document.querySelector("#scanner-view").style.display = 'block';

  Quagga.init(initConfig()
  , function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

  Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay;
      
      
      var canvas = document.querySelector('canvas');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;

      // drawPathCenter -> 화면 중앙에 선 긋기
      Quagga.ImageDebug.drawPathCenter(centerX, centerY, drawingCtx, { color: 'red', lineWidth: 5 })
      
      //**************** 인식되고 있는 바코드에 박스표시 해주기 ****************
      // var drawingCanvas = Quagga.canvas.dom.overlay;
      // if (result) {
      //     Quagga.ImageDebug.drawPathCenter(centerX, centerY, drawingCtx, { color: 'blue', lineWidth: 5 })
      //     if (result.boxes) {
      //         drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
      //         result.boxes.filter(function (box) {
      //             return box !== result.box;
      //         }).forEach(function (box) {
      //             Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
      //         });
      //     }

      //     if (result.box) {
      //         Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
      //     }

      //     if (result.codeResult && result.codeResult.code) {
      //         Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
      //     }
      // }
      //**************************************************************

      if(result){
        Quagga.ImageDebug.drawPathCenter(centerX, centerY, drawingCtx, { color: 'green', lineWidth: 5 })
      }
  });

  Quagga.onDetected(function (result) {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
      alert("바코드 유형 - " + result.codeResult.format + "\n" + "바코드 결과 - " + result.codeResult.code)
      Quagga.stop()
      Quagga.offProcessed()
      Quagga.offDetected()
      startScanner()
  });
}

function decodeImage(imageFile){
  document.querySelector("#scanner-view").style.display = 'none';
  document.querySelector("#image-view").style.display = 'block';
  Quagga.stop()
  Quagga.offProcessed()
  Quagga.offDetected()

  var staticImg =  document.querySelector("#selected-image")
  var file = imageFile.target.files[0]; 
  var url = URL.createObjectURL(file);
  staticImg.src = url

  Quagga.decodeSingle(decodeSingleConfig()
  , function(result){
    if(result){
      if(result.codeResult) {
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        alert("바코드 유형 - [" + result.codeResult.format + "]\n" + "바코드 결과 - [" + result.codeResult.code + "]")
      }else{
        console.log("not detected");
        alert("바코드 결과가 없습니다.\n다른 사진을 이용해주세요.")
      }
    }else{
      console.log("not detected");
      alert("바코드 결과가 없습니다.\n다른 사진을 이용해주세요.")
    }
  });
}


//화면 로드될 때
window.addEventListener("load", startScanner, false);

//파일 선택할 때
document.querySelector("#select-image").addEventListener('change', function(imageFile) {
  decodeImage(imageFile)
})

//파일 선택 후 돌아가기 버튼 누를 때
document.querySelector("#restart-scanner-btn").addEventListener('click',()=>{
  startScanner()
})