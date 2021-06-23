import { Component } from '@angular/core';

interface Menu{
  ruta:string,
  nombre:string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    ul li{
      cursor:pointer;
    }
    `
  ]
})
export class MenuComponent {

  menuItem:Menu[]=[
    {
      ruta:'/mapa/fullscreen',
      nombre:'FullScreen'
    },
    {
      ruta:'/mapa/zoom',
      nombre:'Zoom-range'
    },
    {
      ruta:'/mapa/marcadores',
      nombre:'Marcadores'
    },
    {
      ruta:'/mapa/propiedades',
      nombre:'Propiedades'
    }
  ]
}
