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
/* harmony export */   ERRORS: () => (/* binding */ ERRORS),
/* harmony export */   PAGES: () => (/* binding */ PAGES)
/* harmony export */ });
var PAGES = {
  home: 'home',
  login: 'login'
};
var ERRORS = {
  password: 'Please enter a Valid Password',
  username: 'Please enter a Valid UserName',
  word: 'Please enter a Valid Word'
};

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  word: "",
  page: _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.login,
  username: "",
  error: ""
};

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

function render(state, appEl) {
  if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.login) {
    renderLogin(state, appEl);
  } else if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.home) {
    renderHome(state, appEl);
  }
}
function renderLogin(state, appEl) {
  var changePageHtml = getLoginPage();
  var errorPage = getErrorPage(state);
  var contentToRender = state.error !== "" ? "".concat(errorPage).concat(changePageHtml) : changePageHtml;
  appEl.innerHTML = contentToRender;
}
function renderHome(state, appEl) {
  var changePageHtml = getUserData(state);
  var errorPage = getErrorPage(state);
  var contentToRender = state.error !== "" ? "".concat(errorPage).concat(changePageHtml) : changePageHtml;
  appEl.innerHTML = contentToRender;
}
function getErrorPage(state) {
  return "\n  \n   \n     <div class=\"invalidusername\">\n         <h2>".concat(state.error, "</h2>\n      </div>");
}
function getLoginPage() {
  return "\n    <div class=\"header-text login-header\"> <h1>Login </h1></div>\n    <div class=\"center-rectangle\">\n     <div class=\"login\">\n    \n    <label class=\"form\">\n      <input class=\"username\" value=\"\" placeholder=\"Enter Username\"  name=\"username\"/>\n      <button class=\"button-type-one login-button\" type=\"submit\">Login</button>\n    </label>\n  </div>\n  </div>";
}
function getUserData(state) {
  return "\n\n  \n        <div class=\"header-text login-header\"> <h1>DataPage</h1></div>\n        <div class =\"logout\">\n       \n        <button class=\"logoutbutton\" type=\"submit\">LogOut</button>\n       \n        </div>\n\n        \n        <div class=\"center-rectangle\">\n   \n    <div class=\"message-box\"> \n    <span class=\"username\">".concat(state.username, ":  <p class=\"message-text\">").concat(state.word, "</p> </span>\n   \n    <div class=\"datachange\">\n    <label class=\"form\" >\n     \n      <input class=\"to-send data-word\" value=\"\" placeholder=\"Enter text to store\" name=\"text\"/>\n      <button class=\"button-type-one data-button\" type=\"submit\">Send</button>\n    </label>\n  </div>\n    </div>\n    </div>\n\n  ");
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fetchDelete: () => (/* binding */ fetchDelete),
/* harmony export */   fetchGetWord: () => (/* binding */ fetchGetWord),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchPutWord: () => (/* binding */ fetchPutWord),
/* harmony export */   fetchUser: () => (/* binding */ fetchUser)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchUser() {
  return fetch('/api/session/', {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchGetWord() {
  return fetch('/api/word/', {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchPutWord(word) {
  return fetch('/api/word/', {
    method: 'put',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    }),
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchDelete() {
  return fetch('/api/session/', {
    method: 'delete',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  fetchUser: fetchUser,
  fetchGetWord: fetchGetWord,
  fetchPutWord: fetchPutWord,
  fetchDelete: fetchDelete
});

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
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




var appEl = document.querySelector('#chat-app');
(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchUser)().then(function (data) {
  _model__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.home;
  _model__WEBPACK_IMPORTED_MODULE_0__.state.username = data.username;
  return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchGetWord)();
}).then(function (data) {
  _model__WEBPACK_IMPORTED_MODULE_0__.state.word = data.storedWord;
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
})["catch"](function (error) {
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
});
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login-button')) {
    var usernameEl = document.querySelector('.username');
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (data) {
      _model__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.home;
      _model__WEBPACK_IMPORTED_MODULE_0__.state.username = data.username;
      return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchGetWord)();
    }).then(function (data) {
      _model__WEBPACK_IMPORTED_MODULE_0__.state.word = data.storedWord;
      _model__WEBPACK_IMPORTED_MODULE_0__.state.error = "";
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    })["catch"](function (error) {
      if (error.error === "auth-insufficient") {
        _model__WEBPACK_IMPORTED_MODULE_0__.state.error = _constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS.password;
      } else if (error.error === "required-username") {
        _model__WEBPACK_IMPORTED_MODULE_0__.state.error = _constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS.username;
      }
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    });
    return;
  }
  if (e.target.classList.contains('data-button')) {
    var wordEl = document.querySelector('.data-word');
    var word = wordEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchPutWord)(word).then(function () {
      _model__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.home;
      return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchGetWord)();
    }).then(function (data) {
      _model__WEBPACK_IMPORTED_MODULE_0__.state.word = data.storedWord;
      _model__WEBPACK_IMPORTED_MODULE_0__.state.error = "";
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    })["catch"](function (error) {
      if (error.error === "invalid-word") {
        _model__WEBPACK_IMPORTED_MODULE_0__.state.error = _constants__WEBPACK_IMPORTED_MODULE_3__.ERRORS.word;
      }
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    });
    return;
  }
  if (e.target.classList.contains('logoutbutton')) {
    var _wordEl = document.querySelector('.data-word');
    var _word = _wordEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchDelete)().then(function () {
      _model__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.login;
      _model__WEBPACK_IMPORTED_MODULE_0__.state.username = "";
      _model__WEBPACK_IMPORTED_MODULE_0__.state.word = "";
      _model__WEBPACK_IMPORTED_MODULE_0__.state.error = "";
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_model__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    });
    return;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map