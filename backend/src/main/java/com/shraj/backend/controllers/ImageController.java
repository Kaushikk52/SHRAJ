package com.shraj.backend.controllers;


import com.shraj.backend.services.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/images")
public class ImageController {

    private final ImageService imgService;

    @PostMapping(value = "/upload/single")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("type") String type) throws IOException {
            String imageUrl = imgService.uploadImage(file,type);
            return ResponseEntity.ok(imageUrl);
    }

    @PostMapping(value = "/upload/multiple/{type}")
    public ResponseEntity<List<String>> uploadMultiple(@RequestParam("files") List<MultipartFile> files,
                                                       @PathVariable String type) throws IOException {
            List<String> urls = imgService.multipleUpload(files, type);
            return ResponseEntity.ok(urls);

    }

    @DeleteMapping(value = "/delete/single/{type}")
    public ResponseEntity<?> deleteImage(@RequestParam("publicId") String publicId, @PathVariable String type) throws IOException {
            String result = imgService.deleteImage(publicId,type);
            return ResponseEntity.ok(result);
    }

    @DeleteMapping(value = "/delete/multiple/{type}")
    public ResponseEntity<?> deleteMultiple(@RequestParam("publicIds") List<String> publicIds, @PathVariable String type) {
            List<String> results = imgService.deleteFiles(publicIds, type);
            return ResponseEntity.ok(results);
    }
}
