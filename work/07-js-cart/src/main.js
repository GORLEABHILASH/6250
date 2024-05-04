

import model, { state } from './model';

import render from './render';
import { PAGES } from './constants';

const appEl = document.querySelector('#product');
const cartEl = document.querySelector('#cart');
appEl.addEventListener('click', (e) => {

  if (e.target.classList.contains('todo')) {
    const index = e.target.dataset.index;
    model.selectTodo(index);
    render(state, appEl);
    return;

  }
  if (e.target.classList.contains('done')) {
    const index = e.target.dataset.index;
    model.toggleDone(index);
    render(state, appEl);
    return;
  }

  if (e.target.classList.contains('add-to-cart')) {
    const index = e.target.dataset.index;
    model.addToCart(index);
    render(state, appEl, cartEl);
    return;
  }

  if (e.target.classList.contains('page')) {
    if (state.page === PAGES.cart) {
      model.setPage(PAGES.product);

    }
    else {
      model.setPage(e.target.dataset.target);
    }

    render(state, appEl, cartEl);
    return;
  }

});


appEl.addEventListener('submit', (e) => {

  if (e.target.classList.contains('add-task')) {
    e.preventDefault();

    const taskEl = document.querySelector('.new-task');
    const task = taskEl.value
    model.addTodo(task);
    taskEl.value = '';
    render(state, appEl);
  }

  if (e.target.classList.contains('update-task')) {
    e.preventDefault();
    const taskEl = document.querySelector('.updated-task');
    const index = e.target.dataset.index;
    model.updateTodo(index, taskEl.value);
    render(state, appEl);
    return;
  }

});





// Render Cart




cartEl.addEventListener('click', (e) => {

  if (e.target.classList.contains('todo')) {
    const index = e.target.dataset.index;
    model.selectTodo(index);
    render(state, appEl, cartEl);
    return;

  }
  if (e.target.classList.contains('done')) {
    const index = e.target.dataset.index;
    model.toggleDone(index);
    render(state, appEl, cartEl);
    return;
  }

  if (e.target.classList.contains('add-to-cart')) {
    const index = e.target.dataset.index;
    model.addToCart(index);
    render(state, appEl, cartEl);
    return;
  }

  if (e.target.classList.contains('checkout')) {

    model.setPage(PAGES.product);
    model.resetCart(state.cats);
    render(state, appEl, cartEl);
    return;
  }

  if (e.target.classList.contains('remove-cart')) {
    const index = e.target.dataset.index;
    model.removeQuantity(index);
    render(state, appEl, cartEl);
    return;
  }

  if (e.target.classList.contains('add-cart')) {

    const index = e.target.dataset.index;
    model.addQuantity(index);
    render(state, appEl, cartEl);
    return;
  }

});


cartEl.addEventListener('submit', (e) => {

  if (e.target.classList.contains('add-task')) {
    e.preventDefault();

    const taskEl = document.querySelector('.new-task');
    const task = taskEl.value
    model.addTodo(task);
    taskEl.value = '';
    render(state, appEl, cartEl);
  }

  if (e.target.classList.contains('update-task')) {
    e.preventDefault();
    const taskEl = document.querySelector('.updated-task');
    const index = e.target.dataset.index;
    model.updateTodo(index, taskEl.value);
    render(state, appEl, cartEl);
    return;
  }

});





render(state, appEl, cartEl);




