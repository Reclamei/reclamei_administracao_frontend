import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrangenciaComponent } from './abrangencia.component';

describe('AbrangenciaComponent', () => {
  let component: AbrangenciaComponent;
  let fixture: ComponentFixture<AbrangenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbrangenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrangenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
