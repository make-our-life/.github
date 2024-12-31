package com.kubera.leez.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
/*
 * Favorite member list of board
 * Create : 24.12.29 - Gajun.Choi
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteListItem {
    private String email;
    private String nickname;
    private String profileImage;
}
