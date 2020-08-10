const cekkoin=(koin)=>{
    let output=0
    let pecahanKoin=0
    let cond=Math.floor(koin/250)
    
    if(cond==0){cond=1}
    else {cond=cond*10}

    for(x=1;koin>0;x++){
        if(koin<250)cond=1
        if(koin>=(25*cond)){pecahanKoin=25}
        else if(koin>=(10*cond)){pecahanKoin=10}
        else if(koin>=(5*cond)){pecahanKoin=5}
        else if(koin>=(1*cond)){pecahanKoin=1}

        for(x=1;koin>=(pecahanKoin*cond);x++){
            koin-=(pecahanKoin*cond)
            output+=(1*cond)
        }
    }
    return output
}

console.log(cekkoin(490000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000))