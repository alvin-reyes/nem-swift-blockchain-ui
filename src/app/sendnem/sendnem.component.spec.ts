import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendnemComponent } from './sendnem.component';

describe('SendnemComponent', () => {
  let component: SendnemComponent;
  let fixture: ComponentFixture<SendnemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendnemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendnemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
