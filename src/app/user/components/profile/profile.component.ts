import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from '@angular/material-moment-adapter';
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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

export class ProfileComponent implements OnInit {

  public statusShowTable: boolean = false;
  public statusShowChange: boolean = false;
  public statusShowInput: boolean = false;
  public statusLoading: boolean = false;
  public statusMessage: boolean = false;
  public statusSuccess: boolean = false;
  public statusConfirmAction: boolean = false;

  public dataSource = new MatTableDataSource<UserElements>()
  public displayedColumns: string[] = ["name", "email", "cpf"];
  public rows: UserElements[] = [];
  public messages: Array<string> = [];
  public messageSuccess: string;
  public messageAction: string;

  public formInput: FormGroup;
  public formChange: FormGroup;

  public file: Set<File>;
  public progress: number = 0;

  public dataUser: UserElements;

  //Controle de ações(Sim ou não)
  public accessAction: boolean;
  public accessActionRemove: boolean;
  public idRemove: string;

  events: string[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.openRegister();
    this.getDataUser();
  }

  getDataUser() {
    this.dataUser = JSON.parse(sessionStorage.getItem("userDetails"));
    if (this.dataUser == null || this.dataUser == undefined){ this.router.navigateByUrl('/home'); }
  }

  getValueAction(value: boolean) {
    this.accessAction = value;

    switch (true) {
      case this.accessActionRemove: {
        this.ActionRemove(this.idRemove);
        break;
      }
    }
  }

  showMessageError(message: string) {
    this.statusLoading = false;
    this.statusMessage = true;
    this.messages.push(message);

    setTimeout(() => {
      this.statusMessage = false;
      this.messages = Array<string>();
    }, 10000);
  }

  showMessageSucceess(message: string) {
    this.statusLoading = false;
    this.messageSuccess = message;
    this.statusSuccess = true;

    setTimeout(() => {
      this.statusSuccess = false;
      this.messageSuccess = '';
    }, 2000);
  }

  delete() {
    this.accessActionRemove = true;
    this.idRemove = this.dataUser.id;
    this.messageAction = 'Realmente quer remover a usuário ' + this.dataUser.name + '?';
    this.openConfirmAction();
  }

  ActionRemove(value: any) {

    this.accessActionRemove = false;
    this.idRemove = '0';
    this.messageAction = '';
    this.closeConfirmAction();
    this.statusLoading = true;

    if (this.accessAction) {
      this.userService.Remove(value).subscribe(res => {
        this.statusLoading = false;
        if (res.success == true) {

          this.showMessageSucceess('Área removida!');
        } else {
          res.data.forEach(data => { this.showMessageError(data.message); });
        }
      });
    } else { this.showMessageSucceess('Ok!'); }
  }

  openRegister() {
    this.statusShowInput = true;
    this.formDeclaration();
  }
  closeRegister() { this.statusShowInput = false; }

  openConfirmAction() { this.statusConfirmAction = true; }
  closeConfirmAction() { this.statusConfirmAction = false; }

  formDeclaration() {
    this.formInput = this.formBuilder.group({
      CPF: [null, Validators.required]
      , RG: [null, Validators.required]
      , Name: [null, Validators.required]
      , Lastname: [null, Validators.required]
      , Email: [null, Validators.required]
      , Password: [null, Validators.required]
      , BirthDate: [null, Validators.required]
      , Telephone: [null, Validators.required]
      , Phone: [null, Validators.required]
      , Active: [true, Validators.required]
      , CEP: [null, Validators.required]
      , Address: [null, Validators.required]
      , Number: [null, Validators.required]
      , Complement: [null, Validators.required]
      , District: [null, Validators.required]
      , City: [null, Validators.required]
      , UF: [null, Validators.required]
    });
  }

  checkLoading() {
    this.statusLoading = !this.statusLoading;
  }
}