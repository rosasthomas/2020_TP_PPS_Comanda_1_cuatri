import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit {

  @Output() volver:EventEmitter<any>=new EventEmitter<any>()
  mesaParaPagar;
  mesas:any;
  paymentConfirmation:boolean = false;

  constructor(private fireService : FirebaseService,private pedidosService : PedidosService ) {
    this.actualizarLista()
   }

  ngOnInit() {}

  back(){
    this.volver.emit('home')
  }

  actualizarLista(){
    this.fireService.getDB("mesas").then(datos=>this.mesas=datos)
  }

  cambiarEstadoPago(){
    this.pedidosService.sendQueryPayment(false,`Mesa ${this.mesaParaPagar.numero} Las Divas`);
    this.fireService.updateDoc('mesas',`Mesa ${this.mesaParaPagar.numero} Las Divas`,{cliente: {},consulta : "",encuesta: {comentario : "", satisfecho: ""} ,ocupada:false,pagoPendiente: false,pedido: {productos:{},total: 0},pendienteBebida:false,pendienteComida:false});
    this.paymentConfirmation = false;
    this.actualizarLista();
  }

}
