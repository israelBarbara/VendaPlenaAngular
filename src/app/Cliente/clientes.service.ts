import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './Cliente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = 'https://localhost:7017/Cliente';

  constructor(private http:HttpClient) { }
  AllClients():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.url}/Clientes`);
  }

  ClienteById(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  SaveCliente(cliente:Cliente):Observable<any>{
    return this.http.post<Cliente>(this.url,cliente,httpOptions)
  }

}
