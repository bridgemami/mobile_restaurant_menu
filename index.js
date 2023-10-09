import { menuArray } from "./data.js";

let order = [];
const paymentEl = document.getElementById("payment");
const headerEl = document.getElementById("header");
const menuEl = document.getElementById("menu");
const orderEl = document.getElementById("order");

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
    togglePaymentVisibility()
  }
  else if(e.target.id === "payment-submitted") {
    e.preventDefault();
    paymentRequirements(e)
    console.log(order.length)
  }
});

function togglePaymentVisibility () {
 paymentEl.classList.toggle("hide")
 orderEl.classList.toggle("whiteout")
 menuEl.classList.toggle("whiteout")
 headerEl.classList.toggle("whiteout")
}

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
  if (order.length > 0) {
    orderEl.innerHTML = `<h2>Your Order</h2>
                      <div>${renderOrderItem()}</div>
                      <hr />
                      <div class="total-container" id="total-container">
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
<p id="missing"></p>
</form>`
document.getElementById("total-container").scrollIntoView()
 paymentEl.classList.add("payment")
 togglePaymentVisibility()
}


function paymentRequirements (e) {
  const missingEl =document.getElementById("missing")
  const nameEl = document.getElementById("name")
  const creditCardEl = document.getElementById("credit-card")
  const cvvEl = document.getElementById("ccv")
  if(nameEl.value.length > 2 && creditCardEl.value.length === 16 && cvvEl.value.length === 3) {
    document.querySelector("body").innerHTML = `<h2>Thank you ${nameEl.value} for your order!</h2>
                                                <p>It should ready in ${10 * order.length} minutes.</p>
                                                <p>The page will automatically go back to the ordering page in 10 seconds.</p>
    `
    setTimeout(() => location.reload(), 10000);
  }
  else if (nameEl.value.length < 2 ) {
      if(creditCardEl.value.length < 16  || creditCardEl.value.length > 16) {
        missingEl.innerHTML = ''
        missingEl.innerHTML = `<p>Please enter your 16 digit credit card number and name with more than 2 letters</p>`
      }

      else if(cvvEl.value.length >3 || cvvEl.value.length < 3) {
        missingEl.innerHTML = ''
        missingEl.innerHTML = `<p>Please enter your 3 digit credit card cvv code and name with more than 2 letters</p>`
      }
    else{
      missingEl.innerHTML = ''
      missingEl.innerHTML = `<p>Please enter name with more than 2 letters</p>`
    }
  }
    else if (creditCardEl.value.length < 16  || creditCardEl.value.length > 16) {
        if(cvvEl.value.length >3 || cvvEl.value.length < 3) {
          missingEl.innerHTML = ''
          missingEl.innerHTML = `<p>Please enter your 16 digit credit card number and 3 digit credit card cvv code</p>`

        }
        else {
          missingEl.innerHTML = ''
          missingEl.innerHTML = '<p>Please enter your 16 digit credit card number</p>'
        }
    }

    else if(cvvEl.value.length >3 || cvvEl.value.length < 3){
      missingEl.innerHTML = ''
      missingEl.innerHTML = '<p>Please enter your 3 digit credit card cvv code</p>'
    }
  
  else {
    missingEl.innerHTML = ''
    missingEl.innerHTML = `<p>Please enter all the information</p>`
  }

}
