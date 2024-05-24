export interface Product {
    id : number | string;
    nameProduct : string;
    codeProduct : string;
    note: string;

    isEdit?: 'add' | 'edit' | 'none' | 'delete'
    delete_status?: boolean;
}