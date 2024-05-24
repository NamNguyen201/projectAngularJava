import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Element } from '../components/screen2-add-dialog/screen2-dialog.component';
import { InventoryStatus } from "./inventoryStatus";
import { Locations } from "./location";
import { Owner } from "./owner";
import { Product } from "./product";
import { Supplier } from "./supplier";

export interface TableMaster {
    id : number;
    date : Date;
    quantity : number;
    number4 : number;
    number5 : number;
    number6 : number;
    showRadioButton: number;
    productEntity: Product;
    ownerEntity: Owner;
    supplierEntity: Supplier;
    locationEntity: Locations;
    inventoryStatusEntity: InventoryStatus;

    isEdit?: 'add' | 'edit' | 'none' 

}

export const blankTableMaster: TableMaster = {
    id :0,
    date: new Date(Date.now()),
    quantity : 0,
    number4 : 0,
    number5 : 0,
    number6 : 0,
    showRadioButton : 0,
    productEntity: {
        id :0,
        codeProduct:'',
        nameProduct:'',
        note : ''
    },
    ownerEntity: {
        id : 0,
        codeOwner:'',
        nameOwner:''
    },
    locationEntity: {
        id: 0,
        nameLocation:'',
        warehouseEntity:{
            id:0,
            nameWarehouse:''
        }
    },
    inventoryStatusEntity: {
        id: 0,
        status:''
    },
    supplierEntity: {
        id:0,
        codeSupplier:'',
        nameSupplier:''
    }

}

export function calculatorButton3Input1(element: TableMaster): number{
    return Math.floor(+element.quantity / (+element.number4 * +element.number5 * +element.number6));
}

export function calculatorButton3Input2(element: TableMaster): number{
    return Math.floor((element.quantity - (calculatorButton3Input1(element) * element.number4 * element.number5 * element.number6))/(element.number5 * element.number6))
}

export function calculatorButton3Input3(element: TableMaster):number{
    return Math.floor((element.quantity -(calculatorButton3Input1(element) * element.number4 * element.number5 * element.number6)-(calculatorButton3Input2(element) * element.number5 * element.number6))/element.number6);
}


// Validator kiểm tra trùng khóa
export const duplicateKeyValidator: ValidatorFn = (control: AbstractControl) => {
    // Logic kiểm tra trùng lặp khóa
    // Nếu khóa bị trùng, trả về đối tượng có thuộc tính duplicateKey với giá trị true
    // Nếu khóa không bị trùng, trả về null

    return control.value === 'duplicateKey' ? { duplicateKey: true } : null;
};

// Validator kiểm tra mã sản phẩm
export const codeProductControl: ValidatorFn = (control: AbstractControl) => {
    const codeProduct = control.get('codeProduct') as FormControl;
    const nameProduct = control.get('nameProduct') as FormControl;
  
    // Logic kiểm tra mã sản phẩm và tên sản phẩm
    // Nếu không hợp lệ, trả về đối tượng có thuộc tính invalidCodeProduct với giá trị true
    // Nếu hợp lệ, trả về null
  
    return codeProduct.value === nameProduct.value ? { invalidCodeProduct: true } : null;
  };