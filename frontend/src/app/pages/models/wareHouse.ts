export interface WareHouse {
    id : number | string;
    nameWarehouse : string;

    isEdit?: 'add' | 'edit' | 'none' | 'delete'
    delete_status?: boolean;
}