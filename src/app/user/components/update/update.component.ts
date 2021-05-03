import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { UserService } from 'src/app/user/user.service';
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
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-Br' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})

export class UpdateComponent implements OnInit {

  public statusShowChange: boolean = false;
  public statusLoading: boolean = false;
  public statusMessage: boolean = false;
  public statusSuccess: boolean = false;

  public messages: Array<string> = [];
  public messageSuccess: string;

  public formChange: FormGroup;
  public viewBirthDate: string;
  public dataUser: UserElements;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.formDeclaration();
    this.getDataUser();
    this.change(this.dataUser);
  }


  getDataUser() {
    this.dataUser = JSON.parse(sessionStorage.getItem("userDetails"));
  }
  addEvent(type, event) {
    let month = Number(event.value._i.month) + 1;
    this.formChange.controls.BirthDate.setValue(String(`${event.value._i.year}-${this.format(month)}-${this.format(event.value._i.date)}T00:00:00.000Z`));
    this.viewBirthDate = `${this.format(event.value._i.date)}/${this.format(month)}/${event.value._i.year}`;
  }

  change(row?: UserElements) {
    if (row != null || row != undefined) {
      sessionStorage.setItem('userDetails', JSON.stringify(row));

      this.viewBirthDate = this.formatDate(row.birthDate);

      this.formChange.controls.ID.setValue(row.id);
      this.formChange.controls.CPF.setValue(row.cpf);
      this.formChange.controls.RG.setValue(row.rg);
      this.formChange.controls.Name.setValue(row.name);
      this.formChange.controls.Lastname.setValue(row.lastname);
      this.formChange.controls.Email.setValue(row.email);
      this.formChange.controls.Password.setValue(row.password);
      this.formChange.controls.BirthDate.setValue(row.birthDate);
      this.formChange.controls.Telephone.setValue(row.telephone);
      this.formChange.controls.Phone.setValue(row.phone);
      this.formChange.controls.Active.setValue(Boolean(row.active));
      this.formChange.controls.CEP.setValue(row.cep);
      this.formChange.controls.Address.setValue(row.address);
      this.formChange.controls.Number.setValue(Number(row.number));
      this.formChange.controls.Complement.setValue(row.complement);
      this.formChange.controls.District.setValue(row.district);
      this.formChange.controls.City.setValue(row.city);
      this.formChange.controls.UF.setValue(row.uf);

      this.openChange();
    } else { this.router.navigateByUrl('/home'); }
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

  inputChange() {
    this.statusLoading = true;
    if (
      this.formChange.controls.CPF.valid &&
      this.formChange.controls.RG.valid &&
      this.formChange.controls.Name.valid &&
      this.formChange.controls.Lastname.valid &&
      this.formChange.controls.Email.valid &&
      this.formChange.controls.Password.valid &&
      this.formChange.controls.BirthDate.valid &&
      this.formChange.controls.Telephone.valid &&
      this.formChange.controls.Phone.valid &&
      this.formChange.controls.Active.valid &&
      this.formChange.controls.CEP.valid &&
      this.formChange.controls.Address.valid &&
      this.formChange.controls.Number.valid &&
      this.formChange.controls.Complement.valid &&
      this.formChange.controls.District.valid &&
      this.formChange.controls.City.valid &&
      this.formChange.controls.UF.valid
    ) {
      this.userService.
        Change
        (
          this.formChange.controls.ID.value,
          this.formChange.controls.CPF.value,
          this.formChange.controls.RG.value,
          this.formChange.controls.Name.value,
          this.formChange.controls.Lastname.value,
          this.formChange.controls.Email.value,
          this.formChange.controls.Password.value,
          this.formChange.controls.BirthDate.value,
          this.formChange.controls.Telephone.value,
          this.formChange.controls.Phone.value,
          this.formChange.controls.Active.value,
          this.formChange.controls.CEP.value,
          this.formChange.controls.Address.value,
          this.formChange.controls.Number.value,
          this.formChange.controls.Complement.value,
          this.formChange.controls.District.value,
          this.formChange.controls.City.value,
          this.formChange.controls.UF.value,
        ).subscribe(res => {
          if (this.validators(res)) {
            this.showMessageSucceess('Usuário atualizado!');
            setTimeout(() => {
              this.update()
              this.router.navigateByUrl('/home/user');
            }, 2000);
          } else { this.showMessageError(res); }
        });
    } else { this.showMessageError('Preencha os campos obrigatórios!'); }
  }


  validators(data?: any) {
    if (data == null || data == undefined) { return true; }
    else { return false; }
  }

  format(value: any) {
    switch (String(value).length) {
      case 1: return `0${value}`;
      default: return value;
    }
  }

  formatDate(value: any) {
    if (value.length >= 10) return `${value.substring(8, 10)}/${value.substring(5, 7)}/${value.substring(0, 4)}`;
  }

  update() {
    let row: UserElements = {
      id: this.formChange.controls.ID.value,
      updatedAt: this.dataUser.updatedAt,
      createdAt: this.dataUser.createdAt,
      cpf: this.formChange.controls.CPF.value,
      rg: this.formChange.controls.RG.value,
      name: this.formChange.controls.Name.value,
      lastname: this.formChange.controls.Lastname.value,
      email: this.formChange.controls.Email.value,
      password: this.formChange.controls.Password.value,
      birthDate: this.formChange.controls.BirthDate.value,
      telephone: this.formChange.controls.Telephone.value,
      phone: this.formChange.controls.Phone.value,
      active: true,
      cep: this.formChange.controls.CEP.value,
      address: this.formChange.controls.Address.value,
      number: this.formChange.controls.Number.value,
      complement: this.formChange.controls.Complement.value,
      district: this.formChange.controls.District.value,
      city: this.formChange.controls.City.value,
      uf: this.formChange.controls.UF.value
    }
    sessionStorage.setItem('userDetails', JSON.stringify(row));
  }


  openChange() {
    this.statusShowChange = true;
  }
  closeChange() { this.statusShowChange = false; }

  formDeclaration() {
    this.formChange = this.formBuilder.group({
      ID: [null, Validators.required]
      , UpdatedAt: [null, Validators.required]
      , CreatedAt: [null, Validators.required]
      , CPF: [null, Validators.required]
      , RG: [null, Validators.required]
      , Name: [null, Validators.required]
      , Lastname: [null, Validators.required]
      , Email: [null, Validators.email]
      , Password: [null, Validators.required]
      , BirthDate: [null, Validators.required]
      , Telephone: [null, Validators.required]
      , Phone: [null, Validators.required]
      , Active: [null, Validators.required]
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
