import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, async, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackComponent } from '../../src/back.component';
import { BackService } from '../../src/back.service';


@Component({
    template: `<router-outlet></router-outlet>`
})
class RoutingComponent {}


describe('Component: BackComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: RoutingComponent, children: [
                        { path: 'page1', component: BackComponent},
                        { path: 'page2', component: BackComponent},
                        { path: 'backUrl', component: BackComponent},
                    ] }
                ])
            ],
            declarations: [RoutingComponent, BackComponent],
            providers: [
                BackService
            ]
        });
    });

    it(`go back method when a previous page was opened`, async(() => {
        const eventSpy = jasmine.createSpy('eventSpy');

        const testbed = getTestBed();
        const routerService: Router = testbed.get(Router);
        const locationService: Location = testbed.get(Location);

        locationService.subscribe(eventSpy);

        const fixtureRouting: ComponentFixture<RoutingComponent> = TestBed.createComponent(RoutingComponent);

        fixtureRouting.whenStable()
            .then(() => {
                return routerService.navigateByUrl('/page1');
            })
            .then(() => {
                return routerService.navigateByUrl('/page2');
            })
            .then(() => {
                const fixtureBack: ComponentFixture<BackComponent> = TestBed.createComponent(BackComponent);
                return fixtureBack.whenStable().then(() => {
                    fixtureBack.componentInstance.onBack();
                });
            })
            .then(() => {
                expect(eventSpy).toHaveBeenCalledWith({ url: '/page1', pop: true });
            })
    }));

    it(`go back method when no previous page was opened`, async(() => {
        const eventSpy = jasmine.createSpy('eventSpy');

        const testbed = getTestBed();
        const routerService: Router = testbed.get(Router);
        const locationService: Location = testbed.get(Location);

        locationService.subscribe(eventSpy);

        const fixtureRouting: ComponentFixture<RoutingComponent> = TestBed.createComponent(RoutingComponent);

        routerService.navigate(['/page1'])
            .then(() => {
                const fixtureBack: ComponentFixture<BackComponent> = TestBed.createComponent(BackComponent);
                fixtureBack.componentInstance.backUrl = '/backUrl';

                return fixtureBack.whenStable().then(() => {
                    fixtureBack.componentInstance.onBack();
                });
            })
            .then(() => {
                expect(eventSpy).toHaveBeenCalledWith({ url: '/backUrl', pop: false });
            })
    }));
});
