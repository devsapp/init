import path from 'path';
import fs from 'fs-extra';
export function checkUseWebsite(sparse: any) {
  let useWebsite = false;
  for (const key in sparse.services) {
    if (sparse.services[key].component.endsWith('website')) {
      useWebsite = true;
    }
  }
  return { useWebsite };
}

export function checkUseJamstackApi(sparse: any) {
  let useJamstackApi = false;
  let apiProps: any = {};
  let appName: string;
  for (const key in sparse.services) {
    if (sparse.services[key].component.endsWith('jamstack-api')) {
      useJamstackApi = true;
      appName = key;
      apiProps = sparse.services[key].props;
    }
  }
  return { useJamstackApi, apiProps, appName };
}

export function getSpath() {
  const currentPath = process.cwd();
  const sYamlPath = path.join(currentPath, 's.yaml');
  if (fs.existsSync(sYamlPath)) {
    return sYamlPath;
  }
  const sYmlPath = path.join(currentPath, 's.yml');
  if (fs.existsSync(sYmlPath)) {
    return sYmlPath;
  }
}
