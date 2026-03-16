package com.example.server;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/items")
public class ItemsController {


    @GetMapping()
    public List<Item> getItems(){
        return List.of(

                new Item(1,"leiet", "caramelho, ola, tudo", "rtrtrstertrtrt" ),
                new Item(2,"coco", "java,hho,ddd","iieieirierieroiei")

        );
    }


}
