// translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.loadTranslations(language).subscribe(
        translations => {
          this.translations = translations;
        },
        error => console.error('Error loading translations:', error)
      );
    });
  }

  private loadTranslations(language: string) {
    const url = `/assets/language/translation.${language}.json`;
    console.log('Loading translations from:', url);
    return this.http.get<any>(url);
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}
