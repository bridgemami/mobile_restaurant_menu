import { menuArray } from "./data.js";

let order = []


document.addEventListener("click", function (e) {
  ;
  if (e.target.dataset.add) {
    console.log(e.target.dataset.add)
    handleAddingToTheOrder(e.target.dataset.add);
  } 
  else if (e.target.dataset.remove) {
    handleDeletingFromTheOrder(e.target.dataset.remove);
  }
  });


function addSpace(arr) {
  arr = arr.toString();
  arr = arr.replace(/,/g, ", ");
  return arr;
}

function handleAddingToTheOrder (id) {
  const targetMenuItem = menuArray.filter(item => item.id === Number(id))[0];
  addToTheOrder(targetMenuItem)
   renderOrder()
}

function addToTheOrder (item) {
  order.push({...item})
}

function handleDeletingFromTheOrder (id) {
  const targetMenuItemIndex = getIndexFromOrder(id)
  console.log(targetMenuItemIndex)
  removeItemFromOrder(targetMenuItemIndex)
  
  renderOrder()
}

function removeItemFromOrder(index) {
  console.log(index)
  order.splice(index, 1);
}

function getIndexFromOrder(id) {
    return order.findIndex((item) => item.id === Number(id));
  }
  

function renderMenu() {
  const menuEl = document.getElementById("menu");
  let menuHtml = ``
  menuArray.forEach(food => {
    menuHtml += `
        <section class="food-container">

        <div>
        <h2>${food.emoji}</h2>
        </div>

        <div class='menu-description'>
        <h3>${food.name}</h3>
        <p>${addSpace(food.ingredients)}</p>
        <h5>$${food.price}</h5>
        </div>

        
        <button class="add" data-add="${food.id}">+</button>
        
        </section>`;
  });
  menuEl.innerHTML = menuHtml;
}
renderMenu()

function renderOrder() {
  const orderEl =document.getElementById('order'); 
  orderEl.innerHTML = `<h2>Your Order</h2>
                      <div>${ renderOrderItem()}</div>
                      <hr />
                      <h5>Total:</h5>
                      <p id="total">$${renderTotal()}</p>
                      <button id="order-btn">Complete Your Order</button>`

}

function renderOrderItem () {
  let orderItemsHtml = ``
  order.forEach((item) => {
   orderItemsHtml += `<p>${item.name}</p>
          <button class="remove" data-remove="${item.id}">Remove</button>
          <p>$${item.price}</p>
          ` 
})
return orderItemsHtml
}

function renderTotal () {
  let orderTotal =0
  order.forEach(price => orderTotal += price.price)
  return orderTotal
}