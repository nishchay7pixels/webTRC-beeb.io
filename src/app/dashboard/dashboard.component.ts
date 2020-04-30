import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('alert', { static: true }) alert: ElementRef;
  onNotify(message:string):void {
    this.alert.nativeElement.classList.add('show');
  }

}
