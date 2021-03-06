import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material.module';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NoConnectedComponent } from './pages/no-connected/no-connected.component';
import { TaskListsComponent } from './components/task-lists/task-lists.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { InformationDialogComponent } from './dialogs/information-dialog/information-dialog.component';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DoubleValidatorComponent } from './components/double-validator/double-validator.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuSidebarComponent,
    LoginComponent,
    HomeComponent,
    NoConnectedComponent,
    TaskListsComponent,
    TasksComponent,
    TaskComponent,
    InformationDialogComponent,
    FormDialogComponent,
    EditListComponent,
    EditTaskComponent,
    DoubleValidatorComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [httpInterceptorProviders],
  entryComponents:[
    InformationDialogComponent,
    FormDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
