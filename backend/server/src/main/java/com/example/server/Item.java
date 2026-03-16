package com.example.server;

import java.util.List;
import java.util.Objects;

public class Item {
    private Integer id;
    private String name;
    private String description;
    private String imageUrl;

    public Item() {
    }

    public Item(Integer id, String name, String description, String imageUrl ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Item items = (Item) o;
        return Objects.equals(id, items.id) && Objects.equals(name, items.name) && Objects.equals(description, items.description) && Objects.equals(imageUrl, items.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, imageUrl);
    }
}
