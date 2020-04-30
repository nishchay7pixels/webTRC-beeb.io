import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateRoomComponent} from "./create-room/create-room.component";
import {JoinRoomComponent} from "./join-room/join-room.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {VideoConfRoomComponent} from "./video-conf-room/video-conf-room.component";


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path:'dashboard', component: DashboardComponent},
  {path: 'video-conf-room', component: VideoConfRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
