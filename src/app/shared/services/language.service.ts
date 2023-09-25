// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$: Observable<string> = this.currentLanguageSubject.asObservable();

  setLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
  }
}
