export interface Supplier {
    id : number | string;
    nameSupplier : string;
    codeSupplier : string;


    isEdit?: 'add' | 'edit' | 'none' | 'delete'
    delete_status?: boolean;
}