import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombres: String ="Juan";
  apellidos: String ="Perez"
  disciplina:String="Soy desarrollador BackEnd especialista en node.js y en Experiencia de usuario"
  descripcion:String="Estudiante de Ingenieria de sistemas apasionado por el desarrollo BackEnd"
}


