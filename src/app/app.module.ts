import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { ChatBoxComponent } from './chat-box/chat-box.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { CreateRoomComponent } from './create-room/create-room.component';
import {AngularFirestore} from '@angular/fire/firestore';
import { JoinRoomComponent } from './join-room/join-room.component';
import { VideoConfRoomComponent } from './video-conf-room/video-conf-room.component';
import { DashboardComponent } from './dashboard/dashboard.component'
@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    CreateRoomComponent,
    JoinRoomComponent,
    VideoConfRoomComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'webTRC-one')


  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
