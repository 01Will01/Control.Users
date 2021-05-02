import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public showNameUser: boolean = true;
  public viewHeader: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  exit() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  checkControlView() {
    this.showNameUser = !this.showNameUser;
    this.viewHeader = !this.viewHeader;
  }

}
