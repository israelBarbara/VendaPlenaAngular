import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Divida } from './Divida';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class DividaService {

  url = 'https://localhost:7017/Divida';

  constructor(private http:HttpClient) { }

  DividasCliente(id:number):Observable<Divida[]>{
    return this.http.get<Divida[]>(`${this.url}/Cliente-Dividas/?idCliente=${id}`);
  }

  PayDebt(id:number):Observable<any>{
    return this.http.put<Divida>(`${this.url}/${id}`,id,httpOptions);
  }

  CriarDivida(divida:Divida):Observable<Divida>{
    return this.http.post<Divida>(`${this.url}`,divida,httpOptions);   
  }

  TotalDevido():Observable<number>{
    return this.http.get<number>(`${this.url}/Total-Divida`);
  }



}
