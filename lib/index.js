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
    ComponentDemo.prototype.checkUseJamstackApi = function (sparse) {
        var useJamstackApi = false;
        var apiProps = {};
        var appName;
        for (var key in sparse.services) {
            if (sparse.services[key].component.endsWith('jamstack-api')) {
                useJamstackApi = true;
                appName = key;
                apiProps = sparse.services[key].props;
            }
        }
        return { useJamstackApi: useJamstackApi, apiProps: apiProps, appName: appName };
    };
    ComponentDemo.prototype.existedSymlApi = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, _a, useJamstackApi, apiProps, appName, apiMain_1, apiMain, node, newPair;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        content = fs_extra_1.default.readFileSync(spath, 'utf-8');
                        sparse = yaml_1.parse(content);
                        sdocument = yaml_1.parseDocument(content);
                        _a = this.checkUseJamstackApi(sparse), useJamstackApi = _a.useJamstackApi, apiProps = _a.apiProps, appName = _a.appName;
                        if (!useJamstackApi) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'route', message: '请输入部署的函数名称' }])];
                    case 1:
                        apiMain_1 = _b.sent();
                        if (this.checkRoute(apiProps.route, apiMain_1.route))
                            return [2 /*return*/];
                        sdocument.contents.items.forEach(function (item) {
                            if (item.key.value === 'services') {
                                item.value.items.forEach(function (child) {
                                    if (child.key.value === appName) {
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
                        return [2 /*return*/, this.genarateFile({ sourceCode: apiProps.sourceCode, route: apiMain_1.route }, useJamstackApi)];
                    case 2: return [4 /*yield*/, inquirer_1.default.prompt([
                            { type: 'input', name: 'sourceCode', message: '请输入部署函数的路径', default: 'functions' },
                            { type: 'input', name: 'route', message: '请输入部署的函数名称' },
                        ])];
                    case 3:
                        apiMain = _b.sent();
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
                        newPair = new types_1.Pair('rest-api', node);
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
                            { type: 'input', name: 'sourceCode', message: '请输入部署函数的路径', default: 'functions' },
                            { type: 'input', name: 'route', message: '请输入部署的函数名称' },
                        ])];
                    case 1:
                        apiMain = _a.sent();
                        content = {
                            edition: '1.0.0',
                            name: 'appName',
                            services: {
                                'rest-api': {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBQzFDLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLDZCQUFtRTtBQUNuRSxvQ0FBMEM7QUFDMUMsOENBQStDO0FBRS9DLElBQU0sTUFBTSxHQUFHLElBQUksYUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxDO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRU8sZ0NBQVEsR0FBaEI7UUFDRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBQ08sa0NBQVUsR0FBbEIsVUFBbUIsS0FBZSxFQUFFLElBQUk7UUFDdEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksS0FBSyxJQUFJLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDbEQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixNQUFNLENB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