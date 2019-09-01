package com.scut.bbs.dao;


import com.scut.bbs.entity.Attention;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttentionMapper {

    int insert(Attention attention);

    List<Integer> selectAllByUserId(Integer userId);

    List<Integer> selectAllByAuthorId(Integer authorId);

    int deleteByUserIdAndAuthorId(Attention attention);

    List<Attention> selectAll();
}