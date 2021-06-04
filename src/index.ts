import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { parseDocument, createNode } from 'yaml'
import { Pair } from 'yaml/types'
import BaseComponent from './common/base';
import * as core from '@serverless-devs/core';
// import logger from './common/logger';
// import { InputProps } from './common/entity';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }
  /**
   * demo 实例
   * @param inputs
   * @returns
   */
  // public async test(inputs: InputProps) {
  //   logger.info('deploy test');
  //   return { hello: 'hanxie' };
  // }
  private trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  private replaceFun(str, obj) {
    const reg = /\{\{(.*?)\}\}/g;
    let arr = str.match(reg);
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        let keyContent = arr[i].replace(/{{|}}/g, '');
        let realKey = this.trim(keyContent.split('|')[0]);
        if (obj[realKey]) {
          str = str.replace(arr[i], obj[realKey]);
        }
      }
    }

    return str;
  }

  private createS(sPath, templateName, replaceData) {
    let sTemplateContent = fs.readFileSync(path.join(__dirname, '..', `templates/${templateName}`), 'utf-8');
    sTemplateContent = this.replaceFun(sTemplateContent, replaceData)
    fs.writeFileSync(sPath, sTemplateContent, 'utf8');
  }

  private async init() {
    const mainDomain: any = await inquirer.prompt([{ type: 'list', name: 'main', 'message': '请选择站点一级域名', choices: [{ name: 'resume.net.cn', value: 'resume.net.cn' }, { name: 'myblog.live', value: 'myblog.live' }] }]);
    const subDomain: any = await inquirer.prompt([{ type: 'input', name: 'sub', 'message': '请输入二级自定义域名' }]);
    const domain = `${subDomain.sub}.${mainDomain.main}`;
    const app: any = await inquirer.prompt([{ type: 'input', name: 'appName', 'message': '请输入应用名' }]);
    const appName = app.appName;
    return { appName, domain };
  }

  // private initGitHub() {
  //   let sTemplateContent = fs.readFileSync(path.join(__dirname, '..', 'templates/github.action.template'), 'utf-8');
  //   const gitActionFile = path.join(process.cwd(), '.github/workflows/registry-push.yml');
  //   fs.ensureFileSync(gitActionFile)
  //   fs.writeFileSync(gitActionFile, sTemplateContent, 'utf8');
  // }

  /**
   * 初始化站点默认是静态站点
   * @param
   * @returns
   */
  public async index() {
    return await this.staticSite();
  }

  /**
   * 初始化静态站点服务
   * @param
   * @returns
   */
  public async staticSite() {
    try {
      // 初始化 s 配置
      const { appName, domain } = await this.init();
      if (appName) {
        const currentDir = process.cwd();
        const sPath = path.join(currentDir, 's.yaml');
        if (!fs.existsSync(sPath)) {
          this.createS(sPath, 'jamstack.template', { domain, appName });
        } else {
          const answers: any = await inquirer.prompt([{ type: 'confirm', name: 'result', 'message': '检测到已经存在s.yaml，确定替换吗' }]);
          if (answers.result === true) {
            this.createS(sPath, 'jamstack.template', { domain, appName });
          }
        }
        return 's.yaml init success';
      }
    } catch (e) {
      return e.message;
    }
  }

  /**
   * 初始化CI/CD配置文件
   * @param inputs
   * @returns
   */
  public async cicd() {
    const cicdInstance = await core.loadComponent('devsapp/cicd')
    await cicdInstance.index({})
  }

  private addService(originTree, newNode) {
    originTree.contents.items.forEach((item) => {
      if (item.key.value === 'services') {
        item.value.items.push(newNode);
      }
    });
    return originTree;
  }

  private addVariable(originTree, newNode) {
    originTree.contents.items.forEach((item) => {
      if (item.key.value === 'vars') {
        item.value.items.push(newNode);
      }
    });
    return originTree;
  }

  /**
   * 初始化|增加api配置
   * @param
   * @returns
   */
  public async api() {
    const currentDir = process.cwd();
    const sPath = path.join(currentDir, 's.yaml');
    let apiName = ''
    if (!fs.existsSync(sPath)) {
      const { appName, domain } = await this.init();
      apiName = appName;
      this.createS(sPath, 'api.template', { domain, appName });
    } else {
      const apiMain: any = await inquirer.prompt([{ type: 'input', name: 'name', 'message': '请输入名称' }]);
      apiName = apiMain.name;
      const content = fs.readFileSync(sPath, 'utf-8');
      let sDocument = parseDocument(content);
      sDocument = this.addVariable(sDocument, new Pair(`${apiName}SourceCode`, apiName));
      const node = createNode({
        component: 'jamstack-api',
        actions: {
          'pre-deploy': [{
            run: 'npm i',
            path: '${vars.' + apiName + 'SourceCode}'
          }]
        },
        props: {
          sourceCode: '${vars.' + apiName + 'SourceCode}',
          route: ['/']
        }
      });
      sDocument = this.addService(sDocument, new Pair(apiName, node));
      fs.writeFileSync(sPath, String(sDocument), 'utf8');
    }
    const apiFolderPath = path.join(currentDir, apiName);
    let createApiFolder = true;
    if (fs.existsSync(apiFolderPath)) {
      const answers: any = await inquirer.prompt([{ type: 'confirm', name: 'result', 'message': `当前路径已经存在${apiName}，确定替换吗` }]);
      if (answers.result !== true) {
        createApiFolder = false;
      }
    }
    if (createApiFolder) {
      fs.copySync(path.join(__dirname, '..', 'templates/api-demo'), apiFolderPath);
      const baseConfigPath = path.join(apiFolderPath, 'config.yml');
      let baseConifgContent = fs.readFileSync(baseConfigPath, 'utf-8');
      baseConifgContent = this.replaceFun(baseConifgContent, { appName: apiName })
      fs.writeFileSync(baseConfigPath, baseConifgContent, 'utf8');
    }
  }

}
