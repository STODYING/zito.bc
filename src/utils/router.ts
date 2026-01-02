// 간단한 SPA 라우터
type RouteHandler = () => void;

interface Routes {
    [path: string]: RouteHandler;
}

class Router {
    private routes: Routes = {};
    private defaultRoute: RouteHandler | null = null;

    addRoute(path: string, handler: RouteHandler): void {
        this.routes[path] = handler;
    }

    setDefault(handler: RouteHandler): void {
        this.defaultRoute = handler;
    }

    navigate(path: string): void {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute(): void {
        const path = window.location.pathname;
        const handler = this.routes[path];
        
        if (handler) {
            handler();
        } else if (this.defaultRoute) {
            this.defaultRoute();
        }
    }

    init(): void {
        // 초기 라우트 처리
        this.handleRoute();

        // popstate 이벤트 리스너 (브라우저 뒤로/앞으로 버튼)
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        // 링크 클릭 이벤트 위임
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[data-link]');
            
            if (anchor) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    this.navigate(href);
                }
            }
        });
    }
}

export const router = new Router();
