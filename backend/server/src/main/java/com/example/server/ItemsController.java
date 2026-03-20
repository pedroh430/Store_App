package com.example.server;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/items")
@RequiredArgsConstructor
public class ItemsController {

    private final Service service;


  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Item> create(
          @RequestParam String name,
          @RequestParam String description,
          @RequestParam Double price,
          @RequestParam MultipartFile image) throws IOException{

      Item saved = service.save(name, description, price, image);
      return ResponseEntity.status(HttpStatus.CREATED).body(saved);
  }

  @GetMapping
    public ResponseEntity<List<Item>> findALL(){
      return ResponseEntity.ok(service.findALL());

  }


}
