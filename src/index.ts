import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps } from './common/entity';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props)
  }
  /**
   * demo 实例
   * @param inputs
   * @returns
   */
  public async test(inputs: InputProps) {
    logger.info('deploy test');
    return { hello: 'hanxie' };
  }
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
    console.log(replaceData);
    let sTemplateContent = fs.readFileSync(path.join(__dirname, '..', `templates/${templateName}`), 'utf-8');
    sTemplateContent = this.replaceFun(sTemplateContent, replaceData)
    fs.writeFileSync(sPath, sTemplateContent, 'utf8');
  }

  public async index() {
    return await this.jamstack();
  }
  public async staticSite() {
    try {
      // 初始化 s 配置
      const currentDir = process.cwd();
      const sPath = path.join(currentDir, 's.yaml');
      if (!fs.existsSync(sPath)) {
        this.createS(sPath, 'static-site.template', { website: `website${Date.now()}` });
      } else {
        const answers: any = await inquirer.prompt([{ type: 'confirm', name: 'result', 'message': '检测到已经存在s.yaml，确定替换吗' }]);
        if (answers.result === true) {
          this.createS(sPath, 'static-site.template', { website: `website${Date.now()}` });
        }
      }
      return 's.yaml 初始化成功，您可进行下一步操作';
    } catch (e) {
      return e.message;
    }

  }


  public async jamstack() {
    try {
      // 初始化 s 配置

      const mainDomain: any = await inquirer.prompt([{ type: 'list', name: 'main', 'message': '请选择站点一级域名', choices: [{ name: 'resume.net.cn', value: 'resume.net.cn' }, { name: 'myblog.wiki', value: 'myblog.wiki' }, { name: 'myblog.live', value: 'myblog.live' }] }]);
      const subDomain: any = await inquirer.prompt([{ type: 'input', name: 'sub', 'message': '请输入二级自定义域名' }]);
      const domain = `${subDomain.sub}.${mainDomain.main}`;
      const app: any = await inquirer.prompt([{ type: 'input', name: 'appName', 'message': '请输入应用名' }]);
      const appName = app.appName;
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
        return 's.yaml 初始化成功，您可进行下一步操作';
      }

    } catch (e) {
      return e.message;
    }

  }

  private initGitHub() {
    let sTemplateContent = fs.readFileSync(path.join(__dirname, '..', 'templates/github.action.template'), 'utf-8');
    const gitActionFile = path.join(process.cwd(), '.github/workflows/registry-push.yml');
    fs.ensureFileSync(gitActionFile)
    fs.writeFileSync(gitActionFile, sTemplateContent, 'utf8');
  }

  public async cicd() {
    const cicdPlatform: any = await inquirer.prompt([{ type: 'list', name: 'platform', 'message': '选择部署平台', choices: [{ name: 'github', value: 'github' }, { name: 'gitlab', value: 'gitlab' }] }]);
    switch (cicdPlatform.platform) {
      case 'github':
        this.initGitHub();
        break;
      default:
        break;
    }
  }

}
