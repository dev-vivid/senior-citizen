// translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private http: HttpClient) {}

  setLanguage(language: string): void {
    console.log('Changing language to:', language);
    this.currentLanguageSubject.next(language);
    this.loadTranslations(language).subscribe(
      translations => {
        this.translations = translations;
        console.log('Translations loaded:', this.translations);
      },
      error => console.error('Error loading translations:', error)
    );
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  private loadTranslations(language: string) {
    const url = `/assets/language/translation.${language}.json`;
    console.log('Loading translations from:', url);
    return this.http.get<any>(url);
  }
}
