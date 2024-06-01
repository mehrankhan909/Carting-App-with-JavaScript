function topFunction() {
    document.documentElement.scrollTop = 0;
  }
const addNumber = document.querySelectorAll(".plus");
const subNumber = document.querySelectorAll(".minus");
const valueofCart = document.querySelector(".numbers");
const price = document.querySelector(".price");
const allitems = document.querySelector(".listing");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  return (allitems.innerHTML = obj.map((x) => {
    let {id, img, price, name, quantity} = x;
    let search = basket.find((y) =>{y.id === id}) || [];
      return `
      <li class="itemsstyle">
          <img src=${img} alt="">
          <h4>${name}</h4>
          <p class="doing">Price: <span class="price">${price}</span></p>
          <div class="carting">
              <button class="minus" onclick="decrement(${id})">-</button>
              <div class = "inputing" id = "${id}" style="color: white;">${search.quantity===undefined? 0: search.quantity}</div>
              <button class="plus" onclick="increment(${id})">+</button>
          </div>
      </li>
     `
  }).join(""))
}
generateShop();

let increment = (id) => {
  let select = id;
   let search = basket.find((x) => x.id === select.id);
   if(search === undefined){
    basket.push({
      id: select.id,
      quantity: 1
    })
   }
   else{
    search.quantity += 1;
   }
   update(select.id)
   localStorage.setItem("data", JSON.stringify(basket));
  
}
let decrement = (id) => {
  let select = id;
   let search = basket.find((x) => x.id === select.id);
   if(search=== undefined) return;
   else if(search.quantity === 0) return;
   else{
    search.quantity -= 1;
   }
   
   update(select.id)
   basket = basket.filter((x)=> x.quantity !== 0)
   localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.querySelector(`#${search.id}`).innerHTML = search.quantity;
  calculationUpdate();
  

}

let calculationUpdate = () => {
  let cartNumber = document.querySelector("#cartNumber");
  cartNumber.innerHTML = basket.map((x)=> x.quantity).reduce((x,y) => x+y,0);
}

calculationUpdate()
window.addEventListener('load', () => {
  let basketing = JSON.parse(localStorage.getItem('data'));
  basketing.forEach((item) => {
    const inputingElement = document.getElementById(item.id);
    inputingElement.innerHTML = item.quantity;
});
});