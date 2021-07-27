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
var Oss = /** @class */ (function () {
    function Oss() {
    }
    Oss.prototype.checkRoute = function (route, name) {
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
    Oss.prototype.formatRoute = function (route) {
        return path_1.default.join('/', route);
    };
    Oss.prototype.formatJamstackApi = function (sdocument, apiMain) {
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
    Oss.prototype.existedSyml = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, _a, useJamstackApi, apiProps, appName, apiMain_1, promptConfig, apiMain;
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
                        return [4 /*yield*/, inquirer_1.default.prompt(promptConfig)];
                    case 3:
                        apiMain = _b.sent();
                        apiMain.route = this.formatRoute(apiMain.route);
                        this.formatJamstackApi(sdocument, apiMain);
                        fs_extra_1.default.writeFileSync(spath, String(sdocument));
                        this.genarateFile(apiMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    Oss.prototype.genarateFile = function (_a, useJamstackApi) {
        var sourceCode = _a.sourceCode, route = _a.route;
        var currentPath = process.cwd();
        var sourceCodePath = path_1.default.join(currentPath, sourceCode);
        var routePath = path_1.default.join(sourceCodePath, route === '/' ? '/index' : route);
        var templatesPath = path_1.default.join(__dirname, '../templates');
        var indexTemplate = fs_extra_1.default.readFileSync(path_1.default.join(templatesPath, 'index-oss.js'), 'utf8');
        if (!useJamstackApi) {
            fs_extra_1.default.copySync(path_1.default.join(templatesPath, 'oss-demo'), sourceCodePath);
        }
        fs_extra_1.default.ensureDirSync(routePath);
        fs_extra_1.default.writeFileSync(path_1.default.join(routePath, 'index.js'), indexTemplate);
    };
    Oss.prototype.noExistedSyml = function () {
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
    return Oss;
}());
exports.default = new Oss();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvb3NzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLHNEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsNkJBQW1FO0FBQ25FLG9DQUEwQztBQUMxQywyREFBcUM7QUFDckMsOENBQXNEO0FBQ3RELG9EQUF3QztBQUV4QztJQUFBO0lBc0lBLENBQUM7SUFySVMsd0JBQVUsR0FBbEIsVUFBbUIsS0FBZSxFQUFFLElBQUk7UUFDdEMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7WUFDNUIsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDO2FBQzFDO1lBQ0QsT0FBTyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixnQkFBTSxDQUFDLElBQUksQ0FBSSxJQUFJLDhFQUFlLENBQUMsQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ08seUJBQVcsR0FBbkIsVUFBb0IsS0FBYTtRQUMvQixPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTywrQkFBaUIsR0FBekIsVUFBMEIsU0FBYyxFQUFFLE9BQU87UUFDL0MsSUFBTSxJQUFJLEdBQUcsaUJBQVUsQ0FBQztZQUN0QixTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLE9BQU8sRUFBRTtnQkFD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