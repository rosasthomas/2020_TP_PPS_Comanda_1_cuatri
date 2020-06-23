import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit {

  clientes:any;
  @Output()volver : EventEmitter<any> = new EventEmitter<any>();

  constructor(private fireService : FirebaseService) 
  {
    this.fireService.getDisabledClient().then((datos) => {
      this.clientes = datos;
      console.log(this.clientes);

      if(this.clientes.length == 0){
        document.getElementById("msj-solicitudes").innerHTML = "No hay solicitudes pendientes";
      }
    })
  }

  ngOnInit(){
  }

  back() {
    this.volver.emit('home');
  }

  cambiarEstado(option:string,cliente:any)
  {
    let i = this.clientes.indexOf(cliente);
    this.clientes.splice(i, 1);

    if(option == 'habilitar')
        cliente.habilitado = 'aceptado'
    else
        cliente.habilitado = 'rechazado'

    this.fireService.updateDoc("cliente", cliente.correo, cliente)

    console.log(this.clientes);

    if(this.clientes.length == 0){
      document.getElementById("msj-solicitudes").innerHTML = "No hay solicitudes pendientes";
    }
  }
}
