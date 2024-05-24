import { WareHouse } from "./wareHouse";

export interface Locations {
    id : number | string;
    nameLocation : string;
    warehouseEntity: WareHouse;

    isEdit?: 'add' | 'edit' | 'none' | 'delete'
    delete_status?: boolean;
}