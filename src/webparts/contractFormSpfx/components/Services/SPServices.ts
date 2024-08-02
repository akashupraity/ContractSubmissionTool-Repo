import { WebPartContext } from "@microsoft/sp-webpart-base";
import "@pnp/sp/webs";  
import "@pnp/sp/lists";  
import "@pnp/sp/items"; 
import { IListItem } from "../models/IListItem";
import { Web } from "@pnp/sp-commonjs";
import { IChildsItems } from "../models/IChildsItems";
//import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export class SPOperation{
    context: any;
    props: any;
    state: { file: any; };
    ServerUrl: any;
    public constructor(public siteURL:string){
        
        
    }
    /**
     * getlistTitle
     */
    public getlistItems(context:WebPartContext):Promise<any>{
        let web= Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('Company_Master').items.select('Title','Id').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);

            },

            (error:any):void =>{
                reject("error occured"+error);
            });
        })

    }

    /**
     * getlistBesaEntity
     */
    public getlistBesaEntity(context:WebPartContext):Promise<any>{
        let web=Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('BesaEntity').items.select('Title').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);
            },
            (error:any):void =>{
                
                reject("error occured"+error);
            });
        })

    }

    /**
     * getlistBesaEntity
     */
    public getPaymentType(context:WebPartContext):Promise<any>{
        let web=Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('ConfigurationList').items.select('Payment_Type').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);
            },
            (error:any):void =>{
                
                reject("error occured"+error);
            });
        })

    }

     /**
     * getlistBesaEntity
     */
     public getPeriod(context:WebPartContext):Promise<any>{
        let web=Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('ConfigurationList').items.select('Period').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);
            },
            (error:any):void =>{
                
                reject("error occured"+error);
            });
        })

    }
     /**
     * getTransactionType
     */
     public getTransactionType(context:WebPartContext):Promise<any>{
        let web=Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('ConfigurationList').items.select('TransactionType').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);
            },
            (error:any):void =>{
                
                reject("error occured"+error);
            });
        })

    }


    /**
     * getlistCompany Project
     */
    public getlistCompanyProject(context:WebPartContext):Promise<any>{
        let web=Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('Project_Master').items.select('Title','Id').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);
            },
            (error:any):void =>{
                reject("error occured"+error);
            });
        })

    }

    /**
     * getlist Contract Type
     */
    public getContractType(context:WebPartContext):Promise<any>{
        let web=Web(this.siteURL)
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle('ContractType').items.select('Title','Id').get()
            .then((result:any)=>{
                console.log(result);
                resolve(result);
            },
            (error:any):void =>{
                reject("error occured"+error);
            });
        })

    }

      /**
     * Get All Items from the list 
    */
  
    public async getAllItems(listName: string): Promise<IListItem[]> {  
        let web=Web(this.siteURL)
        return new Promise<IListItem[]>(async (resolve, reject) => {  
            try {   
                let listItems: IListItem[] = [];
                web.lists.getByTitle(listName).items
                    .select("*", "BesaOfficers/ID", "BesaOfficers/Title", "BesaOfficers/EMail","Author/Title")
                    .expand("BesaOfficers", "Author")
                    .getAll()
                    .then((results: any) => {  
                        results.map((item: any) => { 
                            listItems.push({  
                                Title: item.Title,  
                                ProjectName: item.ProjectName,  
                                BesaEntity: item.BesaEntity,  
                                VndorDetails: item.VndorDetails,
                                Status: item.Status,
                                TransactionType: item.TransactionType,
                                RequestID: item.RequestID,
                                AuthorTitle: item.Author.Title,
                                ID: item.ID
                            });  
                        });  
                        resolve(listItems);  
                    })
                    .catch((error: any) => {
                        console.error("Error fetching list items: ", error);
                        reject(error);
                    });
            } catch (error) {  
                console.error("Error in getAllItems: ", error);  
                reject(error);
            }  
        });  
    }  

        /**
     * Get All Items from the list 
    */
        //.filter(`Status eq `+'Submitted')
        public async getAllParentsItems(listName: string): Promise<IChildsItems[]> {  
            let web=Web(this.siteURL)
            return new Promise<IChildsItems[]>(async (resolve, reject) => {  
                try {   
                    let ParentsItems:IChildsItems[]=[];
                    web.lists.getByTitle(listName).items.filter("Status eq 'Submitted'").select("*","BesaOfficers/ID","BesaOfficers/Title","BesaOfficers/EMail").expand("BesaOfficers").getAll().then((results:any) => {  
                        results.map((item:any) => { +
                            ParentsItems.push({  
                                Title: item.Title,  
                                ProjectName: item.ProjectName,  
                                BesaEntity: item.BesaEntity,  
                                //BesaOfficers: item.BesaOfficersId ==null?"":item.BesaOfficers.Title,
                                VndorDetails:item.VndorDetails,
                                Status:item.Status,
                                TransactionType:item.TransactionType,
                                RequestID:item.RequestID,
                                //ParentDetails:item.Title+" "+item.ProjectName,
                                ID:item.ID
                            });  
                            
                        });  
                         
                           resolve(ParentsItems);  
                    });  
                }  
                catch (error) {  
                    console.log(error);  
                }  
            });  
        }  
        public async getAllChildsItems(listName: string): Promise<any[]> {  
            let web=Web(this.siteURL)
            return new Promise<any[]>(async (resolve, reject) => {  
                    web.lists.getByTitle(listName).items.select("*","BesaOfficers/ID","BesaOfficers/Title","BesaOfficers/EMail").expand("BesaOfficers").getAll()
                    .then((results:any) => {  
                     resolve(results);  
                    },
                    (error:any)=>{
                        reject("error occured "+error);
                    })
                    
            });  
        } 

        public getChilds = function (item:any, items:any) {
            item.childs = [];
            items.map((childItem:any) =>{
                if (childItem.ParentIDId != undefined && parseInt(childItem.ParentIDId) == item.Id) {
                    childItem.ParentsItemsDetails ==item.ParentDetails
                    item.childs.push(childItem);
                    this.getChilds(childItem, items);
                }
            });
          }

    /**
     * CreatListItem
     */
    public CreateListItem(context: WebPartContext,PostData: any): Promise<string>{
        let web=Web(this.siteURL);
        
        return new Promise<string>(async (resolve, reject)=>{
         web.lists.getByTitle('Contract Management').items.add(PostData)
            .then((results:any)=>{
                
                console.log(results.data.ID);
                resolve(results.data.ID);
            });
        });
    }


    /**
     * CreatListItem
     */
    public CreateChildsListItem(context: WebPartContext,PostChildData: any): Promise<string>{
        let web=Web(this.siteURL);
        
        return new Promise<string>(async (resolve, reject)=>{
         web.lists.getByTitle('ContractManagementChilds').items.add(PostChildData)
            .then((results:any)=>{
                console.log(results.data.ID);
                resolve(results.data.ID);
            });
        });
    }

    /**
     * CreatListItem
     */
    public CreateProjectMaster(context: WebPartContext,ProjectName:any): Promise<string>{
        let web=Web(this.siteURL)

        let ProjectPostData:any={};
        ProjectPostData={
        Title:ProjectName
        }
        return new Promise<string>(async (resolve, reject)=>{
            web.lists.getByTitle('Project_Master').items.add( ProjectPostData)
            .then((results:any)=>{
                resolve("item with id"+results.data.ID+"Item added succefully");
                
            });
        });
    }

    /**
     * CreatListItem
     */
    public CreateContractingParty(context: WebPartContext,CompanyName:any): Promise<string>{
        let web=Web(this.siteURL)
        let CompanyPostData:any={}
        CompanyPostData={
            Title:CompanyName
        }
        return new Promise<string>(async (resolve, reject)=>{
            web.lists.getByTitle('Company_Master').items.add(CompanyPostData)
            .then((results:any)=>{
                resolve("item with id"+results.data.ID+"Item added succefully");
                
            });
        });

    }

    /**
     * Creat Contract Type
     */
    public CreateContractType(context: WebPartContext,ContractType:any): Promise<string>{
        let web=Web(this.siteURL)
        let ContractTypePostData:any={}
        ContractTypePostData={
            Title:ContractType
        }
        return new Promise<string>(async (resolve, reject)=>{
            web.lists.getByTitle('ContractType').items.add(ContractTypePostData)
            .then((results:any)=>{
                resolve("item with id"+results.data.ID+"Item added succefully");
                
            });
        });

    }

    // Get ListItem by Item ID
    public GetListItemByID(itemId:any,ListName:string):Promise<any>{
    let web=Web(this.siteURL);
    return new Promise<any>(async(resolve,reject)=>{
        web.lists.getByTitle(ListName).items.getById(itemId).select("*","BesaOfficers/ID","BesaOfficers/Title","BesaOfficers/EMail").expand("BesaOfficers").get().then(result=>{
            console.log(result);
            resolve(result)
        },(error:any)=>{
            reject("error occured"+error);
        })
    })
    
    }
     // Get ListItem by Item ID
     public GetLibraryDocument(itemId:any,ListName:string):Promise<any>{
        let web=Web(this.siteURL);
        return new Promise<any>(async(resolve,reject)=>{
            web.lists.getByTitle(ListName).items.filter(`ContractId eq `+itemId).select("*","FileLeafRef","FileRef","EncodedAbsUrl","Author/Title","Author/ID","Author/EMail","Contract/ID","Contract/Title").expand("Author,Contract").orderBy("Id",false).get().then(results => {
                console.log(results);
                resolve(results)
            },(error:any)=>{
                reject("error occured"+error);
            })
        })
        
        }

         // Get ListItem by Item ID
     public GetLibraryDocumentForExcel(ContractItem:any):Promise<any>{
        let web=Web(this.siteURL);

        try{
           // for(const TempIDArrs of TempIDArr ){
                return new Promise<any>(async(resolve,reject)=>{
                    web.lists.getByTitle('ContractManagementLibrary').items.filter(`ContractId eq `+ContractItem.ID).select("*","FileLeafRef","FileRef","EncodedAbsUrl","Author/Title","Author/ID","Author/EMail","Contract/ID","Contract/Title").expand("Author,Contract").orderBy("Id",false).get()
                    .then(results => {
                        console.log(results);
                        resolve(results)

                        
                    },(error:any)=>{
                        reject("error occured"+error);
                    })
                })

           // }
        }catch (error) {
            console.log(`Error retrieving documents: ${error}`);
          }
        
        }



    public UpdateItem(itemId:any,context: WebPartContext,UpdateData:any){
        let web=Web(this.siteURL);
        return new Promise<string>(async(resolve,reject)=>{
            web.lists.getByTitle('Contract Management').items.getById(itemId).update(UpdateData)
            .then((result:any)=>{
                resolve(result.data.ID)
            },
            
            (error:any)=>{
                reject("error occured"+error)
            })
        })
    }

    public ChildUpdateItem(itemId:any,context: WebPartContext,UpdateData:any){
        let web=Web(this.siteURL);
        return new Promise<string>(async(resolve,reject)=>{
            web.lists.getByTitle('ContractManagementChilds').items.getById(itemId).update(UpdateData)
            .then((result:any)=>{
                resolve(result.data.ID)
            },
            
            (error:any)=>{
                reject("error occured"+error)
            })
        })
    }

     /**
     * CreatListItem
     */
    public async CreateMilestone(IProcurementModel:any,RequestID:any){
        let web=Web(this.siteURL)
        for (const Milestoneitem of IProcurementModel){
        await web.lists.getByTitle('MilestoneBased').items.add({
             ContractId:RequestID,
             Title:Milestoneitem.Description,
             ExpectedDate:Milestoneitem.ExpectedDate,
             AmountUSD:Milestoneitem.AmountUSD
       });
   }
}

     /**
     * CreatObligation Parent
     */
public async CreateObligation(IObligation:any,RequestID:any){
    let web=Web(this.siteURL)
    for (const Obligation of IObligation){
    await web.lists.getByTitle('Obligation').items.add({
         ContractId:RequestID,
         Title:Obligation.Description,
         Date:Obligation.Date,
         Frequency:Obligation.Frequency
   });
}
}
     /**
     * Creat Insurance Parent
     */
  public async CreateInsurance(IInsurance:any,RequestID:any){
    let web=Web(this.siteURL)
    for (const Insurance of IInsurance){
    await web.lists.getByTitle('Insurance').items.add({       
         ContractId:RequestID,
         Title:Insurance.Insurance,
         Amount:Insurance.Amount,
         Comment:Insurance.Comment
   });
}
}
// * CreatListItem
// */
public async CreatePeriodically(IPeriodicallyModel:any,RequestID:any){
let web=Web(this.siteURL)
for (const PeriodicallyModel of IPeriodicallyModel){
await web.lists.getByTitle('Periodically').items.add({  
    ContractId:RequestID,
    FirstPaymentDate:PeriodicallyModel.FirstPaymentDate,
    Title:PeriodicallyModel.AmountUSD,
    Period:PeriodicallyModel.Period
});
}
}

// * CreatListItem
// */
public async CreateVariablePeriodically(IVariablePeriodicallyModel:any,RequestID:any){
    let web=Web(this.siteURL)
    for (const VariablePeriodicallyModel of IVariablePeriodicallyModel){
    await web.lists.getByTitle('VariablePeriodically').items.add({      
        ContractId:RequestID,
        FromDate:VariablePeriodicallyModel.FromDate,
        ToDate:VariablePeriodicallyModel.ToDate,
        Title:VariablePeriodicallyModel.VariableAmountUSD,
        Period:VariablePeriodicallyModel.VariablePeriod
    });
    }
    }


// * Create Periodically Details
// */
public async _addMilestoneDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.add({
        ContractId:RequestID,
        Title:Model.Description,
        ExpectedDate:Model.ExpectedDate !=null?new Date(Model.ExpectedDate):null,
        AmountUSD:Model.AmountUSD
    });
    }
    }
      // * Create Periodically Details
      // */
public async UpdateMilestoneDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.getById(Model.id).update({
        ContractId:RequestID,
        Title:Model.Description,
        ExpectedDate:Model.ExpectedDate !=null?new Date(Model.ExpectedDate):null,
        AmountUSD:Model.AmountUSD
    });
    }
    }


// * Create Periodically Details
// */
public async _addPeriodicallyDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.add({
        ContractId:RequestID,
        Title:Model.AmountUSD,
        FirstPaymentDate:Model.FirstPaymentDate !=null?new Date(Model.FirstPaymentDate):null,
        Period:Model.Period
    });
    }
    }

      // * Create Periodically Details
      // */
public async UpdatePeriodicallyDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    await Promise.all(IModel.map((Model: any) => 
        web.lists.getByTitle(ListName).items.getById(Model.id).update({     
            ContractId: RequestID,
            Title: Model.AmountUSD,
            FirstPaymentDate: Model.FirstPaymentDate != null ? new Date(Model.FirstPaymentDate) : null,
            Period: Model.Period
        })
    ));
    }


       
    // * Create Periodically Details //*/
public async _addVariablePeriodicallyDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.add({
        ContractId:RequestID,
        FromDate:Model.FromDate !=null?new Date(Model.FromDate):null,
        ToDate:Model.ToDate !=null?new Date(Model.ToDate):null,
        Title:Model.VariableAmountUSD,
        Period:Model.VariablePeriod
    });
    }
    }

      // * Create Periodically Details
      // */
public async UpdateVariablePeriodicallyDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.getById(Model.id).update({
        ContractId:RequestID,
        FromDate:Model.FromDate !=null?new Date(Model.FromDate):null,
        ToDate:Model.ToDate !=null?new Date(Model.ToDate):null,
        Title:Model.VariableAmountUSD,
        Period:Model.VariablePeriod

    });
    }
    }

// * Create Periodically Details
// */
public async _addObligationDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.add({
        ContractId:RequestID,
        Title:Model.Description,
        Date:Model.Date !=null?new Date(Model.Date):null,
        Frequency:Model.Frequency
    });
    }
    }
      // * Create Periodically Details
      
    public async UpdateObligationDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.getById(Model.id).update({
        ContractId:RequestID,
        Title:Model.Description,
        Date:Model.Date !=null?new Date(Model.Date):null,
        Frequency:Model.Frequency
    });
    }
    }

    // * Create Periodically Details
    public async _addInsuranceDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.add({
        ContractId:RequestID,
        Title:Model.Insurance,
        Comment:Model.Comment,
        Amount:Model.Amount
    });
    }
    }
      // * Create Periodically Details
      // */
public async UpdateInsuranceDetails(IModel:any,RequestID:any,ListName:any){
    let web=Web(this.siteURL)
    for (const Model of IModel){
    await web.lists.getByTitle(ListName).items.getById(Model.id).update({
        ContractId:RequestID,
        Title:Model.Insurance,
        Comment:Model.Comment,
        Amount:Model.Amount
    });
    }
    }
//       // * CreatListItem
//    // */
// public async _addPeriodicallyChildDetails(IPeriodicallyModel:any,RequestID:any){
//     let web=Web(this.siteURL)
//     for (const PeriodicallyModel of IPeriodicallyModel){
//     await web.lists.getByTitle('PeriodicallyChild').items.add({
//         ContractId:RequestID,
//         Title:PeriodicallyModel.AmountUSD,
//         FirstPaymentDate:PeriodicallyModel.Date !=null?new Date(PeriodicallyModel.Date):null,
//         Period:PeriodicallyModel.Period
//     });
//     }
//     }

       // * CreatListItem
   // */
// public async _addInsuranceChildDetails(IInsurance:any,RequestID:any){
//     let web=Web(this.siteURL)
//     for (const Insurance of IInsurance){
//     await web.lists.getByTitle('InsuranceChild').items.add({
//         ContractId:RequestID,
//         Title:Insurance.AmountUSD,
//         FirstPaymentDate:Insurance.Date !=null?new Date(Insurance.Date):null,
//         Period:Insurance.Period
//     });
//     }
//     }
  

  


    // * CreatListItem
// */
// public async UpdateMilestoneBasedDetails(IProcurementModel:any,RequestID:any){
//     let web=Web(this.siteURL)
//     for (const Milestoneitem of IProcurementModel){
//     await web.lists.getByTitle('Periodically').items.getById(Milestoneitem.id).update({
//         ContractId:RequestID,
//         Title:Milestoneitem.Description,
//         ExpectedDate:Milestoneitem.ExpectedDate !=null?new Date(Milestoneitem.ExpectedDate):null,
//         AmountUSD:Milestoneitem.AmountUSD
//     });
//     }
//     }
    // * CreatListItem
   // */
// public async _addMilestoneBasedChildDetails(IProcurementModel:any,RequestID:any){
//     let web=Web(this.siteURL)
//     for (const Milestoneitem of IProcurementModel){
//     await web.lists.getByTitle('MilestoneBasedChild').items.add({
//         ContractID:RequestID,
//         ContractId:RequestID,
//         Title:Milestoneitem.Description,
//         ExpectedDate:Milestoneitem.ExpectedDate !=null?new Date(Milestoneitem.ExpectedDate):null,
//         AmountUSD:Milestoneitem.AmountUSD
//     });
//     }
//     }

 //* get Procurement detail by lookup ID **/
 public GetPeriodicallyDetails(itemId: any,listName:string):Promise<any> {
    let listItems:any[]=[];
    let web = Web(this.siteURL);
    return new Promise<any>(async(resolve,reject)=>{
      web.lists.getByTitle(listName).items.select("*").filter(`ContractId eq `+itemId).get().then(results => {
        results.map((item)=>{
          listItems.push({
            id:item.Id,
            Id:item.Id,
            AmountUSD:item.Title,
            FirstPaymentDate:item.FirstPaymentDate !=null?this.ConvertDate(item.FirstPaymentDate): null,
            Period:item.Period
          });
        })
        resolve(listItems);
  },(error:any)=>{
      reject("error occured "+error);
  })
  })
  }; 

  //* get Procurement detail by lookup ID **/
 public GetVariablePeriodicallyDetails(itemId: any,listName:string):Promise<any> {
    let listItems:any[]=[];
    let web = Web(this.siteURL);
    return new Promise<any>(async(resolve,reject)=>{
      web.lists.getByTitle(listName).items.select("*").filter(`ContractId eq `+itemId).get().then(results => {
        results.map((item)=>{
          listItems.push({
            id:item.Id,
            Id:item.Id,
            VariableAmountUSD:item.Title,
            FromDate:item.FromDate !=null?this.ConvertDate(item.FromDate): null,
            ToDate:item.ToDate !=null?this.ConvertDate(item.ToDate): null,
            VariablePeriod:item.Period
          });
        })
        resolve(listItems);
  },(error:any)=>{
      reject("error occured "+error);
  })
  })
  }; 


  public ConvertDate(dateValue:any) {
    var d = new Date(dateValue),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  //* get Milestone detail by lookup ID **/
 public GetMilestoneDetails(itemId: any,listName:string):Promise<any> {
    let listItems:any[]=[];
    let web = Web(this.siteURL);
    return new Promise<any>(async(resolve,reject)=>{
      web.lists.getByTitle(listName).items.select("*").filter(`ContractId eq `+itemId).get().then(results => {
        results.map((item)=>{
            listItems.push({
            id:item.Id,
            Id:item.Id,
            Description:item.Title,
            ExpectedDate:item.ExpectedDate !=null?this.ConvertDate(item.ExpectedDate): null,
            AmountUSD:item.AmountUSD,
          });
        })
        resolve(listItems);
  },(error:any)=>{
      reject("error occured "+error);
  })
  })
  };

  //* get Milestone detail by lookup ID **/
 public GetInsuranceDetails(itemId: any,listName:string):Promise<any> {
    let listItems:any[]=[];
    let web = Web(this.siteURL);
    return new Promise<any>(async(resolve,reject)=>{
      web.lists.getByTitle(listName).items.select("*").filter(`ContractId eq `+itemId).get().then(results => {
        results.map((item)=>{
            listItems.push({
            id:item.Id,
            Id:item.Id,
            Insurance:item.Title,
            Amount:item.Amount,
            Comment:item.Comment,
          });
        })
        resolve(listItems);
  },(error:any)=>{
      reject("error occured "+error);
  })
  })
  };

   //* get Milestone detail by lookup ID **/
 public GetObligationDetails(itemId: any,listName:string):Promise<any> {
    let listItems:any[]=[];
    let web = Web(this.siteURL);
    return new Promise<any>(async(resolve,reject)=>{
      web.lists.getByTitle(listName).items.select("*").filter(`ContractId eq `+itemId).get().then(results => {
        results.map((item)=>{
            listItems.push({
            id:item.Id,   
            Id:item.Id,
            Description:item.Title,
            Date:item.Date !=null?this.ConvertDate(item.Date): null,
            Frequency:item.Frequency,
          });
        })
        resolve(listItems);
  },(error:any)=>{
      reject("error occured "+error);
  })
  })
  };

   /**
     * update-UniqueID
     */
   public UpdateUiniqueID(context: WebPartContext,itemId:any,requestorUniqueID:any,ListName:any):Promise<string> {
    let web=Web(this.siteURL);
    let updatePostDate = {
        RequestID: requestorUniqueID,
      }
    return new Promise<string>(async(resolve,reject)=>{
      web.lists.getByTitle(ListName).items.getById(itemId).update(updatePostDate)
      .then((result:any)=>{
          resolve("Updated")
      },(error:any)=>{
          reject("error occured "+error);
      })
    })
};

}