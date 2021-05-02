// NO ANGULAR, QUALQUER COMPONENTE GERADO PELO ANGULAR CLI
// GERA TAMBÉM ESTE CÓDIGO DE SPEC, ELE NÃO DEVE SER ALTERADO
// E SERVE APENAS PARA AJUDAR O COMPILADOR A CONVERTER
// O TYPESCRIPT PARA JAVASCRIPT PARA O NAVEGADOR RENDERIZAR CORRETAMENTE
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
