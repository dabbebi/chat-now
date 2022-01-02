import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesNavbarComponent } from './messages-navbar.component';

describe('NavbarComponent', () => {
  let component: MessagesNavbarComponent;
  let fixture: ComponentFixture<MessagesNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
