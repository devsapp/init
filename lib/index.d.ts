import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    test(inputs: InputProps): Promise<{
        hello: string;
    }>;
    private trim;
    private replaceFun;
    private createS;
    index(): Promise<any>;
    staticSite(): Promise<any>;
    jamstack(): Promise<any>;
    private initGitHub;
    cicd(): Promise<void>;
}
