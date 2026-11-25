import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tarea } from '../tarea.model';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tarea-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tarea-form.html',
  styleUrl: './tarea-form.css',
})
export class TareaForm {
  private readonly fb = inject(FormBuilder);
  private readonly tareaService = inject(TareaService);
  private readonly destroyRef = inject(DestroyRef);

  tarea = input<Tarea | null>(null);
  guardada = output<void>();
  cancelada = output<void>();
  error = signal('');

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor() {
    effect(() => {
      const t = this.tarea();
      this.form.reset({ titulo: t?.titulo ?? '', descripcion: t?.descripcion ?? '' });
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error.set('');
    const datos = this.form.getRawValue();
    const actual = this.tarea();
    const peticion = actual?.id
      ? this.tareaService.update(actual.id, datos)
      : this.tareaService.create(datos);

    peticion.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.form.reset();
        this.guardada.emit();
      },
      error: () => this.error.set('No se pudo guardar la tarea.'),
    });
  }

  cancelar(): void {
    this.form.reset();
    this.cancelada.emit();
  }
}