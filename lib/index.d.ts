import BaseComponent from './common/base';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    api(): Promise<void>;
    website(): Promise<void>;
    oss(): Promise<void>;
    scheduler(): Promise<void>;
}
