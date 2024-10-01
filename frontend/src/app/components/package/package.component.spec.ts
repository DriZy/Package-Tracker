import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageComponent } from './package.component';

describe('PackageCreateComponent', () => {
  let component: PackageComponent;
  let fixture: ComponentFixture<PackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
