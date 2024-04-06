package com.example.javaecommerce.services;

import com.example.javaecommerce.models.Post;
import com.example.javaecommerce.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired//@Autowired is used to inject an instance of the PostRepository into the postRepository field
    private PostRepository postRepository;

    public Optional<Post> getById(Long id){//use Optional<Post>(return type) cuz Post might not exist, to prevent NullPointerException
        return postRepository.findById(id);
    }

    public List<Post> getAll(){
        return postRepository.findAll();
    }

    public Post save(Post post){
        if (post.getId()==null){
            post.setCreatedAt(LocalDateTime.now());
        }
        return postRepository.save(post);
    }
}
