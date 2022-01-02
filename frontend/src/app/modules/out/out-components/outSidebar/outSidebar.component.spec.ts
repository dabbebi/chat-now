import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSidebarComponent } from './outSidebar.component';

describe('SidebarComponent', () => {
  let component: OutSidebarComponent;
  let fixture: ComponentFixture<OutSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
