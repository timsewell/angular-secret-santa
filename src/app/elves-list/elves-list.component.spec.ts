import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElvesListComponent } from './elves-list.component';

describe('ElvesListComponent', () => {
  let component: ElvesListComponent;
  let fixture: ComponentFixture<ElvesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElvesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElvesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
