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
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var yaml_1 = require("yaml");
var types_1 = require("yaml/types");
var lodash_get_1 = __importDefault(require("lodash.get"));
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.getSpath = function () {
        var currentPath = process.cwd();
        var sYamlPath = path_1.default.join(currentPath, 's.yaml');
        if (fs_extra_1.default.existsSync(sYamlPath)) {
            return sYamlPath;
        }
        var sYmlPath = path_1.default.join(currentPath, 's.yml');
        if (fs_extra_1.default.existsSync(sYmlPath)) {
            return sYmlPath;
        }
    };
    ComponentDemo.prototype.existedSymlApi = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, useJamstackApi, sourceCode, apiMain_1, apiMain, node, newPair;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = fs_extra_1.default.readFileSync(spath, 'utf-8');
                        sparse = yaml_1.parse(content);
                        sdocument = yaml_1.parseDocument(content);
                        useJamstackApi = lodash_get_1.default(sparse, ['services', 'start-function', 'component'], '').endsWith('jamstack-api');
                        if (!useJamstackApi) return [3 /*break*/, 2];
                        sourceCode = lodash_get_1.default(sparse, ['services', 'start-function', 'props', 'sourceCode']);
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'route', message: '请输入部署的函数名称' }])];
                    case 1:
                        apiMain_1 = _a.sent();
                        sdocument.contents.items.forEach(function (item) {
                            if (item.key.value === 'services') {
                                item.value.items.forEach(function (child) {
                                    if (child.key.value === 'start-function') {
                                        child.value.items.forEach(function (pair) {
                                            if (pair.key.value === 'props') {
                                                pair.value.items.forEach(function (obj) {
                                                    if (obj.key.value === 'route') {
                                                        obj.value.items.push(new types_1.Scalar(apiMain_1.route));
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        return [2 /*return*/, fs_extra_1.default.writeFileSync(spath, String(sdocument))];
                    case 2: return [4 /*yield*/, inquirer_1.default.prompt([
                            { type: 'input', name: 'sourceCode', message: '请输入部署函数的目录', default: 'functions' },
                            { type: 'input', name: 'route', message: '请输入部署的函数名称' },
                        ])];
                    case 3:
                        apiMain = _a.sent();
                        node = yaml_1.createNode({
                            component: 'jamstack-api',
                            actions: {
                                'pre-deploy': [
                                    {
                                        run: 'npm i',
                                        path: apiMain.sourceCode,
                                    },
                                ],
                            },
                            props: {
                                sourceCode: apiMain.sourceCode,
                                route: [apiMain.route],
                            },
                        });
                        newPair = new types_1.Pair('start-function', node);
                        sdocument.contents.items.forEach(function (item) {
                            if (item.key.value === 'services') {
                                item.value.items.push(newPair);
                            }
                        });
                        fs_extra_1.default.writeFileSync(spath, String(sdocument));
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.api = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spath = this.getSpath();
                        if (!spath) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.existedSymlApi(spath)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBQzFDLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLDZCQUF3RDtBQUN4RCxvQ0FBMEM7QUFDMUMsMERBQTZCO0FBRTdCO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRU8sZ0NBQVEsR0FBaEI7UUFDRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBQ2Esc0NBQWMsR0FBNUIsVUFBNkIsS0FBYTs7Ozs7O3dCQUNsQyxPQUFPLEdBQUcsa0JBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLEdBQUcsWUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN4QixTQUFTLEdBQVEsb0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFeEMsY0FBYyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLGdCQUFn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