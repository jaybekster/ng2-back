import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


const LENGTH = 10;

@Injectable()
export class BackService {
    history: Array<string> = [];

    constructor(router: Router) {
        router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(e => {
                this.history = [e.url, ...this.history.slice(0, LENGTH - 2)];
            });
    }

    getPreviousUrl(): string {
        return this.history.slice(1, 2)[0] || null;
    }
}
