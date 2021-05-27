import BaseComponent from './common/base';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    private trim;
    private replaceFun;
    private createS;
    private init;
    private initGitHub;
    /**
     * 初始化站点默认是静态站点
     * @param
     * @returns
     */
    index(): Promise<any>;
    /**
     * 初始化静态站点服务
     * @param
     * @returns
     */
    staticSite(): Promise<any>;
    /**
     * 初始化 cicd配置文件
     * @param inputs
     * @returns
     */
    cicd(): Promise<void>;
    private addService;
    private addVariable;
    /**
     * 初始化|增加api配置
     * @param
     * @returns
     */
    api(): Promise<void>;
}
