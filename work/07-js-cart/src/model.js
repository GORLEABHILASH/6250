import { PAGES } from './constants';

export const state = {
   cats: [
      { name: 'Fluffball', price: '$0.99', done: false, quantity: 0, saleprice: 0 },
      { name: 'Snuggle', price: '$3.14', done: false, quantity: 0, saleprice: 0 },
      { name: 'Tinkerbell', price: '$2.73', done: false, quantity: 0, saleprice: 0 },
   ],
   totalquantity: 0,
   totalPrice: 0,
   page: PAGES.product,
}


function selectTodo(index) {
   state.selectedTodo = index;
}

function updateTodo(index, task) {
   state.todos[index].task = task;
   delete state.selectedTodo;
}

function toggleDone(index) {

   state.todos[index].done = !state.todos[index].done;

}

function addTodo(task) {

   state.todos.push({ task, done: false });

}


function deleteTodo(index) {

   state.todos.splice(index, 1);

}

function setPage(page) {
   state.page = page;
}

function addToCart(index) {
   state.cats[index].quantity = state.cats[index].quantity + 1;
   state.totalquantity = state.totalquantity + 1;
   state.cats[index].saleprice = getSalePrice(index);
   state.totalPrice = getTotalPrice(state.cats);
}


function addQuantity(index) {
   state.cats[index].quantity = state.cats[index].quantity + 1;
   state.totalquantity = state.totalquantity + 1;
   state.cats[index].saleprice = getSalePrice(index);
   state.totalPrice = getTotalPrice(state.cats);
}

function removeQuantity(index) {
   state.cats[index].quantity = state.cats[index].quantity - 1;
   state.totalquantity = state.totalquantity - 1;
   state.cats[index].saleprice = getSalePrice(index);
   state.totalPrice = getTotalPrice(state.cats);
}

function getTotalQuantity(cats) {
   let totalQuantity = 0;
   cats.forEach(cat => {
      totalQuantity += cat.quantity;
   });
   return totalQuantity;
}

function getSalePrice(index) {
   let salePrice = 0;

   salePrice = parseFloat(state.cats[index].price.replace('$', '')) * state.cats[index].quantity;


   return salePrice.toFixed(2);
}

function getTotalPrice(cats) {
   let totalPrice = 0;
   cats.forEach(cat => {
      totalPrice += parseFloat(cat.saleprice);
   });

   return totalPrice.toFixed(2);
}


function resetCart(cats) {

   cats.forEach(cat => {
      cat.quantity = 0;
      cat.salePrice = 0;

   });

   state.totalPrice = 0;
   state.totalquantity = 0;


}

export default {
   toggleDone, addTodo, deleteTodo, setPage,
   selectTodo, updateTodo, addToCart, getTotalQuantity,
   getSalePrice, getTotalPrice, resetCart,
   addQuantity, removeQuantity
};