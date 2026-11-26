import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tarea } from '../tarea.model';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tarea-list',
  imports: [],
  templateUrl: './tarea-list.html',
  styleUrl: './tarea-list.css',
})
export class TareaList implements OnInit {
  private readonly tareaService = inject(TareaService);
  private readonly destroyRef = inject(DestroyRef);

  tareas = signal<Tarea[]>([]);
  cargando = signal(false);
  error = signal('');
  editar = output<Tarea>();
  borrada = output<number>();
  editandoId = input<number | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.tareaService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (tareas) => {
        this.tareas.set(tareas);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las tareas.');
        this.cargando.set(false);
      },
    });
  }

  borrar(id: number): void {
    this.tareaService.delete(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.borrada.emit(id);
        this.cargar();
      },
      error: () => this.error.set('No se pudo borrar la tarea.'),
    });
  }
}