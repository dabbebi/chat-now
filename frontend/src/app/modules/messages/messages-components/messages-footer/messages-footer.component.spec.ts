import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesFooterComponent } from './messages-footer.component';

describe('FooterComponent', () => {
  let component: MessagesFooterComponent;
  let fixture: ComponentFixture<MessagesFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
