import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BackService } from './back.service';

@Component({
    selector: 'back',
    templateUrl: './back.component.html'
})
export class BackComponent {
    @Input() backUrl;

    constructor(
        private router: Router,
        private location: Location,
        private backService: BackService
    ) {}

    onBack(): void {
        const previousUrl = this.backService.getPreviousUrl();

        if (previousUrl) {
            this.location.back();
        } else if (this.backUrl) {
            this.router.navigateByUrl(this.backUrl);
        }
    }
}
