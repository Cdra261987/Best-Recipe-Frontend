import { Ingredient } from "./ingredient";

export interface Recipe {
    id?: number;
    name: string;
    description: string;
    difficulty: number
    duration: number
    ingredient?: Array<Ingredient>;
    category: string;
    dateOnly: string;
    isActive?: boolean;
    isValid?: boolean;
}