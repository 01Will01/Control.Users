import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public credentialsForm: FormGroup;

  public loading: boolean = false;
  public userInfo: any;
  
  public statusMessage:boolean = false; 
  public messages: Array<string> = [] 

  public statusShowPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    
    this.credentialsForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  showPassword(){ this.statusShowPassword = !this.statusShowPassword; }

  login() {
    this.loading = true;

        this.loading = false;
        sessionStorage.setItem('key', JSON.stringify('dhajshdjaksdhakjsdhakjsdhaushqweqw73hge8q7wdabsd6a7tsdjha'));
        this.router.navigateByUrl('/home');
  }
}
