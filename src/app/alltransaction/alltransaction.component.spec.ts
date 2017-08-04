import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltransactionComponent } from './alltransaction.component';

describe('AlltransactionComponent', () => {
  let component: AlltransactionComponent;
  let fixture: ComponentFixture<AlltransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
