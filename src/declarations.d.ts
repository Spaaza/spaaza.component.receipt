declare module "*.less" {
    const content: string;
    export default content;
}

declare module "*.json" {
    const content: any;
    export default content;
}

declare function require(moduleName: string): any;
