import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRutinaPage } from './edit-rutina.page';

describe('EditRutinaPage', () => {
  let component: EditRutinaPage;
  let fixture: ComponentFixture<EditRutinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRutinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
