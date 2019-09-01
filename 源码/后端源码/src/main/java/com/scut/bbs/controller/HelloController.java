package com.scut.bbs.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HelloController {

    @RequestMapping("/hello")
    public Map helloWorld(){
        Map<String,Object> map = new HashMap<>();
        map.put("message","hello, welcome to bbs_scut");
        map.put("time",new Date().toString());
        return map;
    }
}
