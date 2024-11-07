import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenciadorComponent } from './sequenciador.component';

describe('SequenciadorComponent', () => {
  let component: SequenciadorComponent;
  let fixture: ComponentFixture<SequenciadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenciadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SequenciadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
