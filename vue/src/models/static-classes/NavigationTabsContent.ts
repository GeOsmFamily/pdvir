import { useI18n } from 'vue-i18n';
import { NavigationTabs } from '../enums/NavigationTabs';
export class NavigationTabsContent {
    static getContent(){
        const { t } = useI18n()
        return [
            {
                name: t("header.home"),
                value: NavigationTabs.HOME,
                route: "/"
            },
            {
                name: t("header.actors"),
                value: NavigationTabs.ACTORS,
                route: "/actors"
            },
            {
                name: t("header.projects"),
                value: NavigationTabs.PROJECTS,
                route: "/projects"
            },
            {
                name: t("header.resources"),
                value: NavigationTabs.RESOURCES,
                route: "/resources"
            },
            {
                name: t("header.services"),
                value: NavigationTabs.SERVICES,
                route: "/services"
            }
        ]
    }
}