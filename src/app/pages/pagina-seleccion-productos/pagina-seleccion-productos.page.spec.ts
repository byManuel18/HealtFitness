import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaSeleccionProductosPage } from './pagina-seleccion-productos.page';

describe('PaginaSeleccionProductosPage', () => {
  let component: PaginaSeleccionProductosPage;
  let fixture: ComponentFixture<PaginaSeleccionProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaSeleccionProductosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaSeleccionProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
