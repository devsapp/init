import BaseComponent from './common/base';
import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { parseDocument, createNode, parse } from 'yaml';
import { Pair, Scalar } from 'yaml/types';
import get from 'lodash.get';

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
  private async existedSymlApi(spath: string) {
    const content = fs.readFileSync(spath, 'utf-8');
    const sparse = parse(content);
    const sdocument: any = parseDocument(content);

    const useJamstackApi = get(sparse, ['services', 'start-function', 'component'], '').endsWith('jamstack-api');
    if (useJamstackApi) {
      const sourceCode: string = get(sparse, ['services', 'start-function', 'props', 'sourceCode']);
      const apiMain: any = await inquirer.prompt([{ type: 'input', name: 'route', message: '请输入部署的函数名称' }]);
      sdocument.contents.items.forEach((item) => {
        if (item.key.value === 'services') {
          item.value.items.forEach((child) => {
            if (child.key.value === 'start-function') {
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
      return fs.writeFileSync(spath, String(sdocument));
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
    const newPair = new Pair('start-function', node);
    sdocument.contents.items.forEach((item) => {
      if (item.key.value === 'services') {
        item.value.items.push(newPair);
      }
    });
    fs.writeFileSync(spath, String(sdocument));
  }
  public async api() {
    const spath = this.getSpath();
    if (spath) {
      await this.existedSymlApi(spath);
    }
  }
}
