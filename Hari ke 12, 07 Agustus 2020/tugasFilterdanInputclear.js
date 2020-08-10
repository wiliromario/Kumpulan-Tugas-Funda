class product{
    constructor(idProduct,name,price,category,stock){
        this.idProduct=idProduct;this.name=name;this.price=price;this.category=category;this.stock=stock
    }
}
class cart{
    constructor(idProduct,category,name,price){
        this.idProduct=idProduct;this.category=category;this.name=name;this.price=price
    }
}
let dataProduct=[
    new product(1579581080923,"Apple iPhone 11 64GB, Black",12799000,"Smartphone",20),
    new product(1579581081130,"Apple iPhone 11 Pro 256GB, Midnight Green",20999000,"Smartphone",30),
    new product(1579581081342,"Samsung Galaxy Watch Active2 (44mm) Aluminium Black", 3699000,"Smartwatch",10),
    new product(1579581081577,"Asus ROG Strix HERO III (G531GU-I766H1T) - Metal Black",22999000,"Laptop",5)
]
let arrCategory=["All","Smartwatch","Smartphone","Laptop"]
let render=document.getElementById("render")
arrFilter=[],arrCart=[],arrIndexCart=[]
var outputPayment=""
var keyEditDeleteBeforeAdd=false

const funFilter=()=>{
    let inputName=(document.getElementById("keyword").value).toLowerCase()
    let inputCategory=document.getElementById("categoryFilter").value
    if (inputCategory=="All")inputCategory=""
    let inputPriceMin=document.getElementById("min").value || 0
    let inputPriceMax=document.getElementById("max").value || maxPrice(dataProduct)
    
    arrFilter=dataProduct.filter((val)=>{
        filterTrue=((val.name).toLowerCase()).includes(inputName) && val.category.includes(inputCategory) && (inputPriceMin<=val.price&&val.price<=inputPriceMax)
        return filterTrue
    })
    dataRender(arrFilter)
}
const funInputData=()=>{
    let nameInput=document.getElementById("nameInput").value
    // Crosscheck double name nanti di sini
    let priceInput=parseInt(document.getElementById("priceInput").value)
    let categoryInput=document.getElementById("categoryInput").value
    let stockInput=document.getElementById("stockInput").value
    if(!(nameInput&&priceInput&&categoryInput&&stockInput)){alert("Semua harus di isi");return} // Semua harus di isi
    let addId=new Date().getTime()
    let addDataProduct= new product(addId,nameInput,priceInput,categoryInput,stockInput)
    dataProduct.push(addDataProduct)
    arrFilter=[]
    dataRender()
}
const maxPrice=(arrToFilter)=>{
    var array=[]
    for(x=0;x<=arrToFilter.length-1;x++){
        array.push(arrToFilter[x].price)
    }
    var maxPrice=Math.max(...array)
    return maxPrice
}
const renderCategory=()=>{
    outputCategory=arrCategory.map((val)=>{
        return (
            `<option value="${val}">${val}</option>`
        )
    })
    document.getElementById("categoryFilter").innerHTML=outputCategory  // untuk category Filter, termasuk "All"
    outputCategory.splice(0,1)                                          // untuk category input, hilangkan "All"
    document.getElementById("categoryInput").innerHTML=outputCategory
}
const dataRender=(arr=dataProduct)=>{
    render.innerHTML=arr.map((val,index)=>{
        return(
            `<tr>
                <td>${index+1}</td>
                <td>${val.idProduct}</td>
                <td id="categoryEdit${index}">${val.category}</td>
                <td id="nameEdit${index}">${val.name}</td>
                <td id="priceEdit${index}">${funBecomeWhatIWantThanks(val.price)}</td>
                <td id="stockEdit${index}">${val.stock}</td>
                <td><button onclick="funAddToCart(${index})">Add</button></td>
                <td id="saveOrDelete${index}"><button onclick=funEdit(${val.idProduct},"kick") value="${val.name}">Delete</button></td>
                <td id="editOrCancel${index}"><button onClick=funEdit(${val.idProduct},"edit") value="${val.name}">Edit</button></td>
            </tr>
            `
        )
    }).join("")
}
const funDelete=(indexDataProduct,indexFilter)=>{
    event.preventDefault()
    if(arrFilter.length==0){
        dataProduct.splice(indexDataProduct,1)
        dataRender(dataProduct)
    }
    if(arrFilter.length>0){
        dataProduct.splice(indexDataProduct,1)
        arrFilter.splice(indexFilter,1)
        dataRender(arrFilter)
    }
    if(arrCart.length>0){
        for(x=arrIndexCart.length-1;x>=0;x--){
            arrCart.splice(arrIndexCart[x],1)
        }
        funRenderCart()
    }
    keyEditDeleteBeforeAdd=false
}
const funEdit=(edit, condition)=>{
    event.preventDefault()
    keyEditDeleteBeforeAdd=true
    // Get dulu index/urutan yang mau di edit didalam array default dan
    // atau arrFilter jika sedang melakukan filter dan arrCart jika ada
    for(x=0;x<=dataProduct.length-1;x++){
        if(dataProduct[x].idProduct.toString().includes(edit)){
            indexOfEditDataProduct=x
            outputCategoryEdit=""
            for(y=0;y<=arrCategory.length-1;y++){
                if(arrCategory[y]==dataProduct[indexOfEditDataProduct].category){
                    outputCategoryEdit+=`<option value="${arrCategory[y]}" selected>${arrCategory[y]}`
                } else {
                    outputCategoryEdit+=`<option value="${arrCategory[y]}">${arrCategory[y]}`
                }
            }
        }
    }
    if (arrFilter.length>0){
        for(z=0;z<=arrFilter.length-1;z++){
            if(arrFilter[z].idProduct.toString().includes(edit)){
                indexOfEditArrFilter=z
                outputCategoryEdit=""
                for(y=0;y<=arrCategory.length-1;y++){
                    if(arrCategory[y]==dataProduct[indexOfEditArrFilter].category){
                        outputCategoryEdit+=`<option value="${arrCategory[y]}" selected>${arrCategory[y]}`
                    } else {
                        outputCategoryEdit+=`<option value="${arrCategory[y]}">${arrCategory[y]}`
                    }
                }
            }
        }
    }
    if (arrCart.length>0){
        arrIndexCart=[]
        for(z=0;z<=arrCart.length-1;z++){
            if(arrCart[z].idProduct.toString().includes(edit)){
                arrIndexCart.push(z)
            }
        }
    }
    if (arrFilter.length==0 && condition=="edit"){
        document.getElementById(`categoryEdit${indexOfEditDataProduct}`).innerHTML=`<select id="categoryEdit">${outputCategoryEdit}</select>`
        document.getElementById(`nameEdit${indexOfEditDataProduct}`).innerHTML=`<input type="text" id="nameEdit" value="${dataProduct[indexOfEditDataProduct].name}">`
        document.getElementById(`priceEdit${indexOfEditDataProduct}`).innerHTML=`<input type="number" id="priceEdit" value="${funBecomeWhatIWantThanks(dataProduct[indexOfEditDataProduct].price)}">`
        document.getElementById(`stockEdit${indexOfEditDataProduct}`).innerHTML=`<input type="number" id="stockEdit" value="${dataProduct[indexOfEditDataProduct].stock}">`
        document.getElementById(`saveOrDelete${indexOfEditDataProduct}`).innerHTML=`<button onclick=funSave(this.value,this.name) name="" value="${indexOfEditDataProduct}">Save</button>`
        document.getElementById(`editOrCancel${indexOfEditDataProduct}`).innerHTML=`<button onclick=funCancel(this.value,this.name) name="" value="${indexOfEditDataProduct}">Cancel</button>`
    }
    if (arrFilter.length>0 && condition=="edit"){
        document.getElementById(`categoryEdit${indexOfEditArrFilter}`).innerHTML=`<select id="categoryEdit">${outputCategoryEdit}</select>`
        document.getElementById(`nameEdit${indexOfEditArrFilter}`).innerHTML=`<input type="text" id="nameEdit" value="${arrFilter[indexOfEditArrFilter].name}">`
        document.getElementById(`priceEdit${indexOfEditArrFilter}`).innerHTML=`<input type="number" id="priceEdit" value="${funBecomeWhatIWantThanks(arrFilter[indexOfEditArrFilter].price)}">`
        document.getElementById(`stockEdit${indexOfEditArrFilter}`).innerHTML=`<input type="number" id="stockEdit" value="${arrFilter[indexOfEditArrFilter].stock}">`
        document.getElementById(`saveOrDelete${indexOfEditArrFilter}`).innerHTML=`<button onclick=funSave(this.value,this.name) name="${indexOfEditArrFilter}" value="${indexOfEditDataProduct}">Save</button>`
        document.getElementById(`editOrCancel${indexOfEditArrFilter}`).innerHTML=`<button onclick=funCancel(this.value,this.name) name="${indexOfEditArrFilter}" value="${indexOfEditDataProduct}">Cancel</button>`
    }
    if (arrFilter.length==0 && condition=="kick"){
        document.getElementById(`saveOrDelete${indexOfEditDataProduct}`).innerHTML=`<button onclick=funDelete(${indexOfEditDataProduct}) name="" value="${indexOfEditDataProduct}">Yakin Delete</button>`
        document.getElementById(`editOrCancel${indexOfEditDataProduct}`).innerHTML=`<button onclick=funCancel(${indexOfEditDataProduct},${indexOfEditDataProduct},"delete") name="" value="${indexOfEditDataProduct}">Cancel</button>`
    }
    if (arrFilter.length>0 && condition=="kick"){
        document.getElementById(`saveOrDelete${indexOfEditArrFilter}`).innerHTML=`<button onclick=funDelete(${indexOfEditDataProduct},${indexOfEditArrFilter}) name="" value="${indexOfEditArrFilter}">Yakin Delete</button>`
        document.getElementById(`editOrCancel${indexOfEditArrFilter}`).innerHTML=`<button onclick=funCancel(${indexOfEditDataProduct},${indexOfEditArrFilter},"delete") name="" value="${indexOfEditArrFilter}">Cancel</button>`
    }
}
const funSave=(inDefault,inFilter)=>{
    event.preventDefault()
    
    if(arrFilter.length==0){
        dataProduct[inDefault].name=document.getElementById("nameEdit").value
        // Crosscheck double name nanti di sini
        dataProduct[inDefault].price=document.getElementById("priceEdit").value
        dataProduct[inDefault].category=document.getElementById("categoryEdit").value
        dataProduct[inDefault].stock=document.getElementById("stockEdit").value
        if(!(nameInput&&priceInput&&categoryInput&&stockInput)){alert("Semua harus di isi");return}
        dataRender()
    }
    if(arrFilter.length>0){
        dataProduct[inFilter].name=document.getElementById("nameEdit").value
        // Crosscheck double name nanti di sini
        dataProduct[inFilter].price=document.getElementById("priceEdit").value
        dataProduct[inFilter].category=document.getElementById("categoryEdit").value
        dataProduct[inFilter].stock=document.getElementById("stockEdit").value
        if(!(nameInput&&priceInput&&categoryInput&&stockInput)){alert("Semua harus di isi");return}
        dataRender(arrFilter)
    }
    keyEditDeleteBeforeAdd=false
}
const funCancel=(inDefault,inFilter,condition)=>{
    event.preventDefault()
    keyEditDeleteBeforeAdd=false
    
    if(arrFilter.length==0){
        dataProduct[inDefault].name=dataProduct[inDefault].name
        dataProduct[inDefault].price=dataProduct[inDefault].price
        dataProduct[inDefault].category=dataProduct[inDefault].category
        dataProduct[inDefault].stock=dataProduct[inDefault].stock
        if(!(nameInput&&priceInput&&categoryInput&&stockInput)){alert("Semua harus di isi");return}
        dataRender()
    }
    if(arrFilter.length>0){
        dataProduct[inFilter].name=dataProduct[inFilter].name
        dataProduct[inFilter].price=dataProduct[inFilter].price
        dataProduct[inFilter].category=dataProduct[inFilter].category
        dataProduct[inFilter].stock=dataProduct[inFilter].stock
        if(!(nameInput&&priceInput&&categoryInput&&stockInput)){alert("Semua harus di isi");return}
        dataRender(arrFilter)
    }
    if(arrFilter.length==0 && condition=="delete"){
        dataRender(dataProduct)}
    if(arrFilter.length>0 && condition=="delete"){
        dataRender(arrFilter)}
}
const funAddToCart=(getIndex)=>{
    event.preventDefault()
    if(keyEditDeleteBeforeAdd){alert("Selesaikan edit atau hapus dulu. Kalau batal, pilih cancel. Baru dah bisa add ke keranjang");return}
    if(arrFilter==0){
        arrCart.push(new cart(dataProduct[getIndex].idProduct,dataProduct[getIndex].category,dataProduct[getIndex].name,dataProduct[getIndex].price))
    } else{
        arrCart.push(new cart(arrFilter[getIndex].idProduct,arrFilter[getIndex].category,arrFilter[getIndex].name,arrFilter[getIndex].price))
    }
    funRenderCart()
}
const funRenderCart=()=>{
    document.getElementById("renderCart").innerHTML=arrCart.map((val,index)=>{
        return(
            `<tr>
                <td>${index+1}</td>
                <td>${val.idProduct}</td>
                <td>${val.category}</td>
                <td>${val.name}</td>
                <td>${funBecomeWhatIWantThanks(val.price)}</td>
                
                <td><button onclick=funDelCart(${index})>Delete</button></td>
            </tr>
            `
        )
    }).join("")
    if(outputPayment!=="")document.getElementById("renderPayment").innerHTML=""
}
const funDelCart=(getIndex)=>{
    event.preventDefault()
    arrCart.splice(getIndex,1)
    funRenderCart()
}
const funCalculateTotal=()=>{
    subTotal=0
    
    for(x=0;x<=arrCart.length-1;x++){
        subTotal+=arrCart[x].price
    } 
    ppn=0.01*subTotal
    total=subTotal+ppn
    
}
const funPayment=()=>{
    event.preventDefault()
    if (arrCart.length==0){alert("Keranjang Kosong");return}
    funCalculateTotal()
    outputPayment=`<h3>Transaction Detail</h3>`
    outputPayment+=arrCart.map((val)=>{
        return(
            `<p>${val.idProduct} | ${val.category} | ${val.name} | ${funBecomeWhatIWantThanks(val.price)}</p>`
        )
    }).join("")
    outputPayment+=`<h3>Sub Total ${funBecomeWhatIWantThanks(subTotal)}</h3>
                    <h3>PPN ${funBecomeWhatIWantThanks(ppn)}</h3>
                    <h3>Total ${funBecomeWhatIWantThanks(total)}</h3>
    `
    document.getElementById("renderPayment").innerHTML=outputPayment
    document.getElementById("renderPayment").scrollIntoView()

}
const funBecomeWhatIWantThanks=(price)=>{
    var numberFormat = Intl.NumberFormat();
    outputFormatPrice=`Rp ${numberFormat.format(price)}.00`
    return outputFormatPrice
}

renderCategory()
dataRender()
