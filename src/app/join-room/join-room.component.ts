import {Component, OnChanges, OnInit} from '@angular/core';
import {ConnectionService} from "../connection.service";
import {CreateRoomService} from "../create-room.service";

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {
  title = 'webTRC-one';

  peer: any;
  connecttopeer: string;
  connected:boolean=false;

  constructor(private crs: CreateRoomService) {
    this.peer = new SimplePeer({
      initiator: false,
      trickle: false
    });

  }

  ngOnInit(): void {

    this.peer.on('data', function (data) {
      console.log('Recieved Message' + data)
    });
    this.peer.on('signal', (data)=>{
            //console.log(JSON.stringify(data))
            this.crs.acceptConnection(data,this.connecttopeer);
    });

  }

  connect() {
    let roomid=this.connecttopeer;
    let joinroom;
    this.crs.getRoom(roomid)
      .subscribe((peer) => {
          peer.then((doc) => {
              if (!doc.exists) {
                console.log('No such document!');
              } else {
                joinroom =  doc.data().peer_init.peer;
                this.peer.signal(JSON.parse(joinroom));
                this.connected=true;
              }
            })
              .catch(err => {
                console.log('Error getting document', err);
              });
      });
  }



  message() {
    this.peer.send("Hello World");
  }
}
