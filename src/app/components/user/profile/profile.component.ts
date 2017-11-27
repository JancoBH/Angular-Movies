import { Component } from '@angular/core';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  menberSince: any;

  constructor(public auth: AuthService) {
    auth.afAuth.authState.subscribe(
      res => {
        console.log(res);
        if (res !== null) {
          this.menberSince = res.metadata['creationTime'];
        }
      }
    );
  }

}
