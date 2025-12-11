import type { IImagesGateway } from "../../../domain/gateways/restaurant/IImagesGateway";

export class ImageService {

    private imageGateway: IImagesGateway

    constructor(imageGateway: IImagesGateway) {
        this.imageGateway = imageGateway
    }

    async upload(file: File): Promise<string> {
        return await this.imageGateway.upload(file)
    }
}