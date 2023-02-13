import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Cliente/Cliente';
import { ClientesService } from 'src/app/Cliente/clientes.service';
import { Divida } from '../../Divida';
import { DividaService } from '../../divida.service';
import { Location } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-divida',
  templateUrl: './divida.component.html',
  styleUrls: ['./divida.component.css']
})
export class DividaComponent implements OnInit {

  dividas!:Divida[];
  cliente!:Cliente;
  totalDividaCliente:number = 0;


  formulario:any;
  tituloFormulario!:string;
  tbVisibility:boolean = true;
  formVisibility:boolean = false;

  constructor(private dividaService:DividaService,private clienteService:ClientesService,private route:ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getDividaByClienteId(params['id']));
  }

  showInsertForm():void{
    this.tbVisibility = false;
    this.formVisibility = true;
    this.tituloFormulario = `Nova divida ${this.cliente.nome}`
    this.formulario = new FormGroup({
      valor:new FormControl(null)
    });
  }

  EnviarFormulario(): void{
    const divida:Divida = this.formulario.value;
    divida.ClienteId = this.cliente.id;
    this.dividaService.CriarDivida(divida).subscribe({

      complete: () => { 
            alert("Divida inserido com sucesso");
            this.formulario.reset();
            this.Voltar();
            this.getDividaByClienteId(this.cliente.id);
            this.dividaService.CriarDivida(divida).subscribe(result =>{
              this.getDividaByClienteId(this.cliente.id);
            })
       }, 
      error: (err) => { 
        alert(`Erro: ${err.error}`)
       },    
      next: () => {  },     

    })
  }

  Voltar():void{
    this.tbVisibility = true;
    this.formVisibility = false;
  }


  VoltarInicial() {
    this.location.back();
  }

  Pagar(id:number):void{
    this.dividaService.PayDebt(id).subscribe(res =>{
      this.getDividaByClienteId(this.cliente.id);
    })
  }


  getDividaByClienteId(id:number){
    this.dividaService.DividasCliente(id).subscribe(res =>{
      this.dividas = res;   
    })
    this.clienteService.ClienteById(id).subscribe(res =>{
      this.cliente = res;
    })
  }

}
