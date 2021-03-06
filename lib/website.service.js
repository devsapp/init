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
var child_process_1 = require("child_process");
var Website = /** @class */ (function () {
    function Website() {
    }
    Website.prototype.formatWebsite = function (sdocument, apiMain) {
        var node = yaml_1.createNode({
            component: 'devsapp/website',
            props: {
                bucket: apiMain.bucket,
                src: {
                    publishDir: './website-react',
                    index: 'index.html',
                },
                region: 'cn-hangzhou',
                hosts: [{ host: 'auto' }],
            },
        });
        var newPair = new types_1.Pair('website-react', node);
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
                                { type: 'confirm', name: 'reinit', message: '???????????????????????????website????????????????????????website??????????????????', default: 'Y' },
                            ])];
                    case 1:
                        reinit = (_a.sent()).reinit;
                        if (!reinit) {
                            return [2 /*return*/, fs_extra_1.default.copySync(path_1.default.join(templatesPath, 'website-react'), path_1.default.join(process.cwd(), 'website-react'))];
                        }
                        _a.label = 2;
                    case 2:
                        useJamstackApi = utils.checkUseJamstackApi(sparse).useJamstackApi;
                        if (!useJamstackApi) return [3 /*break*/, 4];
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                { type: 'input', name: 'project', message: '?????????????????????' },
                                { type: 'input', name: 'bucket', message: 'please input alibaba oss bucket' },
                            ])];
                    case 3:
                        apiMain = _a.sent();
                        this.formatWebsite(sdocument, apiMain);
                        this.formatJamstackApi(sdocument, apiMain);
                        fs_extra_1.default.writeFileSync(spath, String(sdocument));
                        _a.label = 4;
                    case 4:
                        fs_extra_1.default.copySync(path_1.default.join(templatesPath, 'website-react'), path_1.default.join(process.cwd(), 'website-react'));
                        return [2 /*return*/];
                }
            });
        });
    };
    Website.prototype.noExistedSyml = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                child_process_1.spawnSync('s init devsapp/website-react', { shell: true, stdio: 'inherit' });
                return [2 /*return*/];
            });
        });
    };
    return Website;
}());
exports.default = new Website();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2l0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dlYnNpdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsc0RBQTBCO0FBQzFCLHNEQUFnQztBQUNoQyw2QkFBd0Q7QUFDeEQsb0NBQWtDO0FBQ2xDLG9EQUF3QztBQUN4QywrQ0FBMEM7QUFDMUM7SUFBQTtJQXdFQSxDQUFDO0lBdkVTLCtCQUFhLEdBQXJCLFVBQXNCLFNBQWMsRUFBRSxPQUFPO1FBQzNDLElBQU0sSUFBSSxHQUFHLGlCQUFVLENBQUM7WUFDdEIsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2dCQUN0QixHQUFHLEVBQUU7b0JBQ0gsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRSxhQUFhO2dCQUNyQixLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUMxQjtTQUNGLENBQUMsQ0FBQztRQUNILElBQU0sT0FBTyxHQUFHLElBQUksWUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3BDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTyxtQ0FBaUIsR0FBekIsVUFBMEIsU0FBYyxFQUFFLE9BQU87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