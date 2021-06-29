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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var yaml_1 = require("yaml");
var types_1 = require("yaml/types");
var lodash_get_1 = __importDefault(require("lodash.get"));
var core_1 = require("@serverless-devs/core");
var logger = new core_1.Logger('Init');
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
    ComponentDemo.prototype.checkRoute = function (route, name) {
        var opt = route.filter(function (item) { return item === name; });
        if (opt.length > 0) {
            logger.warn(name + " \u51FD\u6570\u5DF2\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u521B\u5EFA\u3002");
            return true;
        }
        return false;
    };
    ComponentDemo.prototype.existedSymlApi = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, useJamstackApi, sourceCode, route, apiMain_1, apiMain, node, newPair;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = fs_extra_1.default.readFileSync(spath, 'utf-8');
                        sparse = yaml_1.parse(content);
                        sdocument = yaml_1.parseDocument(content);
                        useJamstackApi = lodash_get_1.default(sparse, ['services', 'start-function', 'component'], '').endsWith('jamstack-api');
                        if (!useJamstackApi) return [3 /*break*/, 2];
                        sourceCode = lodash_get_1.default(sparse, ['services', 'start-function', 'props', 'sourceCode']);
                        route = lodash_get_1.default(sparse, ['services', 'start-function', 'props', 'route']);
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'route', message: '请输入部署的函数名称' }])];
                    case 1:
                        apiMain_1 = _a.sent();
                        if (this.checkRoute(route, apiMain_1.route))
                            return [2 /*return*/];
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
                        fs_extra_1.default.writeFileSync(spath, String(sdocument));
                        return [2 /*return*/, this.genarateFile(__assign({ sourceCode: sourceCode }, apiMain_1), useJamstackApi)];
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
                        this.genarateFile(apiMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.genarateFile = function (_a, useJamstackApi) {
        var sourceCode = _a.sourceCode, route = _a.route;
        var currentPath = process.cwd();
        var sourceCodePath = path_1.default.join(currentPath, sourceCode);
        var routePath = path_1.default.join(sourceCodePath, route);
        var templatesPath = path_1.default.join(__dirname, '../templates');
        var indexTemplate = fs_extra_1.default.readFileSync(path_1.default.join(templatesPath, 'index-template.js'), 'utf8');
        if (!useJamstackApi) {
            fs_extra_1.default.copySync(path_1.default.join(templatesPath, 'api-demo'), sourceCodePath);
        }
        fs_extra_1.default.ensureDirSync(routePath);
        fs_extra_1.default.writeFileSync(path_1.default.join(routePath, 'index.js'), indexTemplate);
    };
    ComponentDemo.prototype.noExistedSymlApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiMain, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                            { type: 'input', name: 'sourceCode', message: '请输入部署函数的目录', default: 'functions' },
                            { type: 'input', name: 'route', message: '请输入部署的函数名称' },
                        ])];
                    case 1:
                        apiMain = _a.sent();
                        content = {
                            edition: '1.0.0',
                            name: 'appName',
                            services: {
                                'start-function': {
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
                                },
                            },
                        };
                        fs_extra_1.default.writeFileSync(path_1.default.join(process.cwd(), 's.yaml'), yaml_1.stringify(content));
                        this.genarateFile(apiMain);
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
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.noExistedSymlApi()];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBMEM7QUFDMUMsOENBQXdCO0FBQ3hCLHNEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsNkJBQW1FO0FBQ25FLG9DQUEwQztBQUMxQywwREFBNkI7QUFDN0IsOENBQStDO0FBRS9DLElBQU0sTUFBTSxHQUFHLElBQUksYUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxDO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRU8sZ0NBQVEsR0FBaEI7UUFDRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBQ08sa0NBQVUsR0FBbEIsVUFBbUIsS0FBZSxFQUFFLElBQUk7UUFDdEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksS0FBSyxJQUFJLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDbEQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFH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