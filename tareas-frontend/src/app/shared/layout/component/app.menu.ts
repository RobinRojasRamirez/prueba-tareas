import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ToastModule } from 'primeng/toast';
import { AlertService } from '../../services/alert.service';
@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        CommonModule, 
        AppMenuitem, 
        RouterModule, 
        ButtonModule,
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [
        MessageService,
        AlertService
    ],
    template: `
    <div class="layout-sidebar h-screen flex flex-col">
        <!-- Menú principal -->
        <ul class="layout-menu flex-1 overflow-auto">
            <h3 class="text-center p-3">TAREAS</h3>
            <!-- Items del menú -->
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    </div>
    <p-confirmDialog
    [breakpoints]="{ '960px': '75vw', '640px': '100vw' }"
    [style]="{ width: '25vw' }"
    [baseZIndex]="10000"
    rejectButtonStyleClass="p-button-danger"
    ></p-confirmDialog>
    `
})
export class AppMenu {

    model: MenuItem[] = []
    user: { id: number, userData: any } | null = null;

    constructor(
    ) {}

    async ngOnInit() {
        this.model = [
            {
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                items: [{ label: 'Tareas', icon: 'pi pi-fw pi-file-edit', routerLink: ['/tareas'] }]
            },
        ];
    }

}
