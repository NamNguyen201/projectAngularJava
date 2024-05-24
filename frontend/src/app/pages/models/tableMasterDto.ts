
export interface TableMasterDto {
    date: Date;
    showRadioButton: number;
    quantity : number;
    number4 : number; 
    number5 : number; 
    number6 : number; 
    codeProduct: string;
    codeOwner: string;
    codeSupplier: string;
    idLocation : number;
    idInventoryStatus: number;

}
export interface SaveDoubleForm {
    idProduct: number;
    idOwner: number;
    idSupplier: number;
    idLocation: number;
    idInventoryStatus: number;
    showRadioButton: number;
    quantity : number;
    number4 : number; 
    number5 : number; 
    number6 : number;
    date: Date;
    idFormSetSeparate: number;
    totalTong: number;
  

}

// export class saveDoubleFormClass implements SaveDoubleForm{
//     public idProduct!: number;
//     public idOwner!: number;
//     public idSupplier!: number;
//     public idLocation!: number;
//     public idInventoryStatus!: number;
//     public showRadioButton!: number;
//     public quantity! : number;
//     public number4! : number; 
//     public number5! : number; 
//     public number6! : number;
//     public date!: Date; 
// } 