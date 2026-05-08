package com.inventory.controller;

import com.inventory.model.Production;
import com.inventory.service.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/production")
@CrossOrigin(origins = "*")
public class ProductionController {

    @Autowired
    private ProductionService service;

    @PostMapping
    public Production addProduction(@RequestBody Production production) {
        return service.saveProduction(production);
    }
}