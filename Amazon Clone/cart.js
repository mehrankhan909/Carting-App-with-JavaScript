

let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")



let baskets = JSON.parse(localStorage.getItem("data")) || [];
let calculationUpdates = () => {
    let cartNumber = document.querySelector("#cartNumber");
    cartNumber.innerHTML = baskets.map((x)=> x.quantity).reduce((x,y) => x+y,0);
  }
let backtohome = () =>{
    window.location.href = "/shampoo.html";
}
calculationUpdates()
let generateCart = () => {
    if(baskets.length == 0){
        shoppingCart.innerHTML = `
        <div class="empty-cart">
            <h1 class = "cart-is-empty">Your Cart is Empty</h1>
            <button class="backtohome" onclick="backtohome()">Back to Home!</button>
        </div>
        `
    }
    else{
       return shoppingCart.innerHTML = baskets.map((x)=>{
        let {id, quantity} = x;
        let searches = obj.find((y) => y.id === id ) || [];
        return `<div class="cart-items" style="width: 350px;
        background: linear-gradient(45deg, #00a7bd, #ff5e00);
        margin: 20px auto;
        list-style: none;
        display: flex;
        padding: 10px 10px;
        justify-content: space-evenly;
        border-radius: 10px;
        height:150px;">
            <img style="
            height: 100px;" src=${searches.img} alt = ""/>
            <div class="details" style="width:250px;">
                <div class="title-price-x" style="position:relative;">
                    <h4 style="text-align: center;">
                        <p>${searches.name}</p>
                        <p class="anything"  style="width:60%; display:block; margin: 0 auto; text-align:center;border-radius: 3px; margin-top:10px; padding: 2px 3px;">Price: ${searches.price}</p>
                    </h4>
                    <i class="fa fa-close" style="color:white; position: absolute; right:0; top:0; cursor: pointer;" onclick="removeitem(${id})"></i>
                </div>
                <div class="carting1">
              <button class="minus" onclick="decrements(${id})">-</button>
              <div class = "inputing" id = "${id}" style="color: white;">${quantity}</div>
              <button class="plus" onclick="increments(${id})">+</button>
          </div>
                <div>
                <h4 style="text-align:center; margin-top: 5px; color: white;">${quantity * searches.price} / Pkr</h4>
                </div>
            </div>
        </div>`
       }).join("")
    }
    
}
generateCart();
let increments = (id) => {
    let select = id;
     let search = baskets.find((x) => x.id === select.id);
     if(search === undefined){
      baskets.push({
        id: select.id,
        quantity: 1
      })
     }
     else{
      search.quantity += 1;
     }
     updates(select.id)
     generateCart()
     localStorage.setItem("data", JSON.stringify(baskets));
    
}
let decrements = (id) => {
    let select = id;
     let search = baskets.find((x) => x.id === select.id);
     if(search=== undefined) return;
     else if(search.quantity === 0) return;
     else{
      search.quantity -= 1;
     }
     
     updates(select.id)
     baskets = baskets.filter((x)=> x.quantity !== 0);
     generateCart()
     localStorage.setItem("data", JSON.stringify(baskets));
}
  
let updates = (id) => {
    let search = baskets.find((x) => x.id === id);
    document.querySelector(`#${search.id}`).innerHTML = search.quantity;
    calculationUpdat();
    totalAmount();
}
let calculationUpdat = () => {
    let cartNumber = document.querySelector("#cartNumber");
    cartNumber.innerHTML = baskets.map((x)=> x.quantity).reduce((x,y) => x+y,0);
  }
  
let removeitem = (ide) =>{
    let selectsitem = ide;
    baskets = baskets.filter((x)=> x.id!== selectsitem.id);
    localStorage.setItem("data", JSON.stringify(baskets));
    generateCart();
    calculationUpdat();
    totalAmount()
}

let totalAmount = () => {
    if(baskets.length !== 0){
        let amount = baskets.map((x)=>{
            let {id, quantity} = x;
            let searches = obj.find((y) => y.id === id ) || [];
            return quantity * searches.price;
        }).reduce((x,y)=>x+y,0)
        label.innerHTML = `
        <h2>Total Amount: ${amount} / Pkr </h2>
        <button class="checkout">Checkout</button>
        <button class="removeAll" onclick="clearCart()">Clear cart</button>
        `;
    }
    else{
        return 0;
    }
}
totalAmount();
let clearCart = () =>{
    baskets = [];
    localStorage.setItem("data", JSON.stringify(baskets));
    generateCart();
    calculationUpdat();
    totalAmount()
}