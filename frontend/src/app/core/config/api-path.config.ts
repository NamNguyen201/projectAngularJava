export const ApiPathConfig = {
  auth: {
    login: '/oauth/token',
    detailUser: '/oauth/user_login',
    logOut: '/oauth/logout',
    changePassword: '/oauth/change-pass',
    forgotPassword: '/oauth/forget-password'
  },
  service: {
    dialogSeach: {
      dialogCommon: '/api/common/dialog-common',
      getProductBySet: '/api/product-by-set',
      getProductChild: '/api/product-child',
      searchProduct: '/api/search-product-child',
      listProductDialog: '/api/list-product-dialog',
      listCustomerDestinationDialog: '/api/get-customer-dest',
      listSupplierDestinationDialog: '/api/get-supplier-dest',
      listProductVariousDialog: '/api/list-product-various-dialog'
    }
  },
  user: {
    user: '/api/user',
    sendMail: '/api/user/send-mail',
    exportCSV: '/api/user/downloadCSV'
  },
  common: {
    zipcode: '/api/common/zip-code',
    commonSetting: '/api/common/setting',
    reason: '/api/reason',
    businessDate: '/api/date-daily-process',
    dailyProcess: '/api/daily-process',
    checkBatch: '/api/check-batch',
    checkDateDaily: '/api/check-date-daily'
  },
  receipt: {
    inventoryInput: '/api/inventory-input',
    inventoryInputPlan: '/api/plan-inventory-input',
    inventoryInputActual: '/api/actual-inventory-input',
    inventoryInputCorrection: '/api/correction-inventory-input',
    closeInventoryInput: '/api/change-isClose-inventory-input',
    checkExistSlipNo: '/api/check-exist-slip-No',
    returnReceiptInput: '/api/return-receipt-input',
    checkExistSlipNoReturnInput: '/api/check-slip-no-return-input',
    exportCSVreturnReceiptInput: '/api/return-receipt-input/downloadCSV',
    orderList: '/api/order-list',
    order: '/api/order',
    orderPdf: '/api/order-pdf',
    orderConfirm: '/api/order-confirm',
    checkValidator: '/api/return-receipt-input/validate'
  },
  inventory: {
    productInventory: '/api/product-inventory',
    productInventoryPdf: '/api/product-inventory-pdf',
    productInventoryPdfByLocation: '/api/product-inventory-by-location-pdf'
  },
  master: {
    company: '/api/company',
    exportCSVcompany: '/api/company/downloadCSV',
    exportCSVrepository: '/api/repository/downloadCSV',
    repository: '/api/repository',
    user: '/api/user',
    categoryDetail: '/api/category-detail',
    productCategory: '/api/category',
    checkCategoryCode: '/api/check-category',
    productCategoryCSV: '/api/category/downloadCSV',
    supplier: '/api/supplier',
    getSupplierByCode: '/api/supplier-by-code',
    supplierDeliveryDest: '/api/supplier-dest',
    getSupplierDeliveryDestByCode: '/api/supplier-destination-by-code',
    route: '/api/route',
    course: '/api/course',
    salesUnitPrice: '/api/sales-unit-price',
    productCode: '/api/productCode',
    customerCode: '/api/customerCode',
    exportCSVSales: '/api/sales-unit-price/downloadCSV',
    purchasePriceUnit: '/api/purchase-unit-price',
    exportCSVPurchase: '/api/purchase-unit-price/downloadCSV',
    supplierCode: '/api/supplierCode',
    location: '/api/master-location',
    exportCSVLocation: '/api/location/downloadCSV',
    exportCSVsupplier: '/api/supplier/downloadCSV',
    supplierCheckCode: '/api/supplier-code',
    supplierDestinationCode: '/api/supplier-dest-code',
    checklocation: '/api/check-location',
    product: '/api/product',
    checkProductCode: '/api/product-code',
    productCSV: '/api/product/downloadCSV',
    customer: '/api/customer',
    getCustomerByCode: '/api/customer-by-code',
    customerDeliveryDest: '/api/customer-dest',
    exportCSVCustomer: '/api/customer/downloadCSV',
    customerCheckCode: '/api/customer-code',
    customerDestinationCode: '/api/customer-dest-code',
    customerDestinationByCode: '/api/customer-destination-by-code',
    repositoryCheckDuplicate: '/api/repository/check-duplicate-repository',
    unit: '/api/unit-name',
    detailUnitName: '/api/unit-by-name',
    unitCodeCheck: '/api/unit-name/checkCode',
    unitNameCheck: '/api/unit-name/checkName',
    exportCSVUnit: '/api/unit-name/downloadCSV',
    exportCSVsupplierDest: '/api/supplier-dest/downloadCSV',
    exportCSVcustomerDest: '/api/customer-dest/downloadCSV',
    setProduct: '/api/set-product',
    setProductCSV: '/api/set-product/downloadCSV',
    getProductChildNameByCode: '/api/product-by-code',
    getProductParentNameByCode: '/api/product-parent-by-code',
    getProductByCode: '/api/product-by-product-code',
    getRepositoryByCode: '/api/repository/find-one-repository-by-code',
    holiday: '/api/holiday',
    checkHoliday: '/api/check-holiday'
  },
  system: {
    user: '/api/user/system',
    userCsv: '/api/system/downloadCSV',
    productCategory: '/api/category'
  },
  delivery: {
    inventoryOutput: '/api/inventory-output',
    salePrice: '/api/sale-price-by-date',
    createInventoryOutput: '/api/inventory-output-plan',
    inventoryOutputPlan: '/api/inventory-output-plan',
    getDestinationCustomer: '/api/customer-destination-by-code',
    checkSlipNo: '/api/check-slip-no',
    inventoryOutputActual: '/api/inventory-output-actual',
    createInventoryOutputActual: '/api/inventory-output-actual',
    closeInventoryOutputPlan: '/api/inventory-output-close',
    returnOutput: '/api/return-output',
    exportCSVreturnOutput: '/api/return-output/downloadCSV',
    createOrUpdateCorrection: '/api/inventory-correction',
    checkExistSlipNoReturnOutput: '/api/check-slip-no-return-output',
    purchasePrice: '/api/purchase-price-by-date',
    ownerChange: '/api/owner-change',
    batch: '/api/batch',
    checkValidatorInventoryProduct: '/api/inventory-output-actual/validate',
    checkValidatorInventoryProductCorrection: '/api/inventory-output-correction/validate',
    getProductVariousByCode: '/api/product-various-by-product-code',
    validateResgisterReturnOutput: '/api/return-output/validate-register',
    validateUpdateReturnOutput: '/api/return-output/validate-update',
    checkExistSlipNoExpense: '/api/check-slip-no-expense',
    shippingFee: '/api/shipping-fee',
    deliveryIntruction: '/api/delivery-intruction',
    InventoryOutputAllocationDetail: '/api/inventory-allocation-output-detail',
    batchOutputList: '/api/batch-output-list',
    batchOutputAllocatedSubmit: '/api/batch-allocated-submit',
    batchAllocatedList: '/api/batch-allocated-list',
    listCustomerNotMTDialog: '/api/list-customer-not-mt-dialog',
    getCustomerNotMTByCode: '/api/list-customer-not-mt-by-code',
    getProductByCodeAndProductOwnerId: '/api/product-inventory-by-code-productOwnerId',
    getListProductByProductOwnerIdDialog: '/api/product-inventory-by-productOwnerId-dialog',
    inventoryOutputCorrection: '/api/inventory-output-correction',
    deliverySlip: '/api/delivery-slip',
    temporaryAllocation: '/api/temporory-allocation',
    temporaryAllocationPdf: '/api/temporory-allocation/pdf',
    inventoryInputPlanPdf: '/api/plan-inventory-input/pdf',
    inventoryInputActualPdf: '/api/plan-inventory-correction/pdf',
    inventoryInputPlanWorkPdf: '/api/plan-inventory-input/pdf/input',

    checkSlipNoOwnerChange: '/api/ownerchange/check-exist-slip-No'
  },
  dashboard: {
    supplement: '/api/get-list-supplement',
    dashboardOrder: '/api/dashboard/order'
  },
  report: {
    inventoryOutputPdf: '/api/inventory-output-report',
    inventoryActualOutputPdf: '/api/inventory-actual-output-report',
    salesPurchaseUnitOuputReport: '/api/sales-purchase-unit-price-output-report',
    directPickList: '/api/direct-pick-list-report',
    directPickListOutput: '/api/direct-pick-list-output-report',
    deliverySlipReport: '/api/delivery-slip-report',
    deliverySlipExpenseReport: '/api/shipping-fee/pdf',
    deliverySlipReturnInputReport: '/api/return-receipt-input/pdf',
    deliverySlipOwnerChangeReport: '/api/owner-change/pdf',
    deliverySlipOutputActualReport: '/api/output-actual-report',
    setProductWorkingListReport: '/api/set-product-working-list-report',
    returnOutputReport: '/api/return-output-report',
    setProductWorkingList: '/api/report-set-product',
    returnOutputListOutput: '/api/return-output-list-output'
  },
  edi: {
    outputDownload: '/api/edi/output',
    inputDownload: '/api/edi/input'
  },
  stocktaking: {
    list: '/api/stocktaking',
    run: '/api/stocktaking/run-stock',
    getById: '/api/stocktaking-by-id',
    confirm: '/api/confirm-stotaking',
    cancel: '/api/cancel-stotaking',
    dialogProduct: '/api/stotaking/get-list-product',
    getProductByProductCode:'/api/stotaking/get-product-by-code'
  },
  receiptorder: {
    checkValidator: '/api/receipt-order/validate',
    receiptOrder: '/api/receipt-order',
    downLoadCsv: '/api/download-csv',
    updateReceiptOrder: '/api/receipt-order-update',
    confirmReceiptOrder: '/api/receipt-order-confirm'
  },
  inventorySetProduct:{
    list: '/api/inventory-set-product',
    getProductByCode: '/api/set-product/get-by-code',
    setProductDialog: '/api/inventory-set-product-dialog',
    findByOneProductInventoryChild: '/api/set-product/find-by-one-product-inventory-child',
    findByOneProductInventoryParent: '/api/set-product/find-by-one-product-inventory-parent'
  },

 /* ----------------------------------------------------- */
  list_table:{
    list:'/employee/all',
    add:'/employee/add',
    update:'/employee/update',
    find:'/employee/find',
    delete:'/employee/delete'
  },
  
  product_table:{
    list:'/product/all',
    find:'/product/find',
    add:'/product/add',
    update:'/product/update',
    delete:'/product/delete',
    findNameByCode:'/product/findNameProduct'
  },

  owner_table:{
    list:'/owner/all',
    find:'/owner/find',
    add:'/owner/add',
    update:'/owner/update',
    delete:'/owner/delete',
    findNameByCode:'/owner/findNameOwner'
  },

  supplier_table:{
    list:'/supplier/all',
    find:'/supplier/find',
    add:'/supplier/add',
    update:'/supplier/update',
    delete:'/supplier/delete',
    findNameByCode:'/supplier/findNameSupplier'
  },

  wareHouse_table:{
    list:'/wareHouse/all',
    find:'/wareHouse/find',
    add:'/wareHouse/add',
    update:'/wareHouse/update',
    delete:'/wareHouse/delete',
    onlyList:'/wareHouse/onlyList'
  },

 location_table:{
    list:'/location/all',
    find:'/location/find',
    add:'/location/add',
    update:'/location/update',
    delete:'/location/delete',
    findIdWareHouse:'/location/findWarehouseId'
  },

  inventoryStatus_table:{
    list:'/inventoryStatus/all',
    find:'/inventoryStatus/find',
    add:'/inventoryStatus/add',
    update:'/inventoryStatus/update',
    delete:'/inventoryStatus/delete',
    onlyList:'/inventoryStatus/onlyList'
  },

  tableMaster_table:{
    list:'/tableMaster/all',
    find:'/tableMaster/find',
    add:'/tableMaster/add',
    update:'/tableMaster/update',
    delete:'/tableMaster/delete',
    findByCheckDto:'/tableMaster/findByCheckDto',
    updateOrCreate:'/tableMaster/updateOrCreate',
    findSearchPage:'/tableMaster/findProductOwnerSupplierTableMaster'
  },

  chart_history:{
    list:'/history/all'
  },

  login_user:{
    list:'/login'
  }

};
