import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import { Cliente } from '../../Cliente';
import { ClientesService } from '../../clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { DividaService } from 'src/app/Dividas/divida.service';






@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  formulario:any;
  tituloFormulario!:string;
  clientes!:Cliente[];
  tbVisibility:boolean = true;
  formVisibility:boolean = false;
  totalDevido:number = 0;

  _clientes: Cliente[] = [];
  constructor(private clienteService:ClientesService,private dividaService:DividaService){}

  ngOnInit():void{

    this.clienteService.AllClients().subscribe(result => {
      this.Voltar();
      this.clientes = result;
      this.GetDividas();
    })





  }



  showInsertForm():void{
    this.tbVisibility = false;
    this.formVisibility = true;
    this.tituloFormulario = 'Novo Cliente'
    this.formulario = new FormGroup({
      nome:new FormControl(null),
      cpf:new FormControl(null),
      email:new FormControl(null),
      dataNascimento:new FormControl(null),
    });
  }

  EnviarFormulario(): void{
    const cliente:Cliente = this.formulario.value;
    this.clienteService.SaveCliente(cliente).subscribe(resultado =>{
      alert("Cliente inserido com sucesso");
      this.formulario.reset();
      this.Voltar();
      this.clienteService.AllClients().subscribe(result =>{
        this.clientes = result;
      })
    })
  }

  Voltar():void{
    this.tbVisibility = true;
    this.formVisibility = false;
  }

  GetDividas():void{
    this.dividaService.TotalDevido().subscribe(res =>{
      this.totalDevido = res;
    })
  }








}
