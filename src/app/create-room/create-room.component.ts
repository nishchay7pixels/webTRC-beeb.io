import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConnectionService} from "../connection.service";
import { AngularFireDatabase } from 'angularfire2/database';
import {CreateRoomService} from "../create-room.service";
import {Room} from "../Room";



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  peer1:any;
  roomid:string ="!! Generating Room ID !!";
  peer2:any;
  peer2Status:boolean = false;
  connected: boolean = false;
  constructor(private crs: CreateRoomService) {
    let userid = "98765";
    this.peer1 = new SimplePeer({
      initiator: true,
      trickle: false
    });
    this.peer1.on('signal',(data) => {
      console.log('SIGNAL', JSON.stringify(data))
      this.crs.createRoom({id: userid, peer: JSON.stringify(data)})
        .subscribe((roomid) => {this.roomid = roomid
          this.crs.peer2InfoUpdated(this.roomid)
            .subscribe(snapshot => snapshot.onSnapshot((querySnapshot) => {
              if(querySnapshot.exists){
                if(querySnapshot.data().join_peer){
                  this.peer2Status = true;
                  this.peer2 = querySnapshot.data().join_peer;
                }
              }
            }, (error) => {
              console.log(`Encountered error:`,error);
            })
            )})
    });
  }


  message(){
    this.peer1.send("Hello World");
  }

  ngOnInit(): void {
    this.peer1.on('data', (data) => {
      console.log('Recieved Message' + data);
        this.notify.emit('payload' + data);
    });

  }
  connect(){
    this.peer1.signal(this.peer2);
    this.peer2Status=false;
    this.connected=true;
    //this.crs.peer2InfoUpdated(this.roomid);
  }


}
