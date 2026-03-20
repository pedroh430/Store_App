package com.example.server;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
@org.springframework.stereotype.Service
@RequiredArgsConstructor

public class Service {

    private final ItemRepository repository;

    public Item save(String name, String description, Double price, MultipartFile image ) throws IOException{
        String folder = "uploads/";
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path path = Paths.get(folder + filename);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());

        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setImageUrl(folder + filename);

        return repository.save(item);


    }

  public List<Item> findALL(){
        return repository.findAll();
  }


}
