import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public options = { headers: new HttpHeaders().set('Authorization', 'lzMma3zQepNFsPwEmxrsM8hQDmyjNalNfDphTpk3') };

  Input(cpf, rg, name, lastname, email, pasword, date, tell, phone, active, cep, address, number, complement, district, city, uf): Observable<any> {
    var json = {
      "cpf": cpf,
      "rg": rg,
      "nome": name,
      "sobrenome": lastname,
      "email": email,
      "senha": pasword,
      "data_nascimento": date,
      "telefone": tell,
      "celular": phone,
      "ativo": active,
      "cep": cep,
      "endereco": address,
      "numero": number,
      "complemento": complement,
      "bairro": district,
      "cidade": city,
      "uf": uf
    }

    return this.http.post(`${environment.apiUrl}`, json, this.options);
  }

  Change(id, cpf, rg, name, lastname, email, pasword, date, tell, phone, active, cep, address, number, complement, district, city, uf): Observable<any> {
    let json =
    {
      "cpf": cpf,
      "rg": rg,
      "nome": name,
      "sobrenome": lastname,
      "email": email,
      "senha": pasword,
      "data_nascimento": date,
      "telefone": tell,
      "celular": phone,
      "ativo": active,
      "cep": cep,
      "endereco": address,
      "numero": number,
      "complemento": complement,
      "bairro": district,
      "cidade": city,
      "uf": uf
    }
    return this.http.put(`${environment.apiUrl}/${id}`, json, this.options);
  }

  Get(cpf:string = '', name:string = '', email:string = '', active:string = ''): Observable<any> {
    let parameters = "cpf=" + cpf + "&nome=" + name + "&email" + email + "&ativo" + active;

    return this.http.get(`${environment.apiUrl}?${parameters}`, this.options);
  }

  GetAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}`, this.options);
  }

  Remove(id):Observable<any>{

      return this.http.delete(`${environment.apiUrl}/${id}`, this.options)
  } 

}
