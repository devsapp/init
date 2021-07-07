import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { parseDocument, createNode, parse, stringify } from 'yaml';
import { Pair, Scalar } from 'yaml/types';
import logger from './common/logger';
import { getCredential } from '@serverless-devs/core';
import * as utils from './common/utils';

class Api {
  private checkRoute(route: string[], name) {
    const opt = route.filter((item) => {
      if (name === '/' || name === '/index') {
        return item === '/' || item === '/index';
      }
      return item === name;
    });
    if (opt.length > 0) {
      logger.warn(`${name} 路由已存在，请重新创建。`);
      return true;
    }
    return false;
  }
  private formatRoute(route: string) {
    return path.join('/', route);
  }
  private formatWebsite(sdocument: any, apiMain) {
    let useWebsite = false;
    for (const item of sdocument.contents.items) {
      if (item.key.value === 'services') {
        for (const child of item.value.items) {
          for (const pair of child.value.items) {
            if (pair.key.value === 'component' && pair.value.value.endsWith('website')) {
              useWebsite = true;
            }
            if (useWebsite && pair.key.value === 'props') {
              pair.value.items.push(new Pair('customDomain', '${rest-api.output.customDomain}'));
              pair.value.items.push(new Pair('project', apiMain.project));
              return;
            }
          }
        }
      }
    }
  }

  private formatJamstackApi(sdocument: any, apiMain) {
    const node = createNode({
      component: 'devsapp/jamstack-api',
      actions: {
        'pre-deploy': [
          {
            run: 'npm i',
            path: apiMain.sourceCode,
          },
        ],
      },
      props: {
        region: 'cn-hangzhou',
        sourceCode: apiMain.sourceCode,
        route: [apiMain.route],
      },
    });
    const newPair = new Pair('rest-api', node);
    sdocument.contents.items.forEach((item) => {
      if (item.key.value === 'services') {
        item.value.items.push(newPair);
      }
    });
  }

  async existedSymlApi(spath: string) {
    const content = fs.readFileSync(spath, 'utf-8');
    const sparse = parse(content);
    const sdocument: any = parseDocument(content);
    const { useJamstackApi, apiProps, appName } = utils.checkUseJamstackApi(sparse);

    if (useJamstackApi) {
      const apiMain: any = await inquirer.prompt([{ type: 'input', name: 'route', message: '请输入路由名称' }]);
      apiMain.route = this.formatRoute(apiMain.route);
      if (this.checkRoute(apiProps.route, apiMain.route)) return;
      sdocument.contents.items.forEach((item) => {
        if (item.key.value === 'services') {
          item.value.items.forEach((child) => {
            if (child.key.value === appName) {
              child.value.items.forEach((pair) => {
                if (pair.key.value === 'props') {
                  pair.value.items.forEach((obj) => {
                    if (obj.key.value === 'route') {
                      obj.value.items.push(new Scalar(apiMain.route));
                    }
                  });
                }
              });
            }
          });
        }
      });
      fs.writeFileSync(spath, String(sdocument));
      return this.genarateFile({ sourceCode: apiProps.sourceCode, route: apiMain.route }, useJamstackApi);
    }

    let promptConfig = [
      { type: 'input', name: 'sourceCode', message: '请输入部署函数的路径', default: 'functions' },
      { type: 'input', name: 'route', message: '请输入路由名称' },
    ];
    const { useWebsite } = utils.checkUseWebsite(sparse);
    if (useWebsite) {
      promptConfig = [{ type: 'input', name: 'project', message: '请输入应用名称' }].concat(promptConfig);
    }
    const apiMain: any = await inquirer.prompt(promptConfig);
    apiMain.route = this.formatRoute(apiMain.route);
    useWebsite && this.formatWebsite(sdocument, apiMain);
    this.formatJamstackApi(sdocument, apiMain);
    fs.writeFileSync(spath, String(sdocument));
    this.genarateFile(apiMain);
  }
  private genarateFile({ sourceCode, route }, useJamstackApi?: boolean) {
    const currentPath = process.cwd();
    const sourceCodePath = path.join(currentPath, sourceCode);
    const routePath = path.join(sourceCodePath, route === '/' ? '/index' : route);
    const templatesPath = path.join(__dirname, '../templates');
    const indexTemplate = fs.readFileSync(path.join(templatesPath, 'index-template.js'), 'utf8');
    if (!useJamstackApi) {
      fs.copySync(path.join(templatesPath, 'api-demo'), sourceCodePath);
    }
    fs.ensureDirSync(routePath);
    fs.writeFileSync(path.join(routePath, 'index.js'), indexTemplate);
  }
  async noExistedSymlApi() {
    const { Alias } = await getCredential('default');
    const apiMain: any = await inquirer.prompt([
      { type: 'input', name: 'sourceCode', message: '请输入部署函数的路径', default: 'functions' },
      { type: 'input', name: 'route', message: '请输入路由名称' },
    ]);
    const content = {
      edition: '1.0.0',
      name: 'appName',
      access: Alias,
      services: {
        'rest-api': {
          component: 'devsapp/jamstack-api',
          actions: {
            'pre-deploy': [
              {
                run: 'npm i',
                path: apiMain.sourceCode,
              },
            ],
          },
          props: {
            region: 'cn-hangzhou',
            sourceCode: apiMain.sourceCode,
            route: [this.formatRoute(apiMain.route)],
          },
        },
      },
    };
    fs.writeFileSync(path.join(process.cwd(), 's.yaml'), stringify(content));
    this.genarateFile(apiMain);
  }
}

export default new Api();
