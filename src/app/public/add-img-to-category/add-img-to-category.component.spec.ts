import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImgToCategoryComponent } from './add-img-to-category.component';

describe('AddImgToCategoryComponent', () => {
  let component: AddImgToCategoryComponent;
  let fixture: ComponentFixture<AddImgToCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImgToCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImgToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
