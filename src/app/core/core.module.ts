import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {NotifyService} from './notify.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, NotifyService]
})
export class CoreModule { }
