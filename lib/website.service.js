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
var utils = __importStar(require("./common/utils"));
var logger_1 = __importDefault(require("./common/logger"));
var core_1 = require("@serverless-devs/core");
var Website = /** @class */ (function () {
    function Website() {
    }
    Website.prototype.formatWebsite = function (sdocument, apiMain) {
        var node = yaml_1.createNode({
            component: 'devsapp/website',
            props: {
                bucket: apiMain.bucket,
                src: {
                    publishDir: './website-base',
                    index: 'index.html',
                },
                region: 'cn-hangzhou',
                hosts: [{ host: 'auto' }],
            },
        });
        var newPair = new types_1.Pair('website-base', node);
        sdocument.contents.items.forEach(function (item) {
            if (item.key.value === 'services') {
                item.value.items.push(newPair);
            }
        });
    };
    Website.prototype.formatJamstackApi = function (sdocument, apiMain) {
        var useJamstackApi = false;
        for (var _i = 0, _a = sdocument.contents.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.key.value === 'services') {
                for (var _b = 0, _c = item.value.items; _b < _c.length; _b++) {
                    var child = _c[_b];
                    for (var _d = 0, _e = child.value.items; _d < _e.length; _d++) {
                        var pair = _e[_d];
                        if (pair.key.value === 'component' && pair.value.value.endsWith('jamstack-api')) {
                            useJamstackApi = true;
                        }
                        if (useJamstackApi && pair.key.value === 'props') {
                            pair.value.items.push(new types_1.Pair('bucket', apiMain.bucket));
                            pair.value.items.push(new types_1.Pair('project', apiMain.project));
                            return;
                        }
                    }
                }
            }
        }
    };
    Website.prototype.existedSyml = function (spath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, sparse, sdocument, useWebsite, templatesPath, reinit, useJamstackApi, apiMain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = fs_extra_1.default.readFileSync(spath, 'utf-8');
                        sparse = yaml_1.parse(content);
                        sdocument = yaml_1.parseDocument(content);
                        useWebsite = utils.checkUseWebsite(sparse).useWebsite;
                        templatesPath = path_1.default.join(__dirname, '../templates');
                        if (!useWebsite) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                { type: 'confirm', name: 'reinit', message: '检测到您已经使用了website组件，是否需要对website进行初始化？', default: 'Y' },
                            ])];
                    case 1:
                        reinit = (_a.sent()).reinit;
                        if (!reinit) {
                            return [2 /*return*/, fs_extra_1.default.copySync(path_1.default.join(templatesPath, 'website-base'), path_1.default.join(process.cwd(), 'website-base'))];
                        }
                        _a.label = 2;
                    case 2:
                        useJamstackApi = utils.checkUseJamstackApi(sparse).useJamstackApi;
                        if (!useJamstackApi) return [3 /*break*/, 4];
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                { type: 'input', name: 'project', message: '请输入应用名称' },
                                { type: 'input', name: 'bucket', message: 'please input alibaba oss bucket' },
                            ])];
                    case 3:
                        apiMain = _a.sent();
                        this.formatWebsite(sdocument, apiMain);
                        this.formatJamstackApi(sdocument, apiMain);
                        fs_extra_1.default.writeFileSync(spath, String(sdocument));
                        _a.label = 4;
                    case 4:
                        fs_extra_1.default.copySync(path_1.default.join(templatesPath, 'website-base'), path_1.default.join(process.cwd(), 'website-base'));
                        return [2 /*return*/];
                }
            });
        });
    };
    Website.prototype.noExistedSyml = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger_1.default.warn("\u68C0\u6D4B\u5230" + process.cwd() + "\u8DEF\u5F84\u4E0B\u4E0D\u5B58\u5728s.[yml|yaml]\u6587\u4EF6\uFF0C\u53EF\u5728\u7EC8\u7AEF\u6267\u884C s init devsapp/website-base\uFF0C\u5177\u4F53\u53EF\u524D\u5F80 " + core_1.colors.cyan.underline('https://github.com/devsapp/website-example') + " \u67E5\u770B");
                return [2 /*return*/];
            });
        });
    };
    return Website;
}());
exports.default = new Website();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2l0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dlYnNpdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsc0RBQTBCO0FBQzFCLHNEQUFnQztBQUNoQyw2QkFBd0Q7QUFDeEQsb0NBQWtDO0FBQ2xDLG9EQUF3QztBQUN4QywyREFBcUM7QUFDckMsOENBQStDO0FBRS9DO0lBQUE7SUE0RUEsQ0FBQztJQTNFUywrQkFBYSxHQUFyQixVQUFzQixTQUFjLEVBQUUsT0FBTztRQUMzQyxJQUFNLElBQUksR0FBRyxpQkFBVSxDQUFDO1lBQ3RCLFNBQVMsRUFBRSxpQkFBaUI7WUFDNUIsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtnQkFDdEIsR0FBRyxFQUFFO29CQUNILFVBQVUsRUFBRSxnQkFBZ0I7b0JBQzVCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjtnQkFDRCxNQUFNLEVBQUUsYUFBYTtnQkFDckIsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDMUI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFNLE9BQU8sR0FBRyxJQUFJLFlBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUNwQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ08sbUNBQWlCLEdBQXpCLFVBQTBCLFNB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