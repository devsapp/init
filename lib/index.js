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
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
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
    ComponentDemo.prototype.test = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.info('deploy test');
                return [2 /*return*/, { hello: 'hanxie' }];
            });
        });
    };
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
        console.log(replaceData);
        var sTemplateContent = fs_extra_1.default.readFileSync(path_1.default.join(__dirname, '..', "templates/" + templateName), 'utf-8');
        sTemplateContent = this.replaceFun(sTemplateContent, replaceData);
        fs_extra_1.default.writeFileSync(sPath, sTemplateContent, 'utf8');
    };
    ComponentDemo.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jamstack()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.staticSite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDir, sPath, answers, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        currentDir = process.cwd();
                        sPath = path_1.default.join(currentDir, 's.yaml');
                        if (!!fs_extra_1.default.existsSync(sPath)) return [3 /*break*/, 1];
                        this.createS(sPath, 'static-site.template', { website: "website" + Date.now() });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'confirm', name: 'result', 'message': '检测到已经存在s.yaml，确定替换吗' }])];
                    case 2:
                        answers = _a.sent();
                        if (answers.result === true) {
                            this.createS(sPath, 'static-site.template', { website: "website" + Date.now() });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, 's.yaml 初始化成功，您可进行下一步操作'];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, e_1.message];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.jamstack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainDomain, subDomain, domain, app, appName, currentDir, sPath, answers, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'list', name: 'main', 'message': '请选择站点一级域名', choices: [{ name: 'resume.net.cn', value: 'resume.net.cn' }, { name: 'myblog.wiki', value: 'myblog.wiki' }, { name: 'myblog.live', value: 'myblog.live' }] }])];
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
                        if (!appName) return [3 /*break*/, 7];
                        currentDir = process.cwd();
                        sPath = path_1.default.join(currentDir, 's.yaml');
                        if (!!fs_extra_1.default.existsSync(sPath)) return [3 /*break*/, 4];
                        this.createS(sPath, 'jamstack.template', { domain: domain, appName: appName });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, inquirer_1.default.prompt([{ type: 'confirm', name: 'result', 'message': '检测到已经存在s.yaml，确定替换吗' }])];
                    case 5:
                        answers = _a.sent();
                        if (answers.result === true) {
                            this.createS(sPath, 'jamstack.template', { domain: domain, appName: appName });
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/, 's.yaml 初始化成功，您可进行下一步操作'];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        return [2 /*return*/, e_2.message];
                    case 9: return [2 /*return*/];
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
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLHNEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsdURBQTBDO0FBQzFDLDJEQUFxQztBQUdyQztJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7O09BSUc7SUFDVSw0QkFBSSxHQUFqQixVQUFrQixNQUFrQjs7O2dCQUNsQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0Isc0JBQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUM7OztLQUM1QjtJQUNPLDRCQUFJLEdBQVosVUFBYSxHQUFHO1FBQ2QsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDTyxrQ0FBVSxHQUFsQixVQUFtQixHQUFHLEVBQUUsR0FBRztRQUN6QixJQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksR0FBRyxFQUFFO1lBQ1AsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENB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