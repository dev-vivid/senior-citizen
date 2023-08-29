import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ConfirmationService]
})
export class AppComponent implements OnInit {
  menuMode = 'sidebar';

  darkMode = 'light';

  topbarTheme = 'light';

  menuTheme = 'light';

  inputStyle = 'outlined';

  ripple: boolean;
  active: boolean = false;
  subscription!: Subscription;
  display: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, public loader: LoaderService, private cdRef: ChangeDetectorRef, private appRef: ApplicationRef) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    //this.subsForLoader();
  }

  // subsForLoader(): void {
  //   this.subscription = this.loader.status.subscribe((status: boolean) => {
  //     this.active = status;
  //     this.cdRef.detectChanges();
  //   });
  // }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
