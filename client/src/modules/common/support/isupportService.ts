import { Promise } from "../models/promise";
export interface ISupportService {
    getItemsByCategory(categoryKey: string): Promise;
    deleteCategory(id: string): Promise;
    getCategories(): Promise;
    getCategory(itemId:string): Promise;
    createCategory(model: any): Promise;
    updateCategory(model: any): Promise;

    deleteSupportItem(id: string): Promise;
    getSupportItems(): Promise;
    getSupportItem(itemId:string): Promise;
    createSupportItem(model: any): Promise;
    updateSupportItem(model: any): Promise;
}