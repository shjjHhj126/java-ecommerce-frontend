package com.sherry.service;

import com.sherry.exception.UserException;
import com.sherry.model.User;
public interface UserService {
    public User findById(Long UserId)throws UserException;
    public User findUserProfileByJwt(String jwt)throws UserException;

}
