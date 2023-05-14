import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { DetailsComponent } from './details/details.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        CommonModule,
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        DetailsComponent
    ]
})
export class ExamplesModule { }
