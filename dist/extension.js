module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, displayName, description, version, author, publisher, repository, license, engines, icon, categories, keywords, activationEvents, main, contributes, scripts, devDependencies, dependencies, prettier, eslintConfig, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"vscode-profiles\",\"displayName\":\"Profiles\",\"description\":\"Quickly change your settings and extensions configuration\",\"version\":\"1.0.0\",\"author\":{\"name\":\"Yaroslav Larin\",\"email\":\"cyberbiont@gmail.com\"},\"publisher\":\"cyberbiont\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/cyberbiont/vscode-profiles.git\"},\"license\":\"ISC\",\"engines\":{\"vscode\":\"^1.44.0\",\"node\":\"^10.16.0\"},\"icon\":\"images/gear.png\",\"categories\":[\"Other\"],\"keywords\":[\"profiles\",\"extensions\",\"settings\",\"configuration\"],\"activationEvents\":[\"*\"],\"main\":\"./dist/extension.js\",\"contributes\":{\"configuration\":[{\"title\":\"Profiles\",\"properties\":{\"paths.profiles\":{\"type\":\"string\",\"description\":\"Specifies the folder where profiles are stored\"},\"paths.extensionsStorage\":{\"type\":\"string\",\"description\":\"Specifies the folder where all symlinkified extensions will be stored\"},\"extensions.symlinkifyExtensions\":{\"type\":\"boolean\",\"description\":\"It true, all extensions are replaced with symlinks in profile folders\"},\"workspaceProfile\":{\"type\":\"string\",\"description\":\"Use this in your workspace settings to initialize the profile you need for your project on load\"},\"autoSwitchToWorkspaceProfile\":{\"type\":\"boolean\",\"description\":\"Wether extension should automatically switch to profile, that is specified in workspace settings\"}}}],\"commands\":[{\"command\":\"vscode-profiles.switch\",\"title\":\"Profiles: Switch\"},{\"command\":\"vscode-profiles.create\",\"title\":\"Profiles: Create\"},{\"command\":\"vscode-profiles.clone\",\"title\":\"Profiles: Clone\"},{\"command\":\"vscode-profiles.delete\",\"title\":\"Profiles: Delete\"},{\"command\":\"vscode-profiles.rename\",\"title\":\"Profiles: Rename\"},{\"command\":\"vscode-profiles.clean\",\"title\":\"Profiles: Clean\"},{\"command\":\"vscode-profiles.rescan\",\"title\":\"Profiles: Rescan\"},{\"command\":\"vscode-profiles.maintenance\",\"title\":\"Profiles: Maintenance\"}]},\"scripts\":{\"compile\":\"tsc --build src && ts-cleaner -d out\",\"watch\":\"tsc --build src --watch && ts-cleaner -d out\",\"pretest\":\"npm run compile && npm run lint\",\"lint\":\"eslint src --ext ts\",\"test\":\"node ./out/test/runTest.js\",\"vscode:prepublish\":\"webpack --mode production\",\"vcompile\":\"webpack --mode production\",\"webpack\":\"webpack --mode development\",\"webpack-dev\":\"webpack --mode development --watch\",\"test-compile\":\"tsc -p ./\"},\"devDependencies\":{\"@types/node\":\"^14.0.1\",\"@types/vscode\":\"^1.45.1\",\"@typescript-eslint/eslint-plugin\":\"^2.34.0\",\"@typescript-eslint/parser\":\"^2.34.0\",\"@vue/eslint-config-prettier\":\"^6.0.0\",\"@vue/eslint-config-typescript\":\"^5.0.2\",\"chai\":\"^4.2.0\",\"eslint\":\"^7.0.0\",\"eslint-config-airbnb\":\"^18.1.0\",\"eslint-config-airbnb-base\":\"^14.1.0\",\"eslint-config-cyberbiont\":\"^1.0.0\",\"eslint-config-prettier\":\"^6.11.0\",\"eslint-import-resolver-typescript\":\"^2.2.0\",\"eslint-import-resolver-webpack\":\"^0.12.2\",\"eslint-plugin-chai-expect\":\"^2.1.0\",\"eslint-plugin-chai-friendly\":\"^0.6.0\",\"eslint-plugin-import\":\"^2.20.2\",\"eslint-plugin-jest\":\"^23.13.1\",\"eslint-plugin-jsx-a11y\":\"^6.3.1\",\"eslint-plugin-prettier\":\"^3.1.3\",\"eslint-plugin-react\":\"^7.20.5\",\"eslint-plugin-react-hooks\":\"^2.5.1\",\"eslint-plugin-vue\":\"^6.2.2\",\"hint\":\"^6.0.7\",\"jest\":\"^26.0.1\",\"jest-html-reporters\":\"^1.2.1\",\"jest-stare\":\"^2.0.1\",\"omnimock\":\"^0.8.1\",\"prettier\":\"^2.0.5\",\"pug-lint\":\"^2.6.0\",\"pug-lint-config-clock\":\"^2.0.0\",\"stylelint\":\"^13.6.1\",\"stylelint-config-prettier\":\"^8.0.2\",\"stylelint-config-standard\":\"^20.0.0\",\"stylelint-plugin-stylus\":\"^0.9.0\",\"stylelint-prettier\":\"^1.1.2\",\"ts-cleaner\":\"^1.0.5\",\"ts-jest\":\"^26.0.0\",\"ts-loader\":\"^8.0.2\",\"ts-node\":\"^8.10.1\",\"typescript\":\"^3.9.2\",\"vscode-test\":\"^1.3.0\",\"webpack\":\"^4.44.1\",\"webpack-cli\":\"^3.3.12\"},\"dependencies\":{\"ts-essentials\":\"^7.0.0\"},\"prettier\":\"eslint-config-cyberbiont/prettier.config.js\",\"eslintConfig\":{\"extends\":\"cyberbiont\"}}");

/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const app_1 = tslib_1.__importDefault(__webpack_require__(/*! ./lib/app */ "./src/lib/app.ts"));
function activate(context) {
    return new Promise(resolveAppInit => {
        const app = new app_1.default(context, resolveAppInit);
    });
}
exports.activate = activate;
function deactivate() {
    this._subscriptions.dispose();
}
exports.deactivate = deactivate;


/***/ }),

/***/ "./src/lib/actions.ts":
/*!****************************!*\
  !*** ./src/lib/actions.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const entry_1 = __webpack_require__(/*! ./entry */ "./src/lib/entry.ts");
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class Actions {
    constructor(cfg, user, entry, p, profiles, on, errors) {
        this.cfg = cfg;
        this.user = user;
        this.entry = entry;
        this.p = p;
        this.profiles = profiles;
        this.on = on;
        this.errors = errors;
    }
    async createProfileCommand() {
        const newProfileName = await this.createNewProfileDirectory();
        await vscode_1.window.showInformationMessage(`Created profile ${newProfileName}`);
        return this.switchToProfile(newProfileName);
    }
    async cloneProfileCommand() {
        const srcProfileName = await this.user.selectProfileName({
            filterOutActive: false,
            placeholder: `select the profile you want to clone`,
        });
        const destProfileName = await this.createNewProfileDirectory({
            useExisting: true,
        });
        await this.profiles.doProfileMaintenance(srcProfileName);
        await this.profiles.copyProfileContents(srcProfileName, destProfileName);
        await vscode_1.window.showInformationMessage(`Created profile ${destProfileName} from ${srcProfileName}`);
        return this.switchToProfile(destProfileName);
    }
    async switchProfileCommand() {
        const chosenProfileName = await this.user.selectProfileName();
        return this.switchToProfile(chosenProfileName);
    }
    async renameProfileCommand() {
        const oldName = await this.user.selectProfileName();
        const newName = await this.user.promptProfileName(oldName);
        await this.entry.renameProfileFolder(oldName, newName).catch(this.on.error);
        await this.profiles.rescanProfiles();
        return vscode_1.window.showInformationMessage(`Renamed profile "${oldName}" to "${newName}"`);
    }
    async deleteProfileCommand() {
        const name = await this.user.selectProfileName();
        if (!await this.user.confirm(`Are you sure you want to delete profile "${name}"?`))
            return undefined;
        await this.entry.deleteProfileFolder(name);
        this.profiles.deleteProfileEntry(name);
        return vscode_1.window.showInformationMessage(`Profile "${name}" is deleted!`);
    }
    async maintenanceCommand() {
        return this.profiles.doProfileMaintenance();
    }
    async rescanCommand() {
        const profile = await this.profiles.rescanProfiles().catch((e) => {
            if (e instanceof this.errors.MissingSymlink ||
                e instanceof this.errors.BrokenSymlink) {
                this.repairExtensionsSymlink();
                return this.profiles.rescanProfiles();
            }
            throw e;
        });
        if (this.cfg.workspaceProfile && this.cfg.workspaceProfile !== profile.name)
            this.switchToProfile(profile.name);
    }
    async cleanCommand() {
        const extensionSymlinks = new Set((await Promise.all(Array.from(this.profiles.map).map(profile => this.entry.getSubfoldersInfo(profile.name, {
            filter: entry_1.EntryType.EXT_SYMLINK,
        }))))
            .flat()
            .map(dirent => dirent.name)
            .sort());
        const storedExtensions = await this.entry.getStoredExtensions();
        const extraneousExtensions = storedExtensions.filter(dirent => !extensionSymlinks.has(dirent.name));
        const resultsPromise = Promise.all(extraneousExtensions.map(this.entry.deleteStoredExtension, this.entry));
        vscode_1.window.setStatusBarMessage(`$(sync~spin) Analyzing extensions...`, resultsPromise);
        const results = await resultsPromise;
        vscode_1.window.showInformationMessage(`deleted ${results.length} extraneous extensions`);
    }
    async repairExtensionsSymlink() {
        const profile = await this.user.selectProfileName({
            placeholder: `it seems that symlink to your extension profile is broken.
			Choose what profile you want to activate`,
        });
        return this.entry.switchLinkToProfile(profile);
    }
    async switchToProfile(profileName) {
        await this.profiles.doProfileMaintenance(this.profiles.active.name);
        await this.entry.switchLinkToProfile(profileName).catch(this.on.error);
        this.profiles.activateProfile(profileName);
        await vscode_1.commands
            .executeCommand(`settings.cycle.${profileName}`)
            .then(undefined, (e) => {
            vscode_1.window.showWarningMessage(`There is no configuration registered in setting.json for this profile.
				You won't be able to sync your profile with settings sync!`);
        });
        vscode_1.window.showInformationMessage(`Switched to profile ${profileName}.
		The main window will be reloaded. Please reload all other VS Code windows, if you have them opened!`);
        return new Promise(res => setTimeout(() => {
            vscode_1.commands.executeCommand(`workbench.action.reloadWindow`).then(res);
        }, 1000));
    }
    async createNewProfileDirectory({ useExisting = false, } = {}) {
        const name = await this.user.promptProfileName();
        await this.user.checkMatchWithCurrentProfile(name);
        await this.entry.createProfileDirectory(name).catch((e) => {
            if (e.name === `EEXIST` && !useExisting)
                throw e;
        });
        await this.profiles.rescanProfiles();
        return name;
    }
}
exports.default = Actions;


/***/ }),

/***/ "./src/lib/app.ts":
/*!************************!*\
  !*** ./src/lib/app.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const errors_1 = tslib_1.__importStar(__webpack_require__(/*! ./errors */ "./src/lib/errors.ts"));
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
const actions_1 = tslib_1.__importDefault(__webpack_require__(/*! ./actions */ "./src/lib/actions.ts"));
const cfg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./cfg */ "./src/lib/cfg.ts"));
const entry_1 = tslib_1.__importDefault(__webpack_require__(/*! ./entry */ "./src/lib/entry.ts"));
const mapDictionary_1 = tslib_1.__importDefault(__webpack_require__(/*! ./mapDictionary */ "./src/lib/mapDictionary.ts"));
const profilesRepository_1 = tslib_1.__importDefault(__webpack_require__(/*! ./profilesRepository */ "./src/lib/profilesRepository.ts"));
const status_1 = tslib_1.__importDefault(__webpack_require__(/*! ./status */ "./src/lib/status.ts"));
const user_1 = tslib_1.__importDefault(__webpack_require__(/*! ./user */ "./src/lib/user.ts"));
const utils_1 = tslib_1.__importDefault(__webpack_require__(/*! ./utils */ "./src/lib/utils.ts"));
const events_1 = tslib_1.__importDefault(__webpack_require__(/*! ./events */ "./src/lib/events.ts"));
const extensions_1 = tslib_1.__importDefault(__webpack_require__(/*! ./extensions */ "./src/lib/extensions.ts"));
const fileSystem_1 = tslib_1.__importDefault(__webpack_require__(/*! ./fileSystem */ "./src/lib/fileSystem.ts"));
const outputChannel_1 = tslib_1.__importDefault(__webpack_require__(/*! ./outputChannel */ "./src/lib/outputChannel.ts"));
const paths_1 = tslib_1.__importDefault(__webpack_require__(/*! ./paths */ "./src/lib/paths.ts"));
const package_json_1 = tslib_1.__importDefault(__webpack_require__(/*! ../../package.json */ "./package.json"));
class App {
    constructor(context, resolveAppInit) {
        this.context = context;
        this.resolveAppInit = resolveAppInit;
        this.init();
    }
    async init() {
        await this.compose();
        this.registerCommands();
        this.setEventListeners();
        await this.actions.rescanCommand();
        this.resolveAppInit();
    }
    async compose() {
        const utils = new utils_1.default();
        const outputChannel = new outputChannel_1.default(utils, package_json_1.default.name);
        const on = new errors_1.ErrorHandlers();
        const errors = new errors_1.default(outputChannel);
        const cfg = new cfg_1.default().create();
        const status = new status_1.default(utils, `${package_json_1.default.name}.switch`);
        const p = new paths_1.default(cfg);
        const vpExtensions = new extensions_1.default();
        const fs = new fileSystem_1.default(cfg, errors);
        const link = new entry_1.default(cfg, fs, p, on, errors, vpExtensions);
        const map = new mapDictionary_1.default();
        const profiles = new profilesRepository_1.default(cfg, map, fs, p, errors, status, link, vpExtensions);
        const userInteractions = new user_1.default(utils, profiles, errors);
        const actions = new actions_1.default(cfg, userInteractions, link, p, profiles, on, errors);
        const events = new events_1.default(profiles);
        this.actions = actions;
        this.events = events;
    }
    setEventListeners() {
        vscode_1.extensions.onDidChange(this.events.onExtensionsChange);
    }
    registerCommands() {
        return this.context.subscriptions.push(vscode_1.commands.registerCommand(`vscode-profiles.switch`, this.actions.switchProfileCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.create`, this.actions.createProfileCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.clone`, this.actions.cloneProfileCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.rename`, this.actions.renameProfileCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.delete`, this.actions.deleteProfileCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.clean`, this.actions.cleanCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.rescan`, this.actions.rescanCommand, this.actions), vscode_1.commands.registerCommand(`vscode-profiles.maintenance`, this.actions.maintenanceCommand, this.actions));
    }
}
exports.default = App;


/***/ }),

/***/ "./src/lib/cfg.ts":
/*!************************!*\
  !*** ./src/lib/cfg.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const os_1 = tslib_1.__importDefault(__webpack_require__(/*! os */ "os"));
const path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
const homedir = os_1.default.homedir();
const settings = vscode_1.workspace.getConfiguration(`sidenotes`);
class ConfigMaker {
    create() {
        return {
            extensions: {
                symlinkifyExtensions: settings.get(`symlinkifyExtensions`) || true,
            },
            workspaceProfile: settings.get(`workspaceProfile`) || undefined,
            autoSwitchToWorkspaceProfile: settings.get(`workspaceProfile`) || true,
            paths: {
                profiles: settings.get(`profilesPath`) || path_1.default.join(homedir, `.vscode`, `profiles`),
                extensionsStandard: path_1.default.join(homedir, `.vscode`, `extensions`),
                extensionsStorage: settings.get(`extensionsStorage`) || path_1.default.join(homedir, `.vscode`, `extensions.storage`),
            },
        };
    }
}
exports.default = ConfigMaker;


/***/ }),

/***/ "./src/lib/entry.ts":
/*!**************************!*\
  !*** ./src/lib/entry.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryType = exports.EntryMaintenanceStatus = void 0;
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
var EntryMaintenanceStatus;
(function (EntryMaintenanceStatus) {
    EntryMaintenanceStatus["WAS_OK"] = "no problems found";
    EntryMaintenanceStatus["WAS_REPAIRED"] = "broken link, reinstalled extension";
    EntryMaintenanceStatus["WAS_SYMLINKIFIED"] = "symlinkified extension folder";
    EntryMaintenanceStatus["WAS_EXCLUDED"] = "extension was excluded from processing in settings";
})(EntryMaintenanceStatus = exports.EntryMaintenanceStatus || (exports.EntryMaintenanceStatus = {}));
var EntryType;
(function (EntryType) {
    EntryType["EXT_SYMLINK"] = "extension symlink";
    EntryType["EXT_DIR"] = "extension directory";
    EntryType["ELSE"] = "something else";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
const entryTypes = {
    [EntryType.EXT_SYMLINK]: {
        test: function isExtensionSymlink(subfolder) {
            return subfolder.isSymbolicLink();
        },
    },
    [EntryType.EXT_DIR]: {
        test: function isExtensionDirectory(subfolder) {
            return subfolder.isDirectory();
        },
    },
    [EntryType.ELSE]: {
        test: () => true,
    },
};
class Entry {
    constructor(cfg, fs, p, on, errors, extensions) {
        this.cfg = cfg;
        this.fs = fs;
        this.p = p;
        this.on = on;
        this.errors = errors;
        this.extensions = extensions;
    }
    renameProfileFolder(oldName, newName) {
        return this.fs.rename(this.p.profiles.derive(oldName), this.p.profiles.derive(newName));
    }
    deleteProfileFolder(name) {
        return this.fs.delete(this.p.profiles.derive(name));
    }
    createProfileDirectory(name) {
        return this.fs.createDirectory(this.p.profiles.derive(name));
    }
    async switchLinkToProfile(profileName) {
        return this.fs.symlinkSwitch(this.p.profiles.derive(profileName).fsPath, this.p.extensionsStandard);
    }
    async getSubfoldersInfo(profileFolderName, { filter } = {}) {
        const dirents = await this.fs.readDirectory(this.p.profiles.derive(profileFolderName));
        const result = filter ? dirents.filter(entryTypes[filter].test) : dirents;
        return result;
    }
    async copyProfileContent(subfolder, srcProfileFolderName, destProfileFolderName) {
        if (this.isExcluded(subfolder))
            return Promise.resolve();
        if (entryTypes[EntryType.EXT_SYMLINK].test(subfolder))
            return this.copyExtensionSymlink(srcProfileFolderName, destProfileFolderName, subfolder.name);
        if (!entryTypes[EntryType.EXT_DIR].test(subfolder))
            return this.fs.copy(this.p.profiles.derive(srcProfileFolderName, subfolder.name), this.p.profiles.derive(destProfileFolderName, subfolder.name));
        return Promise.resolve();
    }
    getExtensionId(extensionFolderName) {
        return extensionFolderName.slice(0, extensionFolderName.lastIndexOf(`-`));
    }
    async repairBrokenEntry(path, entryType, id = this.getExtensionId(path.pathname)) {
        console.debug(`repairing broken extension directory...`);
        if (entryType === EntryType.EXT_SYMLINK)
            await this.fs.symlinkDelete(path);
        else
            await this.fs.delete(path);
        console.debug(`re-installing extension ${id}...`);
        return vscode_1.commands.executeCommand(`workbench.extensions.installExtension`, id);
    }
    determineEntryType(subfolderInfo) {
        if (entryTypes[EntryType.EXT_SYMLINK].test(subfolderInfo))
            return EntryType.EXT_SYMLINK;
        if (entryTypes[EntryType.EXT_DIR].test(subfolderInfo))
            return EntryType.EXT_DIR;
        return EntryType.ELSE;
    }
    async doMaintenance(subfolderInfo, profileFolderName, profileIsActive) {
        const path = this.p.profiles.derive(profileFolderName, subfolderInfo.name);
        let entryType = this.determineEntryType(subfolderInfo);
        const status = [];
        const isExcluded = this.isExcluded(subfolderInfo);
        if (isExcluded)
            status.push(EntryMaintenanceStatus.WAS_EXCLUDED);
        if (entryType === EntryType.EXT_SYMLINK) {
            const isOk = await this.validateSymlink(path);
            if (profileIsActive && !isOk && !isExcluded) {
                await this.repairBrokenEntry(path, entryType);
                entryType = EntryType.EXT_DIR;
                status.push(EntryMaintenanceStatus.WAS_REPAIRED);
            }
        }
        if (entryType === EntryType.EXT_DIR && !isExcluded) {
            await this.symlinkifyExtension(subfolderInfo, profileFolderName);
            status.push(EntryMaintenanceStatus.WAS_SYMLINKIFIED);
        }
        if (!isExcluded && !status.length)
            status.push(EntryMaintenanceStatus.WAS_OK);
        return {
            name: subfolderInfo.name,
            status,
        };
    }
    async symlinkifyExtension(subfolderInfo, profileFolderName) {
        await this.transportExtension(profileFolderName, subfolderInfo.name);
        return this.fs.symlinkCreate(this.p.extensionsStorage.derive(subfolderInfo.name).fsPath, this.p.profiles.derive(profileFolderName, subfolderInfo.name));
    }
    async validateSymlink(path) {
        try {
            const target = await this.fs.symlinkRead(path);
            return this.fs.exists(target);
        }
        catch (e) {
            if (e.code === `ENOENT`) {
                throw new this.errors.MissingSymlink(`no symlink found in profiles folder`);
            }
            throw e;
        }
    }
    async transportExtension(profileFolder, extensionFolderName) {
        return this.fs.rename(this.p.profiles.derive(profileFolder, extensionFolderName), this.p.extensionsStorage.derive(extensionFolderName));
    }
    async copyExtensionSymlink(baseProfileName, newProfileName, name) {
        return this.fs.symlinkCopy(this.p.profiles.derive(baseProfileName, name), this.p.profiles.derive(newProfileName, name));
    }
    isExcluded(subfolder) {
        const excludedExtensionsRules = [`ms-vsliveshare.vsliveshare-`];
        return excludedExtensionsRules.some(rule => subfolder.name.includes(rule));
    }
    async getStoredExtensions() {
        return this.fs.readDirectory(this.p.extensionsStorage);
    }
    async deleteStoredExtension(dirent) {
        return this.fs.delete(this.p.extensionsStorage.derive(dirent.name));
    }
}
exports.default = Entry;


/***/ }),

/***/ "./src/lib/errors.ts":
/*!***************************!*\
  !*** ./src/lib/errors.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlers = void 0;
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class ErrorHandlers {
    async error(err) {
        console.log(err);
    }
    async cancel(err) {
        console.log(err);
        throw err;
    }
    async resume(err) {
        console.log(err);
    }
}
exports.ErrorHandlers = ErrorHandlers;
class Errors {
    constructor(channel) {
        this.channel = channel;
        this.VpError = class VpError extends Error {
            constructor(rootThis, message = ``) {
                super(message);
                this.rootThis = rootThis;
                this.message = message;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(message);
            }
        }.bind(null, this);
        this.InteractionError = class InteractionError extends this.VpError {
            constructor(rootThis, message = ``, description = `User hasn't provided input.`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
        this.SwapperSymlinkError = class SwapperSymlinkError extends this.VpError {
            constructor(rootThis, message = ``, description = `It seems that thare's a problem with "extensions" symlink`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
        this.BrokenSymlink = class BrokenSymlinkError extends this
            .SwapperSymlinkError {
            constructor(rootThis, message = ``, description = `It seems that "extensions" symlink is broken`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
        this.MissingSymlink = class MissingSymlinkError extends this
            .SwapperSymlinkError {
            constructor(rootThis, message = ``, description = `It seems that "extensions" symlink is missing (or the folder is wrongly named).`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
        this.IsDirectory = class IsDirectoryError extends this.SwapperSymlinkError {
            constructor(rootThis, message = ``, description = `It seems that there is a normal directory in place of "extensions" symlink.`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
        this.SymlinkExists = class SymlinkExistsError extends this
            .SwapperSymlinkError {
            constructor(rootThis, message = ``, description = `It seems that "extensions" symlink already exists and points to this folder.`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
        this.MissingProfileFolder = class MissingProfileFolderError extends vscode_1.FileSystemError {
            constructor(rootThis, message = ``, description = `Profile folder was not found.`) {
                super(description + message);
                this.rootThis = rootThis;
                this.message = message;
                this.description = description;
                this.name = this.constructor.name;
                this.rootThis.channel.appendLine(description + message);
            }
        }.bind(null, this);
    }
}
exports.default = Errors;


/***/ }),

/***/ "./src/lib/events.ts":
/*!***************************!*\
  !*** ./src/lib/events.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class VpEvents {
    constructor(profiles) {
        this.profiles = profiles;
    }
    async onExtensionsChange() {
        return this.profiles.doProfileMaintenance(this.profiles.active.name);
    }
}
exports.default = VpEvents;


/***/ }),

/***/ "./src/lib/extensions.ts":
/*!*******************************!*\
  !*** ./src/lib/extensions.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class VpExtensions {
    listExtensions() {
    }
    get(id) {
        return vscode_1.extensions.getExtension(id);
    }
}
exports.default = VpExtensions;


/***/ }),

/***/ "./src/lib/fileSystem.ts":
/*!*******************************!*\
  !*** ./src/lib/fileSystem.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
const fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ "fs"));
class VpFileSystem {
    constructor(cfg, errors, fs = vscode_1.workspace.fs, nfs = fs_1.default) {
        this.cfg = cfg;
        this.errors = errors;
        this.fs = fs;
        this.nfs = nfs;
    }
    exists(location) {
        return this.nfs.existsSync(location);
    }
    async rename(source, target) {
        return this.fs.rename(vscode_1.Uri.parse(source.href), vscode_1.Uri.parse(target.href), {
            overwrite: true,
        });
    }
    async readDirectory(dir) {
        return this.nfs.promises.readdir(dir, { withFileTypes: true });
    }
    async copy(src, dest) {
        return this.nfs.promises.copyFile(src, dest);
    }
    async delete(location) {
        return this.fs.delete(vscode_1.Uri.parse(location.href), {
            recursive: true,
            useTrash: true,
        });
    }
    async createDirectory(dir) {
        return this.nfs.promises.mkdir(dir);
    }
    async symlinkDelete(location) {
        return this.nfs.promises.unlink(location);
    }
    async symlinkCreate(shouldPointTo, location) {
        const type = process.platform === `win32` ? `junction` : `dir`;
        return this.nfs.promises.symlink(shouldPointTo, location, type);
    }
    async symlinkCopy(src, dest) {
        const linkValue = await this.symlinkRead(src);
        return this.symlinkCreate(linkValue, dest);
    }
    async symlinkSwitch(shouldPointTo, location) {
        const currentlyPointsTo = await this.symlinkRead(location).catch(e => {
            if (e.code === `ENOENT`) {
                console.info(`no symlink found in themes folder`);
                return Promise.resolve(undefined);
            }
            throw e;
        });
        if (currentlyPointsTo !== shouldPointTo) {
            console.info(`pointing symlink to ${shouldPointTo}`);
            if (currentlyPointsTo)
                await this.symlinkDelete(location);
            await this.symlinkCreate(shouldPointTo, location);
        }
        else {
            throw new this.errors.SymlinkExists();
        }
    }
    async symlinkRead(location) {
        let value = await this.nfs.promises.readlink(location);
        if (value.endsWith(`\\`))
            value = value.slice(0, -1);
        return value;
    }
}
exports.default = VpFileSystem;


/***/ }),

/***/ "./src/lib/mapDictionary.ts":
/*!**********************************!*\
  !*** ./src/lib/mapDictionary.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MapDictionary {
    constructor() {
        this.list = new Map();
    }
    add(key, item) {
        this.list.set(key, item);
        return this;
    }
    get(key) {
        return this.list.get(key);
    }
    delete(key) {
        this.list.delete(key);
        return this;
    }
    each(cb) {
        this.list.forEach((prop, key) => {
            cb(prop);
        });
    }
    has(key) {
        return this.list.has(key);
    }
    clear() {
        this.list.clear();
        return this;
    }
    count() {
        return this.list.size;
    }
    *[Symbol.iterator]() {
        for (const item of this.list.values()) {
            yield item;
        }
    }
}
exports.default = MapDictionary;


/***/ }),

/***/ "./src/lib/outputChannel.ts":
/*!**********************************!*\
  !*** ./src/lib/outputChannel.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class VpOutputChannel {
    constructor(utils, name) {
        this.utils = utils;
        this.name = name;
        this.channel = vscode_1.window.createOutputChannel(this.utils.capitalize(name));
        this.appendLine(`vscode-profiles started`);
    }
    appendLine(line) {
        return this.channel.appendLine(line);
    }
}
exports.default = VpOutputChannel;


/***/ }),

/***/ "./src/lib/paths.ts":
/*!**************************!*\
  !*** ./src/lib/paths.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
const url_1 = tslib_1.__importStar(__webpack_require__(/*! url */ "url"));
class Path extends url_1.URL {
    constructor(input, base) {
        super(`file:${input}`, base);
        this.fsPath = url_1.default.fileURLToPath(this.href);
    }
    derive(...pathFragments) {
        return new Path(path_1.default.normalize(path_1.default.join(this.pathname, ...pathFragments)));
    }
}
exports.Path = Path;
class VpPaths {
    constructor(cfg, pPath = path_1.default) {
        this.cfg = cfg;
        this.pPath = pPath;
        this.profiles = new Path(this.cfg.paths.profiles);
        this.extensionsStandard = new Path(this.cfg.paths.extensionsStandard);
        this.extensionsStorage = new Path(this.cfg.paths.extensionsStorage);
    }
}
exports.default = VpPaths;


/***/ }),

/***/ "./src/lib/profile.ts":
/*!****************************!*\
  !*** ./src/lib/profile.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExtensionState;
(function (ExtensionState) {
    ExtensionState[ExtensionState["Folder"] = 0] = "Folder";
    ExtensionState[ExtensionState["Symlink"] = 1] = "Symlink";
})(ExtensionState || (ExtensionState = {}));
class Profile {
    constructor(name, path, extensions, meta) {
        this.name = name;
        this.path = path;
        this.extensions = extensions;
        this.meta = meta;
    }
}
exports.default = Profile;


/***/ }),

/***/ "./src/lib/profilesRepository.ts":
/*!***************************************!*\
  !*** ./src/lib/profilesRepository.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const entry_1 = __webpack_require__(/*! ./entry */ "./src/lib/entry.ts");
const profile_1 = tslib_1.__importDefault(__webpack_require__(/*! ./profile */ "./src/lib/profile.ts"));
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class ProfilesRepository {
    constructor(cfg, map, fs, p, errors, status, entry, extensions) {
        this.cfg = cfg;
        this.map = map;
        this.fs = fs;
        this.p = p;
        this.errors = errors;
        this.status = status;
        this.entry = entry;
        this.extensions = extensions;
    }
    async rescanProfiles() {
        this.map.clear();
        const profilesFolderContents = await this.fs.readDirectory(this.p.profiles);
        await Promise.all(profilesFolderContents.map(this.createProfileEntry.bind(this)));
        return this.initActiveProfile();
    }
    async createProfileEntry(dirent) {
        if (dirent.isDirectory()) {
            const profile = new profile_1.default(dirent.name, this.p.profiles.derive(dirent.name));
            this.map.add(profile.name, profile);
        }
    }
    async initActiveProfile() {
        const swapperLink = await this.getSwapperLinkValue();
        const profile = await this.findCorrespondingProfile(swapperLink);
        this.setActiveProfile(profile);
        this.status.show();
        return profile;
    }
    async findCorrespondingProfile(link) {
        const result = Array.from(this.map).find(profile => profile.path.fsPath === link);
        if (result)
            return result;
        throw new this.errors.BrokenSymlink(`swapper symlink path value is not in the known profiles list`);
    }
    async getSwapperLinkValue() {
        return this.fs.symlinkRead(this.p.extensionsStandard).catch(e => {
            if (e.code === `UNKNOWN`)
                throw new this.errors.IsDirectory();
            if (e.code === `ENOENT`)
                throw new this.errors.MissingSymlink();
            throw e;
        });
    }
    setActiveProfile(profile) {
        this.active = profile;
        this.status.update(profile.name);
    }
    getActiveProfile() {
        return this.active;
    }
    deleteProfileEntry(name) {
        return this.map.delete(name);
    }
    activateProfile(profile) {
        const listedProfile = this.searchProfileInMap(profile);
        this.active = listedProfile;
    }
    searchProfileInMap(profile) {
        const result = this.map.get(profile);
        if (result)
            return result;
        throw new this.errors.MissingProfileFolder(`profile name was not found in profiles list`);
    }
    getProfileNames() {
        return [...this.map.list.keys()];
    }
    async doProfileMaintenance(profileFolderName = this.active.name) {
        if (!this.cfg.extensions.symlinkifyExtensions)
            return;
        const subfoldersInfo = await this.entry.getSubfoldersInfo(profileFolderName);
        const profileIsActive = profileFolderName === this.active.name;
        const maintenanceCallback = (subfolderInfo) => this.entry.doMaintenance(subfolderInfo, profileFolderName, profileIsActive);
        const resultsPromise = Promise.all(subfoldersInfo.map(maintenanceCallback));
        vscode_1.window.setStatusBarMessage(`$(sync~spin) Analyzing profile...`, resultsPromise);
        const results = await resultsPromise;
        this.analyzeMaintenanceResults(results);
    }
    analyzeMaintenanceResults(results) {
        let okCount = 0;
        let repairedCount = 0;
        let symlinkifiedCount = 0;
        results.forEach(result => {
            if (result.status.includes(entry_1.EntryMaintenanceStatus.WAS_OK))
                okCount++;
            if (result.status.includes(entry_1.EntryMaintenanceStatus.WAS_REPAIRED))
                repairedCount++;
            if (result.status.includes(entry_1.EntryMaintenanceStatus.WAS_SYMLINKIFIED))
                symlinkifiedCount++;
        });
        vscode_1.window.showInformationMessage(`total: ${results.length};
			replaced with simlinks: ${symlinkifiedCount};
			repaired: ${repairedCount};
			ok: ${okCount}`);
    }
    async copyProfileContents(srcProfileFolderName, destProfileFolderName) {
        const subfoldersInfo = await this.entry.getSubfoldersInfo(srcProfileFolderName);
        return Promise.all(subfoldersInfo.map(subfolderInfo => this.entry.copyProfileContent(subfolderInfo, srcProfileFolderName, destProfileFolderName)));
    }
}
exports.default = ProfilesRepository;


/***/ }),

/***/ "./src/lib/status.ts":
/*!***************************!*\
  !*** ./src/lib/status.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class Status {
    constructor(utils, command) {
        this.utils = utils;
        this.command = command;
        this.item = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 100);
        this.item.command = this.command;
    }
    update(text, color) {
        this.item.text = `⚙ ${this.utils.capitalize(text)}`;
        if (color)
            this.item.color = color;
        return this;
    }
    show() {
        this.item.show();
        return this;
    }
    hide() {
        this.item.hide();
        return this;
    }
}
exports.default = Status;


/***/ }),

/***/ "./src/lib/user.ts":
/*!*************************!*\
  !*** ./src/lib/user.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class User {
    constructor(utils, profiles, errors) {
        this.utils = utils;
        this.profiles = profiles;
        this.errors = errors;
    }
    async confirm(message) {
        const confirmation = await vscode_1.window.showQuickPick([`No`, `Yes`], {
            placeHolder: message,
        });
        return confirmation === `Yes`;
    }
    async selectProfileName({ filterOutActive = true, placeholder = ``, } = {}) {
        var _a;
        let profiles = this.profiles.getProfileNames();
        if (filterOutActive && this.profiles.active)
            profiles = profiles.filter(profileName => !(profileName === this.profiles.active.name));
        const response = await vscode_1.window.showQuickPick(profiles.map(ext => ({
            label: `⚙ ${this.utils.capitalize(ext)}`,
        })), {
            placeHolder: placeholder || `⚙ ${(_a = this.profiles.active) === null || _a === void 0 ? void 0 : _a.name}`,
        });
        if (!response)
            throw new this.errors.InteractionError(`selectProfileName`);
        else
            return response.label.slice(2);
    }
    async promptProfileName(placeholder) {
        const name = await vscode_1.window.showInputBox({
            prompt: `Enter the name of the profile`,
            value: placeholder || ``,
        });
        if (!name)
            throw new this.errors.InteractionError(`promptProfileName`);
        else
            return this.utils.capitalize(name);
    }
    async checkMatchWithCurrentProfile(profileName) {
        if (profileName === this.profiles.active.name) {
            vscode_1.window.showInformationMessage(`This is your current profile`);
            throw new this.errors.InteractionError(`selected profile name matches current profile`);
        }
    }
}
exports.default = User;


/***/ }),

/***/ "./src/lib/utils.ts":
/*!**************************!*\
  !*** ./src/lib/utils.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    capitalize(str) {
        return str.replace(/^\w/, c => c.toUpperCase());
    }
}
exports.default = Utils;


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map