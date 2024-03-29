package com.scut.bbs.dao;


import com.scut.bbs.entity.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentMapper {

    int insert(Comment comment);

    List<Comment> selectByArticleId(Integer articleId);

    List<Comment> selectByUserId(Integer userId);

    List<Comment> selectAll();

    int deleteCommentByCommentId(Integer commentID);


}