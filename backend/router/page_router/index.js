const { SUFFIX } = require('../../config/index.js');
const glob = require('glob');
let pageRouter = [];
let configRouter = [];
let autoRouter = [];
const pageRouterList = [];
const fs = require("fs");

const htmlFiles = glob.sync(`${process.cwd()}/src/pages/**/*.html`);
autoRouter = htmlFiles.map(i => {
    const url = i.split("src/pages")[1].replace("/html", "");
    const src = "dist/" + i.split("src/pages/")[1];
    const mfsSrc = i.replace("src/pages", "dist");
    pageRouterList.push(url.replace('.html', SUFFIX));
    return {
        type: 'GET',
        url,
        handler: async (ctx, next, compiler) => {
            ctx.set("Content-Type", "text/html");
            let htmlFile = null;
            if(compiler) {
                htmlFile = compiler.outputFileSystem.readFileSync(mfsSrc);
            } else {
                htmlFile = fs.readFileSync(src);
            }
            ctx.body = htmlFile;
            await next();
        }
    };
})

const indexPage = { // 主页面
    type: 'GET',
    url: '/',
    handler: async (ctx, next) => {
        ctx.body = "Success";
        await next();
    }
};
const notFoundPage = { // 404
    type: 'GET',
    url: '/404.paper',
    handler: async (ctx, next) => {
        ctx.set("Content-Type", "text/html");
        ctx.body = fs.readFileSync(`src/common/html/404.html`);
        await next();
    }
};
const interErrorPage = { // 500
    type: 'GET',
    url: '/500.paper',
    handler: async (ctx, next) => {
        ctx.set("Content-Type", "text/html");
        ctx.body = fs.readFileSync(`src/common/html/500.html`);
        await next();
    }
};
const routerListPage = { // router
    type: 'GET',
    url: '/router.paper',
    handler: async (ctx, next) => {
        ctx.set("Content-Type", "text/html");
        ctx.body = fs.readFileSync(`src/common/html/router.html`);
        await next();
    }
};
configRouter = [ indexPage, notFoundPage, interErrorPage, routerListPage ];
pageRouter = [ ...autoRouter, ...configRouter ];

// 路由统一后缀，约定即可，方便管理（无实际意义）
pageRouter.map(item => item.url = item.url.replace('.html', SUFFIX));

module.exports = pageRouter;
