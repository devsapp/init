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
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var yaml_1 = require("yaml");
var types_1 = require("yaml/types");
var base_1 = __importDefault(require("./common/base"));
var core = __importStar(require("@serverless-devs/core"));
// import logger from './common/logger';
// import { InputProps } from './common/entity';
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    // public async test(inputs: InputProps) {
    //   logger.info('deploy test');
    //   return { hello: 'hanxie' };
    // }
    ComponentDemo.prototype.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    ComponentDemo.prototype.replaceFun = function (str, obj) {
        var reg = /\{\{(.*?)\}\}/g;
        var arr = str.match(reg);
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                var keyContent = arr[i].replace(/{{|}}/g, '');
                var realKey = this.trim(keyContent.split('|')[0]);
                if (obj[realKey]) {
                    str = str.replace(arr[i], obj[realKey]);
                }
            }
        }
        return str;
    };
    ComponentDemo.prototype.createS = function (sPath, templateName, replaceData) {
        var sTemplateContent = fs_extra_1.default.readFileSync(path_1.default.join(__dirname, '..', "templates/" + templateName), 'utf-8');
        sTemplateContent = this.replaceFun(sTemplateContent, replaceData);
        fs_extra_1.default.writeFileSync(sPath, sTemplateContent, 'utf8');
    };
    ComponentDemo.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainDomain, subDomain, domain, app, appName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'list', name: 'main', 'message': '请选择站点一级域名', choices: [{ name: 'resume.net.cn', value: 'resume.net.cn' }, { name: 'myblog.live', value: 'myblog.live' }] }])];
                    case 1:
                        mainDomain = _a.sent();
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'sub', 'message': '请输入二级自定义域名' }])];
                    case 2:
                        subDomain = _a.sent();
                        domain = subDomain.sub + "." + mainDomain.main;
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'appName', 'message': '请输入应用名' }])];
                    case 3:
                        app = _a.sent();
                        appName = app.appName;
                        return [2 /*return*/, { appName: appName, domain: domain }];
                }
            });
        });
    };
    // private initGitHub() {
    //   let sTemplateContent = fs.readFileSync(path.join(__dirname, '..', 'templates/github.action.template'), 'utf-8');
    //   const gitActionFile = path.join(process.cwd(), '.github/workflows/registry-push.yml');
    //   fs.ensureFileSync(gitActionFile)
    //   fs.writeFileSync(gitActionFile, sTemplateContent, 'utf8');
    // }
    /**
     * 初始化站点默认是静态站点
     * @param
     * @returns
     */
    ComponentDemo.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.staticSite()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 初始化静态站点服务
     * @param
     * @returns
     */
    ComponentDemo.prototype.staticSite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appName, domain, currentDir, sPath, answers, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _a = _b.sent(), appName = _a.appName, domain = _a.domain;
                        if (!appName) return [3 /*break*/, 5];
                        currentDir = process.cwd();
                        sPath = path_1.default.join(currentDir, 's.yaml');
                        if (!!fs_extra_1.default.existsSync(sPath)) return [3 /*break*/, 2];
                        this.createS(sPath, 'jamstack.template', { domain: domain, appName: appName });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'confirm', name: 'result', 'message': '检测到已经存在s.yaml，确定替换吗' }])];
                    case 3:
                        answers = _b.sent();
                        if (answers.result === true) {
                            this.createS(sPath, 'jamstack.template', { domain: domain, appName: appName });
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/, 's.yaml init success'];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        return [2 /*return*/, e_1.message];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 初始化CI/CD配置文件
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.cicd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cicdInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/cicd')];
                    case 1:
                        cicdInstance = _a.sent();
                        return [4 /*yield*/, cicdInstance.index({})];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.addService = function (originTree, newNode) {
        originTree.contents.items.forEach(function (item) {
            if (item.key.value === 'services') {
                item.value.items.push(newNode);
            }
        });
        return originTree;
    };
    ComponentDemo.prototype.addVariable = function (originTree, newNode) {
        originTree.contents.items.forEach(function (item) {
            if (item.key.value === 'vars') {
                item.value.items.push(newNode);
            }
        });
        return originTree;
    };
    /**
     * 初始化|增加api配置
     * @param
     * @returns
     */
    ComponentDemo.prototype.api = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDir, sPath, apiName, _a, appName, domain, apiMain, content, sDocument, node, apiFolderPath, createApiFolder, answers, baseConfigPath, baseConifgContent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentDir = process.cwd();
                        sPath = path_1.default.join(currentDir, 's.yaml');
                        apiName = '';
                        if (!!fs_extra_1.default.existsSync(sPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _a = _b.sent(), appName = _a.appName, domain = _a.domain;
                        apiName = appName;
                        this.createS(sPath, 'api.template', { domain: domain, appName: appName });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'input', name: 'name', 'message': '请输入名称' }])];
                    case 3:
                        apiMain = _b.sent();
                        apiName = apiMain.name;
                        content = fs_extra_1.default.readFileSync(sPath, 'utf-8');
                        sDocument = yaml_1.parseDocument(content);
                        sDocument = this.addVariable(sDocument, new types_1.Pair(apiName + "SourceCode", apiName));
                        node = yaml_1.createNode({
                            component: 'jamstack-api',
                            actions: {
                                'pre-deploy': [{
                                        run: 'npm i',
                                        path: '${vars.' + apiName + 'SourceCode}'
                                    }]
                            },
                            props: {
                                sourceCode: '${vars.' + apiName + 'SourceCode}',
                                route: ['/']
                            }
                        });
                        sDocument = this.addService(sDocument, new types_1.Pair(apiName, node));
                        fs_extra_1.default.writeFileSync(sPath, String(sDocument), 'utf8');
                        _b.label = 4;
                    case 4:
                        apiFolderPath = path_1.default.join(currentDir, apiName);
                        createApiFolder = true;
                        if (!fs_extra_1.default.existsSync(apiFolderPath)) return [3 /*break*/, 6];
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'confirm', name: 'result', 'message': "\u5F53\u524D\u8DEF\u5F84\u5DF2\u7ECF\u5B58\u5728" + apiName + "\uFF0C\u786E\u5B9A\u66FF\u6362\u5417" }])];
                    case 5:
                        answers = _b.sent();
                        if (answers.result !== true) {
                            createApiFolder = false;
                        }
                        _b.label = 6;
                    case 6:
                        if (createApiFolder) {
                            fs_extra_1.default.copySync(path_1.default.join(__dirname, '..', 'templates/api-demo'), apiFolderPath);
                            baseConfigPath = path_1.default.join(apiFolderPath, 'config.yml');
                            baseConifgContent = fs_extra_1.default.readFileSync(baseConfigPath, 'utf-8');
                            baseConifgContent = this.replaceFun(baseConifgContent, { appName: apiName });
                            fs_extra_1.default.writeFileSync(baseConfigPath, baseConifgContent, 'utf8');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLDZCQUFnRDtBQUNoRCxvQ0FBaUM7QUFDakMsdURBQTBDO0FBQzFDLDBEQUE4QztBQUM5Qyx3Q0FBd0M7QUFDeEMsZ0RBQWdEO0FBRWhEO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILDBDQUEwQztJQUMxQyxnQ0FBZ0M7SUFDaEMsZ0NBQWdDO0lBQ2hDLElBQUk7SUFDSSw0QkFBSSxHQUFaLFVBQWEsR0FBRztRQUNkLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ08sa0NBQVUsR0FBbEIsVUFBbUIsR0FBRyxFQUFFLEdBQUc7UUFDekIsSUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLEdBQUcsRUFBRTtZQUNQLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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