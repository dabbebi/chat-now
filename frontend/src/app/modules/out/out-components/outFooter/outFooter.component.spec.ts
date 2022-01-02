import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutFooterComponent } from './outFooter.component';

describe('FooterComponent', () => {
  let component: OutFooterComponent;
  let fixture: ComponentFixture<OutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
