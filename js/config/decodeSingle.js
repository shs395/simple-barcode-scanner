export function decodeSingleConfig(){
  return {
    decoder: {
      readers: [
        "code_128_reader",
          "ean_reader", 
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
      ]
    },
    locate: true, // try to locate the barcode in the image
    src: url 
  }
}