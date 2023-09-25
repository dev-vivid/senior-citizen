import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationPipe } from 'src/app/shared/services/translation.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData:any
  constructor(private translationService: TranslationService,) { }

  ngOnInit(): void {
     this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
     console.log(this.userData);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
