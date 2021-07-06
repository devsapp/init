"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./common/base"));
var website_service_1 = __importDefault(require("./website.service"));
var api_service_1 = __importDefault(require("./api.service"));
var utils = __importStar(require("./common/utils"));
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        var _this = this;
        console.log('本地init组件');
        _this = _super.call(this, props) || this;
        return _this;
    }
    ComponentDemo.prototype.api = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spath = utils.getSpath();
                        if (!spath) return [3 /*break*/, 2];
                        return [4 /*yield*/, api_service_1.default.existedSymlApi(spath)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, api_service_1.default.noExistedSymlApi()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.website = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spath = utils.getSpath();
                        if (!spath) return [3 /*break*/, 2];
                        return [4 /*yield*/, website_service_1.default.existedSyml(spath)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, website_service_1.default.noExistedSyml()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUEwQztBQUMxQyxzRUFBd0M7QUFDeEMsOERBQWdDO0FBQ2hDLG9EQUF3QztBQUV4QztJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO1FBQWpCLGlCQUdDO1FBRkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixRQUFBLGtCQUFNLEtBQUssQ0FBQyxTQUFDOztJQUNmLENBQUM7SUFDWSwyQkFBRyxHQUFoQjs7Ozs7O3dCQUNRLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQzNCLEtBQUssRUFBTCx3QkFBSzt3QkFDQSxxQkFBTSxxQkFBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBQTs0QkFBdEMsc0JBQU8sU0FBK0IsRUFBQzs0QkFFekMscUJBQU0scUJBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzs7Ozs7S0FDOUI7SUFFWSwrQkFBTyxHQUFwQjs7Ozs7O3dCQUNRLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQzNCLEtBQUssRUFBTCx3QkFBSzt3QkFDQSxxQkFBTSx5QkFBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBQTs0QkFBdkMsc0JBQU8sU0FBZ0MsRUFBQzs0QkFFMUMscUJBQU0seUJBQU8sQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQTdCLFNBQTZCLENBQUM7Ozs7O0tBQy9CO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQTJDLGNBQWEsR0FvQnZEIn0=