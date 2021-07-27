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
  return process.env.templateFile === 'null' ? undefined : process.env.templateFile;
}
