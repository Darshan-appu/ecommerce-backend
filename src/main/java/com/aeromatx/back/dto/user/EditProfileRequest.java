package com.aeromatx.back.dto.user;

import lombok.Data;

@Data

public class EditProfileRequest {
    private String username;
    private String email;
    private String mobile;
    private String permanentAddress;
    private String temporaryAddress;
}
