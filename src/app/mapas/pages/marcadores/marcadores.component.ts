import { ElementRef, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color:string,
  marker?: mapboxgl.Marker,
  center?:[number,number]
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height:100%;
      width:100%;
    }
    .list-group{
      position:fixed;
      top:20px;
      right:20px;
      z-index:99;
    }
    li{
      cursor:pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel:number=15;
  center:[number,number] =[-74.19454201919282,4.589279765934238];

  marcadores:MarcadorColor[]=[];


  constructor() { }

  ngAfterViewInit (): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
      });

    this.leerMarcadores();  
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const marker = new mapboxgl.Marker({
      draggable:true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)
    
    this.marcadores.push({
      color,
      marker
    });    

    this.guardarMarcadorLocalStorage()
    marker.on('dragend',()=>{
      this.guardarMarcadorLocalStorage();
    })

  }

  irMarcador( marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center:marcador.getLngLat()
    });
  }

  guardarMarcadorLocalStorage(){
    const array: MarcadorColor[]=[];

    this.marcadores.forEach(m=>{
      const {lng,lat} = m.marker!.getLngLat();

      array.push({
        color:m.color,
        center:[lng,lat]
      })
    })

    localStorage.setItem('marcadores',JSON.stringify( array ));
    
  }


  leerMarcadores(){
    if(!localStorage.getItem('marcadores')){
      return
    }

    const arrayMarcadores:MarcadorColor[]= JSON.parse(localStorage.getItem('marcadores')!);    
    arrayMarcadores.forEach(m =>{

    const cargarMarcadores=  new mapboxgl.Marker({
        draggable:true,
        color:m.color
      })
        .setLngLat(m.center!)
        .addTo(this.mapa)

      this.marcadores.push({
        marker: cargarMarcadores,
        color:m.color
      
      })
      cargarMarcadores.on('dragend',()=>{
        this.guardarMarcadorLocalStorage();
      })
    })
  }

  eliminarMarcador(i : number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadorLocalStorage();
  }



}
