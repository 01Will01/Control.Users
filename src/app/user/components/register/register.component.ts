import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { UserService } from 'src/app/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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

export class RegisterComponent implements OnInit {

  public statusShowInput: boolean = false;
  public statusLoading: boolean = false;
  public statusMessage: boolean = false;
  public statusSuccess: boolean = false;
  public statusConfirmAction: boolean = false;

  public viewBirthDate: string;

  public messages: Array<string> = [];
  public messageSuccess: string;

  public formInput: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.formDeclaration();
    this.openRegister()
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

  inputRegister() {
    this.statusLoading = true;
    if (
      this.formInput.controls.CPF.valid &&
      this.formInput.controls.RG.valid &&
      this.formInput.controls.Name.valid &&
      this.formInput.controls.Lastname.valid &&
      this.formInput.controls.Email.valid &&
      this.formInput.controls.Password.valid &&
      this.formInput.controls.BirthDate.valid &&
      this.formInput.controls.Telephone.valid &&
      this.formInput.controls.Phone.valid &&
      this.formInput.controls.Active.valid &&
      this.formInput.controls.CEP.valid &&
      this.formInput.controls.Address.valid &&
      this.formInput.controls.Number.valid &&
      this.formInput.controls.Complement.valid &&
      this.formInput.controls.District.valid &&
      this.formInput.controls.City.valid &&
      this.formInput.controls.UF.valid
    ) {
      this.userService.
        Input(
          this.formInput.controls.CPF.value,
          this.formInput.controls.RG.value,
          this.formInput.controls.Name.value,
          this.formInput.controls.Lastname.value,
          this.formInput.controls.Email.value,
          this.formInput.controls.Password.value,
          this.formInput.controls.BirthDate.value,
          this.formInput.controls.Telephone.value,
          this.formInput.controls.Phone.value,
          this.formInput.controls.Active.value,
          this.formInput.controls.CEP.value,
          this.formInput.controls.Address.value,
          this.formInput.controls.Number.value,
          this.formInput.controls.Complement.value,
          this.formInput.controls.District.value,
          this.formInput.controls.City.value,
          this.formInput.controls.UF.value,
        ).subscribe(res => {
          if (this.validators(res)) {
            this.showMessageSucceess('Usuário cadastrado!');
            setTimeout(() => {
              this.router.navigateByUrl('/home/usersAll');
            }, 2000);
          } else { this.showMessageError(res); }
        });
    } else { this.showMessageError('Preencha os campos obrigatórios!'); }
  }


  validators(data?: any) {
    if (data == null || data == undefined) { return false; } 
    else if (data._id == null) { return false; }
    else { return true; }
  }

  openRegister() {
    this.statusShowInput = true;
    this.formDeclaration();
  }
  closeRegister() { this.statusShowInput = false; }

  openConfirmAction() { this.statusConfirmAction = true; }
  closeConfirmAction() { this.statusConfirmAction = false; }

  addEvent(type, event) {
    let month = Number(event.value._i.month) + 1;
    this.formInput.controls.BirthDate.setValue(String(`${event.value._i.year}-${this.format(month)}-${this.format(event.value._i.date)}T00:00:00.000Z`));
    this.viewBirthDate = `${this.format(event.value._i.date)}/${this.format(month)}/${event.value._i.year}`;
  }

  format(value: any) {
    switch (String(value).length) {
      case 1: return `0${value}`;
      default: return value;
    }
  }

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