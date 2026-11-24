package com.gestor.tareas.service.impl;

import com.gestor.tareas.entity.Tarea;
import com.gestor.tareas.repository.TareaRepository;
import com.gestor.tareas.service.TareaService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TareaServiceImpl implements TareaService {

    private final TareaRepository tareaRepository;

    public TareaServiceImpl(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Tarea> findAll() {
        return tareaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Tarea findById(Long id) {
        return tareaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public Tarea create(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    @Override
    @Transactional
    public Tarea update(Long id, Tarea tarea) {
        Tarea existente = findById(id);
        existente.setTitulo(tarea.getTitulo());
        existente.setDescripcion(tarea.getDescripcion());
        return tareaRepository.save(existente);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Tarea existente = findById(id);
        tareaRepository.delete(existente);
    }
}