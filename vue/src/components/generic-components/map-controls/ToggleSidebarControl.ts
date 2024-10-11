import { useProjectStore } from "@/stores/projectStore";
export default class ToggleSidebarControl {
  _map: any
  _container: any

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    const btn = document.createElement("button");
    btn.className = 'maplibregl-ctrl-toggle-sidebar'
    const span = document.createElement("span");
    span.className = 'maplibregl-ctrl-icon'
    btn.appendChild(span)
    this._container.appendChild(btn);
    this._container.addEventListener('click', () => {
      useProjectStore().isProjectMapFullWidth = !useProjectStore().isProjectMapFullWidth
      btn.setAttribute('active', useProjectStore().isProjectMapFullWidth.toString())
    })
    
    return this._container;
  }
  
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
