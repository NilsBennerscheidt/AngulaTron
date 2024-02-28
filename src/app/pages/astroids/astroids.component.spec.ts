import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroidsComponent } from './astroids.component';

describe('AstroidsComponent', () => {
  let component: AstroidsComponent;
  let fixture: ComponentFixture<AstroidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstroidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AstroidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
