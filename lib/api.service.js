"use strict";
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
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var yaml_1 = require("yaml");
var types_1 = require("yaml/types");
var logger_1 = __importDefault(require("./common/logger"));
var core_1 = require("@serverless-devs/core");
var utils = __importStar(require("./common/utils"));
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.prototype.checkRoute = function (route, name) {
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
    Api.prototype.formatRoute = function (route) {
        return path_1.default.join('/', route);
    };
    Api.prototype.formatWebsite = function (sdocument, apiMain) {
        var useWebsite = false;
        for (var _i = 0, _a = sdocument.contents.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.key.value === 'services') {
                for (var _b = 0, _c = item.value.items; _b < _c.length; _b++) {
                    var child = _c[_b];
                    for (var _d = 0, _e = child.value.items; _d < _e.length; _d++) {
                        var pair = _e[_d];
                        if (pair.key.value === 'component' && pair.value.value.endsWith('website')) {
                            useWebsite = true;
                        }
                        if (useWebsite && pair.key.value === 'props') {
                            pair.value.items.push(new types_1.Pair('customDomain', '${rest-api.output.customDomain}'));
                            pair.value.items.push(new types_1.Pair('project', apiMain.project));
                            return;
                        }
                    }
                }
            }
        }
    };
    Api.prototype.formatJamstackApi = function (sdocument, apiMain) {
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
                app: {
                    name: 'rest-api-demo',
                },
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
    Api.prototype.existedSymlApi = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, _a, useJamstackApi, apiProps, appName, apiMain_1, promptConfig, useWebsite, apiMain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        content = fs_extra_1.default.readFileSync(spath, 'utf-8');
                        sparse = yaml_1.parse(content);
                        sdocument = yaml_1.parseDocument(content);
                        _a = utils.checkUseJamstackApi(sparse), useJamstackApi = _a.useJamstackApi, apiProps = _a.apiProps, appName = _a.appName;
                        if (!useJamstackApi) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'route', message: '请输入路由名称' }])];
                    case 1:
                        apiMain_1 = _b.sent();
                        apiMain_1.route = this.formatRoute(apiMain_1.route);
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
                        useWebsite = utils.checkUseWebsite(sparse).useWebsite;
                        if (useWebsite) {
                            promptConfig = [{ type: 'input', name: 'project', message: '请输入应用名称' }].concat(promptConfig);
                        }
                        return [4 /*yield*/, inquirer_1.default.prompt(promptConfig)];
                    case 3:
                        apiMain = _b.sent();
                        apiMain.route = this.formatRoute(apiMain.route);
                        useWebsite && this.formatWebsite(sdocument, apiMain);
                        this.formatJamstackApi(sdocument, apiMain);
                        fs_extra_1.default.writeFileSync(spath, String(sdocument));
                        this.genarateFile(apiMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.genarateFile = function (_a, useJamstackApi) {
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
    Api.prototype.noExistedSymlApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Alias, apiMain, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.getCredential('default')];
                    case 1:
                        Alias = (_a.sent()).Alias;
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                { type: 'input', name: 'sourceCode', message: '请输入部署函数的路径', default: 'functions' },
                                { type: 'input', name: 'route', message: '请输入路由名称' },
                            ])];
                    case 2:
                        apiMain = _a.sent();
                        content = {
                            edition: '1.0.0',
                            name: 'appName',
                            access: Alias,
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
                                        app: {
                                            name: 'rest-api-demo',
                                        },
                                        sourceCode: apiMain.sourceCode,
                                        route: [this.formatRoute(apiMain.route)],
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
    return Api;
}());
exports.default = new Api();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLHNEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsNkJBQW1FO0FBQ25FLG9DQUEwQztBQUMxQywyREFBcUM7QUFDckMsOENBQXNEO0FBQ3RELG9EQUF3QztBQUV4QztJQUFBO0lBOEpBLENBQUM7SUE3SlMsd0JBQVUsR0FBbEIsVUFBbUIsS0FBZSxFQUFFLElBQUk7UUFDdEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7WUFDNUIsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDO2FBQzFDO1lBQ0QsT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixnQkFBTSxDQUFDLElBQUksQ0FBSSxJQUFJLDhFQUFlLENBQUMsQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ08seUJBQVcsR0FBbkIsVUFBb0IsS0FBYTtRQUMvQixPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDTywyQkFBYSxHQUFyQixVQUFzQixTQUFjLEVBQUUsT0FBTztRQUMzQyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDdkIsS0FBbUIsVUFBd0IsRUFBeEIsS0FBQSxTQUFTLENBQUMsUUFBUSxD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