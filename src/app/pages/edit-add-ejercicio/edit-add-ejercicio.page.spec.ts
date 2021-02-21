import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAddEjercicioPage } from './edit-add-ejercicio.page';

describe('EditAddEjercicioPage', () => {
  let component: EditAddEjercicioPage;
  let fixture: ComponentFixture<EditAddEjercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddEjercicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAddEjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
