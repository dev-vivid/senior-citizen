// translation.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';


@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
