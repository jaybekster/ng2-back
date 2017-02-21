import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject, TestBed, getTestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackService } from '../../src/back.service';


@Component({
    template: `<router-outlet></router-outlet>`
})
class RoutingComponent {}

@Component({
    template: ``
})
class DumpComponent {}


describe('Service: BackService', () => {
    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: RoutingComponent, children: [
                        { path: 'page1', component: DumpComponent},
                        { path: 'page2', component: DumpComponent}
                    ] }
                ])
            ],
            providers: [
                BackService
            ],
            declarations: [RoutingComponent, DumpComponent]
        });
    });

    it('Service instantiates', inject([BackService], (service: BackService) => {
        expect(service instanceof BackService).toBeTruthy();
    }));

    it('getPreviousUrl method when nothing was clicked', async(() => {
        const testbed = getTestBed();
        const routerService: Router = testbed.get(Router);
        const backService: BackService = testbed.get(BackService);

        const fixture = TestBed.createComponent(RoutingComponent);

        routerService.navigate(['/page1']).then(() => {
            expect(backService.getPreviousUrl()).toBe(null);
        });
    }));

    it('getPreviousUrl method when some page was clicked', async(() => {
        const testbed = getTestBed();
        const routerService: Router = testbed.get(Router);
        const backService: BackService = testbed.get(BackService);

        const fixture = TestBed.createComponent(RoutingComponent);

        routerService.navigate(['/page1'])
            .then(() => routerService.navigate(['/page2']))
            .then(() => {
                expect(backService.getPreviousUrl()).toBe('/page1');
            });
    }));
});
