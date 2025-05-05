import { Component, inject, OnInit } from '@angular/core';
import { MaxScorePipe } from "../../pipes/max-score.pipe";
import { SliceNamePipe } from "../../pipes/slice-name.pipe";
import {
  IUser,
  LocalStorageService,
} from '../../services/localstorage.service';

@Component({
  selector: 'app-profile',
  imports: [SliceNamePipe, MaxScorePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private lsService = inject(LocalStorageService);
  user!: IUser | null;

  ngOnInit() {
    this.user = this.lsService.getUser();
  }
}
