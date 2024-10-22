<template>
    <div class="AdminPanel">
        <AdminTopBar 
            page="Members"
            :items="adminStore.appMembers"
            :sortingListItems="[
                {sortingKey: 'isValidated', text: 'Utilisateurs à valider'},
                {sortingKey: 'firstName', text: 'Prénom'},
                {sortingKey: 'lastName', text: 'Nom'},
                {sortingKey: 'email', text: 'Email'}
            ]"
            :createFunction="createUser"
            searchKey="email"
            @updateSortingKey="sortingUsersSelectedMethod = $event"
        />
        <AdminTable
            :items="sortedUsers"
            :tableKeys="['lastName', 'firstName', 'email']"
            :columnWidths="['20%', '20%', '30%', '30%']"
            :plainText="true"
        >
            <template #editContentCell="{ item }">
                <template v-if="!item.isValidated">
                    <v-btn size="small" icon="mdi-arrow-right" class="text-main-blue" @click="editUser(item as User)"></v-btn>
                </template> 
                <template v-else>
                    <v-icon :color="(item as User).roles.includes(UserRoles.EDITOR_ACTORS) ? 'main-blue' : 'main-grey'" icon="mdi-contacts" class="mr-1" size="small"></v-icon>
                    <v-icon :color="(item as User).roles.includes(UserRoles.EDITOR_PROJECTS) ? 'main-blue' : 'main-grey'" icon="mdi-rocket-launch" class="mr-1" size="small"></v-icon>
                    <v-icon :color="(item as User).roles.includes(UserRoles.EDITOR_DATA) ? 'main-blue' : 'main-grey'" icon="mdi-database-arrow-down" class="mr-1" size="small"></v-icon>
                    <v-icon :color="(item as User).roles.includes(UserRoles.EDITOR_RESOURCES) ? 'main-blue' : 'main-grey'" icon="mdi-account-group" class="mr-1" size="small"></v-icon>
                    <v-btn density="comfortable" icon="mdi-pencil-outline" @click="editUser(item as User)"></v-btn>
                </template>
            </template>
        </AdminTable>
    </div>
</template>
<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore';
import { computed, onBeforeMount, ref } from 'vue';
import AdminTopBar from '@/components/admin/AdminTopBar.vue';
import AdminTable from '@/components/admin/AdminTable.vue';
import type { User } from '@/models/interfaces/auth/User';
import { UserRoles } from '@/models/enums/auth/UserRoles';
const adminStore = useAdminStore();
onBeforeMount(() => {
    adminStore.getMembers()
})

function createUser() {
    adminStore.userCreation = true
}

function editUser(user: User) {
    adminStore.setUserEditionMode(user)
}

const sortingUsersSelectedMethod = ref("isValidated")
const sortedUsers = computed(() => {
    if (sortingUsersSelectedMethod.value === "isValidated") {
        return adminStore.appMembers.slice().sort((a: User, b: User) => {
            if (a.isValidated !== b.isValidated) {
                return Number(a.isValidated) - Number(b.isValidated);
            }
            return a.lastName.localeCompare(b.lastName);
        })
    }
    if (sortingUsersSelectedMethod.value === "firstName") {
        return adminStore.appMembers.slice().sort((a: User, b: User) => {
            return a.firstName.localeCompare(b.firstName);
        })
    }
    if (sortingUsersSelectedMethod.value === "lastName") {
        return adminStore.appMembers.slice().sort((a: User, b: User) => {
            return a.lastName.localeCompare(b.lastName);
        })
    }
    if (sortingUsersSelectedMethod.value === "email") {
        return adminStore.appMembers.slice().sort((a: User, b: User) => {
            return a.email.localeCompare(b.email);
        })
    }
    return adminStore.appMembers
})
</script>