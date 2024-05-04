/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGES: () => (/* binding */ PAGES)
/* harmony export */ });
var PAGES = {
  product: 'product',
  cart: 'cart'
};

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  cats: [{
    name: 'Fluffball',
    price: '$0.99',
    done: false,
    quantity: 0,
    saleprice: 0
  }, {
    name: 'Snuggle',
    price: '$3.14',
    done: false,
    quantity: 0,
    saleprice: 0
  }, {
    name: 'Tinkerbell',
    price: '$2.73',
    done: false,
    quantity: 0,
    saleprice: 0
  }],
  totalquantity: 0,
  totalPrice: 0,
  page: _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.product
};
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
  state.todos.push({
    task: task,
    done: false
  });
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
  var totalQuantity = 0;
  cats.forEach(function (cat) {
    totalQuantity += cat.quantity;
  });
  return totalQuantity;
}
function getSalePrice(index) {
  var salePrice = 0;
  salePrice = parseFloat(state.cats[index].price.replace('$', '')) * state.cats[index].quantity;
  return salePrice.toFixed(2);
}
function getTotalPrice(cats) {
  var totalPrice = 0;
  cats.forEach(function (cat) {
    totalPrice += parseFloat(cat.saleprice);
  });
  return totalPrice.toFixed(2);
}
function resetCart(cats) {
  cats.forEach(function (cat) {
    cat.quantity = 0;
    cat.salePrice = 0;
  });
  state.totalPrice = 0;
  state.totalquantity = 0;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  toggleDone: toggleDone,
  addTodo: addTodo,
  deleteTodo: deleteTodo,
  setPage: setPage,
  selectTodo: selectTodo,
  updateTodo: updateTodo,
  addToCart: addToCart,
  getTotalQuantity: getTotalQuantity,
  getSalePrice: getSalePrice,
  getTotalPrice: getTotalPrice,
  resetCart: resetCart,
  addQuantity: addQuantity,
  removeQuantity: removeQuantity
});

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function render(state, appEl, cartEl) {
  if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.product) {
    renderCats(state, appEl);
    resetCart(cartEl);
  }
  if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.cart) {
    renderCats(state, appEl);
    renderCart(state, cartEl);
  }
}
function generateListHtml(state) {
  var listHtml = state.cats.map(function (cat, index) {
    var doneClass = cat.done ? 'complete' : '';
    return "\n    \n    <li class=\"product-list\">\n     <label class=\"product\">\n        <img class=\"cat_logo\" src=\"http://placekitten.com/150/150?image=".concat(index + 1, "\" alt=\"picture of cute looking cat\" />\n        <span  data-index=\"").concat(index, "\" class =\"todo ").concat(doneClass, "\"> ").concat(cat.name, " </span>\n        <span  data-index=\"").concat(index, "\" class =\"price\"> ").concat(cat.price, " </span>\n    </label>\n\n    <button\n    data-index =\"").concat(index, "\" class = \"add-to-cart\" type =\"button\">\n    Add to Cart\n    </button>\n   \n  \n   \n    </li>\n    ");
  }).join('');
  return listHtml;
}
function generateCartHtml(state) {
  var listHtml = state.cats.map(function (cat, index) {
    if (cat.quantity > 0) {
      var doneClass = cat.done ? 'complete' : '';
      return "\n    \n    <li class=\"product-list\">\n     <label class=\"product\">\n        <img class=\"cat_logo\" src=\"http://placekitten.com/150/150?image=".concat(index + 1, "\" alt=\"picture of cute looking cat\" />\n        <span  data-index=\"").concat(index, "\" class =\"todo ").concat(doneClass, "\"> ").concat(cat.name, " </span>\n        <span  data-index=\"").concat(index, "\" class =\"quantity\"> \n        <button\n        data-index =\"").concat(index, "\" class = \"remove-cart\" type =\"button\">\n        -\n        </button>\n        ").concat(cat.quantity, "\n        <button\n        data-index =\"").concat(index, "\" class = \"add-cart\" type =\"button\">\n        +\n        </button>\n         </span>\n        <span  data-index=\"").concat(index, "\" class =\"price\"> $").concat(cat.saleprice, " </span>\n    </label>\n\n    </li>\n    ");
    }
  }).join('');
  return listHtml;
}
function generateChangePageHtml(state) {
  return "\n\n\n    <button type =\"button\" class =\"page\" data-target =\"".concat(_constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.cart, "\">\n    ").concat(state.page === "product" ? "  View Cart\n        ".concat(state.totalquantity > 0 ? " (".concat(state.totalquantity, ")") : "") : "Hide Cart", "\n    \n   \n    </button>\n    ");
}
function generateCheckoutPageHtml(state) {
  return "\n    <p class=\"totalprice\"> <span class=\"subtotal\">Subtotal </span> : $".concat(state.totalPrice, "</p>\n    <button type =\"button\" class =\"checkout\" data-target =\"").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.cart, "\">\n    \n  \n    ").concat(state.totalquantity > 0 ? "Checkout" : "", "\n    </button>\n    ");
}
function renderCats(state, appEl) {
  var listHtml = generateListHtml(state);
  var changePageHtml = generateChangePageHtml(state);
  appEl.innerHTML = "\n    <ul class=\"cats\"> \n    ".concat(listHtml, "\n    </ul>\n    ").concat(changePageHtml, "\n    ");
}
function renderCart(state, cartEl) {
  var listHtml = generateCartHtml(state);
  var changePageHtml = generateCheckoutPageHtml(state);
  cartEl.innerHTML = "\n        ".concat(state.totalquantity > 0 ? "<ul class=\"cats\">\n                    ".concat(listHtml, "\n                </ul>\n                ").concat(changePageHtml) : "Nothing in the cart", "\n    ");
}
function resetCart(cartEl) {
  cartEl.innerHTML = "";
  return;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



var appEl = document.querySelector('#product');
var cartEl = document.querySelector('#cart');
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('todo')) {
    var index = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].selectTodo(index);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    return;
  }
  if (e.target.classList.contains('done')) {
    var _index = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].toggleDone(_index);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    return;
  }
  if (e.target.classList.contains('add-to-cart')) {
    var _index2 = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].addToCart(_index2);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
  if (e.target.classList.contains('page')) {
    if (_model__WEBPACK_IMPORTED_MODULE_0__.state.page === _constants__WEBPACK_IMPORTED_MODULE_2__.PAGES.cart) {
      _model__WEBPACK_IMPORTED_MODULE_0__["default"].setPage(_constants__WEBPACK_IMPORTED_MODULE_2__.PAGES.product);
    } else {
      _model__WEBPACK_IMPORTED_MODULE_0__["default"].setPage(e.target.dataset.target);
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
});
appEl.addEventListener('submit', function (e) {
  if (e.target.classList.contains('add-task')) {
    e.preventDefault();
    var taskEl = document.querySelector('.new-task');
    var task = taskEl.value;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].addTodo(task);
    taskEl.value = '';
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
  }
  if (e.target.classList.contains('update-task')) {
    e.preventDefault();
    var _taskEl = document.querySelector('.updated-task');
    var index = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodo(index, _taskEl.value);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    return;
  }
});

// Render Cart

cartEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('todo')) {
    var index = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].selectTodo(index);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
  if (e.target.classList.contains('done')) {
    var _index3 = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].toggleDone(_index3);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
  if (e.target.classList.contains('add-to-cart')) {
    var _index4 = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].addToCart(_index4);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
  if (e.target.classList.contains('checkout')) {
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].setPage(_constants__WEBPACK_IMPORTED_MODULE_2__.PAGES.product);
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].resetCart(_model__WEBPACK_IMPORTED_MODULE_0__.state.cats);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
  if (e.target.classList.contains('remove-cart')) {
    var _index5 = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].removeQuantity(_index5);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
  if (e.target.classList.contains('add-cart')) {
    var _index6 = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].addQuantity(_index6);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
});
cartEl.addEventListener('submit', function (e) {
  if (e.target.classList.contains('add-task')) {
    e.preventDefault();
    var taskEl = document.querySelector('.new-task');
    var task = taskEl.value;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].addTodo(task);
    taskEl.value = '';
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
  }
  if (e.target.classList.contains('update-task')) {
    e.preventDefault();
    var _taskEl2 = document.querySelector('.updated-task');
    var index = e.target.dataset.index;
    _model__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodo(index, _taskEl2.value);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
    return;
  }
});
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl, cartEl);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map