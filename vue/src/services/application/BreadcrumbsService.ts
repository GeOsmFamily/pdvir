import { i18n } from "@/main";
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";

export class BreadcrumbsService {
    static getBreadcrumbsItems(route: RouteLocationNormalizedLoadedGeneric) {
        const segments = route.fullPath.split('/').filter(Boolean);
        let newRoute = "/"
        const breadcrumbs: {title: string, to: string}[] = [];
        if (segments.length > 0) {
            breadcrumbs.push({title:i18n.t('header.home'), to: newRoute});
            segments.map((segment, i) => {
                const key = 'header.' + segment;
                const text = i18n.t(key);
                newRoute += segment
                // Check if traduction exists
                if (text === key) {
                    breadcrumbs.push({title: segment, to: newRoute});
                } else {
                    breadcrumbs.push({title: text, to: newRoute});
                }
                if (i < segments.length - 1) {
                    newRoute += '/'
                }
            });
        }
    
        return breadcrumbs;
    }
}