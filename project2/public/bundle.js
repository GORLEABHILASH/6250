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
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   PAGES: () => (/* binding */ PAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PAGES = {
  login: 'login',
  online: 'online',
  chat: 'chat',
  send: 'send',
  home: 'home'
};
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), SERVER.AUTH_MISSING, '  '), "default", 'Something went wrong.  Please try again');

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
  console.log(state);
  if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.login) {
    renderLogin(state, appEl);
  } else if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.home) {
    renderHome(state, appEl);
  } else if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.online || state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.chat) {
    updateChatContent(state, appEl);
  }
}
function renderLogin(state, appEl) {
  if (state.isLoginPending) {
    var _contentToRender = "\n    <i class=\"gg-loadbar-alt\"></i>\n    ";
    appEl.innerHTML = _contentToRender;
    return;
  }
  if (state.isLoggedIn) {
    return "";
  }
  var changePageHtml = getLoginPage();
  var errorPage = getErrorPage(state);
  var contentToRender = "<main class=\"login-page\">";
  if (state.error !== "") {
    contentToRender += "\n      ".concat(errorPage, "\n      ").concat(changePageHtml, "\n    ");
  } else {
    contentToRender += "\n      ".concat(changePageHtml, "\n    ");
  }
  contentToRender += "</main>";
  appEl.innerHTML = contentToRender;
}

// Flag to track if outgoingSection has been rendered

function renderHome(state, appEl) {
  var errorPage = getErrorPage(state);
  var rerender = getRerender(state, appEl);
  var outgoingSection = getOutgoingSection();
  var contentToRender = "<main class=\"chat-page\">\n  <div class=\"name\">\n   <span class=\"disp-name\">".concat(state.username, "</span>\n  </div>\n  <div class=\"logout\">\n  <button class=\"logoutbutton\" type=\"submit\">LogOut</button>\n</div>");
  if (state.error !== "") {
    contentToRender += "\n      ".concat(errorPage, "\n    ");
  }
  contentToRender += "\n  <div class =\"re-render\">\n  ".concat(rerender, "\n  </div>\n  ").concat(outgoingSection, "\n   \n  </main>");
  appEl.innerHTML = contentToRender;
}
function updateChatContent(state, appEl) {
  console.log("updateChatContent");
  var errorPage = getErrorPage(state);
  var rerender = getRerender(state, appEl);
  var contentToUpdate = "";
  if (state.error !== "") {
    contentToUpdate += "\n    ".concat(errorPage, "\n    ");
  }
  contentToUpdate += "\n    ".concat(rerender, "\n    ");

  // Only update the content part of the app, not the outgoingSection
  var chatPage = appEl.querySelector('.re-render');
  if (chatPage) {
    chatPage.innerHTML = contentToUpdate; // This keeps the existing outgoingSection intact
  }
}
function getErrorPage(state) {
  return "\n  \n   \n     <div class=\"invalidusername\">\n         <h2>".concat(state.error, "</h2>\n      </div>");
}
function getLoginPage() {
  return "\n    <div class=\"header-text login-header\"> <h1>Login </h1></div>\n    <div class=\"center-rectangle\">\n     <div class=\"login\">\n    \n    <label class=\"form\">\n      <input class=\"username\" value=\"\" placeholder=\"Enter Username\"  name=\"username\"/>\n      <button class=\"button-type-one login-button\" type=\"submit\">Login</button>\n    </label>\n  </div>\n  </div>";
}
function getRerender(state, appEl) {
  var messageList = getMessageList(state, appEl);
  var userList = getUserList(state, appEl);
  return "\n \n  ".concat(userList, "\n  ").concat(messageList, "\n\n  ");
}
function getMessageList(state, appEl) {
  if (state.isDataPending) {
    console.log(state.isDataPending, "Hi");
    var contentToRender = "\n     <i class=\"gg-loadbar-alt\"></i>\n     ";
    appEl.innerHTML = contentToRender;
  }

  //returns messages page
  if (state) {
    var messages = state.messages;
    return "<ol class=\"messages\">" + messages.map(function (message) {
      return "\n    <li class=\"messagelist\">\n    <div class=\"message\">\n      <div class=\"message-box\"> \n      <span class=\"chat-username\">".concat(message.sender, "</span>\n      <p class=\"message-text\">").concat(message.message, "</p>\n      </div>\n     \n    </div>\n  </li>\n  ");
    }).join('') + "</ol>";
  } else {
    return '';
  }
}
function getUserList(state, appEl) {
  if (state.isDataPending) {
    var contentToRender = "\n    <i class=\"gg-loadbar-alt\"></i>\n    ";
    appEl.innerHTML = contentToRender;
    return;
  }
  var usernames = Object.keys(state.users);

  // Generate the HTML for the user list
  return "\n   \n    <ul class=\"users\">\n      <span class=\"users-online\">Users Online</span>\n      ".concat(usernames.map(function (user) {
    return "\n        <li>\n          <div class=\"user\">\n            <span class=\"chat-username\">".concat(user, "</span>\n          </div>\n        </li>\n      ");
  }).join(''), "\n    </ul>");
}
function getOutgoingSection() {
  //sends messages as user brett
  return " <div class=\"outgoing\">\n  <label class=\"form\" >\n    <input class=\"to-send\" value=\"\" placeholder=\"Enter message to send\" name=\"text\"/>\n    <button class=\"button-type-two\" type=\"submit\">Send</button>\n  </label>\n</div>";
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
/* harmony export */   fetchAllChats: () => (/* binding */ fetchAllChats),
/* harmony export */   fetchAllUsers: () => (/* binding */ fetchAllUsers),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchPushChats: () => (/* binding */ fetchPushChats),
/* harmony export */   fetchUser: () => (/* binding */ fetchUser)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/v1', {
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
  return fetch('/api/session/v1', {
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
function fetchAllUsers() {
  return fetch('/api/users/v1', {
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
function fetchLogout() {
  return fetch('/api/session/v1', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchAllChats() {
  return fetch('/api/messages/v1', {
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
function fetchPushChats(message) {
  return fetch('/api/messages/v1', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: message
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  fetchUser: fetchUser,
  fetchAllUsers: fetchAllUsers,
  fetchAllChats: fetchAllChats,
  fetchPushChats: fetchPushChats
});

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  page: _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.login,
  username: "",
  error: "",
  users: {},
  messages: [],
  isLoginPending: true,
  isDataPending: true
};
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
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
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




var appEl = document.querySelector('#chat-app');
function refreshChats() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllChats)().then(function (data) {
    _state__WEBPACK_IMPORTED_MODULE_0__.state.messages = data;
    return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllUsers)();
  }).then(function (data) {
    _state__WEBPACK_IMPORTED_MODULE_0__.state.users = data;
    _state__WEBPACK_IMPORTED_MODULE_0__.state.isDataPending = false;
    _state__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.chat;
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    return;
  })["catch"](function (err) {
    _state__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.login;
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
    return;
  });
}
function pollChats() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__.state.page !== _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.login) {
    refreshChats().then(function () {
      setTimeout(pollChats, 5000);
    });
  } else {
    return '';
  }
}
(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchUser)().then(function (data) {
  _state__WEBPACK_IMPORTED_MODULE_0__.state.isDataPending = true;
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
  _state__WEBPACK_IMPORTED_MODULE_0__.state.username = data.username;
  console.log("username");
  return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllUsers)();
}).then(function (data) {
  _state__WEBPACK_IMPORTED_MODULE_0__.state.users = data;
  return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllChats)();
}).then(function (data) {
  console.log(_state__WEBPACK_IMPORTED_MODULE_0__.state);
  _state__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.home;
  _state__WEBPACK_IMPORTED_MODULE_0__.state.messages = data;
  _state__WEBPACK_IMPORTED_MODULE_0__.state.isLoginPending = false;
  console.log(_state__WEBPACK_IMPORTED_MODULE_0__.state.isDataPending);
  _state__WEBPACK_IMPORTED_MODULE_0__.state.isDataPending = false;
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
  pollChats();
})["catch"](function (err) {
  (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
  _state__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.login;
  _state__WEBPACK_IMPORTED_MODULE_0__.state.isLoginPending = false;
  (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
  return;
});
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login-button')) {
    var usernameEl = document.querySelector('.username');
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.isDataPending = true;
      _state__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.home;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      _state__WEBPACK_IMPORTED_MODULE_0__.state.username = data.username;
      return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllUsers)();
    }).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.users = data;
      return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllChats)();
    }).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.messages = data;
      _state__WEBPACK_IMPORTED_MODULE_0__.state.isLoginPending = false;
      _state__WEBPACK_IMPORTED_MODULE_0__.state.isDataPending = false;
      _state__WEBPACK_IMPORTED_MODULE_0__.state.error = '';
      console.log("helo");
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      pollChats(_state__WEBPACK_IMPORTED_MODULE_0__.state);
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    });
    return;
  }
  if (e.target.classList.contains('button-type-two')) {
    var messageEl = document.querySelector('.to-send');
    var message = messageEl.value;
    messageEl.value = '';
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchPushChats)(message).then(function () {
      return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllChats)();
    }).then(function (data) {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.messages = data;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    });
    return;
  }
  if (e.target.classList.contains('logoutbutton')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
      _state__WEBPACK_IMPORTED_MODULE_0__.state.page = _constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.login;
      _state__WEBPACK_IMPORTED_MODULE_0__.state.isLoginPending = false;
      _state__WEBPACK_IMPORTED_MODULE_0__.state.username = "";
      _state__WEBPACK_IMPORTED_MODULE_0__.state.error = "";
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__.state, appEl);
      return;
    });
    return;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map