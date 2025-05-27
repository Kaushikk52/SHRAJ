package com.shraj.backend.repositories;

import com.shraj.backend.models.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepo extends JpaRepository<Blog,String>, JpaSpecificationExecutor<Blog> {
    List<Blog> findByIsDeletedFalse();
}
