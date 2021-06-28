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

}
