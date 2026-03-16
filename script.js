let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
renderCart();
}

function addToCart(name,price,img){

let item = cart.find(p=>p.name===name);

if(item){
item.qty++;
}else{
cart.push({
name:name,
price:parseInt(price),
img:img,
qty:1
});
}

saveCart();
}

function renderCart(){

let dropdown = document.querySelector(".cart-dropdown");
if(!dropdown) return;

let html="";

if(cart.length===0){

html=`<p>Your cart is empty</p>
<button onclick="goCheckout()">GO TO CHECKOUT</button>`;

}else{

cart.forEach(item=>{
html+=`
<div class="cart-item">

<img src="${item.img}">

<div>
<p>${item.name}</p>
<span>$${item.price} x ${item.qty}</span>
</div>

</div>
`;
});

html+=`<button onclick="goCheckout()">GO TO CHECKOUT</button>`;

}

dropdown.innerHTML=html;

updateIcon();

}

function updateIcon(){

let icon=document.querySelector(".fa-bag-shopping");

if(!icon) return;

let count=cart.reduce((a,b)=>a+b.qty,0);

icon.setAttribute("data-count",count);

}

function goCheckout(){

window.location.href="card.html";

}

document.querySelectorAll(".product").forEach(product=>{

let name=product.querySelector(".info span").innerText;
let price=product.querySelector(".info span:last-child").innerText.replace("$","");
let img=product.querySelector("img").src;

product.querySelector(".add").onclick=()=>{

addToCart(name,price,img);

};

});

renderCart();