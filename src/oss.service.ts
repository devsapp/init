import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { parseDocument, createNode, parse, stringify } from 'yaml';
import { Pair, Scalar } from 'yaml/types';
import logger from './common/logger';
import { getCredential } from '@serverless-devs/core';
import * as utils from './common/utils';

class Oss {
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
        app: {
          name: 'rest-api-demo',
        },
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

  async existedSyml(spath: string) {
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
    const apiMain: any = await inquirer.prompt(promptConfig);
    apiMain.route = this.formatRoute(apiMain.route);
    this.formatJamstackApi(sdocument, apiMain);
    fs.writeFileSync(spath, String(sdocument));
    this.genarateFile(apiMain);
  }
  private genarateFile({ sourceCode, route }, useJamstackApi?: boolean) {
    const currentPath = process.cwd();
    const sourceCodePath = path.join(currentPath, sourceCode);
    const routePath = path.join(sourceCodePath, route === '/' ? '/index' : route);
    const templatesPath = path.join(__dirname, '../templates');
    const indexTemplate = fs.readFileSync(path.join(templatesPath, 'index-oss.js'), 'utf8');
    if (!useJamstackApi) {
      fs.copySync(path.join(templatesPath, 'oss-demo'), sourceCodePath);
    }
    fs.ensureDirSync(routePath);
    fs.writeFileSync(path.join(routePath, 'index.js'), indexTemplate);
  }
  async noExistedSyml() {
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
            app: {
              name: 'rest-api-demo',
            },
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

export default new Oss();
