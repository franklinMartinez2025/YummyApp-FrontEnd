export class UpLoadUseCase {

    async execute(file: File): Promise<string> {
        return file.name
    }
}
    
 