import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbComponent } from './pdb.component';

describe('PdbComponent', () => {
  let component: PdbComponent;
  let fixture: ComponentFixture<PdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
