import type { IImagesGateway } from "../../../domain/gateways/restaurant/IImagesGateway";
import { apiClient } from "../../api/apiClient";
import { API_SERVICES } from "../../../config/api.config";

export class ImagesAdapter implements IImagesGateway {
    
    async upload(file: File): Promise<string> {
        return await apiClient.post<string>(`${API_SERVICES.RESTAURANTS}/Images`, file)
    }
}