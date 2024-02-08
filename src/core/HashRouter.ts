import Component from "@/core/Component";

export type Route = {
    path: string;
    page: typeof  Component;
};

class Router {
    $app: HTMLElement;
    routes:{
        [key: string]: typeof Component;
    } = {};
    fallback: string = "/";

    constructor({
        $app,
        routes,
        fallback = "/",
                }:{
        $app:HTMLElement;
        routes: Route[];
        fallback?: string;

    }){
        this.$app = $app;
        this.fallback = fallback;

        routes.forEach((route:Route)=>{
            this.routes[route.path] = route.page;
        });
        this.initEvent();
    }

    initEvent(){
        window.addEventListener("hashchange",() => this.onHashChangeHandler())
    }

    onHashChangeHandler(){
        this.$app.innerHTML ="";

        const hash = window.location.hash;
        let path = hash.substring(1)

        this.renderPage(path);
    }

    hasRoute(path: string){
        return typeof this.routes[path] !== "undefined";
    }

    getRoute(path:string){
        return this.routes[path];
    }

    renderPage(path: string){
        let route;

        const regex = /\w{1,}$/;

        if(this.hasRoute(path)){
            route = this.getRoute(path);
        }else if (regex.test(path)){
            route = this.getRoute(path.replace(regex,":id"));
        }else{
            route = this.getRoute(this.fallback);
        }

        new route(this.$app,{});
    }

    push(path:string){
        window.location.hash = path;
    }
}

export let router:{
    push: (path:string) => void;
}

export function initRouter(options: {$app: HTMLElement; routes:Route[]}){
    const routerObj = new Router(options);

    router = {
        push: (path) => routerObj.push(path)
    }

    routerObj.onHashChangeHandler();
}
