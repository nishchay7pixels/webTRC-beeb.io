import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {CreateRoomService} from "./create-room.service";
import {Room} from "./Room";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService{
  targetpeer : any;
  peer: any;
  room : Room;

  rooms : AngularFirestoreCollection<Room>;
  constructor(private fs : AngularFirestore) {
    this.rooms = this.fs.collection<Room>('rooms');
    this.initPeer();
  }
//Firebase Functions CRUD
  getRoom() : string {
    let data : string;
    //return this.fs.collection('rooms').valueChanges();
    let userDoc = this.fs.firestore.collection(`rooms`);
    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data().peer);
        if(doc.data().id==='123'){
          console.log(doc.data().id);
          data = doc.data().id;
        }
      })
    })
    return data;
  }
  deleteRoom(roomId: string){
    this.fs.doc('rooms/' + roomId).delete();
  }


  initPeer() {
    this.peer = new SimplePeer({
      initiator: false,
      trickle: false
    });
  //this.onSignal();

  }

  // onSignal() {
  //   let room = new Room();
  //   this.peer.on('signal', function(data){
  //     this.myAddress = JSON.stringify(data), //only if peer is initiator
  //     console.log('SIGNAL', this.myAddress),
  //         //room = new Room(),
  //         room.$key="123",
  //         room.roomid="123",
  //         room.roompwd="123",
  //         room.users = {id: JSON.stringify(data)}
  //   });
  // }


  // createRoom(data :any){
  //   let room = new Room();
  //     room.$key="123";
  //     room.roomid="123";
  //     room.roompwd="123";
  //     console.log(JSON.stringify(data));
  //     room.users.push({id: JSON.stringify(data)});
  //
  //     //this.crs.createRoom(room);
  // }
  onData()  {
    this.peer.on('data', function (data) {
      console.log('Recieved Message' + data)
    });
  }

  connect(){
    console.log(this.getRoom());
    //this.peer.signal(this.getRoom());
  }

  message(){
    this.peer.send("Hello World");
  }

  getTargetPeer () : Observable <any>{
    return of(this.targetpeer);
  }
}
