
export class GetInitialDataUseCase {
    
    async execute(restaurantId: number): Promise<void> {
        if(!restaurantId){
            throw new Error("El id del restaurante es requerido");
        }
    }
}