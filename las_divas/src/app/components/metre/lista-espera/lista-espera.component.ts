import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService  } from 'src/app/servicios/firebase.service';

import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.component.html',
  styleUrls: ['./lista-espera.component.scss'],
})
export class ListaEsperaComponent implements OnInit {

  clientes:any;
  clienteSeleccionado : any;
  @Output()volver : EventEmitter<any> = new EventEmitter<any>();

  constructor(private fireService : FirebaseService,private db: AngularFirestore) 
  {
    this.traerLista();
  }

  ngOnInit(){
    //this.fireService.snapshotsarasa(this.traerLista());
    this.db.collection("mesas").doc("Mesa 1 Las Divas").snapshotChanges().subscribe(data=>this.traerLista())
    this.db.collection("mesas").doc("Mesa 2 Las Divas").snapshotChanges().subscribe(data=>this.traerLista())
    this.db.collection("mesas").doc("Mesa 3 Las Divas").snapshotChanges().subscribe(data=>this.traerLista())
    this.db.collection("mesas").doc("Mesa 4 Las Divas").snapshotChanges().subscribe(data=>this.traerLista())
  }

  back() {
    this.volver.emit('home');
  }

  traerLista() 
  {
    this.fireService.getDB("listaEspera").then((datos) => {
      this.clientes = datos;
      console.log("cambio")
      

      if(this.clientes.length == 0){
        document.getElementById("msj-espera").innerHTML = "No hay clientes en espera";
      }
    })
  }

}
