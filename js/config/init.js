export function initConfig(){
  return { // config

    // -------- https://serratus.github.io/quaggaJS/ 에 내온 순서대로 정리 -------- 
    
    // numOfWorkers - 기본값 : 4 , web-workers 숫자, debug 하려면 0 이어야 함
    numOfWorkers : 4, 
    // locate - 인식된 바코드의 위치를 찾아주냐 마냐 (값이 true 여야 초록색 박스가 뜸)
    locate : true,
    // inputStream - 동영상과 관련한 설정
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#scanner'), //어디에 동영상을 띄워줄지
      constraints: {
          width: {ideal:1280},
          height: {ideal:720},            
          facingMode: "environment", // environment - 후면 , user - 전면
      }, 
      // area - 어떤 부분을 인식할지 , 퍼센트만큼 상쇄함
      area:{
        top : "30%",
        right : "0%",
        left : "0%",
        bottom : "30%"
      },
      // singleChannel - 기본값 : false , 디코더의 잘못된 동작을 디버그하려는 경우에만 관련이 있음
      singleChannel : false,
    },
    // freqeuncy - 1초에 몇 번 스캔할지
    frequency:2,
    // decoder
    //    readers - 어떤 종류의 바코드를 읽을 것인가
    //    debug - 기본값 : 4개다 false, for debugging/visualization purposes only.
    //    multiple - 여러 게 바코드 한 번에 인식할 수 있는지없는지 , return 값 - 객체로 된 배열
    decoder : {
      readers : [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
      ],
      debug: {
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: false,
        showPattern: false
      },
      multiple : false
    },
    // locator - locate 가 true 일 때만 관련 있음
    //    halfSample - 기본값 : true, 킬 경우 프로세싱 타임이 줄음, 바코드가 매우 작은 경우에는
    //                 꺼야 됨
    //    patchSize - 검색하는 박스를 작게할 지 크게할 지 (초록색 박스)
    //    debug - 기본값 : 모두 fault, 개발할 때 쓰자
    locator:{
      halfSample : false,
      patchSize: "medium", // x-small, small, medium, large, x-large
      // debug: {
      //   showCanvas: false,
      //   showPatches: false,
      //   showFoundPatches: false,
      //   showSkeleton: false,
      //   showLabels: false,
      //   showPatchLabels: false,
      //   showRemainingPatchLabels: false,
      //   boxFromPatches: {
      //     showTransformed: false,
      //     showTransformedBox: false,
      //     showBB: false
      //   }
      // }
      debug: {
          showCanvas: false,
          showPatches: false,
          showFoundPatches: false,
          showSkeleton: false,
          showLabels: false,
          showPatchLabels: false, //true 시 getContext error
          showRemainingPatchLabels: false,
          boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
          }
      }
    },
    // debug - 기본값 : false,  
    debug: false
  } // end of config
  
}
