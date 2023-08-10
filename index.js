import { menuArray } from "./data.js";

let order = []

document.addEventListener("click", function (e) {
  ;
  if (e.target.dataset.add) {
    handleAddingProduct(e.target.dataset.add);
  } 
  else if (e.target.dataset.remove) {
    handleAddingProduct(e.target.dataset.remove);
  }
  });


function addSpace(arr) {
  arr = arr.toString();
  arr = arr.replace(/,/g, ", ");
  return arr;
}

function renderMenu() {
  const menuEl = document.getElementById("menu");
  let html = ``;
  menuArray.forEach((food) => {
    html += `
        <section class="food-container">

        <div>
        <h2>${food.emoji}</h2>
        </div>

        <div class='menu-description'>
        <h3>${food.name}</h3>
        <p>${addSpace(food.ingredients)}</p>
        <h5>$${food.price}</h5>
        </div>

        <div class="add-item" >
        <button class="plus" data-add="${food.id}">+</button>
        </div>
        </section>`;
  });
  menuEl.innerHTML = html;
}
renderMenu();

function handleAddingProduct(id) {
  const index = getItemForOrder(id);
  renderOrder(targetProductObj);
}

function renderOrder(product) {
  const orderEl = document.getElementById("order");
 order.push({...product});
 console.log(order);
let itemHtml = ``
let total = [];
order.forEach((item) => {
            total.push(item.price);
            itemHtml += 
            `<div data-order="${item.name}">
            <p>${item.name}</p>
            <button class="remove" data-remove="${item.name}">Remove</button>
            <p>$${item.price}</p>
            </div>`

})

let sum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let html = `<h3>Your order</h3>
                ${itemHtml}
            <hr />
            <p>Total price:</p>
            <p>$${sum}</p>
            <button id="complete-order" type="submit">Complete Order</button>`
  orderEl.innerHTML = html
}

function removeFromOrder(productId) {
  console.log(productId)
  // console.log(order)
  // order = order.filter(item => {
  //   console.log(item)
  //   item.name !== productName});
  order.filter((product) => {
    console.log(product.name)
    return product.name !== productId;
  });
  const orderEl = document.getElementById("order");
  console.log(order);
let itemHtml = ``
let total = [];
order.forEach((item) => {
            total.push(item.price);
            itemHtml += 
            `<div data-order="${item.name}">
            <p>${item.name}</p>
            <button class="remove" data-remove="${item.name}">Remove</button>
            <p>$${item.price}</p>
            </div>`

})

let sum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let html = `<h3>Your order</h3>
                ${itemHtml}
            <hr />
            <p>Total price:</p>
            <p>$${sum}</p>
            <button id="complete-order" type="submit">Complete Order</button>`
  orderEl.innerHTML = html

}

function getItemForOrder(id) {
  order.findIndex(item => item.id === Number(id))
}