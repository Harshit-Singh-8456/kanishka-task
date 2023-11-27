import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpDataComponent } from './create-emp-data.component';

describe('CreateEmpDataComponent', () => {
  let component: CreateEmpDataComponent;
  let fixture: ComponentFixture<CreateEmpDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmpDataComponent]
    });
    fixture = TestBed.createComponent(CreateEmpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
