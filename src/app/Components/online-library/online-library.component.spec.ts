import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineLibraryComponent } from './online-library.component';

describe('OnlineLibraryComponent', () => {
  let component: OnlineLibraryComponent;
  let fixture: ComponentFixture<OnlineLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
