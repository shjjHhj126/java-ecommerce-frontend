package com.example.javaecommerce.repositories;

import com.example.javaecommerce.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository//JpaRepository<Entity, primary_key>, This interface provides methods for performing CRUD operations on Post entities. Inherited from the JpaRepository interface
public interface PostRepository extends JpaRepository<Post, Long> {
}
