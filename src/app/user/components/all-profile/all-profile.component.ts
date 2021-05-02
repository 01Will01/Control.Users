import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { UserService } from 'src/app/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

export interface UserElements {
  id: string;
  updatedAt: string;
  createdAt: string;
  cpf: string;
  rg: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthDate: string;
  telephone: string;
  phone: string;
  active: boolean;
  cep: string;
  address: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  uf: string;
}

@Component({
  selector: 'app-all-profile',
  templateUrl: './all-profile.component.html',
  styleUrls: ['./all-profile.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  },
  {provide: MAT_DATE_LOCALE, useValue: 'pt-Br'}, 
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
]
})


export class AllProfileComponent implements OnInit {

  public statusShowTable: boolean = false;
  public statusLoading: boolean = false;

  public dataSource = new MatTableDataSource<UserElements>()
  public displayedColumns: string[] = ["name", "email", "cpf"];
  public rows: UserElements[] = [];


  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.getListUsersAll();
  }

  getListUsersAll() {
    this.statusLoading = true;
    var row: UserElements;
    var list: Array<UserElements> = [];

    this.userService.GetAll().subscribe(res => {
      if (res.length > 0) {

        res.forEach(element => {
          row = {
            id: element._id,
            updatedAt: element.updatedAt,
            createdAt: element.createdAt,
            cpf: element.cpf,
            rg: element.rg,
            name: element.nome,
            lastname: element.sobrenome,
            email: element.email,
            password: element.senha,
            birthDate: element.data_nascimento,
            telephone: element.telefone,
            phone: element.celular,
            active: element.ativo,
            cep: element.cep,
            address: element.endereco,
            number: element.numero,
            complement: element.complemento,
            district: element.bairro,
            city: element.cidade,
            uf: element.uf
          };
          if (row) { list.push(row); }
        });
        this.rows = list;
        this.dataSource = new MatTableDataSource(this.rows);

        this.openTable();

      } else {
        this.openTable();
      }
    });
  }

  change(row?: UserElements) {
    sessionStorage.setItem('userDetails', JSON.stringify(row));
    this.router.navigateByUrl('/home/user');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openTable() {
    this.statusLoading = false;
    this.statusShowTable = true;
  }
  closeTable() { this.statusShowTable = false; }

  checkLoading() {
    this.statusLoading = !this.statusLoading;
  }
}