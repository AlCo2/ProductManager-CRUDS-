let title = document.getElementById('title');
let price = document.getElementById('price');
let taxe = document.getElementById('taxe');
let disc = document.getElementById('disc');
let count = document.getElementById('count');
let type = document.getElementById('type');
let total = document.getElementById('total');
let create = document.getElementById('create');
let moral = 'create';
let king;
function totalcal(){
    if( price.value != ''){
        let result = (+price.value + +taxe.value) - +disc.value
        total.innerHTML = result
        total.style.background = 'green'
    }else{
     total.innerHTML = ''   
     total.style.background = ''
    }
}
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}
create.onclick = function(){
    let product = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxe:taxe.value,
        discount:disc.value,
        total:total.innerHTML,
        count:count.value,
        type:type.value.toLowerCase(),
    }
   if(moral === 'create'){ 
    if(product.count > 1){
        for(i = 0; i < product.count ; i++){
            dataProduct.push(product);
        }
    }else{
        dataProduct.push(product)
    }
    }else{
        dataProduct[king]= product
        moral = 'create';
        create.innerHTML = 'create';
        count.style.display = 'block'  
    }
    localStorage.setItem('product', JSON.stringify(dataProduct))
    cleardata()
    showdata()
}
function cleardata(){
    title.value = '';
    price.value = '';
    taxe.value = '';
    disc.value = '';
    count.value = '';
    type.value = '';
    total.innerHTML = '';
}
function showdata(){
    let table = '';
    totalcal()
    for(let i = 0; i < dataProduct.length;i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxe}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].type}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
        </tr>          
        `
    }
    document.getElementById('tbody').innerHTML = table; 
    let btndelete = document.getElementById('deleteall')
    if(dataProduct.length > 0){
        btndelete.innerHTML = `
        <button onclick="deleteall()" >DeleteAll(${dataProduct.length})</button>
        `   
    }else{
        btndelete.innerHTML = ''
    }
}
showdata()
function deletedata(i){
    dataProduct.splice(i,1)
    localStorage.product = JSON.stringify(dataProduct)
    showdata()
}
function deleteall(){
    localStorage.clear()
    dataProduct.splice(0)
    showdata()
}
function updatedata(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxe.value = dataProduct[i].taxe;
    disc.value = dataProduct[i].discount;
    type.value = dataProduct[i].type;
    totalcal()
    count.style.display = 'none'; 
    create.innerHTML = 'update';
    moral = 'update';
    king = i;
    scroll({
        top:0
    })
}
let searchmood = 'title';
function getsearchmood(id){
    let search = document.getElementById('search')
    if(id == 'searchbtn'){
        searchmood = 'title';
        search.placeholder = 'search By Title';
    }else{
        searchmood = 'typee';
        search.placeholder = 'search by type';
    }
    search.focus()
    search.value = '';
    showdata()
}
function searchdata(value){
    let table ='';
    if(searchmood == 'title')
    {
        for(let i = 0 ; i < dataProduct.length ; i++){
            if(dataProduct[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxe}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].type}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>          
            `
            }
        }
    }else{
        for(let i = 0 ; i < dataProduct.length ; i++){
            if(dataProduct[i].type.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxe}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].type}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>          
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}