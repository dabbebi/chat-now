import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InNavbarComponent } from './inNavbar.component';

describe('NavbarComponent', () => {
  let component: InNavbarComponent;
  let fixture: ComponentFixture<InNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
