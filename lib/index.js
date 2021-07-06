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
var logger_1 = __importDefault(require("./common/logger"));
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
        var opt = route.filter(function (item) {
            if (name === '/' || name === '/index') {
                return item === '/' || item === '/index';
            }
            return item === name;
        });
        if (opt.length > 0) {
            logger_1.default.warn(name + " \u8DEF\u7531\u5DF2\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u521B\u5EFA\u3002");
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
    ComponentDemo.prototype.checkUseWebsite = function (sparse) {
        var useWebsite = false;
        for (var key in sparse.services) {
            if (sparse.services[key].component.endsWith('website')) {
                useWebsite = true;
            }
        }
        return { useWebsite: useWebsite };
    };
    ComponentDemo.prototype.formatWebsite = function (sdocument, apiMain) {
        sdocument.contents.items.forEach(function (item) {
            if (item.key.value === 'services') {
                item.value.items.forEach(function (child) {
                    child.value.items.forEach(function (pair) {
                        if (pair.key.value === 'props') {
                            pair.value.items.push(new types_1.Pair('customDomain', '${rest-api.output.customDomain}'));
                            pair.value.items.push(new types_1.Pair('project', apiMain.project));
                        }
                    });
                });
            }
        });
    };
    ComponentDemo.prototype.formatJamstackApi = function (sdocument, apiMain) {
        var node = yaml_1.createNode({
            component: 'devsapp/jamstack-api',
            actions: {
                'pre-deploy': [
                    {
                        run: 'npm i',
                        path: apiMain.sourceCode,
                    },
                ],
            },
            props: {
                region: 'cn-hangzhou',
                sourceCode: apiMain.sourceCode,
                route: [apiMain.route],
            },
        });
        var newPair = new types_1.Pair('rest-api', node);
        sdocument.contents.items.forEach(function (item) {
            if (item.key.value === 'services') {
                item.value.items.push(newPair);
            }
        });
    };
    ComponentDemo.prototype.existedSymlApi = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, _a, useJamstackApi, apiProps, appName, apiMain_1, promptConfig, useWebsite, apiMain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        content = fs_extra_1.default.readFileSync(spath, 'utf-8');
                        sparse = yaml_1.parse(content);
                        sdocument = yaml_1.parseDocument(content);
                        _a = this.checkUseJamstackApi(sparse), useJamstackApi = _a.useJamstackApi, apiProps = _a.apiProps, appName = _a.appName;
                        if (!useJamstackApi) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'route', message: '请输入路由名称' }])];
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
                    case 2:
                        promptConfig = [
                            { type: 'input', name: 'sourceCode', message: '请输入部署函数的路径', default: 'functions' },
                            { type: 'input', name: 'route', message: '请输入路由名称' },
                        ];
                        useWebsite = this.checkUseWebsite(sparse).useWebsite;
                        if (useWebsite) {
                            promptConfig = [{ type: 'input', name: 'project', message: '请输入应用名称' }].concat(promptConfig);
                        }
                        return [4 /*yield*/, inquirer_1.default.prompt(promptConfig)];
                    case 3:
                        apiMain = _b.sent();
                        useWebsite && this.formatWebsite(sdocument, apiMain);
                        this.formatJamstackApi(sdocument, apiMain);
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
        var routePath = path_1.default.join(sourceCodePath, route === '/' ? '/index' : route);
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
                            { type: 'input', name: 'route', message: '请输入路由名称' },
                        ])];
                    case 1:
                        apiMain = _a.sent();
                        content = {
                            edition: '1.0.0',
                            name: 'appName',
                            services: {
                                'rest-api': {
                                    component: 'devsapp/jamstack-api',
                                    actions: {
                                        'pre-deploy': [
                                            {
                                                run: 'npm i',
                                                path: apiMain.sourceCode,
                                            },
                                        ],
                                    },
                                    props: {
                                        region: 'cn-hangzhou',
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
                        console.log('本地init组件');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBQzFDLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLDZCQUFtRTtBQUNuRSxvQ0FBMEM7QUFDMUMsMkRBQXFDO0FBRXJDO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRU8sZ0NBQVEsR0FBaEI7UUFDRSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBQ08sa0NBQVUsR0FBbEIsVUFBbUIsS0FBZSxFQUFFLElBQUk7UUFDdEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7WUFDNUIsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDO2FBQzFDO1lBQ0QsT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQ3ZCLENBQUMs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