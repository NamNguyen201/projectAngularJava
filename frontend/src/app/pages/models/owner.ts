export interface Owner {
    id : number | string;
    nameOwner : string;
    codeOwner : string;

    isEdit?: 'add' | 'edit' | 'none' | 'delete'
    delete_status?: boolean;
}