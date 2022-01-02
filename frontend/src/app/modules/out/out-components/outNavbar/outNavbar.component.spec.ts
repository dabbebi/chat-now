import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutNavbarComponent } from './outNavbar.component';

describe('NavbarComponent', () => {
  let component: OutNavbarComponent;
  let fixture: ComponentFixture<OutNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
