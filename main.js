let title =document.getElementsByClassName('title')[0];
let price =document.querySelector('.price');
let taxes =document.querySelector('.taxes');
let ads =document.querySelector('.ads');
let discount =document.querySelector('.discount');
let total =document.querySelector('.totalll');
let count =document.querySelector('.count');
let category =document.querySelector('.category');
let submmit =document.getElementById('submit');
let tablebody=document.getElementById('tablebody');
let deleteall=document.getElementById('deleteall');
let search=document.querySelector('.searchbar');
let counter;
let products;
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product);
}
else{
    products = [];
}
submit.onclick = function() {
    let newpro = { 
        title: title.value, 
        price: price.value, 
        taxes: taxes.value, 
        ads: ads.value, 
        discount: discount.value, 
        total: total.innerHTML, 
        count: count.value, 
        category: category.value,
    };
    
    if(submmit.innerHTML=='create'){
        if (price.value !== '' && title.value !== '') {
            if(count.value>1){
                for(let j=0;j<count.value;j++)
                {
                    products.push(newpro); 
                }
            }else{
                products.push(newpro); 
            }
            localStorage.setItem('product', JSON.stringify(products));
            clear();
            alert("Successful operation");
            show()
        } else {
            alert("Enter value");
        }
    }else{
        products[counter]=newpro;
        localStorage.setItem('product', JSON.stringify(products));
        clear();
        alert("Successful operation");
        show()
        submmit.innerHTML='create';
        count.style.display='block';
    }
}
let mood='searchbytitle';
function searchfunc(id){
    search.focus();
    console.log(id)
    if(id =="searchbytitle")
    {
        search.placeholder="search by title"
        mood='searchbytitle'
    }else{
        search.placeholder="search by category"
        mood='searchbycategory'
    }
    console.log(mood)
}
function searchtxt(value){
    let table=''
    if(mood=='searchbytitle')
    {
        for(let i=0;i<products.length;i++)
        {
            if(products[i].title.includes(value))
            {
                
                    table +=`<tr>
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].category}</td>
                                <td><button class="submmit" onclick="update(${i})">update</button></td>
                                <td><button class="submmit" onclick="deleteitem(${i})" >delete</button></td>
                            </tr>`
                            
            }
        }
    }else{
        for(let i=0;i<products.length;i++)
        {
            if(products[i].category.includes(value))
            {
                    
                    table +=`<tr>
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].category}</td>
                                <td><button class="submmit" onclick="update(${i})">update</button></td>
                                <td><button class="submmit" onclick="deleteitem(${i})" >delete</button></td>
                            </tr>`
                            
            }
        }
    }tablebody.innerHTML=table;
}
function show(){
    let table=''
    for(let i=0; i < products.length;i++){
        table +=`<tr>
                    <td>${i+1}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button class="submmit" onclick="update(${i})">update</button></td>
                    <td><button class="submmit" onclick="deleteitem(${i})" >delete</button></td>
                </tr>`
    };
    tablebody.innerHTML=table;
    if(products.length>0)
    {
        deleteall.innerHTML=`<button onclick="deletealll()" class="submmit">Delete All (${products.length})</button>`
    }else{
        deleteall.innerHTML=''
    }
}
show()
function deletealll(){
    products=[];
    localStorage.clear();
    show()
}
function deleteitem(i){
    products.splice(i,1);
    localStorage.product=products;
    show()
}
function update(i){
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    ads.value=products[i].ads;
    discount.value=products[i].discount;
    total.innerHTML=products[i].total;
    category.value=products[i].category;
    count.style.display='none';
    submmit.innerHTML='update';
    counter=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='Total: ';
}
function gettotal()
{
    if(price.value !='')
    {
        let result=+price.value+ +ads.value+ +taxes.value- +discount.value
        total.innerHTML='Total: ' + result
    }
    else
    {
        total.innerHTML='Total:'
    }    
}