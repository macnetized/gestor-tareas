package com.gestor.tareas.service;

import java.util.List;

import com.gestor.tareas.entity.Tarea;

public interface TareaService {
    List<Tarea> findAll();

    Tarea findById(Long id);

    Tarea create(Tarea tarea);

    Tarea update(Long id, Tarea tarea);

    void delete(Long id);
}