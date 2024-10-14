import { i18n } from "@/assets/plugins/i18n";
import { useApplicationStore } from "@/stores/applicationStore";
import { useProjectStore } from "@/stores/projectStore";

export default class ShowProjectFiltersModalControl {
  _map: any
  _container: any

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group maplibregl-ctrl-show-project-filters-ctn';
    const btn = document.createElement("button");
    btn.className = 'maplibregl-ctrl-show-project-filters'
    const span = document.createElement("span");
    span.textContent = i18n.t('projects.map.filterProjects');
    span.className = 'maplibregl-ctrl-text'
    const icon = document.createElement("span");
    icon.className = 'maplibregl-ctrl-icon'
    btn.appendChild(icon)
    btn.appendChild(span)
    this._container.appendChild(btn);
    this._container.addEventListener('click', () => {
      useProjectStore().isFilterModalShown = true
    })
    
    return this._container;
  }
  
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
