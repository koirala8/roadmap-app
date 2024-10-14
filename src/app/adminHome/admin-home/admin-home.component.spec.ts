import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapDemo } from './admin-home.component';

describe('AdminHomeComponent', () => {
  let component: GoogleMapDemo;
  let fixture: ComponentFixture<GoogleMapDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
