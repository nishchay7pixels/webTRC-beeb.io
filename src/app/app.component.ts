import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Instance, SignalData } from 'simple-peer';
import {ConnectionService} from "./connection.service";
import {isEmpty} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('alert', { static: true }) alert: ElementRef;
  onNotify(message:string):void {
    this.alert.nativeElement.classList.add('show');
  }
}
