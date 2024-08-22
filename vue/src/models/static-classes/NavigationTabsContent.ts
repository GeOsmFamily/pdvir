import { i18n } from '@/main';
import { NavigationTabs } from '../enums/NavigationTabs';
export class NavigationTabsContent {
    static getContent(){
        return [
            {
                name: i18n.t("header.home"),
                value: NavigationTabs.HOME,
                route: "/"
            },
            {
                name: i18n.t("header.actors"),
                value: NavigationTabs.ACTORS,
                route: "/actors"
            },
            {
                name: i18n.t("header.projects"),
                value: NavigationTabs.PROJECTS,
                route: "/projects"
            },
            {
                name: i18n.t("header.resources"),
                value: NavigationTabs.RESOURCES,
                route: "/resources"
            },
            {
                name: i18n.t("header.services"),
                value: NavigationTabs.SERVICES,
                route: "/services"
            }
        ]
    }
}