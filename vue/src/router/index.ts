import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useApplicationStore } from '@/stores/applicationStore'
import ActorProfile from '@/components/views-components/actors/ActorProfile.vue'
import AdminMembers from '@/components/views-components/admin/AdminMembers.vue'
import AdminContent from '@/components/views-components/admin/AdminContent.vue'
import AdminResources from '@/components/views-components/admin/AdminResources.vue'
import { DialogKey } from '@/models/enums/DialogKey'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/actors',
      name: 'actors',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ActorsView.vue')
    },
    {
      path: '/actors/:name',
      name: 'actorProfile',
      component: ActorProfile,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/ResourcesView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue')
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/administration',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: 'membersPanel',
          component: AdminMembers,
        },
        {
          path: 'contentPanel',
          component: AdminContent,
        },
        {
          path: 'resourcesPanel',
          component: AdminResources,
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const applicationStore = useApplicationStore()
  if (typeof to.query.dialog === 'string' && Object.values(DialogKey).includes(to.query.dialog as any) && to.query.dialog != undefined) {
    applicationStore.activeDialog = to.query.dialog as DialogKey
  } else {
    applicationStore.activeDialog = null
  }
  next()
})

export default router
