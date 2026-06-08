import { Component } from '@angular/core';
import { Cliente } from '../listarClientes/cliente';
import { ClienteService } from '../servicios/cliente.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SweetAlert2Module, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public formulario!: FormGroup;
  public titulo: string = 'Crear cliente';
  public listaErrores: any = {};

  constructor(private readonly clienteService: ClienteService, private readonly router: Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  public crearCliente()
  {            
    console.log("Creando cliente");
    this.cliente.nombre = this.formulario.value.nombre;
    this.cliente.apellido = this.formulario.value.apellido;
    this.cliente.email = this.formulario.value.email;

    this.clienteService.create(this.cliente).subscribe(
     {
        next: (respose) => {
          console.log("Cliente creado exitosamente");
          console.log(this.cliente);
          this.router.navigate(['clientes/listarCLientes']);
          Swal.fire('Nuevo cliente',`Cliente ${respose.nombre} creado con éxito!`, 'success');
        },
        error: (err) => { 
          console.log(err.error);
          this.listaErrores = err.error;
        }
      }
    )
  }

}