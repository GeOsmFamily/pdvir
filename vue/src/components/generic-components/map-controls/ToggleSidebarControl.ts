import { useApplicationStore } from "@/stores/applicationStore";
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
      useApplicationStore().isProjectMapFullWidth = !useApplicationStore().isProjectMapFullWidth
      btn.setAttribute('active', useApplicationStore().isProjectMapFullWidth.toString())
    })
    
    return this._container;
  }
  
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
