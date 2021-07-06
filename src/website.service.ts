import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { parseDocument, createNode, parse } from 'yaml';
import { Pair } from 'yaml/types';
import * as utils from './common/utils';
import logger from './common/logger';
import { colors } from '@serverless-devs/core';

class Website {
  private formatWebsite(sdocument: any, apiMain) {
    const node = createNode({
      component: 'devsapp/website',
      props: {
        bucket: apiMain.bucket,
        src: {
          publishDir: './website-base',
          index: 'index.html',
        },
        hosts: [{ host: 'auto' }],
      },
    });
    const newPair = new Pair('website-base', node);
    sdocument.contents.items.forEach((item) => {
      if (item.key.value === 'services') {
        item.value.items.push(newPair);
      }
    });
  }
  private formatJamstackApi(sdocument: any, apiMain) {
    let useJamstackApi = false;
    for (const item of sdocument.contents.items) {
      if (item.key.value === 'services') {
        for (const child of item.value.items) {
          for (const pair of child.value.items) {
            if (pair.key.value === 'component' && pair.value.value.endsWith('jamstack-api')) {
              useJamstackApi = true;
            }
            if (useJamstackApi && pair.key.value === 'props') {
              pair.value.items.push(new Pair('bucket', apiMain.bucket));
              pair.value.items.push(new Pair('project', apiMain.project));
              return;
            }
          }
        }
      }
    }
  }
  public async existedSyml(spath: string) {
    const content = fs.readFileSync(spath, 'utf-8');
    const sparse = parse(content);
    const sdocument: any = parseDocument(content);
    const { useWebsite } = utils.checkUseWebsite(sparse);
    const templatesPath = path.join(__dirname, '../templates');

    if (useWebsite) {
      const { reinit } = await inquirer.prompt([
        { type: 'confirm', name: 'reinit', message: '检测到您已经使用了website组件，是否需要对website进行初始化？', default: 'Y' },
      ]);
      if (!reinit) {
        return fs.copySync(path.join(templatesPath, 'website-base'), path.join(process.cwd(), 'website-base'));
      }
    }

    const { useJamstackApi } = utils.checkUseJamstackApi(sparse);
    if (useJamstackApi) {
      const apiMain: any = await inquirer.prompt([
        { type: 'input', name: 'project', message: '请输入应用名称' },
        { type: 'input', name: 'bucket', message: 'please input alibaba oss bucket' },
      ]);
      this.formatWebsite(sdocument, apiMain);
      this.formatJamstackApi(sdocument, apiMain);
      fs.writeFileSync(spath, String(sdocument));
    }
    fs.copySync(path.join(templatesPath, 'website-base'), path.join(process.cwd(), 'website-base'));
  }

  public async noExistedSyml() {
    logger.warn(
      `检测到${process.cwd()}路径下不存在s.[yml|yaml]文件，可在终端执行 s init devsapp/website-base，具体可前往 ${colors.cyan.underline(
        'https://github.com/devsapp/website-example',
      )} 查看`,
    );
  }
}

export default new Website();
