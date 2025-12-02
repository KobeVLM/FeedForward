package com.bibit.feedforward.feedforward.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    private String name;
    private String description;
}
