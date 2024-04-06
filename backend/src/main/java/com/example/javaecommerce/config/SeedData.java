package com.example.javaecommerce.config;


import com.example.javaecommerce.models.Post;
import com.example.javaecommerce.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SeedData implements CommandLineRunner {
    @Autowired
    private PostService postService;

    @Override//String...: can accept 0 or more String, throws Exception:it can throws Exception
    public void run(String... args)throws Exception{
        List<Post> posts = postService.getAll();

        if(posts.isEmpty()){
            Post post1 = new Post();
            post1.setTitle("title of post 1");
            post1.setBody("This is the body of post 1");

            Post post2 = new Post();
            post2.setTitle("title of post 2");
            post2.setBody("This is the body of post 2");

            postService.save(post1);
            postService.save(post2);
        }
    }
}
