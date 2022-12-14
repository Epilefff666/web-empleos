import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {

  postulantes1:any[]=[1,2,3];
  postulantes2:any[]=[1,2,3];

  constructor() { }

  ngOnInit(): void {
  }

}
