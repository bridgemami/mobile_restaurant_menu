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

