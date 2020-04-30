import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import {Room} from "./Room";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateRoomService {

  rooms : AngularFirestoreCollection<Room>;
  peer:any;
  room : Room;
  constructor(private fs : AngularFirestore) {
    this.rooms = this.fs.collection<Room>('rooms');
  }
//Firebase Functions CRUD
  getRooms() {
    return this.fs.collection('rooms').valueChanges();
  }

  getRoom(roomid:string) : Observable<any> {
    let peer : any;
    //return this.fs.collection('rooms').valueChanges();
    let userDoc = this.fs.firestore.collection(`rooms`).doc(""+roomid);

    return of(userDoc.get());
  }

  acceptConnection(address: any, roomid: string){
    this.fs.firestore.collection('rooms').doc(""+roomid).update({
      'join_peer': JSON.stringify(address)
    });

  }

  peer2InfoUpdated(roomid) : Observable<any>{
    let joinat = null;
    return of(this.fs.firestore.collection('rooms').doc(""+roomid));
    //return of(joinat);
  }

  createRoom(room: any) : Observable<string> {
    let roomid = Date.now().toString();
    let setSf = this.fs.firestore.collection(`rooms`).doc(roomid).set({
      roomid: roomid, peer_init:JSON.parse(JSON.stringify(room)), join_peer:null});
    return of(roomid);
  }

  deleteRoom(roomId: string){
    this.fs.doc('rooms/' + roomId).delete();
  }

}
