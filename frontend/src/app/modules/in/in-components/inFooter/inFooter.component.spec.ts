import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InFooterComponent } from './inFooter.component';

describe('FooterComponent', () => {
  let component: InFooterComponent;
  let fixture: ComponentFixture<InFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
