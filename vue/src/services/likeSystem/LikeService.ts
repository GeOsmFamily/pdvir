import { apiClient } from "@/assets/plugins/axios";
import type { LikesList } from "@/models/interfaces/LikesList";

export class LikeService {

    static async getLikesList(): Promise<LikesList>
    {
        return (await apiClient.get('/api/user_likes', { headers:  {'accept': 'application/ld+json'}})).data as LikesList
    }
}