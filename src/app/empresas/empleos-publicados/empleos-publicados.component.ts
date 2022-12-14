import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleos-publicados',
  templateUrl: './empleos-publicados.component.html',
  styleUrls: ['./empleos-publicados.component.css']
})
export class EmpleosPublicadosComponent implements OnInit {

  constructor() { }
  publicaciones:any[] = [1,2,3];
  publicaciones_vencidas:any[] = [1,2,3];

  ngOnInit(): void {
  }

}
