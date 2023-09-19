import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];
    userData: any;
    myDate = new Date();
    userName: any;
    roleName: any;
    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'pi pi-desktop', access: '1,2', routerLink: ['/main'] },
            // {
            //     label: 'User Config', icon: 'pi pi-th-large', access: '1', routerLink: ['/main/user'],
            //     items: [
            //         { label: 'User', icon: 'pi pi-circle', routerLink: ['/main/user'] },
            //         { label: 'Role', icon: 'pi pi-circle', routerLink: ['/main/user-config/role-list'] }
            //     ]
            // },
            {
                label: 'Services', icon: 'pi pi-microsoft', access: '1', routerLink: ['/main/master'],
                items: [
                    { label: 'District', routerLink: ['/main/master/district'] }, 
                    { label: 'Hospital', routerLink: ['/main/master/hospital'] },
                    { label: 'Medical type', routerLink: ['/main/master/medical-type'] },
                    { label: 'Medical', routerLink: ['/main/master/medical'] },
                    { label: 'Officer type', routerLink: ['/main/master/officer-type'] },
                    { label: 'Officer', routerLink: ['/main/master/officer'] },
                    { label: 'Old age type', routerLink: ['/main/master/oldage-type'] },
                    { label: 'Old age', routerLink: ['/main/master/oldage'] },
                    { label: 'People pharmacy', routerLink: ['/main/master/people-pharmacy'] },
                    { label: 'Legal aid', routerLink: ['/main/master/legal-aid'] },
                    { label: 'Grievance', routerLink: ['/main/master/grievance'] }
                ]
            },
            { label: 'Schemes', icon: 'pi pi-envelope', access: '1', routerLink: ['/main/scheme'] },
            { label: 'Feedback', icon: 'pi pi-check-square', access: '1', routerLink: ['/main/feedback'] },
            {
                label: 'Reports', icon: 'pi pi-qrcode', access: '1', routerLink: ['/main/report'],
                items: [
                    { label: 'Senior Citizen',  routerLink: ['/main/report/scDetails'] },
                    { label: 'Total App Install',  routerLink: ['/main/report/mobileAppInstalled'] },
                    // { label: 'Yearly',  routerLink: ['/main/master/customer'] }
                ]
            }
        ];
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
        this.userName = this.userData.data.firstName;
        this.roleName = this.userData.data.role;
        if (this.userData.data.roleId === 1) { 
            this.model = this.model.filter(f => f.access.includes('1'))
        } else if(this.userData.data.roleId === 2) {
            this.model = this.model.filter(f => f.access.includes('2'))
        }
    }
}