declare module "*.less" {
    const content: string;
    export default content;
}

declare function require(moduleName: string): any;
