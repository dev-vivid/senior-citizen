import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-grivance-form',
  templateUrl: './grivance-form.component.html',
  styleUrls: ['./grivance-form.component.scss']
})
export class GrivanceFormComponent implements OnInit {
  editMasterId:any
  grivenceIndividualData:any
  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['griveanceId'];
    let dataId = {
      grievanceId:this.editMasterId
    }
    this.formService.getGrivenanceIndividual(dataId).subscribe((resp: any) => {
      this.grivenceIndividualData = resp.data;
      console.log(this.grivenceIndividualData)
    });
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
  
}
