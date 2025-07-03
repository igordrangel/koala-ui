import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoalaUi } from './koala-ui';

describe('KoalaUi', () => {
  let component: KoalaUi;
  let fixture: ComponentFixture<KoalaUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KoalaUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoalaUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
