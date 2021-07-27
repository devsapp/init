"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpath = exports.checkUseJamstackApi = exports.checkUseWebsite = void 0;
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
    return process.env.templateFile === 'null' ? undefined : process.env.templateFile;
}
exports.getSpath = getSpath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLGVBQWUsQ0FBQyxNQUFXO0lBQ3pDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUN2QixLQUFLLElBQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDakMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEQsVUFBVSxHQUFHLElBQUksQ0FBQztTQUNuQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQVJELDBDQVFDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsTUFBVztJQUM3QyxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDM0IsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLElBQUksT0FBZSxDQUFDO0lBQ3BCLEtBQUssSUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNqQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMzRCxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDZCxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkM7S0FDRjtJQUNELE9BQU8sRUFBRSxjQUFjLGdCQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQztBQUMvQyxDQUFDO0FBWkQsa0RBWUM7QUFFRCxTQUFnQixRQUFRO0lBQ3RCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0FBQ3BGLENBQUM7QUFGRCw0QkFFQyJ9