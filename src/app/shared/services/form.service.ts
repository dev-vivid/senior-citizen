import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.endPoint;
  }

  // Admin
  // getChartData() {
  //   return this.http.get(`${this.apiUrl}Admin/getChartData`);
  // }
  // getProfile() {
  //   return this.http.get(`${this.apiUrl}Admin/getProfile`);
  // }
  // ADD
  addDistrict(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addDistrict`, data);
  }
  addUserdGrievance(data: any) {
    return this.http.post(`${this.apiUrl}Admin/grievanceForm`, data);
  }
  addHospital(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addHospital`, data);
  }
  grivannceData(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addHospital`, data);
  }
  addOfficer(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addOfficer`, data);
  }
  addOldAge(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addOldAge`, data);
  }
  addOfficerType(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addOfficerType`, data);
  }
  addOldAgeType(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addOldAgeType`, data);
  }
  addAlrMedicalType(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addAlrMedicalType`, data);
  }
  addUser(data: any) {
    return this.http.post(`${this.apiUrl}Admin/signup`, data);
  }
  addAlrMedical(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addAlrMedical`, data);
  }
  addPeoplePharmacy(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addPeoplePharmacy`, data);
  }
  addLegalAid(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addLegalAid`, data);
  }
  addGrievance(data: any) {
    return this.http.post(`${this.apiUrl}Admin/GrievanceUpdate`, data);
  }

  //edit data
  districtEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/districtEdit`, data);
  }
  hospitalEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/hospitalEdit`, data);
  }
  officerEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/officerEdit`, data);
  }
  officerTypeEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/officerTypeEdit`, data);
  }
  oahTypeEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/oahTypeEdit`, data);
  }
  oahEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/oahEdit`, data);
  }
  schemeEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/schemeEdit`, data);
  }
  AlrMedicalTypeEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/AlrMedicalTypeEdit`, data)  // "medicalTypeId":"1"
  }
  AlrMedicalEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/AlrMedicalEdit`, data)
  }
  PeoplePharmacyEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/PeoplePharmacyEdit`, data)  // "peoplePharmacyId":"1"
  }
  LegalAidEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/LegalAidEdit`, data)  // "LegalAidId":"1"
  }

  // Update submit
  districtUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/districtUpdate`, data);
  }
  hospitalUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/hospitalUpdate`, data);
  }
  officerTypeUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/officerTypeUpdate`, data);
  }
  officerUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/officerUpdate`, data);
  }
  oahUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/oahUpdate`, data);
  }
  oahTypeUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/oahTypeUpdate`, data);
  }
  schemeUpdate(data: any) {
    console.log("gdshvdjasdhgascdhas",data)
    return this.http.post(`${this.apiUrl}Admin/schemeUpdate`, data);
  }
  alrMedicalTypeUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/alrMedicalTypeUpdate`, data);
  }
  AlrMedicalUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/AlrMedicalUpdate`, data);
  }
  PeoplePharmacyUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/PeoplePharmacyUpdate`, data); //"peoplePharmacyId":"1"
  }
  LegalAidUpdate(data: any) {
    return this.http.post(`${this.apiUrl}Admin/LegalAidUpdate`, data); //"LegalAidId":"1"
  }

  // LIST 
  getDistrict(lang) {
    return this.http.get(`${this.apiUrl}Admin/getDistrict?lang=${lang}`);
  }
  getHospitalList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getHospitalList?lang=${lang}`);
  }
  getOfficerType(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getOfficerType?lang=${lang}`);
  }
  getOldAgeType(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getOldAgeType?lang=${lang}`);
  }
  getOfficerList(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getOfficerList`, data); // "OfficerId":"2"
  }
  getOldAgeList(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getOldAgeList`, data); //oahId
  }
  getAlrMedicalList(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getAlrMedicalList`, data); //medicalId
  }
  getLanguage(data: any) {
    return this.http.post(`${this.apiUrl}Admin/ChangeLanguage`, data);
  }
  getGrivanceList(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getGrievanceList`, data); //medicalId
  }
  getPeoplePharmacyList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getPeoplePharmacyList?lang=${lang}`);
  }
  getLegalAidList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getLegalAidList?lang=${lang}`);
  }

  // Admin
  getAdminDashboard(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getAdminDashboard?lang=${lang}`)
  }
  getfeedbackList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getfeedbackList?lang=${lang}`)
  }
  getSchemeDetail() {
    return this.http.get(`${this.apiUrl}Admin/getSchemeDetail`)
  }
  getSchemeList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getSchemeList?lang=${lang}`)
  }
  addScheme(data: FormData) {
    return this.http.post(`${this.apiUrl}Admin/addScheme`, data);
  }
  getMobInstallList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getMobInstallList?lang=${lang}`)
  }
  getAlrMedicalType(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getAlrMedicalType?lang=${lang}`)
  }

  // Delete
  districtDelete(data: any) {
    return this.http.post(`${this.apiUrl}Admin/districtDelete`, data) //"districtId":"1"
  }
  deleteHospital(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteHospital`, data) //"hospitalId":"1"
  }
  deleteofficerType(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteofficerType`, data) //"officerTypeId":"1"
  }
  deleteoahType(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteoahType`, data) //"oahTypeId":"1"
  }
  deleteoah(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteoah`, data) //"oahId":"1"
  }
  deleteofficer(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteofficer`, data) //"officerId":"1"
  }
  schemeDelete(data: any) {
    return this.http.post(`${this.apiUrl}Admin/schemeDelete`, data) //"schemeId":"1"
  }
  deleteAlrMedicalType(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteAlrMedicalType`, data) //"medicalTypeId":"1"
  }
  deleteAlrMedical(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteAlrMedical`, data) //"medicalId":"1"
  }
  deletePeoplePharmacy(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deletePeoplePharmacy`, data) //"peoplePharmacyId":"1"
  }
  deleteLegalAid(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteLegalAid`, data) //"LegalAidId":"1"
  }

  //chart
  getChartData() {
    return this.http.get(`${this.apiUrl}Admin/getChartData`)
  }

  //report
  postSeniorCitizenReport(data: any) {
    return this.http.post(`${this.apiUrl}Admin/postSeniorCitizenReport`, data);
  }
  getusersReport(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getusersReport`, data)
  }
  getGrivenanceIndividual(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getGrievance`, data)
  }


  // get dropdown
  getDistrictList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getDistrictList?lang=${lang}`);
  }
  getDistrictListEng() {
    return this.http.get(`${this.apiUrl}Admin/getDistrictList?`);
  }
  getIssueType(data: any) {
    return this.http.post(`${this.apiUrl}User/getIssueTypeDtl`, data);
  }
  getofficerTypeList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getofficerTypeList?lang=${lang}`);
  }
  getoahTypeList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getoahTypeList?lang=${lang}`);
  }
  getAlrMedicalTypeList(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getAlrMedicalTypeList?lang=${lang}`);
  }
  getGrivenceTypeList() {
    return this.http.get(`${this.apiUrl}Admin/getGrievanceTypeList`);
  }
  getuserDetails(lang: any) {
    return this.http.get(`${this.apiUrl}Admin/getBackendUserList?lang=${lang}`);
  }
  deleteUser(data: any) {
    return this.http.post(`${this.apiUrl}Admin/deleteUser`, data);
  }
  removeUser(email: any) {
    return this.http.post(`${this.apiUrl}Admin/disableAccount`, email);
  }
  sendEmail(email:any){
    return this.http.post(`${this.apiUrl}Admin/sendMail`, email);
  }
}