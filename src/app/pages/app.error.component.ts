import { Component } from '@angular/core';
import {AppComponent} from '../app.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '../shared/services/translation.service';
import { FormService } from '../shared/services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-error',
  templateUrl: './app.error.component.html',
})
export class AppErrorComponent {
  grievanceForm :FormGroup;
  dictList: any[];
  isLoader: boolean;
  editForm: any;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(private fb: FormBuilder, private formService: FormService, public translationService: TranslationService,
     private sharedService: SharedService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.grievanceForm = this.fb.group({
      age: ['', Validators.required],
      gender:['',Validators.required],
      name: ['', Validators.required],
      // contact: ['',Validators.required],
      mobile: ['',Validators.required],
      address: ['', Validators.required],
      districtId:['',Validators.required],
      issueType:[[]],
      otherIssue:['']
    });
  }

  ngOnInit(): void {
   this.getDistrictList()
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  getDistrictList() {
    this.formService.getDistrictList().subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }

  saveDetails() {
        this.formService.grivannceData(this.grievanceForm.value).subscribe((data: any) => {
          if (data) {
            setTimeout(() => {
              this.sharedService.showSuccess('Updated Successfully');
              this.grievanceForm.reset();
              console.log(this.grievanceForm.value)
            }, 600);}
          }
     )
  }

}
