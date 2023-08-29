import { menuArray } from "./data.js";

let order = [];
const paymentEl = document.getElementById("payment");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    console.log(e.target.dataset.add);
    handleAddingToTheOrder(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleDeletingFromTheOrder(e.target.dataset.remove);
  } else if (e.target.id === "order-btn") {
    renderPayment(e);
  }
  else if(e.target.id === "close"){
    paymentEl.classList.toggle("hide");
  }
  else if(e.target.id === "payment-submitted") {
    e.preventDefault();
    paymentRequirements(e)
    console.log(order.length)
  }
});


function addSpace(arr) {
  
  let foodItems = arr.map(ingredient => ingredient).join(", ");
  return foodItems
}

function handleAddingToTheOrder(id) {
  const targetMenuItem = menuArray.filter((item) => item.id === Number(id))[0];
  addToTheOrder(targetMenuItem);
  renderOrder();
}

function addToTheOrder(item) {
  order.push({ ...item });
}

function handleDeletingFromTheOrder(id) {
  const targetMenuItemIndex = getIndexFromOrder(id);
  console.log(targetMenuItemIndex);
  removeItemFromOrder(targetMenuItemIndex);

  renderOrder();
}

function removeItemFromOrder(index) {
  console.log(index);
  order.splice(index, 1);
}

function getIndexFromOrder(id) {
  return order.findIndex((item) => item.id === Number(id));
}

function renderMenu() {
  const menuEl = document.getElementById("menu");
  let menuHtml = ``;
  menuArray.forEach((food) => {
    menuHtml += `
        <section class="food-container">

        <div>
        <h2>${food.emoji}</h2>
        </div>

        <div class='menu-description'>
        <h3>${food.name}</h3>
        <p class="grey">${addSpace(food.ingredients)}</p>
        <h5>$${food.price}</h5>
        </div>

        
        <button class="add" data-add="${food.id}">+</button>
        
        </section>`;
  });
  menuEl.innerHTML = menuHtml;
}
renderMenu();

function renderOrder() {
  const orderEl = document.getElementById("order");
  if (order.length > 0) {
    orderEl.innerHTML = `<h2>Your Order</h2>
                      <div>${renderOrderItem()}</div>
                      <hr />
                      <div class="total-container">
                      <p>Total:<p>
                      <p id="total">$${renderTotal()}</p>
                      </div>
                      <button id="order-btn" class="btn-green" type="submit">Complete Order</button>`;
  } else {
    orderEl.innerHTML = ``;
  }
}

function renderOrderItem() {
  let orderItemsHtml = ``;
  order.forEach((item) => {
    orderItemsHtml += `<div class="order-items">
    <div class="order-item">
    <p>${item.name}</p>
        <div class="btn-container">
          <button class="remove-btn grey" data-remove="${item.id}">remove</button>
          </div>
          </div>
          <p>$${item.price}</p></div>
          `;
  });
  return orderItemsHtml;
}

function renderTotal() {
  let orderTotal = 0;
  order.forEach((price) => (orderTotal += price.price));
  return orderTotal;
}

function renderPayment(e) {
  e.preventDefault();
  const paymentEl =document.getElementById('payment');
  paymentEl.innerHTML = `<h3>Enter card details</h3>
  <p id="close">x</p>
<form id="payment-form" class="form">
<input type="text" name="name" placeholder="Enter your name" id="name" required />
<input type="text" name="credit-card-number" placeholder="Enter credit card number" id="credit-card" required />
<input type="text" name="credit-card-cvv" placeholder="Enter credit CVV" id="ccv" required />
<button type="submit" name="payment" id="payment-submitted" class="btn-green"/>Pay</button>
</form>`
 paymentEl.classList.add("payment")
 paymentEl.classList.toggle("hide")
}


function paymentRequirements (e) {
  const nameEl = document.getElementById("name")
  const creditCardEl = document.getElementById("credit-card")
  const cvvEl = document.getElementById("ccv")
  if(nameEl.value.length > 2 && creditCardEl.value.length === 16 && cvvEl.value.length === 3) {
    document.querySelector("body").innerHTML = `<h2>Thank you ${nameEl.value} for your order!</h2>
                                                <p>It should ready in ${10 * order.length} minutes.</p>
                                                <p>The page will automatically go back to the ordering page in 20 seconds.</p>
    `
    setTimeout(() => location.reload(), 20000);
  }

}
