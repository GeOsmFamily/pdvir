<template>
    <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted, watch, computed, ref, type Ref } from 'vue';
import maplibregl, { GeoJSONSource } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'
import ResetMapExtentControl from "@/components/generic-components/map-controls/ResetMapExtentControl";
import ToggleSidebarControl from '@/components/generic-components/map-controls/ToggleSidebarControl';
import { useApplicationStore } from '@/stores/applicationStore';

const applicationStore = useApplicationStore()
const triggerZoomReset = computed(() => applicationStore.triggerZoomReset)
const map: Ref<maplibregl.Map | null> = ref(null)

const props = withDefaults(defineProps<{
    bounds?: maplibregl.LngLatBounds
}>(), {
    bounds: () => new maplibregl.LngLatBounds([8.48881554529, 1.72767263428], [16.0128524106, 12.8593962671])
})
const popup = ref(new maplibregl.Popup({ closeOnClick: false }));
const hoveredFeatureId: Ref<number | null> = ref(null)
const activeFeatureId: Ref<number | null> = ref(null)

onMounted(() => {
    map.value = new maplibregl.Map({
        container: 'map',
        style: 'https://demotiles.maplibre.org/style.json',
        center: [0, 0],
        zoom: 1
    });

    map.value.dragRotate.disable();
    map.value.touchZoomRotate.disableRotation();

    var nav = new maplibregl.NavigationControl({
        showCompass: false,
    });

    map.value.addControl(nav, 'top-right');
    map.value.addControl(new ResetMapExtentControl, 'top-right')
    map.value.addControl(new ToggleSidebarControl, 'top-left')
    setBBox()
})

const removeSource = (sourceName: string) => {
    if (map.value?.getSource(sourceName)) {
        map.value.removeSource(sourceName)
    }
}

const removeLayer = (layerName: string) => {
    if (map.value && map.value?.getLayer(layerName)) {
        map.value.removeLayer(layerName)
    }
}

const setData = (sourceName: string, geojson: GeoJSON.GeoJSON) => {
    const source = map.value?.getSource(sourceName) as GeoJSONSource
    if (source) source.setData(geojson)
}

const addSource = (sourceName: string, geojson: GeoJSON.GeoJSON) => {
    if (map.value?.getSource(sourceName)) return
    map.value?.addSource(sourceName, {
        type: 'geojson',
        data: geojson
    })
}

const setLayoutProperty = (layerName: string, property: string, value: any) => {
    if (map.value?.getLayer(layerName)) {
        map.value?.setLayoutProperty(layerName, property, value)
    }
}

const addLayer = async (layerName: string, options: { layout: maplibregl.LayerSpecification['layout'] }) => {
    if (map.value && map.value?.getLayer(layerName)) return
    map.value?.addLayer({
        id: layerName,
        type: 'symbol',
        source: layerName,
        layout: options.layout
    })
}

const addImage = async (path: string, name: string) => {
    if (map.value?.hasImage(name)) return
    const image = await map.value?.loadImage(path);
    if (!image) return
    map.value?.addImage(name, image.data);
    return
}

const addPopupOnClick = (layerName: string, popupHtml: any) => {
    if (map.value == null) return
    map.value.on('click', layerName, (e: any) => {
        if (map.value == null) return
        activeFeatureId.value = e.features[0].properties.id;
        console.log('activeFeatureId', activeFeatureId.value);
        
        const coordinates = e.features[0].geometry.coordinates.slice();

        popup.value.setLngLat(coordinates).setDOMContent(popupHtml.$el).addTo(map.value);
        popup.value.addClassName('show');
        popup.value._onClose = () => {
            activeFeatureId.value = null;
            popup.value.removeClassName('show');
        }
    })
}


const listenToHoveredFeature = (layerName: string) => {
    if (map.value == null) return
    map.value.on('mouseenter', layerName, (e: any) => {
        if (map.value == null) return
        map.value.getCanvas().style.cursor = 'pointer';
        hoveredFeatureId.value = e.features[0].properties.id;
    });

    map.value.on('mouseleave', layerName, () => {
        if (map.value == null) return
        map.value.getCanvas().style.cursor = '';
        hoveredFeatureId.value = null;
    });
}

const setBBox = () => {
    if (!map.value) return
    map.value.fitBounds(
        props.bounds,
        { padding: 75 }
    )
}

watch(triggerZoomReset, () => {
    setBBox()
})

defineExpose({
    map,
    activeFeatureId,
    hoveredFeatureId,
    addSource,
    addPopupOnClick,
    addImage,
    addLayer,
    listenToHoveredFeature,
    removeLayer,
    removeSource,
    setData,
    setLayoutProperty
})
</script>

<style lang="scss">

.maplibregl-popup {
    z-index: 99999;
    transition: opacity 0.15s ease-in-out;
    opacity: 0;
    user-select: none;

    &.show {
        opacity: 1;
        .maplibregl-popup-close-button {
            display: inherit;
        }
    }

    $dim-popup-offset: 2rem;
    &.maplibregl-popup-anchor-right .maplibregl-popup-content {
        transform: translateX(-$dim-popup-offset);
    }
    &.maplibregl-popup-anchor-left .maplibregl-popup-content {
        transform: translateX($dim-popup-offset);
    }
    &.maplibregl-popup-anchor-bottom .maplibregl-popup-content {
        transform: translateY(-$dim-popup-offset);
    }
    &.maplibregl-popup-anchor-top .maplibregl-popup-content {
        transform: translateY($dim-popup-offset);
    }
    &.maplibregl-popup-anchor-top-right .maplibregl-popup-content {
        transform: translate(-$dim-popup-offset, $dim-popup-offset);
    }
    &.maplibregl-popup-anchor-top-left .maplibregl-popup-content {
        transform: translate($dim-popup-offset, $dim-popup-offset);
    }
    &.maplibregl-popup-anchor-bottom-right .maplibregl-popup-content {
        transform: translate(-$dim-popup-offset, -$dim-popup-offset);
    }
    &.maplibregl-popup-anchor-bottom-left .maplibregl-popup-content {
        transform: translate($dim-popup-offset, -$dim-popup-offset);
    }

    .maplibregl-popup-content {
        padding: inherit;
        width: fit-content;
        transform: translateY(-2rem);
    }
    .maplibregl-popup-close-button {
        display: none;
        margin: .5rem;
        background: white;
        box-shadow: 0 .25rem .25rem -.125rem rgba(0, 0, 0, .15);
        color: black;
        $dim-map-btn-w: 2rem;
        background-image: url(@/assets/images/icons/map/mdi-close.svg);
        background-position: center;
        width: $dim-map-btn-w;
        height: $dim-map-btn-w;
        border-radius: 50%;
        transition: none;
    }

    .maplibregl-popup-tip {
        z-index: 9999999;
        display: none;
        pointer-events: none;
    }
}

#map {
    width: 100%;
    height: 100%;

    .maplibregl-ctrl-top-left,
    .maplibregl-ctrl-top-right {
        margin: 3rem 1.5rem;
        display: flex;
        flex-flow: column nowrap;
        gap: 0.62rem;
    }

    .maplibregl-ctrl-group {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.62rem;
        background: none;
        box-shadow: none;
        margin: 0;
        transition: all .15s ease-in;

        button {
            background: white;
            box-shadow: 0 .25rem .25rem -.125rem rgba(0, 0, 0, .15);
            color: black;
            $dim-map-btn-w: 2.5rem;
            width: $dim-map-btn-w;
            height: $dim-map-btn-w;
            border-radius: 50%;
            border-width: 0;
            position: relative;

            &:hover {
                &::after {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            &::after {
                /* background: fade(@color-primary, 100%); */
                z-index: 8;
                position: absolute;
                content: none !important;
                border-radius: 4px;
                padding: .25rem .5rem;
                right: 100%;
                top: 0;
                bottom: 0;
                margin: auto .5rem;
                height: fit-content;
                white-space: nowrap;
                transform-origin: right center;
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                transition: all .15s ease-in;
            }

            &.maplibregl-ctrl-zoom-in {
                &::after {
                    content: "Zoomer";
                }

                .maplibregl-ctrl-icon {
                    background-image: url(@/assets/images/icons/map/mdi-plus.svg);
                }
            }

            &.maplibregl-ctrl-zoom-out {

                &::after {
                    content: "Dézoomer";
                }

                .maplibregl-ctrl-icon {
                    background-image: url(@/assets/images/icons/map/mdi-minus.svg);
                }
            }

            &.maplibregl-ctrl-shrink::after {
                content: "Quitter le plein écran";
            }

            &.maplibregl-ctrl-fullscreen::after {
                content: "Ouvrir en plein écran";
            }

            &.maplibregl-ctrl-fullscreen,
            &.maplibregl-ctrl-shrink {
                .maplibregl-ctrl-icon {
                    background-image: url(@/assets/images/icons/map/mdi-zoom-out.svg);
                    background-size: 70%;
                }
            }

            &.maplibregl-ctrl-zoom-extent {
                &::after {
                    content: "Revenir à l'étendue globale";
                }

                .maplibregl-ctrl-icon {
                    background-image: url(@/assets/images/icons/map/mdi-image-filter-center-focus-strong-outline.svg);
                }
            }

            &.maplibregl-ctrl-toggle-sidebar {
                transition: all .3s ease-in-out;

                &[active="true"] {
                    transform: rotate(180deg);
                    box-shadow: 0 -.25rem .25rem -.125rem rgba(0, 0, 0, .15);
                }

                .maplibregl-ctrl-icon {
                    background-image: url(@/assets/images/icons/map/mdi-toggle.svg);
                }
            }
        }
    }
}
</style>