export interface IProcurementModel{
    Description:string,
    ExpectedDate:Date,
    AmountUSD:string
}

export interface IListItem {  
    Title: string,  
    ProjectName: string,  
    BesaEntity: string,  
    //BesaOfficers: any,
    VndorDetails:string,
    Status:string,
    TransactionType:string,
    RequestID:string
    ID:any
}  
export interface IListItemColl {  
    value: IListItem[];  
}  