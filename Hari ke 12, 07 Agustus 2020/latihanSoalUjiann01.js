const lelang=(a)=>{
    var output=parseInt(10000)
    for(x=1;x<=a;x++){
        if(x%4==0){
            output=Math.ceil(output*1.1)
        }else {
            output=Math.ceil(output*1.2)
        }
        if(output>=30000000){
            return output="Barang sudah terjual"
        }
    } return output
}
console.log(lelang(49))