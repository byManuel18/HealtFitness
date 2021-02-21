import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAddProductoPage } from './edit-add-producto.page';

describe('EditAddProductoPage', () => {
  let component: EditAddProductoPage;
  let fixture: ComponentFixture<EditAddProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAddProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
