package com.scut.bbs.dao;


import com.scut.bbs.entity.ArticleCollection;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleCollectionMapper {

    int insert(ArticleCollection articleCollection);

    int deleteByCollectionId(Integer collectionId);

    List<Integer> selectByUserId(Integer userId);

    List<Integer> selectAll();

    int deleteByArticleCollection(ArticleCollection articleCollection);
}