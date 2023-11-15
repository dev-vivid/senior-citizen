import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  medicalTypeForm :FormGroup;
  editMasterId: any;
  isLoader: boolean;
  hide = true;
  // editForm: any;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initManufacturerForm();
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  initManufacturerForm(){
    this.medicalTypeForm = this.fb.group({
      name:['', [Validators.required]],
      password:['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      mobile:['', [Validators.required]],
    });
  }
  saveUser(){
    this.formService.addUser(this.medicalTypeForm.value).subscribe((data: any) => {
      if (data) {
        this.isNotLoader = true;
        this.isLoader = false;
        this.sharedService.showSuccess('Added successfully!');
        this.medicalTypeForm.reset();
        this.router.navigateByUrl(`main/user/user-List`);
      }
    });
  }
}
