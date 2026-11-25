import { Component, signal, viewChild } from '@angular/core';
import { Tarea } from './tarea.model';
import { TareaForm } from './tarea-form/tarea-form';
import { TareaList } from './tarea-list/tarea-list';

@Component({
  imports: [TareaForm, TareaList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly lista = viewChild.required(TareaList);
  protected readonly tareaEditando = signal<Tarea | null>(null);

  protected editar(tarea: Tarea): void {
    this.tareaEditando.set(tarea);
  }

  protected alGuardar(): void {
    this.tareaEditando.set(null);
    this.lista().cargar();
  }

  protected alCancelar(): void {
    this.tareaEditando.set(null);
  }
}