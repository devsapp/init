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
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var yaml_1 = require("yaml");
var types_1 = require("yaml/types");
var base_1 = __importDefault(require("./common/base"));
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
    ComponentDemo.prototype.initGitHub = function () {
        var sTemplateContent = fs_extra_1.default.readFileSync(path_1.default.join(__dirname, '..', 'templates/github.action.template'), 'utf-8');
        var gitActionFile = path_1.default.join(process.cwd(), '.github/workflows/registry-push.yml');
        fs_extra_1.default.ensureFileSync(gitActionFile);
        fs_extra_1.default.writeFileSync(gitActionFile, sTemplateContent, 'utf8');
    };
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
     * 初始化 cicd配置文件
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.cicd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cicdPlatform;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'list', name: 'platform', 'message': '选择部署平台', choices: [{ name: 'github', value: 'github' }, { name: 'gitlab', value: 'gitlab' }] }])];
                    case 1:
                        cicdPlatform = _a.sent();
                        switch (cicdPlatform.platform) {
                            case 'github':
                                this.initGitHub();
                                break;
                            default:
                                break;
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLHNEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsNkJBQWdEO0FBQ2hELG9DQUFpQztBQUNqQyx1REFBMEM7QUFDMUMsd0NBQXdDO0FBQ3hDLGdEQUFnRDtBQUVoRDtJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCwwQ0FBMEM7SUFDMUMsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyxJQUFJO0lBQ0ksNEJBQUksR0FBWixVQUFhLEdBQUc7UUFDZCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNPLGtDQUFVLEdBQWxCLFVBQW1CLEdBQUcsRUFBRSxHQUFHO1FBQ3pCLElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxHQUFHLEVBQUU7WUFDUCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEdB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