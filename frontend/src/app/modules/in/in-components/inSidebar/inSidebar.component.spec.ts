import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InSidebarComponent } from './inSidebar.component';

describe('SidebarComponent', () => {
  let component: InSidebarComponent;
  let fixture: ComponentFixture<InSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
