const KoaRouter = require('koa-router'); // 路由模块
const router = new KoaRouter();
const routerList = require('./controller/page_router.js');

module.exports = (app) => {
    for (let routerObj of routerList) {
        switch (routerObj.type) {
            case 'GET':
                router.get(routerObj.url, routerObj.handler);
                break;
            case 'POST':
                router.post(routerObj.url, routerObj.handler);
                break;
        }
    }

    // 路由集合页
    router.get('/views/router_list.paper', async (ctx, next) => {
        await ctx.render('index', { routerList });
        await next();
    });
    router.get('/', async (ctx, next) => {
        ctx.redirect('/views/router_list.paper');
        await next();
    });
    router.get('/views/error/404.paper', async (ctx, next) => {
        await ctx.render('views/error/404.html');
        await next();
    });
    app.use(router.routes()).use(router.allowedMethods());
};
