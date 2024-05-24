export interface Employee {
    id : number | string;
    name : string;
    code : string;

    isEdit?: 'add' | 'edit' | 'none' | 'delete'
    delete_status?: boolean;
}