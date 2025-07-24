import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGalleryComponent } from './all-gallery.component';

describe('AllGalleryComponent', () => {
  let component: AllGalleryComponent;
  let fixture: ComponentFixture<AllGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
