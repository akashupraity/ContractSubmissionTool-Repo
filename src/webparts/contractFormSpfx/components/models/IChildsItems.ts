export interface IChildsItems {  
    Title: string,  
    ProjectName: string,  
    BesaEntity: string,  
    VndorDetails:string,
    Status:string,
    TransactionType:string,
    RequestID:string,
    //ParentDetails:string,
    ID:any
}  
export interface IChildsColl {  
    value: IChildsItems[];  
}  