import { NgModule } from '@angular/core';
import { BackComponent } from './back.component';
import { BackService } from './back.service';


@NgModule({
    exports: [BackComponent],
    declarations: [BackComponent],
    providers: [BackService]
})
export class BackModule {
    constructor(backService: BackService) {}
}
