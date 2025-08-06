package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @PostMapping
    public void saveVote(@RequestBody VotePayload payload) {
        List<String> answers = payload.getAnswers();
        for (int i = 0; i < answers.size(); i++) {
            String key = "question" + (i + 1) + ":" + answers.get(i);
            redisTemplate.opsForValue().increment(key);
        }
    }
}

class VotePayload {
    private List<String> answers;
    public List<String> getAnswers() { return answers; }
    public void setAnswers(List<String> answers) { this.answers = answers; }
}
