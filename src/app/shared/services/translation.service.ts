// translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translationsSubject = new BehaviorSubject<any>({});
  translations$ = this.translationsSubject.asObservable();

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.loadTranslations(language).subscribe(
        translations => {
          this.translationsSubject.next(translations); // Update translations when the language changes
        },
        error => console.error('Error loading translations:', error)
      );
    });
  }

  private loadTranslations(language: string) {
    const url = `assets/language/translation.${language}.json`;
    console.log('Loading translations from:', url);
    return this.http.get<any>(url);
  }

  getTranslation(key: string): string {
    // Use the latest translations from the observable
    const translations = this.translationsSubject.getValue();
    return translations[key] || key;
  }
}
