package com.shraj.backend.controllers;

import com.shraj.backend.models.Blog;
import com.shraj.backend.models.User;
import com.shraj.backend.services.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/blogs")
public class BlogController {

    private final BlogService blogServ;
    private final UserDetailsService userDetailsServ;

    @PostMapping(value = "/post")
    public ResponseEntity<Blog> postBlog(@Valid @RequestBody Blog blog,Principal principal) {
        User currentUser = (User) userDetailsServ.loadUserByUsername(principal.getName());
        Blog savedBlog = blogServ.post(blog,currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBlog);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String,Object>> getAllBlogs() {
        Map<String,Object> response = new HashMap<>();
        List<Blog> blogs = blogServ.getBlogs();
        response.put("message","All blogs retrieved");
        log.info("All blogs retrieved");
        response.put("blogs",blogs);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(blogServ.getBlogById(id));
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<Blog> updateBlog(@Valid @RequestBody Blog blog, Principal principal) {
        return ResponseEntity.status(HttpStatus.OK).body(blogServ.edit(blog, principal));
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        blogServ.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
