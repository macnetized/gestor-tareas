package com.gestor.tareas.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gestor.tareas.entity.Tarea;
import com.gestor.tareas.service.TareaService;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "http://localhost:4200")
public class TareaController {

    private final TareaService tareaService;

    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }

    @GetMapping
    public List<Tarea> findAll() {
        return tareaService.findAll();
    }

    @GetMapping("/{id}")
    public Tarea findById(@PathVariable Long id) {
        return tareaService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarea create(@RequestBody Tarea tarea) {
        return tareaService.create(tarea);
    }

    @PutMapping("/{id}")
    public Tarea update(@PathVariable Long id, @RequestBody Tarea tarea) {
        return tareaService.update(id, tarea);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        tareaService.delete(id);
    }
}
