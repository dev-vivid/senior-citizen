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
  addHospital(data: any) {
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
  addAlrMedical(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addAlrMedical`, data);
  }
  addPeoplePharmacy(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addPeoplePharmacy`, data);
  }
  addLegalAid(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addLegalAid`, data);
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
  getDistrict() {
    return this.http.get(`${this.apiUrl}Admin/getDistrict`);
  }
  getHospitalList() {
    return this.http.get(`${this.apiUrl}Admin/getHospitalList`);
  }
  getOfficerType() {
    return this.http.get(`${this.apiUrl}Admin/getOfficerType`);
  }
  getOldAgeType() {
    return this.http.get(`${this.apiUrl}Admin/getOldAgeType`);
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
  getPeoplePharmacyList() {
    return this.http.get(`${this.apiUrl}Admin/getPeoplePharmacyList`);
  }
  getLegalAidList() {
    return this.http.get(`${this.apiUrl}Admin/getLegalAidList`);
  }

  // Admin
  getAdminDashboard() {
    return this.http.get(`${this.apiUrl}Admin/getAdminDashboard`)
  }
  getfeedbackList() {
    return this.http.get(`${this.apiUrl}Admin/getfeedbackList`)
  }
  getSchemeDetail() {
    return this.http.get(`${this.apiUrl}Admin/getSchemeDetail`)
  }
  getSchemeList() {
    return this.http.get(`${this.apiUrl}Admin/getSchemeList`)
  }
  addScheme(data: FormData) {
    return this.http.post(`${this.apiUrl}Admin/addScheme`, data);
  }
  getMobInstallList() {
    return this.http.get(`${this.apiUrl}Admin/getMobInstallList`)
  }
  getAlrMedicalType() {
    return this.http.get(`${this.apiUrl}Admin/getAlrMedicalType`)
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

   
  // get dropdown
  getDistrictList() {
    return this.http.get(`${this.apiUrl}Admin/getDistrictList`);
  }
  getofficerTypeList() {
    return this.http.get(`${this.apiUrl}Admin/getofficerTypeList`);
  }
  getoahTypeList() {
    return this.http.get(`${this.apiUrl}Admin/getoahTypeList`);
  }
  getAlrMedicalTypeList() {
    return this.http.get(`${this.apiUrl}Admin/getAlrMedicalTypeList`);
  }
  getGrivenceTypeList() {
    return this.http.get(`${this.apiUrl}Admin/getGrievanceTypeList`);
  }

}