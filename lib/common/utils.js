"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpath = exports.checkUseJamstackApi = exports.checkUseWebsite = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
function checkUseWebsite(sparse) {
    var useWebsite = false;
    for (var key in sparse.services) {
        if (sparse.services[key].component.endsWith('website')) {
            useWebsite = true;
        }
    }
    return { useWebsite: useWebsite };
}
exports.checkUseWebsite = checkUseWebsite;
function checkUseJamstackApi(sparse) {
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
}
exports.checkUseJamstackApi = checkUseJamstackApi;
function getSpath() {
    var currentPath = process.cwd();
    var sYamlPath = path_1.default.join(currentPath, 's.yaml');
    if (fs_extra_1.default.existsSync(sYamlPath)) {
        return sYamlPath;
    }
    var sYmlPath = path_1.default.join(currentPath, 's.yml');
    if (fs_extra_1.default.existsSync(sYmlPath)) {
        return sYmlPath;
    }
}
exports.getSpath = getSpath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QixzREFBMEI7QUFDMUIsU0FBZ0IsZUFBZSxDQUFDLE1BQVc7SUFDekMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLEtBQUssSUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNqQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0RCxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ25CO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQztBQUN4QixDQUFDO0FBUkQsMENBUUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxNQUFXO0lBQzdDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztJQUMzQixJQUFJLFFBQVEsR0FBUSxFQUFFLENBQUM7SUFDdkIsSUFBSSxPQUFlLENBQUM7SUFDcEIsS0FBSyxJQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ2pDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzNELGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDdEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNkLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN2QztLQUNGO0lBQ0QsT0FBTyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDO0FBQy9DLENBQUM7QUFaRCxrREFZQztBQUVELFNBQWdCLFFBQVE7SUFDdEIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLElBQU0sU0FBUyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELElBQUksa0JBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDNUIsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFDRCxJQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxJQUFJLGtCQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQVZELDRCQVVDIn0=