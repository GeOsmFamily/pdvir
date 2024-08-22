import { i18n } from "@/main";

export class BreadcrumbsService {
    static getBreadcrumbsItems(path: string) {
        const segments = path.split('/').filter(Boolean);
        const breadcrumbs: string[] = [];
        if (segments.length > 0) {
            breadcrumbs.push(i18n.t('header.home'))
            segments.map((segment) => {
                const key = 'header.' + segment;
                const text = i18n.t(key);
                // Check if traduction exists
                if (text === key) {
                    breadcrumbs.push(segment);
                } else {
                    breadcrumbs.push(text);
                }
            });
        }
        
    
        return breadcrumbs;
    }
}