import BaseComponent from './common/base';
import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { parseDocument, createNode, parse, stringify } from 'yaml';
import { Pair, Scalar } from 'yaml/types';
import get from 'lodash.get';
import { Logger } from '@serverless-devs/core';

const logger = new Logger('Init');

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }

  private getSpath() {
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
  private checkRoute(route: string[], name) {
    const opt = route.filter((item) => item === name);
    if (opt.length > 0) {
      logger.warn(`${name} 函数已存在，请重新创建。`);
      return true;
    }
    return false;
  }
  private async existedSymlApi(spath: string) {
    const content = fs.readFileSync(spath, 'utf-8');
    const sparse = parse(content);
    const sdocument: any = parseDocument(content);

    const useJamstackApi = get(sparse, ['services', 'api', 'component'], '').endsWith('jamstack-api');
    if (useJamstackApi) {
      const sourceCode: string = get(sparse, ['services', 'api', 'props', 'sourceCode']);
      const route: string[] = get(sparse, ['services', 'api', 'props', 'route']);
      const apiMain: any = await inquirer.prompt([{ type: 'input', name: 'route', message: '请输入部署的函数名称' }]);
      if (this.checkRoute(route, apiMain.route)) return;
      sdocument.contents.items.forEach((item) => {
        if (item.key.value === 'services') {
          item.value.items.forEach((child) => {
            if (child.key.value === 'api') {
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
      return this.genarateFile({ sourceCode, ...apiMain }, useJamstackApi);
    }

    const apiMain: any = await inquirer.prompt([
      { type: 'input', name: 'sourceCode', message: '请输入部署函数的目录', default: 'functions' },
      { type: 'input', name: 'route', message: '请输入部署的函数名称' },
    ]);
    const node = createNode({
      component: 'jamstack-api',
      actions: {
        'pre-deploy': [
          {
            run: 'npm i',
            path: apiMain.sourceCode,
          },
        ],
      },
      props: {
        sourceCode: apiMain.sourceCode,
        route: [apiMain.route],
      },
    });
    const newPair = new Pair('api', node);
    sdocument.contents.items.forEach((item) => {
      if (item.key.value === 'services') {
        item.value.items.push(newPair);
      }
    });
    fs.writeFileSync(spath, String(sdocument));
    this.genarateFile(apiMain);
  }
  private genarateFile({ sourceCode, route }, useJamstackApi?: boolean) {
    const currentPath = process.cwd();
    const sourceCodePath = path.join(currentPath, sourceCode);
    const routePath = path.join(sourceCodePath, route);
    const templatesPath = path.join(__dirname, '../templates');
    const indexTemplate = fs.readFileSync(path.join(templatesPath, 'index-template.js'), 'utf8');
    if (!useJamstackApi) {
      fs.copySync(path.join(templatesPath, 'api-demo'), sourceCodePath);
    }
    fs.ensureDirSync(routePath);
    fs.writeFileSync(path.join(routePath, 'index.js'), indexTemplate);
  }
  private async noExistedSymlApi() {
    const apiMain: any = await inquirer.prompt([
      { type: 'input', name: 'sourceCode', message: '请输入部署函数的目录', default: 'functions' },
      { type: 'input', name: 'route', message: '请输入部署的函数名称' },
    ]);
    const content = {
      edition: '1.0.0',
      name: 'appName',
      services: {
        api: {
          component: 'jamstack-api',
          actions: {
            'pre-deploy': [
              {
                run: 'npm i',
                path: apiMain.sourceCode,
              },
            ],
          },
          props: {
            sourceCode: apiMain.sourceCode,
            route: [apiMain.route],
          },
        },
      },
    };
    fs.writeFileSync(path.join(process.cwd(), 's.yaml'), stringify(content));
    this.genarateFile(apiMain);
  }
  public async api() {
    const spath = this.getSpath();
    if (spath) {
      return await this.existedSymlApi(spath);
    }
    await this.noExistedSymlApi();
  }
}
