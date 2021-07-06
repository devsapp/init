import BaseComponent from './common/base';
import website from './website.service';
import api from './api.service';
import * as utils from './common/utils';

export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }
  public async api() {
    const spath = utils.getSpath();
    if (spath) {
      return await api.existedSymlApi(spath);
    }
    await api.noExistedSymlApi();
  }

  public async website() {
    const spath = utils.getSpath();
    if (spath) {
      return await website.existedSyml(spath);
    }
    await website.noExistedSyml();
  }
}
