interface IConfig {
    type: 'oss' | 'scheduler';
}
declare class NonHttp {
    type: string;
    constructor(config: IConfig);
    private checkRoute;
    private formatRoute;
    private formatJamstackApi;
    existedSyml(spath: string): Promise<void>;
    private genarateFile;
    noExistedSyml(): Promise<void>;
}
export default NonHttp;
