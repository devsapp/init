"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultProfilePath = exports.getProfileFile = exports.getConfig = void 0;
var os_1 = __importDefault(require("os"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yaml_1 = __importDefault(require("yaml"));
var i18n_1 = require("i18n");
function getConfig(key) {
    var profile = getProfileFile();
    return profile[key];
}
exports.getConfig = getConfig;
function getProfileFile() {
    var profileResult = {};
    try {
        var profileFilePath = getDefaultProfilePath();
        profileResult = yaml_1.default.parse(fs_1.default.readFileSync(profileFilePath, 'utf8')) || {};
    }
    catch (e) {
        console.log(e);
    }
    return profileResult;
}
exports.getProfileFile = getProfileFile;
function getDefaultProfilePath() {
    return path_1.default.join(os_1.default.homedir(), '.s', 'set-config.yml');
}
exports.getDefaultProfilePath = getDefaultProfilePath;
var i18n = new i18n_1.I18n({
    locales: ['en', 'zh'],
    directory: path_1.default.join(__dirname, '..', '..', 'locales'),
});
var locale = getConfig('locale');
if (locale) {
    i18n.setLocale(locale);
}
else {
    i18n.setLocale('en');
}
exports.default = i18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwQ0FBb0I7QUFDcEIsMENBQW9CO0FBQ3BCLDhDQUF3QjtBQUN4Qiw4Q0FBd0I7QUFDeEIsNkJBQTRCO0FBRTVCLFNBQWdCLFNBQVMsQ0FBQyxHQUFXO0lBQ25DLElBQU0sT0FBTyxHQUFHLGNBQWMsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFIRCw4QkFHQztBQUVELFNBQWdCLGNBQWM7SUFDNUIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQUk7UUFDRixJQUFNLGVBQWUsR0FBRyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2hELGFBQWEsR0FBRyxjQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzVFO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQVZELHdDQVVDO0FBRUQsU0FBZ0IscUJBQXFCO0lBQ25DLE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekQsQ0FBQztBQUZELHNEQUVDO0FBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUM7SUFDcEIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNyQixTQUFTLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUM7Q0FDdkQsQ0FBQyxDQUFDO0FBRUgsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25DLElBQUksTUFBTSxFQUFFO0lBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN4QjtLQUFNO0lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0QjtBQUVELGtCQUFlLElBQUksQ0FBQyJ9