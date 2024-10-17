<template>
    <div class="SheetView__contentCtn">
        <SectionBanner :text="$t('projectPage.keyNumbers')"/>
        <div class="ProjectSheetView__kpiCtn">
            <KPI icon="contacts" :count="152" :label="$t('kpi.actors')" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <KPI icon="account-group" :count="6" :label="$t('kpi.resources')" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <KPI icon="database-arrow-down" :count="54" :label="$t('kpi.data')" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        </div>
    </div>
    <div class="SheetView__contentCtn">
        <SectionBanner :text="$t('projectPage.projectCalendar')"/>
        <p>{{ project.calendar }}</p>
    </div>
    <div class="SheetView__contentCtn">
        <SectionBanner :text="$t('projectPage.projectDeliverables')"/>
        <p>{{ project.deliverables }}</p>
    </div>
</template>

<script setup lang="ts">
import SectionBanner from '@/components/banners/SectionBanner.vue';
import KPI from '@/components/content/KPI.vue';
import type { Project }  from '@/models/interfaces/Project';
defineProps<{
    project: Project
}>()
</script>

<style lang="scss">
.ProjectSheetView__kpiCtn {
    display: flex;
    flex-flow: row wrap;
    gap: 2rem;
    margin: 1.5rem 0;
    justify-content: flex-start;
    align-items: center;

    > * {
        flex: 1 0 10rem;
    }
}
</style>