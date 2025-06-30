import { i18n } from '@/plugins/i18n'
import { NavigationTabs } from '@/models/enums/app/NavigationTabs'
import { useRouter, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
export class NavigationTabsService {
  static getContent() {
    return [
      {
        name: i18n.t('header.home'),
        value: NavigationTabs.HOME,
        route: '/'
      },
      {
        name: i18n.t('header.data'),
        value: NavigationTabs.DATA,
        route: {
          name: 'data'
        }
      },
      {
        name: i18n.t('header.services'),
        value: NavigationTabs.SERVICES,
        route: {
          name: 'services'
        }
      }
      // {
      //   name: i18n.t('header.thirdPlace'),
      //   value: NavigationTabs.THIRDPLACE,
      //   route: {
      //     name: 'tiers-lieu'
      //   }
      // }
    ]
  }
  static getTabsNumberFromRoute(route: RouteLocationNormalizedLoadedGeneric, actualNumber: number) {
    const segments = route.path.split('/').filter(Boolean)
    //When Homepage
    if (segments.length === 0) {
      return 0
    }
    const router = useRouter()
    const newTabsNumber = segments
      .map((string) =>
        this.getContent().find((obj) => router?.resolve(obj.route)?.path.includes(string))
      )
      .filter(Boolean)
      .pop()?.value
    if (newTabsNumber && newTabsNumber !== actualNumber) {
      return newTabsNumber
    }
    // When user select a route that is not in the tabs (eg.Map)
    if (!newTabsNumber) {
      return -1
    }
    return actualNumber
  }
}
