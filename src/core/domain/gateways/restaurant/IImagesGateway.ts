export interface IImagesGateway {
    
    upload(file: File): Promise<string>
    
}