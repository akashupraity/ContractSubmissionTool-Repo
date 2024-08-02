import * as React from 'react';
import styles from './ContractFormSpfx.module.scss';
import { IContractFormSpfxProps } from './IContractFormSpfxProps';
import { SPOperation } from './Services/SPServices';
import { Checkbox, ChoiceGroup, DatePicker, DayOfWeek, DefaultButton, Dropdown, FontIcon, FontWeights, IButtonStyles, IChoiceGroupOption, IChoiceGroupStyles, IDropdownOption, IIconProps, Icon, IconButton, Modal, Pivot, PivotItem, SelectionMode, TextField, getTheme, mergeStyleSets } from 'office-ui-fabric-react';
import { IContractFormSpfxState } from './IContractFormSpfxState';
import { ListView, IViewField, IGrouping, GroupOrder } from '@pnp/spfx-controls-react';
import { IListItem } from './models/IListItem';
import { trimStart } from '@microsoft/sp-lodash-subset';
import { Web } from '@pnp/sp-commonjs';
require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import 'font-awesome/css/font-awesome.min.css';
import {jsPDF} from 'jspdf';


const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    overflowx: 'hidden',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '80%',
    height: '100%'
  },
  container1: {
    display: 'flex',
    overflowx: 'hidden',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '100%',
    height: '100%'
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLarge,
    {
      flex: '1 1 auto',
      borderTop: '4px solid ${theme.palette.themePrimary}',
      overflowx: 'hidden',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    overflowX: 'hidden',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const AddMoreIcon: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralDark,
    marginLeft: '96%',
    marginTop: '4px',
    marginRight: '20px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
// const groupByFields: IGrouping[] = [
//   {
//     name: "Status",
//     order: GroupOrder.ascending
//   },];

export default class ContractFormSpfx extends React.Component<IContractFormSpfxProps, IContractFormSpfxState, {}> {
  _input: any;
  public _SPOps: SPOperation;
  public SelectedContractingParty: string;
  public selectedBesaEntity: string;
  public SelectedCompanyProject: string;
  public SelectedContractType: string;
  public SelectPaymentType: string;
  public SelectContractDescription: string;
  public SelectVendorContact: string;
  public SelectConractValue: string;
  public SelectBudgetID: string;
  public SelectAddress: string;
  public SelectComments: string;
  public SelectedRenewalPeriod: string;
  public SelectedDaysBeforeRenewalDate: string;
  public SelectedgetDaysForNotice: string;
  public SelectedRecoveryPeriod: string;
  public SelectedNoOfDays: string;
  public SelectedAmountUSD: string;
  public SelectedAmountusd: string;
  public SelectedPeriod: string;
  public selectedFile: File | undefined = undefined;
  public selectTransactionType:string;
  public selectedRiskFactor:string;
  public selectedReminderComment:string

  // public _items: IListItem[] = [];
  // files: any;
  // private _input: any;

  constructor(props: IContractFormSpfxProps) {
    
    super(props);
    this._SPOps = new SPOperation(this.props.siteURL);
    this.state = {
      fixedValue: '',
      ExpiredValue:'',
      selectedItemID:null,
      Bind_ContractType: '',
      autoRnewal: '',
      renewalNotice: '',
      Perpetual:'',
      ContractType: [],
      discretionary: '',
      terminationBreach: '',
      terminationStopping: '',
      HideMore: false,
      Documents: [],
      IProcurementModel: [],
      IPeriodicallyModel:[],
      IVariablePeriodicallyModel:[],
      IObligation:[],
      IInsurance:[],
      ContractingParty: [],
      BindTransactionType:'',
      TransactionType:[],
      BesaEntity: [],
      CompanyProject: [],
      PaymentType: [],
      AddMore: false,
      VarFixedValue: false,
      VarExpiredValue:false,
      VarAutoRnewal: false,
      VarRenewalNotice: false,
      VarPerpetual:false,
      VarDiscretionary: false,
      VarTerminationBreach: false,
      VarTerminationStopping: false,
      BindRiskFactor:'',
      allContractItems:[],
      items: [],
      Items: [],
      ChildItem:[],
      status: '',
      SelectedPaymentType: '',
      openEditDialog: false,
      openInvoicePDF:false,
      openMilestonePopup: false,
      openObligationPopup:false,
      openInsurancePopup:false,
      Period: [],
      VariablePeriod:[],
      FixedValue: '',
      AutoRenewalValue: '',
      RenewalByNoticeValue: '',
      PerpetualValue:'',
      DiscretionaryValue: '',
      TerminationBreachValue: '',
      TerminationStoppingValue: '',
      user: null,
      Peopleuser: '',
      formType: '',
      AddProjectName: '',
      AddContractingParty: '',
      AddContractingPartyID: '',
      AddProjectNameID: '',
      DescriptionOfProduct: '',
      VendorPointOfContact: '',
      TotalContractValue: '',
      BudgetId: '',
      VendorAddress: '',
      Comments: '',
      FixedDate: null,
      TerminationPeriod: '',
      DateToExtend: '',
      DaysForNotice: '',
      RecoveryPeriod: '',
      NoOfDays: '',
      AmountUSD: '',
      VariableAmountUSD:'',
      FirstPaymentDate: null,
      FromDate:null,
      ToDate:null,
      Amountusd: '',
      ContractDate: null,
      firstDayOfWeek: DayOfWeek.Sunday,
      value: new Date(),
      DisabledValue: null,
      TerminationDate: undefined,
      PaymentDate: null,
      Bind_BesaEntity: '',
      Bind_PaymentType: '',
      Bind_ContractingParty: '',
      Bind_ProjectName: '',
      Bind_Period: '',
      selectedContractSubmission: [],
      Milestoneitems: [],
      selectedItem: '',
      file: '',
      fileInfos: [],
      FilesToDelete: [],
      arrayData: [],
      IsBtnClicked: false,
      ClickDraft: '',
      ContractPartyArr: [],
      ProjectNameArr: [],
      AddContractType: '',
      ExportItemArr: [],
      DocumentArr: [],
      isDocAttached: false,
      DocAttachedErrMsg:'',
      SubmissionType:'',
      BesaOfficerText:'',
      BindBesaOfficerText:'',
      RadioOption:'Parent Agreement',
      MenuTab:'',
      ReminderDate:null,
      BindReminderComment:'',
      IContractItems:[],
      PopupType:'',
      RequestID:'',
      SelectBeckDateerrMsg:'',
      CurrentDate:new Date(),
      VarDisabledBtnOnCreate:false,
      SelectedContractType:'',
      SelectedContractingParty:'',
      SelectedCompanyProject:'',
      VarDropdownHide:false,
      RenewalNoticeDate:undefined,
      BindStatus:''
    };
    this.AttachmentErr=this.AttachmentErr.bind(this);
    this.AddMoreInfo = this.AddMoreInfo.bind(this);
    this._getFixedValue = this._getFixedValue.bind(this);
    this._getExpiredValue = this._getExpiredValue.bind(this);
    this._getAutoRenewal = this._getAutoRenewal.bind(this);
    this._getRenewalNotice = this._getRenewalNotice.bind(this);
    this._getPerpetual=this._getPerpetual.bind(this);
    this._getDiscretionary = this._getDiscretionary.bind(this);
    this._getTerminationBreach = this._getTerminationBreach.bind(this);
    this._getTerminationStopping = this._getTerminationStopping.bind(this);
    this._getPaymentType = this._getPaymentType.bind(this);
    this.ExitHandler = this.ExitHandler.bind(this);
    this.ExitInvoicePDF = this.ExitInvoicePDF.bind(this);
    this.OpenInvoiceDialog = this.OpenInvoiceDialog.bind(this);
    this.ExitAddMore = this.ExitAddMore.bind(this);
    this.MilestoneExitHandler = this.MilestoneExitHandler.bind(this);
    this.ObligationExitHandler = this.ObligationExitHandler.bind(this);
    this.ObligationOpenPopup = this.ObligationOpenPopup.bind(this);
    this.InsuranceExitHandler = this.InsuranceExitHandler.bind(this);
    this.InsuranceOpenPopup = this.InsuranceOpenPopup.bind(this);
    this.getPeoplePicker = this.getPeoplePicker.bind(this);
    this.getContractingParty = this.getContractingParty.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
    this.createFolders = this.createFolders.bind(this)
    this.RadioOnchange = this.RadioOnchange.bind(this)
   
  }

  // --------------getContractingParty--------------
  public getContractingParty = (event: any, data: any) => {
    this.setState({ AddContractingParty: data.text }),

      this.state.ContractPartyArr.map((item: any) => {
        if (item.Title == data.key) {
          this.setState({ AddContractingPartyID: item.ID })
        }
      })

    this.setState({ Bind_ContractingParty: data.key })
  }


  public getContractType = (event: any, data: any) => {
    this.setState({ AddContractType: data.text })

    this.setState({ Bind_ContractType: data.key })
  }
 



  // --------------getBesaEntity --------------
  public getBesaEntity = (event: any, data: any) => {
    this.selectedBesaEntity = data.text;
    this.setState({ Bind_BesaEntity: data.key })

  }

  // --------------getBesaEntity --------------
  public getTransactionType= (event: any, data: any) => {
    this.selectTransactionType = data.text;
    this.setState({ BindTransactionType: data.key })

  }
  


  // --------------getProjectName --------------
  public getProjectName = (event: any, data: any) => {
    this.setState({ AddProjectName: data.text }),

      this.state.ProjectNameArr.map((item: any) => {
        if (item.Title == data.key) {
          this.setState({ AddProjectNameID: item.ID })
        }
      })

    this.setState({ Bind_ProjectName: data.key })
  }
  // --------------getContractDescription--------------
  public getContractDescription = (event: any, data: any) => {
    this.SelectContractDescription = data;
    this.setState({ DescriptionOfProduct: data })
  }
  //--------------getVendorContact--------------
  public getVendorContact = (event: any, data: any) => {
    this.SelectVendorContact = data;
    this.setState({ VendorPointOfContact: data })
  }

  // --------------getContractValue --------------
  public getContractValue = (event: any, data: any) => {
    this.SelectConractValue = data;
    this.setState({ TotalContractValue: data })
  }

  // --------------getBudgetId --------------
  public getBudgetId = (event: any, data: any) => {
    this.SelectBudgetID = data;
    this.setState({ BudgetId: data })
  }

  // --------------getAddress --------------
  public getAddress = (event: any, data: any) => {
    this.SelectAddress = data;
    this.setState({ VendorAddress: data })
  }


  // --------------getComment --------------
  public getComment = (event: any, data: any) => {
    this.SelectComments = data;
    this.setState({ Comments: data })
  }
  // --------------getComment --------------
  public getRiskFactor = (event: any, data: any) => {
    this.selectedRiskFactor = data;
    this.setState({ BindRiskFactor: data })
  }
  // --------------getComment --------------
  public getReminderComment = (event: any, data: any) => {
    this.selectedReminderComment = data;
    this.setState({ BindReminderComment: data })
  }

  private getPeoplePicker(items: any[]) {
    console.log(items);
    let tempuser: any[] = [];
    items.map((item) => {
      tempuser.push(item.id);
    });
    this.setState({ user: tempuser[0] })
  }
   // --------------getBesaOfficerTestField--------------
   public  getbesaOfficer= (event: any, data: any) => {
    this.setState({ BesaOfficerText: data,BindBesaOfficerText:data })

  }

  private _getFixedValue(fixedEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarFixedValue?: boolean) {
    if (VarFixedValue==false) {
      this.setState({ VarFixedValue, FixedValue: null });
    }else{
      this.setState({ VarFixedValue, FixedValue: fixedEv.currentTarget.title });
    }
    
  }
  private _getExpiredValue(ExpiredEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarExpiredValue?: boolean) {
    if (VarExpiredValue==false) {
      this.setState({ VarExpiredValue, ExpiredValue: null });
    }else{
      this.setState({ VarExpiredValue, ExpiredValue: ExpiredEv.currentTarget.title });
    }
    
  }
  private _getAutoRenewal(AutoRenewalEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarAutoRnewal?: boolean) {
    if (VarAutoRnewal==false) {
      this.setState({ VarAutoRnewal, AutoRenewalValue: null });
    }else{
      this.setState({ VarAutoRnewal, AutoRenewalValue: AutoRenewalEv.currentTarget.title});
    }
    }
   
  // --------------getComment --------------
  public getRenewalPeriod = (event: any, data: any) => {
    this.SelectedRenewalPeriod = data;
  }


  private _getRenewalNotice(RenewalByNoticeEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarRenewalNotice?: boolean) {
    if (VarRenewalNotice==false) {
      this.setState({ VarRenewalNotice, RenewalByNoticeValue: null });
    }else{
      this.setState({ VarRenewalNotice, RenewalByNoticeValue: RenewalByNoticeEv.currentTarget.title });
    }
    
  }

  private _getPerpetual(PerpetualEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarPerpetual?: boolean) {
    if (VarPerpetual==false) {
      this.setState({ VarPerpetual, PerpetualValue: null });
    }else{
      this.setState({ VarPerpetual, PerpetualValue: PerpetualEv.currentTarget.title });
    }
    
  }

  // --------------getComment --------------
  public getDaysBeforeRenewalDate = (event: any, data: any) => {
    this.SelectedDaysBeforeRenewalDate = data;
    this.setState({ DateToExtend: data })
  }

  // 2nd Raw-------//
  private _getDiscretionary(DiscretionaryEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarDiscretionary?: boolean) {
    if (VarDiscretionary==false) {
      this.setState({ VarDiscretionary, DiscretionaryValue: null });
    }else{
      this.setState({ VarDiscretionary, DiscretionaryValue: DiscretionaryEv.currentTarget.title });
    }
    
  }
  // --------------getComment --------------
  public getDaysForNotice = (event: any, data: any) => {
    this.SelectedgetDaysForNotice = data;
    this.setState({ DaysForNotice: data })

  }
  private _getTerminationBreach(TerminationBreachEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarTerminationBreach?: boolean) {
    if (VarTerminationBreach==false) {
      this.setState({ VarTerminationBreach, TerminationBreachValue: null });
    }else{
      this.setState({ VarTerminationBreach, TerminationBreachValue: TerminationBreachEv.currentTarget.title });
    }
    
  }
  // --------------getComment --------------
  public getRecoveryPeriod = (event: any, data: any) => {
    this.SelectedRecoveryPeriod = data;
    this.setState({ RecoveryPeriod: data })
  }
  private _getTerminationStopping(TerminationStoppingEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarTerminationStopping?: boolean) {
    if (VarTerminationStopping==false) {
      this.setState({ VarTerminationStopping, TerminationStoppingValue: null });
    }else{
      this.setState({ VarTerminationStopping,TerminationStoppingValue: TerminationStoppingEv.currentTarget.title });
    }
   
  }
  // --------------getComment --------------
  public getNoOfDays = (event: any, data: any) => {
    this.SelectedNoOfDays = data;
    this.setState({ NoOfDays: data })
  }

  public _getPaymentType = (event: any, data: any) => {
    this.setState({ SelectedPaymentType: data.text });
    this.setState({ Bind_PaymentType: data.key });
    this.SelectPaymentType = data.text;

    if (this.SelectPaymentType === "Milestone based") {
      try {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const tableColProps = {
          id: id,
          Description: '',
          ExpectedDate: '',
          AmountUSD:''
        }
        this.state.IProcurementModel.push(tableColProps);
        this.setState(this.state.IProcurementModel);
      } catch (error) {
        console.log("Error in React Table handle Add Row : " + error)
      }
    }
    
    if (this.SelectPaymentType === "Periodically") {

      try {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const tableColProps = {
          id: id,
          FirstPaymentDate: '',
          AmountUSD: '',
          Period:''
        }
        this.state.IPeriodicallyModel.push(tableColProps);
        this.setState(this.state.IPeriodicallyModel);
      } catch (error) {
        console.log("Error in React Table handle Add Row : " + error)
      }
    }

    if (this.SelectPaymentType === "Variable Periodically") {

      try {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const tableColProps = {
          id: id,
          FromDate:Date,
          ToDate:Date,
          VariableAmountUSD: '',
          VariablePeriod:''
        }
        this.state.IVariablePeriodicallyModel.push(tableColProps);
        this.setState(this.state.IVariablePeriodicallyModel);
      } catch (error) {
        console.log("Error in React Table handle Add Row : " + error)
      }
    }
  }


  public handleKeyDown=(e:any)=> {
   const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(e.key)) {
      e.preventDefault();
    }
  }

  public getAddProjectName = (event: any, data: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(data)) {
      alert("Data contains invalid character")
      event.preventDefault();
      
    }else
    this.setState({SelectedCompanyProject : data.replaceAll(/[~`!@#$%^*_+={}\[\]:;.<>/?]/g,'')}) 
  }

  public getAddContractType = (event: any, data: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(data)) {
      alert("Data contains invalid character")
      event.preventDefault();
      
    }else
    this.setState({SelectedContractType : data.replaceAll(/[~`!@#$%^*_+={}\[\]:;.<>/?]/g,'')}) 
  }

  public getAddContractingParty = (event: any, data: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(data)) {
      alert("Data contains invalid character")
      event.preventDefault();
      
    }else
    this.setState({SelectedContractingParty : data.replaceAll(/[~`!@#$%^*_+={}\[\]:;.<>/?]/g,'')}) 
  }

  // --------------getComment --------------
  public getAmountUSD = (event: any, data: any) => {
    this.SelectedAmountUSD = data;
    this.setState({ AmountUSD: data })
  }
  // --------------getComment --------------
  public getAmountusd = (event: any, data: any) => {
    this.SelectedAmountusd = data;
    this.setState({ Amountusd: data })
  }
  // --------------getComment --------------
  // public getPeriod = (event: any, data: any) => {
  //   this.SelectedPeriod = data.text;
  //   this.setState({ Bind_Period: data.key })
  // }
  /**
 * Termination Date select
 */
  public TerminationDateChange = (Terminationdate: Date | null | undefined): void => {
    this.setState({ TerminationDate: Terminationdate });
  };
  
  // Renewal By Notice Date
  public RenewalNoticeDateChange = (RenewalNoticeDate: Date | null | undefined): void => {
    this.setState({ RenewalNoticeDate: RenewalNoticeDate });
  };

  /**
   * Contract Date select
   */
  public ContractDateChange = (Contractdate: Date | null | undefined): void => {
    this.setState({
      ContractDate: Contractdate
    });
  };

  /**
   * Contract Date select
   */
  public ReminderDateChange = (Reminderdate: Date | null | undefined): void => {
    this.setState({ReminderDate: Reminderdate});
  };

  /**
   * FirstPaymentDateDate select
   */
  // public FirstPaymentDateChange = (date: Date | null | undefined): void => {
  //   this.setState({
  //     FirstPaymentDate: date
  //   });
  // };
  /**
   * FirstPaymentDateDate select
   */
  public PaymentDateChange = (Paymentdate: Date | null | undefined): void => {
    this.setState({
      PaymentDate: Paymentdate
    });
  };
  public RadioOnchange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    console.dir(option);
    this.setState({RadioOption:option.text})

  }
  private _onPivotItemClick = () => {
      this.setState({
        RadioOption:'Parent Agreement',
        AddMore: false
      })
  };
  
  public componentDidMount(): void {  
    this.setState({DisabledValue:false})
    this.setState({CurrentDate:new Date()});
    this._SPOps.
      getlistItems(this.props.Context).then((data: any) => {

        var ContractingParty: IDropdownOption[] = [];
        data.map((result: any) => {
          ContractingParty.push({
            key: result.Title,
            text: result.Title
          })
        })
        this.setState({ ContractingParty: ContractingParty, ContractPartyArr: data })
      });

    this._SPOps.
      getlistBesaEntity(this.props.Context)
      .then((data: any) => {
        var BesaEntity: IDropdownOption[] = [];
        data.map((result: any) => {
          BesaEntity.push({
            key: result.Title,
            text: result.Title
          })
        })
        this.setState({ BesaEntity: BesaEntity })
      });




    this._SPOps.
      getlistCompanyProject(this.props.Context).then((data: any) => {
        var CompanyProject: IDropdownOption[] = [];
        data.map((result: any) => {
          CompanyProject.push({
            key: result.Title,
            text: result.Title
          })
        })
        this.setState({ CompanyProject: CompanyProject, ProjectNameArr: data })
      });

      this._SPOps.
      getTransactionType(this.props.Context).then((data: any) => {
        var TransactionType: IDropdownOption[] = [];
        data.map((result: any) => {
          TransactionType.push({
            key: result.TransactionType,
            text: result.TransactionType
          })
        })
        this.setState({TransactionType: TransactionType })
      });

    this._SPOps.
      getContractType(this.props.Context).then((data: any) => {
        var ContractType: IDropdownOption[] = [];
        data.map((result: any) => {
          ContractType.push({
            key: result.Title,
            text: result.Title
          })
        })
        this.setState({ ContractType: ContractType })
      });

    this._SPOps.
      getPaymentType(this.props.Context).then((data: any) => {
        var PaymentType: IDropdownOption[] = [];
        data.map((result: any) => {
          PaymentType.push({
            key: result.Payment_Type,
            text: result.Payment_Type
          })
        })
        this.setState({ PaymentType: PaymentType })
      });

    this._SPOps.
      getPeriod(this.props.Context).then((data: any) => {
        var Period: IDropdownOption[] = [];
        data.map((result: any) => {
          Period.push({
            key: result.Period,
            text: result.Period
          })
        })
        this.setState({ Period: Period,VariablePeriod: Period })
      });

    this._SPOps.
      getAllItems(this.props.ListName).then((listItems: IListItem[]) => {
        console.log(listItems);
        this.setState({
          items: listItems
        });
      });

     
      // this._SPOps.
      // getAllParentsItems(this.props.ListName).then((ParentsItems: IChildsItems[]) => {
      //   console.log(ParentsItems);

      //   this.setState({
      //     Items: ParentsItems
      //   });
      // });
      let filterItems:any=[];
     // let ChildsItems:any=[];
      this._SPOps.getAllParentsItems(this.props.ListName).then((parentResponse:any) => {
      this._SPOps.getAllChildsItems(this.props.ChildListName).then((childResponse:any)=>{
      let AllData = [...parentResponse, ...childResponse];
      parentResponse.map((filterItem:any, index:any) => {
        let item={Id:'',ID:'',BesaEntity:"",ProjectName:"",Title:"",TransactionType:"",BesaOfficer:"",RequestID:""};
        item.ID=filterItem.ID;
        item.Id = filterItem.ID;
        item.BesaEntity=filterItem.BesaEntity;
        item.ProjectName=filterItem.ProjectName;
        item.Title=filterItem.Title;
        item.TransactionType=filterItem.TransactionType;
        item.BesaOfficer=filterItem.VndorDetails;
        item.RequestID=filterItem.RequestID;
        // if (filterItem.ParentIDId !=undefined) {
        //   filterItem.ParentItemDetails == filterItem.
        // }
        if(filterItem.ParentIDId==undefined){
                  filterItems.push(item);
                  this._SPOps.getChilds(item, AllData);

        }
        // childResponse.map((childItem:any,ChildIndex:any)=>{
        //   if (childItem.ParentIDId != undefined && parseInt(childItem.ParentIDId) ==filterItem.ID) {
        //     childItem.ParentsItemsDetails = filterItem.ParentDetails
        //     ChildsItems.push(childItem);
        //     //this.getChilds(childItem, items);
        // }
        // })
      })
      this.setState({
        IContractItems:filterItems,
        allContractItems:filterItems
        })
        console.log(filterItems)
        });
      });

  }





  public renderDynamicId(idx:any){
        return '#demo'+idx
  }
  public renderId(idx:any){
    return 'demo'+idx
}

//** Generate Requestor unique ID */
public _getUniqueRequestorID = (ContractItemId:any) => {
  let ConItemId = ContractItemId.toString();
  var uniqueID = "";
  if (ContractItemId < 10) {
    uniqueID = "000" + ConItemId
  }
  if (ContractItemId >= 10 && ContractItemId < 100) {
    uniqueID = "00" + ConItemId
  }
  if (ContractItemId >= 100 && ContractItemId < 1000) {
    uniqueID = "0" + ConItemId
  }
  if (ContractItemId >= 1000) {
    uniqueID = ConItemId;
  }
  return "P-" + uniqueID;
}

   /**
   * Create object for pass bulk data at one time
   */
  public createItem = (SubmissionType: any) => {
   
    this.setState({ SubmissionType: SubmissionType})
    var files = this._input.files;                             
    if (files.length == 0) {
      this.setState({ isDocAttached: true, DocAttachedErrMsg: "Please attach document/file" })
    }else
    this.setState({ isDocAttached: false})
   if (files.length > 0) {
      let isConfirm = confirm("Are you sure want to create item")
      if (isConfirm) {
        this.setState({VarDisabledBtnOnCreate:true});
        let PostData: any = {};
        PostData = {
          BesaEntity: this.selectedBesaEntity == undefined ? "" : this.selectedBesaEntity,
          Title: this.state.AddContractingParty === 'Other' ? this.state.SelectedContractingParty : this.state.AddContractingParty,
          ProjectName: this.state.AddProjectName === 'Other' ? this.state.SelectedCompanyProject : this.state.AddProjectName,
          ContractType: this.state.AddContractType === 'Other' ? this.state.SelectedContractType : this.state.AddContractType,
          DescriptionOfProduct: this.SelectContractDescription == undefined ? " " : this.SelectContractDescription,
          VndorDetails:this.state.BesaOfficerText,
          VendorName: this.SelectVendorContact == undefined ? "" : this.SelectVendorContact,
          TotalContractPayment: this.SelectConractValue == undefined ? "" : this.SelectConractValue,
          BudgetID: this.SelectBudgetID == undefined ? "" : this.SelectBudgetID,
          VendorAddress: this.SelectAddress == undefined ? "" : this.SelectAddress,
          Comments: this.SelectComments == undefined ? " " : this.SelectComments,
          TerminationType: this.state.FixedValue + "" + this.state.AutoRenewalValue + "" + this.state.RenewalByNoticeValue+ "" +this.state.PerpetualValue,
          NoticeOfTermination: this.state.DiscretionaryValue + "" + this.state.TerminationBreachValue + "" + this.state.TerminationStoppingValue,
          FixedDate: this.state.TerminationDate == undefined ? null : this.state.TerminationDate,
          RenewalDate:this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
          TerminationPeriod: this.SelectedRenewalPeriod == undefined ? "" : this.SelectedRenewalPeriod,
          DateToExtend: this.SelectedDaysBeforeRenewalDate == undefined ? null : this.SelectedDaysBeforeRenewalDate,
          ConvinienceDate: this.SelectedgetDaysForNotice == undefined ? "" : this.SelectedgetDaysForNotice,
          RecoveryPeriod: this.SelectedRecoveryPeriod == undefined ? "" : this.SelectedRecoveryPeriod,
          AutoRenualDate: this.SelectedNoOfDays == undefined ? "" : this.SelectedNoOfDays,
          PaymentType: this.state.SelectedPaymentType,
          AmmountUSD: this.SelectedAmountUSD == undefined ? "" : this.SelectedAmountUSD,
          HowMuch: this.state.PaymentDate == undefined ? null : this.state.PaymentDate,
          ContractDate: this.state.ContractDate == undefined ? null : this.state.ContractDate,
          CompanyID: this.state.AddContractingPartyID == "" ? null : this.state.AddContractingPartyID,
          ProjectID: this.state.AddProjectNameID == "" ? null : this.state.AddProjectNameID,
          TransactionType:this.selectTransactionType,
          RiskFactor:this.selectedRiskFactor,
          ReminderComment:this.selectedReminderComment,
          ReminderDate:this.state.ReminderDate,
          Status: "Submitted"
        }
        //if (this.state.file.length>0) {
        this._SPOps
          .CreateListItem(this.props.Context, PostData)
          .then((result: string) => {
            this.setState({ status: result });

            let requestorUniqueID = this._getUniqueRequestorID(this.state.status);
            this._SPOps.UpdateUiniqueID(this.props.Context,this.state.status,requestorUniqueID,"Contract Management");

              this._SPOps
              .CreateMilestone(this.state.IProcurementModel, this.state.status);

              this._SPOps
              .CreateObligation(this.state.IObligation, this.state.status);

              this._SPOps
              .CreateInsurance(this.state.IInsurance, this.state.status);

              this._SPOps
              .CreatePeriodically(this.state.IPeriodicallyModel, this.state.status);

              this._SPOps
              .CreateVariablePeriodically(this.state.IVariablePeriodicallyModel,this.state.status);


            if (this.state.AddProjectName == "Other") {
              if(this.state.CompanyProject.filter((e:any)=>e.key==this.state.SelectedCompanyProject).length==0)
              this._SPOps
                .CreateProjectMaster(this.props.Context, this.state.SelectedCompanyProject);
            }

            if (this.state.AddContractingParty == "Other") {
              if(this.state.ContractingParty.filter((e:any)=>e.key==this.state.SelectedContractingParty).length==0)
              this._SPOps
                .CreateContractingParty(this.props.Context, this.state.SelectedContractingParty);
            }

            if (this.state.AddContractType == "Other") {
              if(this.state.ContractType.filter((e:any)=>e.key==this.state.SelectedContractType).length==0)
              this._SPOps
                .CreateContractType(this.props.Context, this.state.SelectedContractType);
            }


            var varCompanyFolder = this.state.AddContractingParty === 'Other' ? this.state.SelectedContractingParty : this.state.AddContractingParty;
            var varProjectFolder = this.state.AddProjectName === 'Other' ? this.state.SelectedCompanyProject : this.state.AddProjectName;
            var varStatus=this.state.status;
            if (varCompanyFolder != "" && varProjectFolder != "") {
              this.
              createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"",varStatus)
             
              
            };

            if (varCompanyFolder != "" && varProjectFolder == "") {
              this.
              createFolders(varCompanyFolder.trim(), "".trim(),"",varStatus);
             
            };

            if (varProjectFolder != "" && varCompanyFolder == "") {
              this.
              createFolders("".trim(), varProjectFolder.trim(),"",varStatus)
      
              
            };

            if (varCompanyFolder == "" && varProjectFolder == "") {
              this.uploadFileFromControl("".trim(), "".trim(),"",varStatus)

            };
          }

          );

      }
    }
  }


  //** Generate Requestor unique ID */
public _getChildUniqueRequestorID = (ContractItemId:any,ParentItemID:any) => {
  let ConItemId = ContractItemId.toString();
  var uniqueID = "";
  if (ContractItemId < 10) {
    uniqueID = "000" + ConItemId
  }
  if (ContractItemId >= 10 && ContractItemId < 100) {
    uniqueID = "00" + ConItemId
  }
  if (ContractItemId >= 100 && ContractItemId < 1000) {
    uniqueID = "0" + ConItemId
  }
  if (ContractItemId >= 1000) {
    uniqueID = ConItemId;
  }
  return "P-" + ParentItemID+"-C-"+uniqueID;
}

  /**
   * Create object for pass bulk data at one time
   */
  public createChildsItem = (SubmissionType: any) => {
    this.setState({ SubmissionType: SubmissionType})
    var files = this._input.files;
    if (files.length == 0) {
      this.setState({ isDocAttached: true, DocAttachedErrMsg: "Please attach document/file" })
    }
    else
    this.setState({ isDocAttached: false})
    if (files.length > 0) {

      let isConfirm = confirm("Are you sure want to create Child item")
      if (isConfirm) {
        this.setState({VarDisabledBtnOnCreate:true});
        let PostChildData: any = {};
        PostChildData = {
        BesaEntity: this.state.Bind_BesaEntity == null ? null : this.state.Bind_BesaEntity,
        Title: this.state.Bind_ContractingParty == null ? null : this.state.Bind_ContractingParty,
        ProjectName: this.state.Bind_ProjectName == null ? null : this.state.Bind_ProjectName,
        DescriptionOfProduct: this.state.DescriptionOfProduct == null ? "" : this.state.DescriptionOfProduct,
        VndorDetails:this.state.BindBesaOfficerText,
        VendorName: this.state.VendorPointOfContact == null ? "" : this.state.VendorPointOfContact,
        TotalContractPayment: this.state.TotalContractValue == null ? " " : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == null ? "" : this.state.BudgetId,
        VendorAddress: this.state.VendorAddress == null ? "" : this.state.VendorAddress,
        Comments: this.state.Comments == null ? "" : this.state.Comments,
        TerminationType: this.state.FixedValue + " " + this.state.AutoRenewalValue + " " + this.state.RenewalByNoticeValue+ "" +this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + " " + this.state.TerminationBreachValue + " " + this.state.TerminationStoppingValue,
        FixedDate: this.state.TerminationDate == null ? null : this.state.TerminationDate,
        RenewalDate:this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.state.TerminationPeriod == null ? "" : this.state.TerminationPeriod,
        DateToExtend: this.state.DateToExtend == null ? null : this.state.DateToExtend,
        ConvinienceDate: this.state.DaysForNotice == null ? "" : this.state.DaysForNotice,
        RecoveryPeriod: this.state.RecoveryPeriod == null ? "" : this.state.RecoveryPeriod,
        AutoRenualDate: this.state.NoOfDays == null ? "" : this.state.NoOfDays,
        PaymentType: this.state.Bind_PaymentType == null ? null : this.state.Bind_PaymentType,
        AmmountUSD: this.state.AmountUSD == null ? "" : this.state.AmountUSD,
        HowMuch: this.state.PaymentDate == null ? null : this.state.PaymentDate,
        ContractDate: this.state.ContractDate == null ? null : this.state.ContractDate,
        CompanyID: this.state.AddContractingPartyID == null ? null : this.state.AddContractingPartyID,
        ProjectID: this.state.AddProjectNameID == null ? null : this.state.AddProjectNameID,
        ContractType: this.state.Bind_ContractType == null ? "" : this.state.Bind_ContractType,
        TransactionType:this.state.BindTransactionType,
        RiskFactor:this.state.BindRiskFactor,
        ReminderComment:this.state.BindReminderComment,
        ReminderDate:this.state.ReminderDate,
        Status: "Submitted",
        ParentIDId:this.state.selectedItemID,
        RequestID:this.state.RequestID
        }
        this._SPOps
          .CreateChildsListItem(this.props.Context,PostChildData)
          .then((result: string) => {

          this.setState({ status: this.state.selectedContractSubmission.ID});

          let requestorUniqueID = this._getChildUniqueRequestorID(result,this.state.status);
            this._SPOps.UpdateUiniqueID(this.props.Context,result,requestorUniqueID,"ContractManagementChilds")

            if (this.state.AddProjectName == "Other") {
              this._SPOps
                .CreateProjectMaster(this.props.Context, this.state.SelectedCompanyProject);
            }

            if (this.state.AddContractingParty == "Other") {
              this._SPOps
                .CreateContractingParty(this.props.Context, this.state.SelectedContractingParty);
            }

            if (this.state.AddContractType == "Other") {
              this._SPOps
                .CreateContractType(this.props.Context, this.state.SelectedContractType);
            };
            this._SPOps.
            _addMilestoneDetails(this.state.IProcurementModel,result,"MilestoneBasedChild");

            this._SPOps.
            _addPeriodicallyDetails(this.state.IPeriodicallyModel,result,"PeriodicallyChild");

            this._SPOps.
            _addVariablePeriodicallyDetails(this.state.IVariablePeriodicallyModel,result,"VariablePeriodicallyChild");

            this._SPOps.
            _addInsuranceDetails(this.state.IInsurance,result,"InsuranceChild");

            this._SPOps.
            _addObligationDetails(this.state.IObligation,result,"ObligationChild");


            var varCompanyFolder = this.state.Bind_ContractingParty;
            var varProjectFolder = this.state.Bind_ProjectName;
            var varStatus=this.state.status;
            if (varCompanyFolder != "" && varProjectFolder != "") {
            if (this.state.RadioOption == "Child Document") {
                this.
                createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"Child",varStatus)
              }
              else{
                this.
                createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"",varStatus)
              }
            }
            if (varCompanyFolder != "" && varProjectFolder == "") {
              if (this.state.RadioOption == "Child Document") {
                this.
                createFolders(varCompanyFolder.trim(), "".trim(),"Child",varStatus)
              }
              else{
                this.
                createFolders(varCompanyFolder.trim(), "".trim(),"",varStatus)
              }
            }

            if (varProjectFolder != "" && varCompanyFolder == "") {
              if (this.state.RadioOption == "Child Document") {
                this.
                createFolders("".trim(), varProjectFolder.trim(),"Child",varStatus)
              }
              else{
                this.
                createFolders("".trim(), varProjectFolder.trim(),"",varStatus)
              }
            }

            if (varCompanyFolder == "" && varProjectFolder == "") {
              
                this.uploadFileFromControl("".trim(), "".trim(),"child",varStatus)
            }          
          }

          );

      }
    }
  }


  

  /**
  * Create object for pass bulk data at one time
  */
  public DraftFunction = (SubmissionType: any) => {
    
    this.setState({ SubmissionType: SubmissionType,VarDisabledBtnOnCreate:true })
    let isConfirm = confirm("Are you sure want to draft item")
    if (isConfirm) {
      let DraftData: any = {};
      this.setState({VarDisabledBtnOnCreate:true});
      DraftData = {
        BesaEntity: this.selectedBesaEntity == undefined ? "" : this.selectedBesaEntity,
          Title: this.state.AddContractingParty === 'Other' ? this.state.SelectedContractingParty : this.state.AddContractingParty,
          ProjectName: this.state.AddProjectName === 'Other' ? this.state.SelectedCompanyProject : this.state.AddProjectName,
          ContractType: this.state.AddContractType === 'Other' ? this.state.SelectedContractType : this.state.AddContractType,
          DescriptionOfProduct: this.SelectContractDescription == undefined ? " " : this.SelectContractDescription,
          //BesaOfficersId: this.state.user,
          VndorDetails:this.state.BesaOfficerText,
          VendorName: this.SelectVendorContact == undefined ? "" : this.SelectVendorContact,
          TotalContractPayment: this.SelectConractValue == undefined ? "" : this.SelectConractValue,
          BudgetID: this.SelectBudgetID == undefined ? "" : this.SelectBudgetID,
          VendorAddress: this.SelectAddress == undefined ? "" : this.SelectAddress,
          Comments: this.SelectComments == undefined ? " " : this.SelectComments,
          TerminationType: this.state.FixedValue + "" + this.state.AutoRenewalValue + "" + this.state.RenewalByNoticeValue+ "" +this.state.PerpetualValue,
          NoticeOfTermination: this.state.DiscretionaryValue + "" + this.state.TerminationBreachValue + "" + this.state.TerminationStoppingValue,
          FixedDate: this.state.TerminationDate == undefined ? null : this.state.TerminationDate,
          RenewalDate:this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
          TerminationPeriod: this.SelectedRenewalPeriod == undefined ? "" : this.SelectedRenewalPeriod,
          DateToExtend: this.SelectedDaysBeforeRenewalDate == undefined ? null : this.SelectedDaysBeforeRenewalDate,
          ConvinienceDate: this.SelectedgetDaysForNotice == undefined ? "" : this.SelectedgetDaysForNotice,
          RecoveryPeriod: this.SelectedRecoveryPeriod == undefined ? "" : this.SelectedRecoveryPeriod,
          AutoRenualDate: this.SelectedNoOfDays == undefined ? "" : this.SelectedNoOfDays,
          PaymentType: this.state.SelectedPaymentType,
          AmmountUSD: this.SelectedAmountUSD == undefined ? "" : this.SelectedAmountUSD,
          HowMuch: this.state.PaymentDate == undefined ? null : this.state.PaymentDate,
          ContractDate: this.state.ContractDate == undefined ? null : this.state.ContractDate,
          CompanyID: this.state.AddContractingPartyID == "" ? null : this.state.AddContractingPartyID,
          ProjectID: this.state.AddProjectNameID == "" ? null : this.state.AddProjectNameID,
          TransactionType:this.selectTransactionType,
          RiskFactor:this.selectedRiskFactor,
          ReminderComment:this.selectedReminderComment,
          ReminderDate:this.state.ReminderDate,
          Status: "Draft"
      }

      this._SPOps
        .CreateListItem(this.props.Context,
          DraftData
        ).

        then((result: string) => {
          this.setState({ status: result });

          let requestorUniqueID = this._getUniqueRequestorID(this.state.status);
          this._SPOps.UpdateUiniqueID(this.props.Context,this.state.status,requestorUniqueID,"Contract Management");

            this._SPOps
            .CreateMilestone(this.state.IProcurementModel, this.state.status);

            this._SPOps
            .CreateObligation(this.state.IObligation, this.state.status);

            this._SPOps
            .CreateInsurance(this.state.IInsurance, this.state.status);

            this._SPOps
            .CreatePeriodically(this.state.IPeriodicallyModel, this.state.status);

            this._SPOps
            .CreateVariablePeriodically(this.state.IVariablePeriodicallyModel, this.state.status);


          if (this.state.AddProjectName == "Other") {
            this._SPOps
              .CreateProjectMaster(this.props.Context, this.state.SelectedCompanyProject);
          }

          if (this.state.AddContractingParty == "Other") {
            this._SPOps
              .CreateContractingParty(this.props.Context, this.state.SelectedContractingParty);
          }

          if (this.state.AddContractType == "Other") {
            this._SPOps
              .CreateContractType(this.props.Context, this.state.SelectedContractType);
          }
          var files = this._input.files;
          if (files.length != 0) {
            
          var varCompanyFolder = this.state.AddContractingParty === 'Other' ? this.state.SelectedContractingParty : this.state.AddContractingParty;
          var varProjectFolder = this.state.AddProjectName === 'Other' ? this.state.SelectedCompanyProject : this.state.AddProjectName;
          var varStatus=this.state.status;
          if (varCompanyFolder != "" && varProjectFolder != "") {
            this.
            createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"",varStatus)
           
            
          };

          if (varCompanyFolder != "" && varProjectFolder == "") {
            this.
            createFolders(varCompanyFolder.trim(), "".trim(),"",varStatus);
           
          };

          if (varProjectFolder != "" && varCompanyFolder == "") {
            this.
            createFolders("".trim(), varProjectFolder.trim(),"",varStatus)
    
            
          };

          if (varCompanyFolder == "" && varProjectFolder == "") {
            this.uploadFileFromControl("".trim(), "".trim(),"",varStatus)

          }
          
         
        }
        else{
          setTimeout(
            function () {
              window.location.reload();
              this.setState({VarDisabledBtnOnCreate:false});
            }
              .bind(this),
            200
                
          );
        }
       

        }

        );
    
  }
  }
  /**
   * Create object for pass bulk data at one time
   */
  public Update = (SubmissionType: any) => {
    this.setState({VarDisabledBtnOnCreate:true});
    this.setState({ SubmissionType: SubmissionType })
    let isConfirmUpdate = confirm("Are you sure want to update item")
    var files = this._input.files;
    if (isConfirmUpdate) {

      let UpdateData: any = {};
      UpdateData = {
        BesaEntity: this.state.Bind_BesaEntity == null ? null : this.state.Bind_BesaEntity,
        Title: this.state.Bind_ContractingParty == null ? null : this.state.Bind_ContractingParty,
        ProjectName: this.state.Bind_ProjectName == null ? null : this.state.Bind_ProjectName,
        DescriptionOfProduct: this.state.DescriptionOfProduct == null ? "" : this.state.DescriptionOfProduct,
        VndorDetails:this.state.BindBesaOfficerText,
        VendorName: this.state.VendorPointOfContact == null ? "" : this.state.VendorPointOfContact,
        TotalContractPayment: this.state.TotalContractValue == null ? " " : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == null ? "" : this.state.BudgetId,
        VendorAddress: this.state.VendorAddress == null ? "" : this.state.VendorAddress,
        Comments: this.state.Comments == null ? "" : this.state.Comments,
        TerminationType: this.state.FixedValue + " " + this.state.AutoRenewalValue + " " + this.state.RenewalByNoticeValue+ " " +this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + " " + this.state.TerminationBreachValue + " " + this.state.TerminationStoppingValue,
        FixedDate: this.state.TerminationDate == null ? null : this.state.TerminationDate,
        RenewalDate:this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.state.TerminationPeriod == null ? "" : this.state.TerminationPeriod,
        DateToExtend: this.state.DateToExtend == null ? null : this.state.DateToExtend,
        ConvinienceDate: this.state.DaysForNotice == null ? "" : this.state.DaysForNotice,
        RecoveryPeriod: this.state.RecoveryPeriod == null ? "" : this.state.RecoveryPeriod,
        AutoRenualDate: this.state.NoOfDays == null ? "" : this.state.NoOfDays,
        PaymentType: this.state.Bind_PaymentType == null ? null : this.state.Bind_PaymentType,
        AmmountUSD: this.state.AmountUSD == null ? "" : this.state.AmountUSD,
        HowMuch: this.state.PaymentDate == null ? null : this.state.PaymentDate,
        ContractDate: this.state.ContractDate == null ? null : this.state.ContractDate,
        CompanyID: this.state.AddContractingPartyID == null ? null : this.state.AddContractingPartyID,
        ProjectID: this.state.AddProjectNameID == null ? null : this.state.AddProjectNameID,
        ContractType: this.state.Bind_ContractType == null ? "" : this.state.Bind_ContractType,
        TransactionType:this.state.BindTransactionType,
        RiskFactor:this.state.BindRiskFactor,
        ReminderComment:this.state.BindReminderComment,
        ReminderDate:this.state.ReminderDate,
        Status:this.state.ExpiredValue === "" && this.state.BindStatus === "Submitted" ? "Submitted" :"Expired"
      }

      this._SPOps
        .UpdateItem(this.state.selectedContractSubmission.ID, this.props.Context, UpdateData)
        .then((result: string) => {
          this.setState({ status:this.state.selectedContractSubmission.ID });
          //alert("succesfully updated");

          if (this.state.AddProjectName == "Other") {
            this._SPOps
              .CreateProjectMaster(this.props.Context, this.state.SelectedCompanyProject);
          }

          if (this.state.AddContractingParty == "Other") {
            this._SPOps
              .CreateContractingParty(this.props.Context, this.state.SelectedContractingParty);
          }

          if (this.state.AddContractType == "Other") {
            this._SPOps
              .CreateContractType(this.props.Context, this.state.SelectedContractType);
          }

          // Milestone Details Update here----
          if (this.state.IProcurementModel.length > 0) {
            let ProcurementModelCreate:any = [];
            let ProcurementModelUpdate:any = [];

            this.state.IProcurementModel.map((Procurement:any) => {

              if (Procurement.Id == undefined) {
                ProcurementModelCreate.push(Procurement);
              } 
              else {
                ProcurementModelUpdate.push(Procurement);
                
              }
            })
              if 
              (ProcurementModelCreate.length > 0 && ProcurementModelUpdate.length > 0) {
              this._SPOps.
              _addMilestoneDetails(ProcurementModelCreate, this.state.selectedItemID,"MilestoneBased")
              .then(() => {
                this._SPOps.
                UpdateMilestoneDetails(ProcurementModelUpdate,this.state.selectedItemID,"MilestoneBased")
                .then(() => {
                     
                })
      
              });
            }
            if (ProcurementModelCreate.length > 0 && ProcurementModelUpdate.length == 0) {
              this._SPOps.
              _addMilestoneDetails(ProcurementModelCreate, this.state.selectedItemID,"MilestoneBased").then(() => {
              
              })
            }
            if (ProcurementModelUpdate.length > 0 && ProcurementModelCreate.length == 0) {
              this._SPOps.
              UpdateMilestoneDetails(ProcurementModelUpdate,this.state.selectedItemID,"MilestoneBased").then(() => {
                //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
              })
            }
          }
          // Milestone Details Update here----

          // Periodically Details Update here----
          if (this.state.IPeriodicallyModel.length > 0) {
            let PeriodicallyModelCreate:any = [];
            let PeriodicallyModelUpdate:any = [];

            this.state.IPeriodicallyModel.map((Periodically:any) => {

              if (Periodically.Id == undefined) {
                PeriodicallyModelCreate.push(Periodically);
              } 
              else {
                PeriodicallyModelUpdate.push(Periodically);
                
              }
            })

              if 
              (PeriodicallyModelCreate.length > 0 && PeriodicallyModelUpdate.length > 0) {
              this._SPOps.
              _addPeriodicallyDetails(PeriodicallyModelCreate, this.state.selectedItemID,"Periodically")
              .then(() => {
                this._SPOps.
                UpdatePeriodicallyDetails(PeriodicallyModelUpdate,this.state.selectedItemID,"Periodically")
                .then(() => {
                     
                })
      
              });
            }
            if (PeriodicallyModelCreate.length > 0 && PeriodicallyModelUpdate.length == 0) {
              this._SPOps.
              _addPeriodicallyDetails(PeriodicallyModelCreate, this.state.selectedItemID,"Periodically").then(() => {
              
              })
            }
            if (PeriodicallyModelUpdate.length > 0 && PeriodicallyModelCreate.length == 0) {
              this._SPOps.
              UpdatePeriodicallyDetails(PeriodicallyModelUpdate,this.state.selectedItemID,"Periodically").then(() => {
                //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
              })
            }
          }

          // Periodically Details Update here----
          if (this.state.IVariablePeriodicallyModel.length > 0) {
            let VariablePeriodicallyModelCreate:any = [];
            let VariablePeriodicallyModelUpdate:any = [];

            this.state.IVariablePeriodicallyModel.map((VariablePeriodically:any) => {

              if (VariablePeriodically.Id == undefined) {
                VariablePeriodicallyModelCreate.push(VariablePeriodically);
              } 
              else {
                VariablePeriodicallyModelUpdate.push(VariablePeriodically);
                
              }
            })

              if 
              (VariablePeriodicallyModelCreate.length > 0 && VariablePeriodicallyModelUpdate.length > 0) {
              this._SPOps.
              _addVariablePeriodicallyDetails(VariablePeriodicallyModelCreate, this.state.selectedItemID,"VariablePeriodically")
              .then(() => {
                this._SPOps.
                UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.state.selectedItemID,"VariablePeriodically")
                .then(() => {
                     
                })
      
              });
            }
            if (VariablePeriodicallyModelCreate.length > 0 && VariablePeriodicallyModelUpdate.length == 0) {
              this._SPOps.
              _addVariablePeriodicallyDetails(VariablePeriodicallyModelCreate, this.state.selectedItemID,"VariablePeriodically").then(() => {
              
              })
            }
            if (VariablePeriodicallyModelUpdate.length > 0 && VariablePeriodicallyModelCreate.length == 0) {
              this._SPOps.
              UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.state.selectedItemID,"VariablePeriodically").then(() => {
                //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
              })
            }
          }
         // Periodically Details Update here----End---


        // Obligation Details Update here----
          if (this.state.IObligation.length > 0) {
            let ObligationModelCreate:any = [];
            let ObligationModelUpdate:any = [];

            this.state.IObligation.map((Obligation:any) => {

              if (Obligation.Id == undefined) {
                ObligationModelCreate.push(Obligation);
                
              } 
              else {
                ObligationModelUpdate.push(Obligation);
              }
            })

              if (ObligationModelCreate.length > 0 && ObligationModelUpdate.length > 0) {
              this._SPOps.
              _addObligationDetails(ObligationModelCreate, this.state.selectedItemID,"Obligation").
              then(() => 
              {
                this._SPOps.
                UpdateObligationDetails(ObligationModelUpdate,this.state.selectedItemID,"Obligation")
                .then(() => {
                     
                })
      
              });
            }
            if (ObligationModelCreate.length > 0 && ObligationModelUpdate.length == 0) {
              this._SPOps.
              _addObligationDetails(ObligationModelCreate, this.state.selectedItemID,"Obligation").then(() => {
              
              })
            }
            if (ObligationModelUpdate.length > 0 && ObligationModelCreate.length == 0) {
              this._SPOps.
              UpdateObligationDetails(ObligationModelUpdate,this.state.selectedItemID,"Obligation").then(() => {
              })
            }
          }
          // Obligation Details Update here----End 


         // Insurance Details Update here----
          if (this.state.IInsurance.length > 0) {
            let InsuranceModelCreate:any = [];
            let InsuranceModelUpdate:any = [];

            this.state.IInsurance.map((Insurance:any) => {

              if (Insurance.Id == undefined) {
                InsuranceModelCreate.push(Insurance);
              } 
              else {
                InsuranceModelUpdate.push(Insurance);
                
              }
            })

              if 
              (InsuranceModelCreate.length > 0 && InsuranceModelUpdate.length > 0) {
              this._SPOps.
              _addInsuranceDetails(InsuranceModelCreate,this.state.selectedItemID,"Insurance")
              .then(() => {
                this._SPOps.
                UpdateInsuranceDetails(InsuranceModelUpdate,this.state.selectedItemID,"Insurance")
                .then(() => {
                     
                })
      
              });
            }
            if (InsuranceModelCreate.length > 0 && InsuranceModelUpdate.length == 0) {
              this._SPOps.
              _addInsuranceDetails(InsuranceModelCreate,this.state.selectedItemID,"Insurance").then(() => {
              
              })
            }
            if (InsuranceModelUpdate.length > 0 && InsuranceModelCreate.length == 0) {
              this._SPOps.
              UpdateInsuranceDetails(InsuranceModelUpdate,this.state.selectedItemID,"Insurance").then(() => {
                //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
              })
            }
          }
          // Insurance Details Update here----End
          var varCompanyFolder = this.state.Bind_ContractingParty;
          var varProjectFolder = this.state.Bind_ProjectName;
          var varStatus=this.state.status;
          if (files.length == 0) {
            if (this.state.SubmissionType == 'Update') {
              alert("Request Sucessfully Updated")
              setTimeout(
                function () {
                  window.location.reload();
                }
                  .bind(this),
                600
                    
              );
             // window.location.reload();
            }
          }
          else {
            if (varCompanyFolder != "" && varProjectFolder != "") {
              if (this.state.RadioOption == "Child Document") {
                this.
                createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"Child",varStatus)
              }
              else{
                this.
                createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"",varStatus)
              }
              
            }
  
            if (varCompanyFolder != "" && varProjectFolder == "") {
              if (this.state.RadioOption == "Child Document") {
                this.
                createFolders(varCompanyFolder.trim(), "".trim(),"Child",varStatus)
              }
              else{
                this.
                createFolders(varCompanyFolder.trim(), "".trim(),"",varStatus)
              }
            }
  
            if (varProjectFolder != "" && varCompanyFolder == "") {
              if (this.state.RadioOption == "Child Document") {
                this.
                createFolders("".trim(), varProjectFolder.trim(),"Child",varStatus)
              }
              else{
                this.
                createFolders("".trim(), varProjectFolder.trim(),"",varStatus)
              }
            }
  
            if (varCompanyFolder == "" && varProjectFolder == "") {
              
                this.uploadFileFromControl("".trim(), "".trim(),"child",varStatus)
            }
          }
         
        }

        );
    }
  }
  /**
   * Update Child -----
   */
  public ChildUpdate = (SubmissionType: any) => {
    this.setState({VarDisabledBtnOnCreate:true});
    this.setState({ SubmissionType: SubmissionType })
    let isConfirmUpdate = confirm("Are you sure want to update item")
    var files = this._input.files;
    if (isConfirmUpdate) {
      let ChildUpdateData: any = {};
      ChildUpdateData = {
        BesaEntity: this.state.Bind_BesaEntity == null ? null : this.state.Bind_BesaEntity,
        Title: this.state.Bind_ContractingParty == null ? null : this.state.Bind_ContractingParty,
        ProjectName: this.state.Bind_ProjectName == null ? null : this.state.Bind_ProjectName,
        DescriptionOfProduct: this.state.DescriptionOfProduct == null ? "" : this.state.DescriptionOfProduct,
        //BesaOfficersId: this.state.user,
        VndorDetails:this.state.BindBesaOfficerText,
        VendorName: this.state.VendorPointOfContact == null ? "" : this.state.VendorPointOfContact,
        TotalContractPayment: this.state.TotalContractValue == null ? " " : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == null ? "" : this.state.BudgetId,
        VendorAddress: this.state.VendorAddress == null ? "" : this.state.VendorAddress,
        Comments: this.state.Comments == null ? "" : this.state.Comments,
        TerminationType: this.state.FixedValue + " " + this.state.AutoRenewalValue + " " + this.state.RenewalByNoticeValue+ " " +this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + " " + this.state.TerminationBreachValue + " " + this.state.TerminationStoppingValue,
        FixedDate: this.state.TerminationDate == null ? null : this.state.TerminationDate,
        RenewalDate:this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.state.TerminationPeriod == null ? "" : this.state.TerminationPeriod,
        DateToExtend: this.state.DateToExtend == null ? null : this.state.DateToExtend,
        ConvinienceDate: this.state.DaysForNotice == null ? "" : this.state.DaysForNotice,
        RecoveryPeriod: this.state.RecoveryPeriod == null ? "" : this.state.RecoveryPeriod,
        AutoRenualDate: this.state.NoOfDays == null ? "" : this.state.NoOfDays,
        PaymentType: this.state.Bind_PaymentType == null ? null : this.state.Bind_PaymentType,
        AmmountUSD: this.state.AmountUSD == null ? "" : this.state.AmountUSD,
        HowMuch: this.state.PaymentDate == null ? null : this.state.PaymentDate,
        ContractDate: this.state.ContractDate == null ? null : this.state.ContractDate,
        CompanyID: this.state.AddContractingPartyID == null ? null : this.state.AddContractingPartyID,
        ProjectID: this.state.AddProjectNameID == null ? null : this.state.AddProjectNameID,
        ContractType: this.state.Bind_ContractType == null ? "" : this.state.Bind_ContractType,
        TransactionType:this.state.BindTransactionType,
        RiskFactor:this.state.BindRiskFactor,
        ReminderComment:this.state.BindReminderComment,
        ReminderDate:this.state.ReminderDate,
        Status: this.state.ExpiredValue == "Expired" ? "Expired" : "Submitted"
      }

      this._SPOps
        .ChildUpdateItem(this.state.selectedContractSubmission.ID, this.props.Context, ChildUpdateData)
        .then((result: string) => {
          this.setState({ status:this.state.selectedContractSubmission.ID });
          //alert("succesfully updated");

          if (this.state.AddProjectName == "Other") {
            this._SPOps
              .CreateProjectMaster(this.props.Context, this.state.SelectedCompanyProject);
          }

          if (this.state.AddContractingParty == "Other") {
            this._SPOps
              .CreateContractingParty(this.props.Context, this.state.SelectedContractingParty);
          }

          if (this.state.AddContractType == "Other") {
            this._SPOps
              .CreateContractType(this.props.Context, this.state.SelectedContractType);
          }

            // Milestone Details Update here----
            if (this.state.IProcurementModel.length > 0) {
              let ProcurementModelCreate:any = [];
              let ProcurementModelUpdate:any = [];
  
              this.state.IProcurementModel.map((Procurement:any) => {
  
                if (Procurement.Id == undefined) {
                  ProcurementModelCreate.push(Procurement);
                } 
                else {
                  
                  ProcurementModelUpdate.push(Procurement);
              
                  
                }
              })
                if 
                (ProcurementModelCreate.length > 0 && ProcurementModelUpdate.length > 0) {
                this._SPOps.
                _addMilestoneDetails(ProcurementModelCreate, this.state.selectedItemID,"MilestoneBasedChild")
                .then(() => {
                  this._SPOps.
                  UpdateMilestoneDetails(ProcurementModelUpdate,this.state.selectedItemID,"MilestoneBasedChild")
                  .then(() => {
                       
                  })
        
                });
              }
              if (ProcurementModelCreate.length > 0 && ProcurementModelUpdate.length == 0) {
                this._SPOps.
                _addMilestoneDetails(ProcurementModelCreate, this.state.selectedItemID,"MilestoneBasedChild").then(() => {
                
                })
              }
              if (ProcurementModelUpdate.length > 0 && ProcurementModelCreate.length == 0) {
                this._SPOps.
                UpdateMilestoneDetails(ProcurementModelUpdate,this.state.selectedItemID,"MilestoneBasedChild").then(() => {
                  //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
                })
              }
            }
            // Milestone Details Update here----
  
            // Periodically Details Update here----
            if (this.state.IPeriodicallyModel.length > 0) {
              let PeriodicallyModelCreate:any = [];
              let PeriodicallyModelUpdate:any = [];
  
              this.state.IPeriodicallyModel.map((Periodically:any) => {
  
                if (Periodically.Id == undefined) {
                  PeriodicallyModelCreate.push(Periodically);
                } 
                else {
                  PeriodicallyModelUpdate.push(Periodically);
                  
                }
              })
  
                if 
                (PeriodicallyModelCreate.length > 0 && PeriodicallyModelUpdate.length > 0) {
                this._SPOps.
                _addPeriodicallyDetails(PeriodicallyModelCreate, this.state.selectedItemID,"PeriodicallyChild")
                .then(() => {
                  this._SPOps.
                  UpdatePeriodicallyDetails(PeriodicallyModelUpdate,this.state.selectedItemID,"PeriodicallyChild")
                  .then(() => {
                       
                  })
        
                });
              }
              if (PeriodicallyModelCreate.length > 0 && PeriodicallyModelUpdate.length == 0) {
                this._SPOps.
                _addPeriodicallyDetails(PeriodicallyModelCreate, this.state.selectedItemID,"PeriodicallyChild").then(() => {
                
                })
              }
              if (PeriodicallyModelUpdate.length > 0 && PeriodicallyModelCreate.length == 0) {
                this._SPOps.
                UpdatePeriodicallyDetails(PeriodicallyModelUpdate,this.state.selectedItemID,"PeriodicallyChild").then(() => {
                  //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
                })
              }
            }


            // Variable Periodically Details Update here----
          if (this.state.IVariablePeriodicallyModel.length > 0) {
            let VariablePeriodicallyModelCreate:any = [];
            let VariablePeriodicallyModelUpdate:any = [];

            this.state.IVariablePeriodicallyModel.map((VariablePeriodically:any) => {

              if (VariablePeriodically.Id == undefined) {
                VariablePeriodicallyModelCreate.push(VariablePeriodically);
              } 
              else {
                VariablePeriodicallyModelUpdate.push(VariablePeriodically);
                
              }
            })

              if 
              (VariablePeriodicallyModelCreate.length > 0 && VariablePeriodicallyModelUpdate.length > 0) {
              this._SPOps.
              _addVariablePeriodicallyDetails(VariablePeriodicallyModelCreate, this.state.selectedItemID,"VariablePeriodically")
              .then(() => {
                this._SPOps.
                UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.state.selectedItemID,"VariablePeriodically")
                .then(() => {
                     
                })
      
              });
            }
            if (VariablePeriodicallyModelCreate.length > 0 && VariablePeriodicallyModelUpdate.length == 0) {
              this._SPOps.
              _addVariablePeriodicallyDetails(VariablePeriodicallyModelCreate, this.state.selectedItemID,"VariablePeriodically").then(() => {
              
              })
            }
            if (VariablePeriodicallyModelUpdate.length > 0 && VariablePeriodicallyModelCreate.length == 0) {
              this._SPOps.
              UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.state.selectedItemID,"VariablePeriodically").then(() => {
                //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
              })
            }
          }
           // ---Periodically Details Update here----End----
  
          // ---Obligation Details Update here----
            if (this.state.IObligation.length > 0) {
              let ObligationModelCreate:any = [];
              let ObligationModelUpdate:any = [];
  
              this.state.IObligation.map((Obligation:any) => {
  
                if (Obligation.Id == undefined) {
                  ObligationModelCreate.push(Obligation);
                  
                } 
                else {
                  ObligationModelUpdate.push(Obligation);
                }
              })
  
                if 
                (ObligationModelCreate.length > 0 && ObligationModelUpdate.length > 0) {
                this._SPOps.
                _addObligationDetails(ObligationModelCreate, this.state.selectedItemID,"ObligationChild")
                .then(() => {
                  this._SPOps.
                  UpdateObligationDetails(ObligationModelUpdate,this.state.selectedItemID,"ObligationChild")
                  .then(() => {
                       
                  })
        
                });
              }
              if (ObligationModelCreate.length > 0 && ObligationModelUpdate.length == 0) {
                this._SPOps.
                _addObligationDetails(ObligationModelCreate, this.state.selectedItemID,"ObligationChild").then(() => {
                
                })
              }
              if (ObligationModelUpdate.length > 0 && ObligationModelCreate.length == 0) {
                this._SPOps.
                UpdateObligationDetails(ObligationModelUpdate,this.state.selectedItemID,"ObligationChild").then(() => {
                })
              }
            }
            // Obligation Details Update here----End 
  

  
           // Insurance Details Update here----
            if (this.state.IInsurance.length > 0) {
              let InsuranceModelCreate:any = [];
              let InsuranceModelUpdate:any = [];
  
              this.state.IInsurance.map((Insurance:any) => {
  
                if (Insurance.Id == undefined) {
                  InsuranceModelCreate.push(Insurance);
                } 
                else {
                  InsuranceModelUpdate.push(Insurance);
                  
                }
              })
  
                if 
                (InsuranceModelCreate.length > 0 && InsuranceModelUpdate.length > 0) {
                this._SPOps.
                _addInsuranceDetails(InsuranceModelCreate,this.state.selectedItemID,"InsuranceChild")
                .then(() => {
                  this._SPOps.
                  UpdateInsuranceDetails(InsuranceModelUpdate,this.state.selectedItemID,"InsuranceChild")
                  .then(() => {
                       
                  })
        
                });
              }
              if (InsuranceModelCreate.length > 0 && InsuranceModelUpdate.length == 0) {
                this._SPOps.
                _addInsuranceDetails(InsuranceModelCreate,this.state.selectedItemID,"InsuranceChild").then(() => {
                
                })
              }
              if (InsuranceModelUpdate.length > 0 && InsuranceModelCreate.length == 0) {
                this._SPOps.
                UpdateInsuranceDetails(InsuranceModelUpdate,this.state.selectedItemID,"InsuranceChild").then(() => {
                  //alert(submissionType=="Submited"?"Request submitted sucessfully":"Request drafted sucessfully");
                })
              }
            }
            // Insurance Details Update here----End
  
            var varCompanyFolder = this.state.Bind_ContractingParty;
            var varProjectFolder = this.state.Bind_ProjectName;
            var varStatus=this.state.status;
            if (files.length == 0) {
              if (this.state.SubmissionType == 'Update') {
                alert("Request Sucessfully Updated")
                setTimeout(
                  function () {
                    window.location.reload();
                  }
                    .bind(this),
                  400
                      
                );
               // window.location.reload();
              }
            }
            else {
              if (varCompanyFolder != "" && varProjectFolder != "") {
                if (this.state.RadioOption == "Child Document") {
                  this.
                  createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"Child",varStatus)
                }
                else{
                  this.
                  createFolders(varCompanyFolder.trim(), varProjectFolder.trim(),"",varStatus)
                }
                
              }
    
              if (varCompanyFolder != "" && varProjectFolder == "") {
                if (this.state.RadioOption == "Child Document") {
                  this.
                  createFolders(varCompanyFolder.trim(), "".trim(),"Child",varStatus)
                }
                else{
                  this.
                  createFolders(varCompanyFolder.trim(), "".trim(),"",varStatus)
                }
              }
    
              if (varProjectFolder != "" && varCompanyFolder == "") {
                if (this.state.RadioOption == "Child Document") {
                  this.
                  createFolders("".trim(), varProjectFolder.trim(),"Child",varStatus)
                }
                else{
                  this.
                  createFolders("".trim(), varProjectFolder.trim(),"",varStatus)
                }
              }
    
              if (varCompanyFolder == "" && varProjectFolder == "") {
                
                  this.uploadFileFromControl("".trim(), "".trim(),"child",varStatus)
              }
            }
        }

        );


    }
  }


  public ResetVarFields() {
    this.setState({
      Bind_BesaEntity: '',
      Bind_PaymentType: '',
      Bind_ContractingParty: '',
      Bind_ProjectName: '',
      Bind_Period: '',
    })
  }

  AddMoreInfo() {

    this.setState({ AddMore: true })
  }
  HideMoreInfo() {

    this.setState({ HideMore: false })
  }


  /**
   * Click for view and edit form 
   */
  public OpenEditForm(formType: string, selectedItem: any) {
    this.setState({VarDropdownHide:true})
    this.getSelectedContractSubmissionDetail(selectedItem,formType);
    this.setState({selectedItemID:selectedItem.ID,RequestID:selectedItem.RequestID})
    if (formType == "EditMySubmission") {
      selectedItem.formType = "Edit";
      this.setState({ DisabledValue: false })
    }
    if (formType == "ChildEdit") {
      selectedItem.formType = "Child";
      this.setState({ DisabledValue: false,PopupType:'ChildEdit'})
    }
    if (formType == "ParentEdit") {
      selectedItem.formType = "Parent";
      this.setState({ DisabledValue: false ,PopupType:'ParentEdit'})
    }
    if (formType == "ViewChildSubmission") {
      selectedItem.formType = "View";
      this.setState({ DisabledValue: true})
    }
    if (formType == "ViewMySubmission") {
      selectedItem.formType = "View";
      this.setState({ DisabledValue: true })
    }
    

  };


  public renderDocuments() {
    return this.state.Documents.map((item: any, idx: any) => {

      return (<div key={idx}>
        <a href={item.EncodedAbsUrl} target="_blank" data-interception="off" >{item.FileLeafRef}</a>
      </div>

      )
    }
    )
  }

  /**
   * get selectedConract Submission form Item ---
   */
  getSelectedContractSubmissionDetail = (selectedItem: any,formType:any) => {
    let PeriodicallyListName="";
    let MilestonebasedListName="";
    let InsuranceListName="";
    let ObligationListName="";
    let VariablePeriodicallyListName="";
    let listName="";
    if (formType =="EditMySubmission") {
      listName="Contract Management"
      PeriodicallyListName="Periodically"
      MilestonebasedListName="MilestoneBased"
      InsuranceListName="Insurance"
      ObligationListName="Obligation"
      VariablePeriodicallyListName="VariablePeriodically"
    }
    if (formType =="ViewMySubmission") {
      listName="Contract Management"
      PeriodicallyListName="Periodically"
      MilestonebasedListName="MilestoneBased"
      InsuranceListName="Insurance"
      ObligationListName="Obligation"
      VariablePeriodicallyListName="VariablePeriodically"
    }
    if (formType =="ChildEdit") {
      listName="ContractManagementChilds"
      PeriodicallyListName="PeriodicallyChild"
      MilestonebasedListName="MilestoneBasedChild"
      InsuranceListName="InsuranceChild"
      ObligationListName="ObligationChild"
      VariablePeriodicallyListName="VariablePeriodicallyChild"
    }
    if (formType =="ViewChildSubmission") {
      listName="ContractManagementChilds"
      PeriodicallyListName="PeriodicallyChild"
      MilestonebasedListName="MilestoneBasedChild"
      InsuranceListName="InsuranceChild"
      ObligationListName="ObligationChild"
      VariablePeriodicallyListName="VariablePeriodicallyChild"
    }
    if (formType =="ParentEdit") {
      listName="Contract Management"
      PeriodicallyListName="Periodically"
      MilestonebasedListName="MilestoneBased"
      InsuranceListName="Insurance"
      ObligationListName="Obligation"
      VariablePeriodicallyListName="VariablePeriodically"
    }
    
    this._SPOps.GetListItemByID(selectedItem.ID, listName).then((result) => {
      this.setState({
        Bind_ContractingParty: result.Title,
        Bind_BesaEntity: result.BesaEntity,
        Bind_ProjectName: trimStart(result.ProjectName),
        DescriptionOfProduct: result.DescriptionOfProduct,
        BindBesaOfficerText:result.VndorDetails,
        VendorPointOfContact: result.VendorName,
        TotalContractValue: result.TotalContractPayment,
        BudgetId: result.BudgetID,
        Bind_ContractType: result.ContractType,
        VendorAddress: result.VendorAddress,
        Comments: result.Comments,    
        VarFixedValue: result.TerminationType,
        FixedValue: result.TerminationType != null && result.TerminationType.indexOf("Fixed") > -1 ==true?"Fixed": null,
        VarAutoRnewal: result.TerminationType,
        AutoRenewalValue: result.TerminationType != null && result.TerminationType.indexOf("Auto Renewal") > -1 ==true?"Auto Renewal":null, 
        VarRenewalNotice: result.TerminationType,
        VarPerpetual: result.TerminationType,
        RenewalByNoticeValue:result.TerminationType != null && result.TerminationType.indexOf("Renewal by Notice") > -1 ==true?"Renewal by Notice":null,
        PerpetualValue:result.TerminationType != null && result.TerminationType.indexOf("Perpetual") > -1 ==true?"Perpetual":null,
        VarDiscretionary:result.NoticeOfTermination,
        DiscretionaryValue: result.NoticeOfTermination != null && result.NoticeOfTermination.indexOf("Discretionary Termination") > -1 ==true?"Discretionary Termination":null, 
        VarTerminationBreach:result.NoticeOfTermination,
        TerminationBreachValue:result.NoticeOfTermination != null && result.NoticeOfTermination.indexOf("Termination by breach") > -1 ==true?"Termination by breach":null, 
        VarTerminationStopping:result.NoticeOfTermination,
        TerminationStoppingValue:result.NoticeOfTermination && result.NoticeOfTermination.indexOf("Termination by non-renewal") > -1 ==true?"Termination by non-renewal":null,
        TerminationDate: result.FixedDate !=null?new Date(result.FixedDate):null,
        RenewalNoticeDate:result.RenewalDate !=null?new Date(result.RenewalDate):null, 
        TerminationPeriod: result.TerminationPeriod,  
        DateToExtend: result.DateToExtend,
        DaysForNotice: result.ConvinienceDate,
        RecoveryPeriod: result.RecoveryPeriod,
        NoOfDays: result.AutoRenualDate,
        Bind_PaymentType: result.PaymentType,
        AmountUSD: result.AmmountUSD,
        BindRiskFactor:result.RiskFactor,         
        ReminderDate:result.ReminderDate !=null?new Date(result.ReminderDate):null,
        BindReminderComment:result.ReminderComment, 
        PaymentDate: result.HowMuch !=null?new Date(result.HowMuch):null,
        ContractDate: result.ContractDate !=null?new Date(result.ContractDate):null,
        AddContractingPartyID: result.CompanyID,
        AddProjectNameID: result.ProjectID,  
        BindTransactionType:result.TransactionType,
        BindStatus:result.Status
      })
      
      setTimeout(
        function () {
          this.setState({ openEditDialog: true, selectedContractSubmission: selectedItem })
        }.bind(this), 500);
      this._SPOps.GetPeriodicallyDetails(selectedItem.ID,PeriodicallyListName).then((PeriodicallyDetails)=>{
        this._SPOps.GetVariablePeriodicallyDetails(selectedItem.ID,VariablePeriodicallyListName).then((VariablePeriodicallyDetails)=>{
        this._SPOps.GetMilestoneDetails(selectedItem.ID,MilestonebasedListName).then((MilestineBasedDetails)=>{
          this._SPOps.GetInsuranceDetails(selectedItem.ID,InsuranceListName).then((InsuranceDetails)=>{
            this._SPOps.GetObligationDetails(selectedItem.ID,ObligationListName).then((ObligationDetails)=>{
          this.setState({
          IPeriodicallyModel:PeriodicallyDetails,
          IVariablePeriodicallyModel:VariablePeriodicallyDetails,
          IProcurementModel:MilestineBasedDetails,
          IInsurance:InsuranceDetails,
          IObligation:ObligationDetails
        })
      })
     }) 
    }) 
  }) 
}) 
    })
    
    if (formType =="ChildEdit" || formType =="ViewChildSubmission") {
      this._SPOps.GetLibraryDocument(selectedItem.ParentIDId, "ContractManagementLibrary")
      .then((result) => {
        this.setState({ Documents: result })
      })
    } 

    else
    {
      this._SPOps.GetLibraryDocument(selectedItem.ID, "ContractManagementLibrary")
      .then((result) => {
        this.setState({ Documents: result })
      })
    }
    
    // setTimeout(
    //   function () {
    //     this.setState({ openEditDialog: true, selectedContractSubmission: selectedItem })
    //   }.bind(this), 600);
  }
  // Define View Fields and show data in this view fields
  public viewFields() {
    const viewFields: IViewField[] = [
      {
        name: "",
        displayName: "",
        minWidth: 60,
        maxWidth: 60,
        render: (item: any) => {
        return <button type="button"  className={styles.EditBtn}id="add-row" onClick={() => this.OpenEditForm("EditMySubmission", item)}><i className="fa fa-pencil-square-o" title="Show Progress"></i></button>;
        }
  
      },
      {
        name: "",
        displayName: "",
        minWidth: 60,
        maxWidth: 60,
        render: (item: any) => {
          return <button type="button"  className={styles.EditBtn} id="add-row" onClick={() => this.OpenEditForm("ViewMySubmission", item)}><i className="fa fa-eye" title="Show Progress"></i></button>;
        }
  
      },
      {
      name: "Title",
      displayName: "Vendor Name",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 180,
    },
    {
      name: "ProjectName",
      displayName: "Project Name",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 180
    },
    {
      name: "BesaEntity",
      displayName: "Besa Entity",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 180
    },
    {
      name: "RequestID",
      displayName: "Request ID",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 180
    },
    // {
    //   name: "TransactionType",
    //   displayName: "Transaction Type",
    //   isResizable: false,
    //   sorting: true,
    //   minWidth: 0,
    //   maxWidth: 180
    // }
    // ,
        {
            name: "AuthorTitle",
            displayName: "Submitted By",
            isResizable: false,
            sorting: true,
            minWidth: 0,
            maxWidth: 180,
            //render: (item: any) => item.Author ? item.Author.Title : ""
        }
    ];
    return viewFields;
  };
  public groupByFields() {
    const groupByFields: IGrouping[] = [
      {
        name: "Status",
        order: GroupOrder.ascending
      },];
    return groupByFields
  };

  //  Child Document View Fields---
  // Define View Fields and show data in this view fields----
  public ViewChildFields() {
    const ViewChildFields: IViewField[] = [{
      name: "Title",
      displayName: "Company Name",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 100
    },
    {
      name: "ProjectName",
      displayName: "Project Name",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 100
    },
    {
      name: "BesaEntity",
      displayName: "Besa Entity",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 100
    },
    {
      name: "ID",
      displayName: "Contract ID",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 100
    },

    {
      name: "TransactionType",
      displayName: "Transaction Type",
      isResizable: false,
      sorting: true,
      minWidth: 0,
      maxWidth: 100
    },
    {
      name: "",
      displayName: "",
      minWidth: 60,
      maxWidth: 60,
      render: (item: any) => {
        return <button type="button"  className={styles.EditBtn} id="add-row" onClick={() => this.OpenEditForm("EditMySubmission", item)}><i className="fa fa-pencil-square-o" title="Show Progress"></i></button>;
      }

    },
    
    {
      name: "",
      displayName: "",
      minWidth: 60,
      maxWidth: 60,
      render: (item: any) => {
        return <button type="button"  className={styles.EditBtn} id="add-row" onClick={() => this.OpenEditForm("ViewMySubmission", item)}><i className="fa fa-eye" title="Show Progress"></i></button>;
      }

    },

    ];


    return ViewChildFields;
  };
  public groupByChildFields() {

    
    const groupByFields: any[] = [
      {
        name:"ParentsItemsDetails",
        order: GroupOrder.ascending,
      },
    ];
    return groupByFields
  };

  // Define View Fields and show data in this view fields---End-----

  /**
   * for Close Model function 
   */
  public ExitHandler() {
    this.setState({ openEditDialog: false,
      VarFixedValue:false,
      VarAutoRnewal:false,
      VarRenewalNotice:false,
      VarPerpetual:false,
      VarDiscretionary:false,
      VarTerminationBreach:false,
      VarTerminationStopping:false,
      ContractDate:null,
      ReminderDate:null,
      IPeriodicallyModel:[],
      IVariablePeriodicallyModel:[],
      IProcurementModel:[],
      IInsurance:[],
      IObligation:[],
      DisabledValue:false
    })
  }
  public OpenInvoiceDialog(){
    this.setState({ 
      openInvoicePDF:true
    })
  };
  public ExitInvoicePDF() {
    this.setState({ 
      openInvoicePDF:false
    })
  }

  AttachmentErr(){
    this.setState({ isDocAttached: false})
  }
  // Download PDF of the screen
public printDocument=() => {
  const input = document.getElementById("generatePdfForm");
  var doc = new jsPDF('landscape', 'px', 'a4');
  doc.html(input, {
    callback: function (doc) {
      doc.save(); 
    },
    html2canvas: { scale: 0.4,width:4000 },
    x: 5,
    y: 0
  });
  
};  


// Close Obligation Popup
  public ObligationExitHandler(idx:any){
    this.setState({ openObligationPopup: false})
  }
  // Open Obligation Popup
  public ObligationOpenPopup(){
    this.setState({ openObligationPopup: true })
  }
  // Close Insurance Popup
  public InsuranceExitHandler(idx:any){
    this.setState({ openInsurancePopup: false})
  }
  // Open Insurance Popup
  public InsuranceOpenPopup(){
    this.setState({ openInsurancePopup: true })
  }

  
// Close Add More Info Popup
  public ExitAddMore() {
    this.setState({
      AddMore: false
    })


  }

  /**
 * for Close Model function 
 */
  public MilestoneExitHandler() {
    this.setState({ openMilestonePopup: false });
  }

  //Create a Folder And SubFolder when i submit data --------
  public createFolders(CompanyName: any, Project: any,child:any,ContractID:any) {
    let web = Web(this.props.siteURL);

    try {
      const libraryUrl: string = "ContractManagementLibrary";
      var webUrl = this.props.siteURL;
      const folderName = CompanyName;
      const subfolderName = Project;
      const ContractId=ContractID;
      //const CompanyFolder="00"+CompanyID;
      // const ProjectFolder="00"+ProjectID;
      //const idFolder=CompanyFolder+ProjectFolder;
      if (CompanyName != null && Project != null) {
        webUrl + web.getFolderByServerRelativeUrl(libraryUrl).folders.add(folderName).then(()=>{
          webUrl + web.getFolderByServerRelativeUrl(libraryUrl + "/" + folderName).folders.add(subfolderName).then(()=>{

            if (CompanyName != null && Project != null && child =="") {
              this.uploadFileFromControl(folderName, subfolderName,child,ContractId)
            }

            if (child !="") {
              webUrl + web.getFolderByServerRelativeUrl(libraryUrl + "/" + folderName+"/"+subfolderName).folders.add(child).then(()=>{
                if (CompanyName != null && Project != null && child !="") {
                  this.uploadFileFromControl(folderName, subfolderName,child,ContractId)
                }

              });
            }
          });
        });
        // webUrl+ web.getFolderByServerRelativeUrl(libraryUrl+"/"+folderName+"/"+subfolderName).folders.add( idFolder);
        console.log("Folder and subfolder created successfully!");
      }

      if (CompanyName != null && Project == null ) {

        webUrl + web.getFolderByServerRelativeUrl(libraryUrl).folders.add(folderName).then(()=>{
          if (CompanyName != null && Project == null) {
            this.uploadFileFromControl(folderName, "",child,ContractId)
          }

          if (child !="") {
            webUrl + web.getFolderByServerRelativeUrl(libraryUrl + "/" + folderName).folders.add(child).then(()=>{
              if (CompanyName != null && Project == null) {
                this.uploadFileFromControl(folderName, "",child,ContractId)
              }
            });
          }
          console.log("Folder and subfolder created successfully!");
        });
        
      }

      if (CompanyName == null && Project != null) {

        webUrl + web.getFolderByServerRelativeUrl(libraryUrl).folders.add(subfolderName).then(()=>{
          if (CompanyName == null && Project != null) {
            this.uploadFileFromControl("", subfolderName,child,ContractId)
          }
          if (child !="") {
            webUrl + web.getFolderByServerRelativeUrl(libraryUrl + "/" + subfolderName).folders.add(child).then(()=>{
              if (CompanyName == null && Project != null) {
                this.uploadFileFromControl("", subfolderName,child,ContractId)
              }
            });
          }
          console.log("Folder and subfolder created successfully!");
        });
      }
      if (CompanyName == null && Project == null) {
        this.uploadFileFromControl("", "",child,ContractId)
      }
      // if (CompanyName != null && Project != null) {

      //   this.uploadFileFromControl(folderName, subfolderName,child,ContractId)
      // }
      // if (CompanyName != null && Project == null) {
      //   this.uploadFileFromControl(folderName, "",child,ContractId)
      // }
      // if (CompanyName == null && Project != null) {
      //   this.uploadFileFromControl("", subfolderName,child,ContractId)
      // }
     

    } catch (error) {
      console.log("Error creating folder and subfolder:", error);

    }
  };



  //Export to excel of list data -----
  public exportToExcel = async () => {
    let web = Web(this.props.siteURL);
    let count: any = 0;
    try {
      const list = web.lists.getByTitle("Contract Management");
      const items = await list.items.get();


      //let TemID: any[] = [];
      items.map((item) => {

        //TemID.push(item.ID);
        this._SPOps
          .GetLibraryDocumentForExcel(item)
          .
          then((results) => {
            count++
            results.map((Doc: any) => {
              if (item.ID == Doc.Contract.ID) {
                item.DocumentLink = Doc.EncodedAbsUrl
              }
            })

            if (items.length == count) {
              this.ExportExcelFormat(items)
            }
          });


      });


    } catch (error) {
      console.error(error);
    }
  };
  
  private openNewTab(url: string): void {
    window.open(url, '_blank');
  }

  public ExportExcelFormat(items: any) {
    try {
      const formattedData = items.map((excelItem: any) => ({
        Title: excelItem.Title,
        BesaEntity: excelItem.BesaEntity,
        ProjectName: excelItem.ProjectName,
        DescriptionOfProduct: excelItem.DescriptionOfProduct,
        VendorName: excelItem.VendorName,
        DocumentLink: excelItem.DocumentLink,
        Comments: excelItem.Comments,
        TerminationType: excelItem.TerminationType,
        NoticeOfTermination: excelItem.NoticeOfTermination,
        FixedDate: excelItem.FixedDate,
        TerminationPeriod: excelItem.TerminationPeriod,
        DateToExtend: excelItem.DateToExtend,
        ConvinienceDate: excelItem.ConvinienceDate,
        RecoveryPeriod: excelItem.RecoveryPeriod,
        AutoRenualDate: excelItem.AutoRenualDate,
        PaymentType: excelItem.PaymentType,
        AmmountUSD: excelItem.AmmountUSD,
        HowMuch: excelItem.HowMuch,
        FirstPaymentDate: excelItem.FirstPaymentDate,
        Amount_x0028_USD_x0029_: excelItem.Amount_x0028_USD_x0029_,
        Period: excelItem.Period,
        ContractDate: excelItem.ContractDate,
        CompanyID: excelItem.CompanyID,
        ProjectID: excelItem.ProjectID,
        ContractType: excelItem.ContractType,
        TransactionType:excelItem.TransactionType,
      })
      );

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ListData.xlsx";
      link.click();
    } catch (error) {
      console.error(error);
    }

  }

  // This event will we Attachment File function call----
  public uploadFileFromControl(Folder: any, SubFolder: any,child:any,ContractId:any) {
    //Get the file from File DOM
    let web = Web(this.props.Context.pageContext.web.absoluteUrl)
    var files = this._input.files;
    var file = files[0];
    let url: any = "";

    if (Folder != "" && SubFolder != "") {
      url = "/" + Folder + "/" + SubFolder
      if (child !="") {
        url = "/" + Folder + "/" + SubFolder+"/"+child
      }
    }
    if (Folder != "" && SubFolder == "") {
      url = "/" + Folder
      if (child !="") {
        url = "/" + Folder +"/"+child
      }
    }
    if (Folder == "" && SubFolder != "") {
      url = "/" + SubFolder
      if (child !="") {
        url = "/"+ SubFolder+"/"+child
      }
    }
    if (Folder == "" && SubFolder == "") {
      url = ""
      if (child !="") {
        url = "/"+child
      }
    }
    web.getFolderByServerRelativeUrl(this.props.Context.pageContext.web.serverRelativeUrl + "/ContractManagementLibrary" + url).files.add(file.name, file,true).then((data) => {
        console.log("File Uploaded");
      setTimeout(
          function () {
            data.file.getItem().then(item => {
              item.update({
                ContractId: this.state.status
              }).then((myupdate) => {
                console.log(myupdate);
                console.log("Metadata Updated");
              });
              this.setState({VarDisabledBtnOnCreate:false});
              if (this.state.SubmissionType == 'Draft') {
                //alert("Request Drafted Succesfully ");
                setTimeout(
                  function () {
                    window.location.reload();
                    
                  }
                    .bind(this),
                  150
                      
                );
               
              }
              if (this.state.SubmissionType == 'Submitted') {
               setTimeout(
                function () {
                  window.location.reload();
                  this.setState({VarDisabledBtnOnCreate:false});
                }
                  .bind(this),
                200
                    
              );
              }
              if (this.state.SubmissionType == 'Update') {
               // alert("Request Updated Succesfully ");
               setTimeout(
                function () {
                  window.location.reload();
                  this.setState({VarDisabledBtnOnCreate:false});
                }
                  .bind(this),
                200
                    
              );
              }
            })
            .catch((error) => {
              alert("Error is uploading");
            });
         
          }.bind(this), 80);
        
         
      })

    //window.location.reload();

  }

  renderVariablePeriodicallyTableDataEdit() {
    var selectHeight = {
      color: 'black',
      'margin-top': '6px',
    };
    return this.state.IVariablePeriodicallyModel.map((item: any, idx: any) => {
      return (<div key={idx}>
        <div className={styles.renderVariablePeriodicallyTbl}>
          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>From Date</label></span>}
            <input
              placeholder='Select From Date..'
              className='form-control '
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IVariablePeriodicallyModel[idx].id}
              value={this.state.IVariablePeriodicallyModel[idx].FromDate}
              name="FromDate"
              onChange={this._handleChangeVariablePeriodically(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />
            
  
          </div>

          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>To Date</label></span>}
            <input
              placeholder='Select To Date..'
              className='form-control '
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IVariablePeriodicallyModel[idx].id}
              value={this.state.IVariablePeriodicallyModel[idx].ToDate}
              name="ToDate"
              onChange={this._handleChangeVariablePeriodically(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />
            
  
          </div>

          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Amount (USD) </label></span>}
  
            <input
              placeholder='AmountUSD'
              type="text"
              className='form-control'
              name="VariableAmountUSD"
              disabled={this.state.DisabledValue}
              value={this.state.IVariablePeriodicallyModel[idx].VariableAmountUSD}
              onChange={this._handleChangeVariablePeriodically(idx)}
              id={this.state.IVariablePeriodicallyModel[idx].id}
            />
  
  
          </div>
          <div className="form-group col-md-5">
  
            {idx == 0 && <span> <label className="control-label">Period</label></span>}
  
            <select className='form-control ' 
                style={selectHeight} 
                name="VariablePeriod" 
                disabled={this.state.DisabledValue}
                value={this.state.IVariablePeriodicallyModel[idx].VariablePeriod} 
                id={this.state.IVariablePeriodicallyModel[idx].id} 
                onChange={this._handleChangeVariablePeriodically(idx)}
                >
                <option value="">Select</option>
                  {this._renderDropdown(this.state.Period)}
                </select>
  
          </div>
          {this.state.IVariablePeriodicallyModel.length > 1 &&
            <div className="form-group col-md-1">
              {idx == 0 && <label className="control-label"></label>}
              <div onClick={this._handleRemoveSpecificRowIVariablePeriodicallyModel(idx)} className={styles.deleteIcon}>

              {this.state.DisabledValue ==false&& 
                <Icon iconName="delete" className="ms-IconExample" />
              }

              </div>
            </div>
          }
  
        </div>
  
      </div>
      )
    })
  
    
  }

  renderVariablePeriodicallyTableData() {
    var selectHeight = {
      color: 'black',
      'margin-top': '6px',
    };
    return this.state.IVariablePeriodicallyModel.map((item: any, idx: any) => {
      return (<div key={idx}>
        <div className={styles.renderVariablePeriodicallyTbl}>
          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>From Date</label></span>}
            <input
              placeholder='Select From Date..'
              className='form-control '
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IVariablePeriodicallyModel[idx].id}
              value={this.state.IVariablePeriodicallyModel[idx].FromDate}
              name="FromDate"
              onChange={this._handleChangeVariablePeriodically(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />
            
  
          </div>

          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>To Date</label></span>}
            <input
              placeholder='Select To Date..'
              className='form-control '
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IVariablePeriodicallyModel[idx].id}
              value={this.state.IVariablePeriodicallyModel[idx].ToDate}
              name="ToDate"
              onChange={this._handleChangeVariablePeriodically(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />
            
  
          </div>

          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Amount (USD) </label></span>}
  
            <input
              placeholder='AmountUSD'
              type="text"
              className='form-control '
              name="VariableAmountUSD"
              disabled={this.state.DisabledValue}
              value={this.state.IVariablePeriodicallyModel[idx].VariableAmountUSD}
              onChange={this._handleChangeVariablePeriodically(idx)}
              id={this.state.IVariablePeriodicallyModel[idx].id}
            />
  
  
          </div>
          <div className="form-group col-md-5">
  
            {idx == 0 && <span> <label className="control-label">Period</label></span>}
  
            <select className='form-control ' 
                style={selectHeight} 
                name="VariablePeriod" 
                disabled={this.state.DisabledValue}
                value={this.state.IVariablePeriodicallyModel[idx].VariablePeriod} 
                id={this.state.IVariablePeriodicallyModel[idx].id} 
                onChange={this._handleChangeVariablePeriodically(idx)}
                >
                <option value="">Select</option>
                  {this._renderDropdown(this.state.VariablePeriod)}
                </select>
  
          </div>
          {this.state.IVariablePeriodicallyModel.length > 1 &&
            <div className="form-group col-md-1">
              {idx == 0 && <label className="control-label"></label>}
              <div onClick={this._handleRemoveSpecificRowIVariablePeriodicallyModel(idx)} className={styles.deleteIcon}>

               
                <Icon iconName="delete" className="ms-IconExample" />
              

              </div>
            </div>
          }
  
        </div>
  
      </div>
      )
    })
  
    
  }



  _handleAddRowIVariablePeriodicallyModel = () => {
    try {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      const tableColProps = {
        id: id,
        FromDate:Date,
        ToDate:Date,
        VariableAmountUSD: '',
        VariablePeriod:''
      }
      this.state.IVariablePeriodicallyModel.push(tableColProps);
      this.setState(this.state.IVariablePeriodicallyModel);
    } catch (error) {
      console.log("Error in React Table handle Add Row : " + error)
    }
  };
  /* This event will fire on remove specific row */
  _handleRemoveSpecificRowIVariablePeriodicallyModel = (idx: any) => () => {
    try {
      const rows = this.state.IVariablePeriodicallyModel
      if (rows.length > 1) {
        rows.splice(idx, 1);
      }

      this.setState({ IVariablePeriodicallyModel: rows });
    } catch (error) {
      console.log("Error in React Table handle Remove Specific Row : " + error);
    }
  }



  /* This event will fire on change of every fields on form */
  _handleChangeVariablePeriodically = (index: any) => (evt: { target: { id: any; name: any; value: any; }; }) => {
    try {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
      var rowsArray = this.state.IVariablePeriodicallyModel;

      var newRow = rowsArray.map((row: any, i: any) => {
        for (var key in row) {
          if (key == item.name && row.id == item.id) {
            row[key] = item.value;

          }
        }
        return row;
      }
      );
      this.setState({ IVariablePeriodicallyModel: newRow });

    } catch (error) {
      console.log("Error in React Table handle change : " + error);
    }
  };



  renderPeriodicallyTableDataEdit() {
    var selectHeight = {
      color: 'black',
      'margin-top': '6px',
    };
    return this.state.IPeriodicallyModel.map((item: any, idx: any) => {
      return (<div key={idx}>
        <div className={styles.renderPeriodicallyTbl}>
          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>First Payment Date</label></span>}
                         {/* <DatePicker
                           placeholder='Select First Payment Date..'
                           className='form-control '
                           disabled={this.state.DisabledValue}
                           id={this.state.IPeriodicallyModel[idx].id}
                           value={this.state.IPeriodicallyModel[idx].FirstPaymentDate}
                           onSelectDate={() =>this._handleChangePeriodically(idx)}
                           onKeyDown={(e) => e.preventDefault()}
                        /> */}
            <input
              placeholder='Select First Payment Date..'
              className='form-control '
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IPeriodicallyModel[idx].id}
              value={this.state.IPeriodicallyModel[idx].FirstPaymentDate}
              name="FirstPaymentDate"
              onChange={this._handleChangePeriodically(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />
            
  
          </div>
          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Amount (USD) </label></span>}
  
            <input
              placeholder='Type Description'
              type="text"
              className='form-control '
              name="AmountUSD"
              disabled={this.state.DisabledValue}
              value={this.state.IPeriodicallyModel[idx].AmountUSD}
              onChange={this._handleChangePeriodically(idx)}
              id={this.state.IPeriodicallyModel[idx].id}
            />
  
  
          </div>
          <div className="form-group col-md-5">
  
            {idx == 0 && <span> <label className="control-label">Period</label></span>}
  
            <select className='form-control ' 
                style={selectHeight} 
                name="Period" 
                disabled={this.state.DisabledValue}
                value={this.state.IPeriodicallyModel[idx].Period} 
                id={this.state.IPeriodicallyModel[idx].id} 
                onChange={this._handleChangePeriodically(idx)}
                >
                <option value="">Select</option>
                  {this._renderDropdown(this.state.Period)}
                </select>
  
          </div>
          {this.state.IPeriodicallyModel.length > 1 &&
            <div className="form-group col-md-1">
              {idx == 0 && <label className="control-label"></label>}
              <div onClick={this._handleRemoveSpecificRowIPeriodicallyModel(idx)} className={styles.deleteIcon}>

                {this.state.DisabledValue ==false&& 
                <Icon iconName="delete" className="ms-IconExample" />
                }

              </div>
            </div>
          }
  
        </div>
  
      </div>
      )
    })
  
    
  }

  //**Common function to render DropDowns */
  _renderDropdown = (options:any) => {
    return options.map((item:any, idx:any) => {
      return (<option value={item.key}>{item.text}
      </option>)
    })
  };

  _handleAddRowIPeriodicallyModel = () => {
    try {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      const tableColProps = {
        id: id,
        FirstPaymentDate:Date,
        AmountUSD: '',
        Period:''
      }
      this.state.IPeriodicallyModel.push(tableColProps);
      this.setState(this.state.IPeriodicallyModel);
    } catch (error) {
      console.log("Error in React Table handle Add Row : " + error)
    }
  };
  /* This event will fire on remove specific row */
  _handleRemoveSpecificRowIPeriodicallyModel = (idx: any) => () => {
    try {
      const rows = this.state.IPeriodicallyModel
      if (rows.length > 1) {
        rows.splice(idx, 1);
      }

      this.setState({ IPeriodicallyModel: rows });
    } catch (error) {
      console.log("Error in React Table handle Remove Specific Row : " + error);
    }
  }

  /* This event will fire on change of every fields on form */
  _handleChangePeriodically = (index: any) => (evt: { target: { id: any; name: any; value: any; }; }) => {
    try {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
      var rowsArray = this.state.IPeriodicallyModel;

      var newRow = rowsArray.map((row: any, i: any) => {
        for (var key in row) {
          if (key == item.name && row.id == item.id) {
            row[key] = item.value;

          }
        }
        return row;
      }
      );
      this.setState({ IPeriodicallyModel: newRow });

    } catch (error) {
      console.log("Error in React Table handle change : " + error);
    }
  };
 
// Render Add More function when i click on AddMore Button 
renderPeriodicallyTableData() {
  var selectHeight = {
    color: 'black',
    'margin-top': '6px',
  };
  return this.state.IPeriodicallyModel.map((item: any, idx: any) => {
    return (<div key={idx}>
      <div className={styles.renderPeriodicallyTbl}>
        <div className="form-group col-md-5">
          {idx == 0 && <span>  <label className={styles.lblCtrl}>First Payment Date</label></span>}

                         {/* <DatePicker
                           placeholder='Select First Payment Date..'
                           className='form-control '
                           disabled={this.state.DisabledValue}
                           id={this.state.IPeriodicallyModel[idx].id}
                          //  Name="FirstPaymentDate"
                           //value={this.state.IPeriodicallyModel[idx].Date}
                           onSelectDate={()=>this._handleChangePeriodically(idx)}
                           onKeyDown={(e) => e.preventDefault()}
                        /> */}
          <input
            placeholder='Select First Payment Date..'
            className='form-control '
            type="date"
            disabled={this.state.DisabledValue}
            id={this.state.IPeriodicallyModel[idx].id}
            name="FirstPaymentDate"
            //value={this.state.IPeriodicallyModel[idx].Date}
            onChange={this._handleChangePeriodically(idx)}
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>

        <div className="form-group col-md-5">
          {idx == 0 && <span>  <label className={styles.lblCtrl}>Amount (USD) </label></span>}

          <input
            placeholder='Type Description'
            type="text"
            className='form-control '
            disabled={this.state.DisabledValue}
            name="AmountUSD"
            value={this.state.IPeriodicallyModel[idx].AmountUSD}
            onChange={this._handleChangePeriodically(idx)}
            id={this.state.IPeriodicallyModel[idx].id}
          />


        </div>
        <div className="form-group col-md-5">

          {idx == 0 && <span> <label className="control-label">Period</label></span>}

          <select className='form-control ' 
              style={selectHeight} 
              name="Period" 
              disabled={this.state.DisabledValue}
              value={this.state.IPeriodicallyModel[idx].Period} 
              id={this.state.IPeriodicallyModel[idx].id} 
              onChange={this._handleChangePeriodically(idx)}
              >
              <option value="">Select</option>
                {this._renderDropdown(this.state.Period)}
              </select>

        </div>
        {this.state.IPeriodicallyModel.length > 1 &&
          <div className="form-group col-md-1">
            {idx == 0 && <label className="control-label"></label>}
            <div onClick={this._handleRemoveSpecificRowIPeriodicallyModel(idx)} className={styles.deleteIcon}>
               {/* {this.state.DisabledValue ==false&&  */}
              <Icon iconName="delete" className="ms-IconExample" />
               {/* } */}
            </div>
          </div>
        }

      </div>

    </div>
    )
  })

  
}

  //Add New Row And Submit function------
  /* This event will fire on adding new row in AddMore Form */
  _handleAddRow = () => {
    try {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      const tableColProps = {
        id: id,
        Description: '',
        ExpectedDate:Date,
        AmountUSD:''
      }
      this.state.IProcurementModel.push(tableColProps);
      this.setState(this.state.IProcurementModel);
    } catch (error) {
      console.log("Error in React Table handle Add Row : " + error)
    }
  };
  /* This event will fire on adding new row in AddMore Form----End---- */


  /* This event will fire on remove specific row */
  _handleRemoveSpecificRow = (idx: any) => () => {
    try {
      const rows = this.state.IProcurementModel
      if (rows.length > 1) {
        rows.splice(idx, 1);
      }

      this.setState({ IProcurementModel: rows });
    } catch (error) {
      console.log("Error in React Table handle Remove Specific Row : " + error);
    }
  }



  /* This event will fire on change of every fields on form */
  _handleChange = (index: any) => (evt: { target: { id: any; name: any; value: any; }; }) => {
    try {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
      var rowsArray = this.state.IProcurementModel;

      var newRow = rowsArray.map((row: any, i: any) => {
        for (var key in row) {
          if (key == item.name && row.id == item.id) {
            row[key] = item.value;

          }
        }
        return row;
      }
      );
      this.setState({ IProcurementModel: newRow });

    } catch (error) {
      console.log("Error in React Table handle change : " + error);
    }
  };
  //Add New Row And Submit function------


  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {

    this.setState({

      IContractItems: text ? this.state.allContractItems.filter(i => 
        i.Title.toLowerCase().indexOf(text.toLowerCase() )> -1) : this.state.allContractItems,

    });

  };


// Render Add More function when i click on AddMore Button 
renderTableDataEdit() {

  return this.state.IProcurementModel.map((item: any, idx: any) => {
    return (<div key={idx}>
      <div className={styles.renderPeriodicallyTbl}>
        <div className="form-group col-md-5">

      
          {idx == 0 && <span>  <label className={styles.lblCtrl}>Description</label></span>}

          <input
            placeholder='Type Description'
            type="text"
            className='form-control'
            name="Description"
            disabled={this.state.DisabledValue}
            value={this.state.IProcurementModel[idx].Description}
            onChange={this._handleChange(idx)}
            id={this.state.IProcurementModel[idx].id}
          />

        </div>
        <div className="form-group col-md-5">
          {idx == 0 && <span>  <label className={styles.lblCtrl}>Expected Date</label></span>}

        
         {/* this.state.IProcurementModel[idx].ExpectedDate */}
          <input
            className='form-control'
            type="date"
            id={this.state.IProcurementModel[idx].id}
            value={this.state.IProcurementModel[idx].ExpectedDate}
            name="ExpectedDate"
            disabled={this.state.DisabledValue}
            onChange={this._handleChange(idx)}
            onKeyDown={(e) => e.preventDefault()}
          />


        </div>
        <div className="form-group col-md-5">

          {idx == 0 && <span> <label className="control-label">AmountUSD</label></span>}

          <input
            placeholder='Amount(USD)'
            type="text"
            className='form-control'
            name="AmountUSD"
            disabled={this.state.DisabledValue}
            value={this.state.IProcurementModel[idx].AmountUSD}
            onChange={this._handleChange(idx)}
            id={this.state.IProcurementModel[idx].id}
          />

        </div>
        {this.state.IProcurementModel.length > 1 &&
          <div className="form-group col-md-1">
            {idx == 0 && <label className="control-label"></label>}
            <div onClick={this._handleRemoveSpecificRow(idx)} className={styles.deleteIcon}>
               {this.state.DisabledValue == false&& 
              <Icon iconName="delete" className="ms-IconExample" />
               }
            </div>
          </div>
        }

      </div>

    </div>
    )
  })

  
}

renderVariablePeriodicallyTableDataInvoice() {
  var selectHeight = {
    color: 'black',
    'margin-top': '6px',
  };
  return this.state.IVariablePeriodicallyModel.map((item: any, idx: any) => {
    return (<div key={idx}>
     <table>
            <tr>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>From Date</td>
            <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='Select From Date..'
            className='form-control '
            type="date"
            disabled={this.state.DisabledValue}
            id={this.state.IVariablePeriodicallyModel[idx].id}
            value={this.state.IVariablePeriodicallyModel[idx].FromDate}
            name="FromDate"
            onChange={this._handleChangeVariablePeriodically(idx)}
          />
        </td>

       
        <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>To Date</td>
            
              <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='Select To Date..'
            className='form-control '
            type="date"
            disabled={this.state.DisabledValue}
            id={this.state.IVariablePeriodicallyModel[idx].id}
            value={this.state.IVariablePeriodicallyModel[idx].ToDate}
            name="ToDate"
            onChange={this._handleChangeVariablePeriodically(idx)}
          />
          </td>
          <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Amount(USD)</td>
          <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='AmountUSD'
            type="text"
            className='form-control'
            name="VariableAmountUSD"
            disabled={this.state.DisabledValue}
            value={this.state.IVariablePeriodicallyModel[idx].VariableAmountUSD}
            onChange={this._handleChangeVariablePeriodically(idx)}
            id={this.state.IVariablePeriodicallyModel[idx].id}
          />
</td>
          <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Period</td>
           
              <td>
          <select className='form-control ' 
              style={selectHeight}
              name="VariablePeriod" 
              disabled={this.state.DisabledValue}
              value={this.state.IVariablePeriodicallyModel[idx].VariablePeriod} 
              id={this.state.IVariablePeriodicallyModel[idx].id} 
              onChange={this._handleChangeVariablePeriodically(idx)}
              >
              <option value="">Select</option>
                {this._renderDropdown(this.state.Period)}
          </select>
              </td>
              </tr>
              </table>
    </div>
    )
  })

  
}



renderPeriodicallyTableDataInvoice() {
  return this.state.IPeriodicallyModel.map((item: any, idx: any) => {
    return (<div key={idx}>
      <table className={styles.PDFInvoice}>
            <tr>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>First Payment Date</td>
            <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='Select First Payment Date..'
            className='form-control '
            type="date"
            disabled={this.state.DisabledValue}
            id={this.state.IPeriodicallyModel[idx].id}
            value={this.state.IPeriodicallyModel[idx].FirstPaymentDate}
            name="FirstPaymentDate"
            onChange={this._handleChangePeriodically(idx)}
          />
           </td>
          
           <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Amount (USD) </td>
           <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='Type Description'
            type="text"
            className='form-control '
            name="AmountUSD"
            disabled={this.state.DisabledValue}
            value={this.state.IPeriodicallyModel[idx].AmountUSD}
            onChange={this._handleChangePeriodically(idx)}
            id={this.state.IPeriodicallyModel[idx].id}
          />
          </td>

  
       
          
          <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Period</td>
          <td>
          <select className='form-control ' 
          style={{background:"White",color:"black"}}
              // style={selectHeight} 
              name="Period" 
              disabled={this.state.DisabledValue}
              value={this.state.IPeriodicallyModel[idx].Period} 
              id={this.state.IPeriodicallyModel[idx].id} 
              onChange={this._handleChangePeriodically(idx)}
              >
              <option value="">Select</option>
                {this._renderDropdown(this.state.Period)}
              </select>
              </td>
              </tr>
              </table>
    </div>
    )
  })

  
}

// Show Invoice MilestoneData
renderTableDataInvoice() {

  return this.state.IProcurementModel.map((item: any, idx: any) => {
    return (<div key={idx}>
       <table>
            <tr>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Description:</td>
                <td>
                  <input
                  style={{background:"White",color:"black"}}
            placeholder='Type Description'
            type="text"
            className='form-control'
            name="Description"
            disabled={this.state.DisabledValue}
            value={this.state.IProcurementModel[idx].Description}
            onChange={this._handleChange(idx)}
            id={this.state.IProcurementModel[idx].id}
          /></td>

         <td className="stat"style={{background:"#d2d2d2",font:"20px"}}>Expected Date:</td>
                <td>
                  <input
                  style={{background:"White",color:"black"}}
            className='form-control'
            type="date"
            id={this.state.IProcurementModel[idx].id}
            value={this.state.IProcurementModel[idx].ExpectedDate}
            name="ExpectedDate"
            disabled={this.state.DisabledValue}
            onChange={this._handleChange(idx)}
          /></td>

           <td className="stat"style={{background:"#d2d2d2",font:"20px"}}>AmountUSD:</td>
                <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='Amount(USD)'
            type="text"
            className='form-control'
            name="AmountUSD"
            disabled={this.state.DisabledValue}
            value={this.state.IProcurementModel[idx].AmountUSD}
            onChange={this._handleChange(idx)}
            id={this.state.IProcurementModel[idx].id}
          /></td>
               
            </tr>
            
        </table>

</div>
    )
  })

  
}


  // Render Add More function when i click on AddMore Button 
  renderTableData() {
    return this.state.IProcurementModel.map((item: any, idx: any) => {
      return (<div key={idx}>
        <div className={styles.renderPeriodicallyTbl}>
          <div className="form-group col-md-5">

        
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Description</label></span>}

            <input
              placeholder='Type Description'
              type="text"
              className='form-control'
              name="Description"
              value={this.state.IProcurementModel[idx].Description}
              onChange={this._handleChange(idx)}
              id={this.state.IProcurementModel[idx].id}
            />

          </div>
          <div className="form-group col-md-5">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Expected Date</label></span>}

            <input
              placeholder='Select Date'
              className='form-control'
              type="date"
              id={this.state.IProcurementModel[idx].id}
              value={this.state.IProcurementModel[idx].ExpectedDate}
              name="ExpectedDate"
              onChange={this._handleChange(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />


          </div>
          <div className="form-group col-md-5">

            {idx == 0 && <span> <label className="control-label">AmountUSD</label></span>}

            <input
              placeholder='Amount(USD)'
              type="text"
              className='form-control'
              name="AmountUSD"
              value={this.state.IProcurementModel[idx].AmountUSD}
              onChange={this._handleChange(idx)}
              id={this.state.IProcurementModel[idx].id}
            />

          </div>
          {this.state.IProcurementModel.length > 1 &&
            <div className="form-group col-md-1">
              {idx == 0 && <label className="control-label"></label>}
              <div onClick={this._handleRemoveSpecificRow(idx)} className={styles.deleteIcon}>
                 
                <Icon iconName="delete" className="ms-IconExample" />
             
              </div>
            </div>
          }

        </div>

      </div>
      )
    })

    
  }



   //Add New Row And Submit function------
  /* This event will fire on adding new row in AddMore Form */
  _handleInsuranceAddRow = () => {
    try {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      const tableColProps = {
        id: id,
        Insurance: '',
        Amount: '',
        Comment:''
      }
      this.state.IInsurance.push(tableColProps);
      this.setState(this.state.IInsurance);
    } catch (error) {
      console.log("Error in React Table handle Add Row : " + error)
    }
  };

  /* This event will fire on remove specific row */
  _handleRemoveInsuranceSpecificRow = (idx: any) => () => {
    try {
      const rows = this.state.IInsurance
      if (rows.length > 1) {
        rows.splice(idx, 1);
      }

      this.setState({ IInsurance: rows });
    } catch (error) {
      console.log("Error in React Table handle Remove Specific Row : " + error);
    }
  }

  /* This event will fire on change of every fields on form */
  _handleChangeInsurance = (index: any) => (evt: { target: { id: any; name: any; value: any; }; }) => {
    try {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
      var rowsArray = this.state.IInsurance;

      var newRow = rowsArray.map((row: any, i: any) => {
        for (var key in row) {
          if (key == item.name && row.id == item.id) {
            row[key] = item.value;

          }
        }
        return row;
      }
      );
      this.setState({ IInsurance: newRow });

    } catch (error) {
      console.log("Error in React Table handle change : " + error);
    }
  };

  
  /* This event will fire on adding new row in AddMore Form----End---- */
// Insurance Table Render-----
InsurancerenderTableData() {

  return this.state.IInsurance.map((item: any, idx: any) => {
    return (<div key={idx}>
      <div className={styles.renderProcurementTbl}>
        <div className="form-group col-md-2">
          {idx == 0 && <span>  <label className={styles.lblCtrl}>Type of Insurance</label></span>}

          <input
            placeholder='Type of Insurance'
            type="text"
            className='form-control'
            name="Insurance"
            disabled={this.state.DisabledValue}
            value={this.state.IInsurance[idx].Insurance}
            onChange={this._handleChangeInsurance(idx)}
            id={this.state.IInsurance[idx].id}
          />

        </div>
        <div className="form-group col-md-2">
          {idx == 0 && <span>  <label className={styles.lblCtrl}>Amount</label></span>}

          <input
            placeholder='Type Amount'
            type="text"
            className='form-control'
            name="Amount"
            disabled={this.state.DisabledValue}
            value={this.state.IInsurance[idx].Amount}
            onChange={this._handleChangeInsurance(idx)}
            id={this.state.IInsurance[idx].id}
          />


        </div>
        <div className="form-group col-md-2">

          {idx == 0 && <span> <label className="control-label">Comment</label></span>}

          <textarea
            placeholder='Type Comment'
            rows={3}
            cols={50}
            className='form-control'
            disabled={this.state.DisabledValue}
            name="Comment"
            value={this.state.IInsurance[idx].Comment}
            onChange={this._handleChangeInsurance(idx)}
            id={this.state.IInsurance[idx].id}
          />

        </div>
        {this.state.IInsurance.length > 1 &&
          <div className="form-group col-md-1">
            {idx == 0 && <label className="control-label"></label>}
            <div onClick={this._handleRemoveInsuranceSpecificRow(idx)} className={styles.deleteIcon}>
              
              <Icon iconName="delete" className="ms-IconExample" />
              
            </div>
          </div>
        }

      </div>

    </div>
    )
  })

  
}
// Insurance Table Render-----close------
InsurancerenderTableDataInvoice() {

  return this.state.IInsurance.map((item: any, idx: any) => {
    return (<div key={idx}>
      
      <table>
            <tr>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Type Of Insurance :</td>

          <td>
          <input
          style={{background:"White",color:"black"}}
            placeholder='Type of Insurance'
            type="text"
            className='form-control'
            name="Insurance"
            disabled={this.state.DisabledValue}
            value={this.state.IInsurance[idx].Insurance}
            onChange={this._handleChangeInsurance(idx)}
            id={this.state.IInsurance[idx].id}
          />

       </td>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Amount:</td>

                <td>

          <input
          style={{background:"White",color:"black"}}
            placeholder='Type Amount'
            type="text"
            className='form-control'
            name="Amount"
            disabled={this.state.DisabledValue}
            value={this.state.IInsurance[idx].Amount}
            onChange={this._handleChangeInsurance(idx)}
            id={this.state.IInsurance[idx].id}
          />
</td>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Comment:</td>

                <td>

          <textarea
          style={{background:"White",color:"black"}}
            placeholder='Type Comment'
            rows={3}
            cols={50}
            className='form-control'
            disabled={this.state.DisabledValue}
            name="Comment"
            value={this.state.IInsurance[idx].Comment}
            onChange={this._handleChangeInsurance(idx)}
            id={this.state.IInsurance[idx].id}
          />
    </td>
        </tr>
        </table>
    </div>
    )
  })

  
}
  //Add New Row And Submit function------
  /* This event will fire on adding new row in AddMore Form */
  _handleObligationAddRow = () => {
    try {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      const tableColProps = {
        id:id,
        Description: '',
        Date: '',
        Frequency:''
      }
      this.state.IObligation.push(tableColProps);
      this.setState(this.state.IObligation);
    } catch (error) {
      console.log("Error in React Table handle Add Row : " + error)
    }
  };

  /* This event will fire on remove specific row */
  _handleRemoveObligationSpecificRow = (idx: any) => () => {
    try {
      const rows = this.state.IObligation
      if (rows.length > 1) {
        rows.splice(idx, 1);
      }

      this.setState({ IObligation: rows });
    } catch (error) {
      console.log("Error in React Table handle Remove Specific Row : " + error);
    }
  }

  /* This event will fire on change of every fields on form */
  _handleChangeObligation = (index: any) => (evt: { target: { id: any; name: any; value: any; }; }) => {
    try {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
      var rowsArray = this.state.IObligation;

      var newRow = rowsArray.map((row: any, i: any) => {
        for (var key in row) {
          if (key == item.name && row.id == item.id) {
            row[key] = item.value;

          }
        }
        return row;
      }
      );
      this.setState({ IObligation: newRow });

    } catch (error) {
      console.log("Error in React Table handle change : " + error);
    }
  };



  /* This event will fire on adding new row in AddMore Form----End---- */
// Obligation Table Render-----
  ObligationrenderTableData() {

    return this.state.IObligation.map((item: any, idx: any) => {
      return (<div key={idx}>
        <div className={styles.renderProcurementTbl}>
          <div className="form-group col-md-2">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Description</label></span>}

            <input
              placeholder='Type Description'
              type="text"
              className='form-control'
              name="Description"
              disabled={this.state.DisabledValue}
              value={this.state.IObligation[idx].Description}
              onChange={this._handleChangeObligation(idx)}
              id={this.state.IObligation[idx].id}
            />

          </div>
          <div className="form-group col-md-2">
            {idx == 0 && <span>  <label className={styles.lblCtrl}>Date</label></span>}

            <input
              placeholder='Select Date'
              className='form-control'
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IObligation[idx].id}
              value={this.state.IObligation[idx].Date}
              name="Date"
              onChange={this._handleChangeObligation(idx)}
              onKeyDown={(e) => e.preventDefault()}
            />


          </div>
          <div className="form-group col-md-2">

            {idx == 0 && <span> <label className="control-label">Frequency</label></span>}

            <input
              placeholder='Frequency'
              type="text"
              className='form-control'
              name="Frequency"
              disabled={this.state.DisabledValue}
              value={this.state.IObligation[idx].Frequency}
              onChange={this._handleChangeObligation(idx)}
              id={this.state.IObligation[idx].id}
            />

          </div>
          {this.state.IObligation.length > 1 &&
            <div className="form-group col-md-1">
              {idx == 0 && <label className="control-label"></label>}
              <div onClick={this._handleRemoveObligationSpecificRow(idx)} className={styles.deleteIcon}>
                 
                <Icon iconName="delete" className="ms-IconExample" />
               
              </div>
            </div>
          }

        </div>

      </div>
      )
    })

    
  }
  // Obligation Table Render-----close------
  ObligationrenderTableDataInvoice() {

    return this.state.IObligation.map((item: any, idx: any) => {
      return (<div key={idx}>
        <table>
            <tr>
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Description:</td>

                <td>
            <input
            style={{background:"White",color:"black"}}
              placeholder='Type Description'
              type="text"
              className='form-control'
              name="Description"
              disabled={this.state.DisabledValue}
              value={this.state.IObligation[idx].Description}
              onChange={this._handleChangeObligation(idx)}
              id={this.state.IObligation[idx].id}
            />
            </td>
          
          
            <td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Date:</td>

<td>

            <input
            style={{background:"White",color:"black"}}
              placeholder='Select Date'
              className='form-control'
              type="date"
              disabled={this.state.DisabledValue}
              id={this.state.IObligation[idx].id}
              value={this.state.IObligation[idx].Date}
              name="Date"
              onChange={this._handleChangeObligation(idx)}
            />
</td>

          
         

<td className="stat-Invoice"style={{background:"#d2d2d2",font:"20px"}}>Freqency:</td>

<td>

            <input
            style={{background:"White",color:"black"}}
              placeholder='Frequency'
              type="text"
              className='form-control'
              name="Frequency"
              disabled={this.state.DisabledValue}
              value={this.state.IObligation[idx].Frequency}
              onChange={this._handleChangeObligation(idx)}
              id={this.state.IObligation[idx].id}
            />

         </td>
          </tr>
          </table>
      </div>
      )
    })

    
  }
  // Obligation Table Render-----close------


  //render parent & Child list view -----

  renderChildTable(childItems:any,parentID:any){
    return childItems.map((childItem:any, childIdx:any) => {
      return (      
            <tr key={childIdx}>
              
                          <td> </td>
                          <td> {childItems[childIdx].BesaEntity}</td>
                          <td> {childItems[childIdx].ProjectName}</td>
                          <td> {childItems[childIdx].Title}</td>
                          <td> {childItems[childIdx].TransactionType}</td>
                          {/* <td> {childItems[childIdx].BesaOfficer}</td> */}
                          <td> {childItems[childIdx].RequestID}</td>
                        <td>
                        <button type="button"  className={styles.EditBtn} 
                        id="add-row" onClick={() => this.OpenEditForm("ChildEdit", childItem)}><i className="fa fa-pencil-square-o" title="Show Progress"></i></button>
                        </td>
                        <td>
                        <button type="button"  className={styles.EditBtn}
                                id="add-row" onClick={() => this.OpenEditForm("ViewChildSubmission", childItem)}><i className="fa fa-eye" title="Show Progress"></i></button>
                                </td>
                    </tr>            
 );    
         
       }); 
      }

      _renderTable(){
        return this.state.IContractItems.map((item:any, idx:any) => {
     
          return (
                       <>
                          <tr key={idx}  className={"accordion-toggle"}>
                            
                               <td>
                               <button className="btn btn-default btn-xs" data-toggle={"collapse"} data-target={this.renderDynamicId(idx)}>
                               <FontIcon aria-label="Childof" iconName="Childof"/>
                               
                               </button>
                               </td>
                                <td className={styles.Childtable}>{this.state.IContractItems[idx].BesaEntity}</td>
                                <td className={styles.Childtable}>{this.state.IContractItems[idx].ProjectName}</td>
                                <td className={styles.Childtable}> {this.state.IContractItems[idx].Title}</td>
                                <td className={styles.Childtable}>{this.state.IContractItems[idx].TransactionType}</td>
                                <td className={styles.Childtable}>{this.state.IContractItems[idx].BesaOfficer}</td>
                                <td className={styles.Childtable}> {this.state.IContractItems[idx].RequestID}</td>
                                <td className={styles.Childtable}>
                                <button type="button"  className={styles.EditBtn} 
                                id="add-row" onClick={() => this.OpenEditForm("ParentEdit", item)}><i className="fa fa-pencil-square-o" title="Show Progress"></i></button>
                                </td>
                                <td className={styles.Childtable}>
                                <button type="button"  className={styles.EditBtn} 
                                id="add-row" onClick={() => this.OpenEditForm("ViewMySubmission", item)}><i className="fa fa-eye" title="Show Progress"></i></button>
                                </td>
                          </tr>

                          {this.state.IContractItems[idx].childs.length>0 &&
                    <tr>
                         <td colSpan={12} className={styles.hiddenRow}>
                            <div className={"accordian-body collapse"} id={this.renderId(idx)}>

                           
                      <table className={styles.styledtableChild}>
                                 <thead>
                                               <tr>
                                                  <th></th>
                                                  <th>Besa Entity</th>
                                                  <th>Project Name</th>
                                                  <th>Vendor Name</th>
                                                  <th>Transaction Type</th>
                                                  {/* <th>BesaOfficer</th> */}
                                                  <th>RequestID</th>
                                                  <th></th>
                                                  <th></th>

                                               </tr>
                                            </thead>
                                 <tbody>
                                
                                     {this.renderChildTable(this.state.IContractItems[idx].childs,item.Id)}  
                                 </tbody>
                                 </table>
                          
                            </div>
                         </td> 
                    </tr>
                    }
                    </>
               ); 
               
           }); 
          }

  public render(): React.ReactElement<IContractFormSpfxProps> {

    const {

     } = this.props;

    const options: IChoiceGroupOption[] = [
      { key: 'A', text: 'Parent Agreement'},
      { key: 'B', text: 'Child Document' },
    ];
    
    const customStyles: Partial<IChoiceGroupStyles> = {

      flexContainer: {
        flexDirection: 'row', // Change the direction of options to horizontal
        display: "flex",
        marginRight:'50px'
      },
    };
    return (
      <section className={`${styles.contractFormSpfx}`}>
        <div className={styles.ems_body}>
          <div className={styles.row}>

            <div className='styles.col-md-7'>
              {/* <div className={styles.HeaderName}> */}
              <h4>Contract Submission</h4>
              {/* </div> */}
            </div>
            
            <div className='styles.col-md-7'>
            <div className={styles.rowTable}>
                    {/* BesaEntity Dropdown */}
                    <div className={styles.colmd3}>
              <div className={styles.printIcon}>
                <DefaultButton className={styles.Exportbtn} onClick={this.exportToExcel}>Export</DefaultButton>

              </div>
              </div>
              <div className={styles.colmd3}>
              <div className={styles.printIcon}>
                <DefaultButton className={styles.Reportbtn} onClick={() => this.openNewTab('https://app.powerbi.com/reportEmbed?reportId=d0461672-031f-489d-9377-7b6a86c45d0f&autoAuth=true&ctid=8d7a8614-7904-447a-9147-6b74a48adbea')}>Report</DefaultButton>

              </div>
              </div>
              </div>

              {/* </div> */}
            </div>
          </div>
          <br></br>

          <div role='toolbar' aria-label='Onchange Pivot Example'>

            {/* Pivot table use for create top menu bar  */}
            <Pivot aria-label="Basic Pivot Example"onLinkClick={this._onPivotItemClick}>
            
              <PivotItem
                headerText="Submit New Request"
                
                headerButtonProps=
                {{
                  'data-order': 1,
                  'data-title': 'My Files Title',
              }}>
                   '<div className={styles.rowTableRadio}>
                           
                           {/* BesaEntity Dropdown */}
                           <ChoiceGroup 
                           styles={customStyles}
                           defaultSelectedKey="A" 
                           options={options}
                           onChange={this.RadioOnchange}
                           required={true}
                           />
                   </div>

                   {
                  this.state.RadioOption =="Child Document" &&
                
                

                  <div className={'container'}>
                       <div className={"col-md-12"}>
                       <TextField
                       
                        placeholder='Search by Vendor...'
                        onChange={this._onFilter}
                        />
                        <br></br>
                            <div className={"panel panel-default"}>
                                   <div className={"panel-heading"}>
                                  </div>
                                  <div className={"panel-body"}>
                                     <table className={styles.styledtableParent}>
                                            <thead>
                                               <tr>
                                                  <th></th>
                                                  <th>Besa Entity</th>
                                                  <th>Project Name</th>
                                                  <th>Vendor Name</th>
                                                  <th>Transaction Type</th>
                                                  <th>Besa Officer</th>
                                                  <th>Request ID</th>
                                                  <th></th>
                                                  <th></th>
                                               </tr>
                                            </thead>
                                         <tbody>
                                              {this._renderTable()}  
                                        </tbody>
                                     </table>
                                </div>
                            </div>
      
                      </div>
                  </div>
                
  }
  
              {
              this.state.RadioOption =='Parent Agreement' &&

              <div>
              <div className={styles.newRequestForm}>
                 
                '<div className={styles.rowTable}>
                    {/* BesaEntity Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Besa Entity</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.BesaEntity}
                        onChange={this.getBesaEntity}
                        placeholder="Select Besa Entity .."
                      ></Dropdown>
                    </div>


                    {/* ProjectName Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Project Name</label>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.CompanyProject}
                        onChange={this.getProjectName}
                        placeholder="Select Project Name..">
                      </Dropdown>
                    </div>

                    {/* Contracting Party Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contracting Party</label>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.ContractingParty}
                        onChange={this.getContractingParty}
                        placeholder="Select Contracting Party..">
                      </Dropdown>
                    </div>
                  </div>


                  {/* 2st Row of Other Functionality*/}
                  <div className={styles.rowTable}>

                    {/* Contract Description TextField */}
                    {this.state.AddProjectName === 'Other' &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Add Project Name </label>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          value={this.state.SelectedCompanyProject}
                          onChange={this.getAddProjectName}
                          placeholder="Add Project Name .."
                          onKeyDown={this.handleKeyDown}
                        />
                      </div>}

                    {/* Vendor Point of Contract Text Field */}
                    {this.state.AddContractingParty === 'Other'&&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Add Contracting Party</label>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          value={this.state.SelectedContractingParty}
                          onChange={this.getAddContractingParty}
                          placeholder="Type Contracting Party.."
                          onKeyDown={this.handleKeyDown}
                        />

                      </div>}

                  </div>

                  {/* 2st Row of Form */}
                  <div className={styles.rowTable}>

                    {/* BesaOfficer Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Besa Officer</label>
                      <br></br>
                          <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getbesaOfficer}
                          placeholder="Name of the Besa Officer.."
                      />
                    </div>

                    {/* Contracting Party Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contract Type</label>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.ContractType}
                        onChange={this.getContractType}
                        placeholder="Select Contract Type..">
                      </Dropdown>
                    </div>
                    
                     {/* ProjectName Dropdown */}
                     <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Contract Date</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <div className={styles.myDropDown}>
                          <DatePicker
                            placeholder="Select a date..."
                            ariaLabel="Select a date"
                            value={this.state.ContractDate}
                            onSelectDate={this.ContractDateChange}
                          />

                        </div>

                      </div>

                  </div>

                  {/* 2st Row of Other Functionality*/}
                  <div className={styles.rowTable}>

                    {/* Contract Description TextField */}
                    {this.state.AddContractType === 'Other'&&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Add Contract Type</label>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          value={this.state.SelectedContractType}
                          onChange={this.getAddContractType}
                          placeholder="Add Project Name .."
                          onKeyDown={this.handleKeyDown}
                        />
                      </div>}

                  </div>

                  {/* 3st Row of Form */}
                  <div className={styles.rowTable}>

                    {/* Vendor Point of Contract Text Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Vendor Point of Contact</label>

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getVendorContact}
                        placeholder="Type Vendor Contact.."
                      />
                    </div>

                    {/* Total Contrct ValuenText Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Total Contract Value (USD)</label>
                      <br></br>
                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getContractValue}
                        placeholder="Type Total Contract Value (USD).."
                      />
                    </div>

                    {/* Budget ID Tex Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Budget ID</label>
                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getBudgetId}
                        placeholder="Type Budget ID.."
                      />

                    </div>

                    <div className={styles.rowTable}>
                       {/* Comments MultiTextLine Field */}
                     <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Comment</label>
                      <br></br>
                      <TextField className={styles.myDropDown1}
                        type="textarea"
                        multiline rows={1}
                        onChange={this.getComment}
                        placeholder="Type Comment.." />
                    </div>

                      {/* Contract Description TextField */}
                      <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contract Description</label>

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getContractDescription}
                        placeholder="Type Contract Description.."
                      />
                    </div>
                     {/* Budget ID Tex Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Transaction Type</label>
                      <Dropdown 
                      className={styles.myDropDown}
                        options={this.state.TransactionType}
                        onChange={this.getTransactionType}
                        placeholder="Select Transaction Type..">
                      </Dropdown>

                      </div>
                    </div>
                  </div>
                  <br></br>
                  {/* 4th Row */}
                  <div className={styles.rowTable}>
                    {/* Address MultiTextLine Field*/}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Point of Contact Address</label>
                      <TextField className={styles.myDropDown}
                        type="textarea"
                        multiline rows={7}
                        onChange={this.getAddress}
                        placeholder="Type Address.." />
                    </div>

                  </div>
                  <br></br>
                  <div className={styles.rowTable}>

                  <div className={styles.colmd3}></div>

                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Attachment</label>

                      <input className='form-control'
                        type="file" ref={(elm) => { this._input = elm; }}
                        onChange={this.AttachmentErr}
                        >
                        
                        </input>
                      {this.state.isDocAttached && <span className={styles.errorMSG}>
                        {this.state.DocAttachedErrMsg}
                      </span>}

                    </div>
                  </div>
                </div>
                    {/* 1st Form end */}
                <br></br>


                {/* 2nd Form AddMore Form This form show only when i click AddMore button  */}
                {
                  this.state.AddMore &&
                  <div className={styles.newRequestForm}>
                    <IconButton
                      styles={AddMoreIcon}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={this.ExitAddMore.bind(this)}
                    />
                    {/* 1st Row of Form */}
                    <div className={styles.rowTable}>

                      {/* Term Type Check Box */}
                      {this.state.VarAutoRnewal === false &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Term Type</label>
                          <br></br>
                          <div className={styles.myDropDown}>
                            <Checkbox label="Fixed"
                              checked={this.state.VarFixedValue}
                              title="Fixed"
                              onChange={this._getFixedValue} />

                          </div>
                        </div>}

                      {/* Auto Renewal checkBox */}
                      {this.state.VarFixedValue === false &&
                        <div className={styles.colmd3}>
                          <br></br>

                          <div className={styles.myDropDown}>
                            <Checkbox label="Auto Renewal"
                              checked={this.state.VarAutoRnewal}
                              title="Auto Renewal"
                              onChange={this._getAutoRenewal} />
                          </div>
                        </div>}
                       
                      {/* Renewal by Notice check box */}
                      <div className={styles.colmd3}>
                        <br></br>
                        <div className={styles.myDropDown}>
                          <Checkbox label="Renewal by Notice"
                            checked={this.state.VarRenewalNotice}
                            title="Renewal by Notice"
                            onChange={this._getRenewalNotice} />
                        </div>

                      </div>
                    
                    <div className={styles.colmd3}>
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Perpetual"
                          //checked={this.state.VarRenewalNotice} 
                          title="Perpetual"
                          onChange={this._getPerpetual}
                          //defaultChecked={this.state.PerpetualValue != null ? this.state.PerpetualValue.indexOf("Perpetual") > -1 ? true : false : false}
                          //disabled={this.state.DisabledValue}
                        />
                      </div>

                    </div>
                    </div>
                    {/* 2nd Row of Form */}
                    <div className={styles.rowTable}>

                      {/* Termination DatePicker */}
                      {this.state.VarFixedValue &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Termination Date</label>
                          <br></br>
                          <div className={styles.myDropDown}>
                            <DatePicker
                              placeholder="Select Termination Date..."
                              ariaLabel="Select a date"
                              value={this.state.TerminationDate}
                              onSelectDate={this.TerminationDateChange}
                             
                            />
                          </div>
                        </div>
                      }

                      {/* ProjectName Dropdown */}
                      {this.state.VarAutoRnewal &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Renewal Period</label>
                          <br></br>
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getRenewalPeriod}
                            placeholder="Type Renewal Period.."
                          />
                        </div>
                      }

                      {/* Days beore Renewal Date TextField */}
                      {this.state.VarRenewalNotice &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Days before Renewal Date</label>
                          <br></br>
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getDaysBeforeRenewalDate}
                            placeholder="Type Days before Renewal Date.."
                          />
                        </div>
                      }
                      {this.state.VarRenewalNotice &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Renewal Date</label>
                          <br></br>
                          <div className={styles.myDropDown}>
                            <DatePicker
                              placeholder="Select Renewal Date..."
                              ariaLabel="Select a date"
                              value={this.state.RenewalNoticeDate}
                              onSelectDate={this.RenewalNoticeDateChange}
                             
                            />
                          </div>
                        </div>
                      }
                    </div>


                    {/* 1st Row of Form */}
                    <div className={styles.rowTable}>

                      {/* Termination CheckBox */}
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Termination</label>
                        <br></br>
                        <div className={styles.myDropDown}>
                          <Checkbox label="Discretionary Termination"
                            checked={this.state.VarDiscretionary}
                            title="Discretionary Termination"
                            onChange={this._getDiscretionary} />
                        </div>
                      </div>
                     
                      {/* Termination of Breach Check Box */}
                      <div className={styles.colmd3}>
                        <br></br>
                        <div className={styles.myDropDown}>
                          <Checkbox label="Termination of Breach"
                            checked={this.state.VarTerminationBreach}
                            title="Termination of Breach"
                            onChange={this._getTerminationBreach} />
                        </div>
                      </div>

                      {/* Contracting Party Dropdown */}
                      <div className={styles.colmd3}>
                        {/* <label className={styles.labelstyle}>Contracting Party</label>
                                                         <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <div className={styles.myDropDown}>
                          <Checkbox label="Termination by auto-renewal" checked={this.state.VarTerminationStopping} title="Termination by auto-renewal" onChange={this._getTerminationStopping} />
                        </div>
                        <React.Fragment>

                        </React.Fragment>
                      </div>
                    </div>

                    {/* 4th Row of Form */}
                    <div className={styles.rowTable}>

                      {/* BesaEntity Dropdown */}
                      {this.state.VarDiscretionary &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>No. of Days for Notice</label>
                          {/* <span className={styles.RedStar}>*</span> */}
                          <br></br>

                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getDaysForNotice}
                            placeholder="No. of Days for Notice.."

                          />


                        </div>}

                      {/* ProjectName Dropdown */}
                      {this.state.VarTerminationBreach &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Recovery Period</label>
                          {/* <span className={styles.RedStar}>*</span> */}
                          <br></br>
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getRecoveryPeriod}
                            placeholder="Type Recovery Period.."

                          />
                          <React.Fragment>

                          </React.Fragment>
                        </div>}

                      {/* Contracting Party Dropdown */}
                      {this.state.VarTerminationStopping &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>No. of Days</label>
                          {/* <span className={styles.RedStar}>*</span> */}
                          <br></br>
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getNoOfDays}
                            placeholder="Type No. of Days.."

                          />
                          <React.Fragment>

                          </React.Fragment>
                        </div>}
                    </div>


                    {/* 4th Row of Form */}
                    <div className={styles.rowTable}>

                      {/* BesaEntity Dropdown */}

                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Payment Type</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <Dropdown className={styles.myDropDown}
                          options={this.state.PaymentType}
                          onChange={this._getPaymentType}
                          placeholder="Select Payment Type.."
                        ></Dropdown>
                      </div>

                     


                    </div>

                    {/* 4th Row of Form */}
                    {this.state.SelectedPaymentType === 'One Time' &&
                      <div className={styles.rowTable}>

                        {/* BesaEntity Dropdown */}

                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Amount (USD)</label>
                          {/* <span className={styles.RedStar}>*</span> */}
                          <br></br>
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getAmountUSD}
                            placeholder="Type Amount (USD).."

                          />
                        </div>

                        {/* ProjectName Dropdown */}
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Payment Date</label>
                          {/* <span className={styles.RedStar}>*</span> */}
                          <br></br>
                          <div className={styles.myDropDown}>
                            <DatePicker
                              placeholder="Select Payment Date..."
                              value={this.state.PaymentDate}
                              onSelectDate={this.PaymentDateChange}
                              onKeyDown={(e) => e.preventDefault()}
                            />

                          </div>
                          <React.Fragment>

                          </React.Fragment>
                        </div>


                      </div>
                    }


                    {
                      this.state.SelectedPaymentType === 'Periodically' &&
                      <div className={styles.rowTablePeriodically}>
                        <table className={styles.PeriodicallyTable}>

                         <div className={this.state.IPeriodicallyModel.length > 0?styles.groove:""}>

                          {this.renderPeriodicallyTableData()}
                          </div>
                          
                          <br></br>
                          <button className='btn btn-primary addItemsRow'
                          disabled={this.state.DisabledValue} id="addDetailRow"
                           onClick={this._handleAddRowIPeriodicallyModel}>Add New</button>
                          </table>
                        
                      </div>
                    }
                     {
                    this.state.Bind_PaymentType === 'Variable Periodically' &&

                    <div className={styles.rowTablePeriodically}>
                    <table className={styles.PeriodicallyTable}>
                    <div className={this.state.IVariablePeriodicallyModel.length > 0?styles.groove:""}>
                    {this.renderVariablePeriodicallyTableData()}
         
                   </div>
                   <br></br>
                            <button className='btn btn-primary addItemsRow' id="addDetailRow"

                             onClick={this._handleAddRowIVariablePeriodicallyModel}>Add New</button>
                   </table>
                   </div>
                  }

                      {
                      this.state.SelectedPaymentType === 'Milestone based' &&
                      <div className={styles.rowTablePeriodically}>
                        <table className={styles.PeriodicallyTable}>

                         <div className={this.state.IProcurementModel.length > 0?styles.groove:""}>

                          {this.renderTableData()}
                          </div>
                          
                          <br></br>
                          <button className='btn btn-primary addItemsRow'
                          disabled={this.state.DisabledValue} id="addDetailRow"
                           onClick={this._handleAddRow}>Add New</button>
                          </table>
                        
                      </div>
                    }
                  </div>
              }
                {/* 1st Form */}
              <div className={styles.newRequestForm}>
                  <div className={styles.rowTableBtn}>
                  {/* Add More Button*/}
                  <div className={styles.colmd4}>
                     <label className={styles.labelstyle}>Risk Factor</label>
                      <TextField className={styles.myDropDown1}
                      type="textarea"
                      multiline rows={3}
                      onChange={this.getRiskFactor}
                      placeholder="Type Comment.." />
                 </div>
               </div>
                      <br></br>
                      <br></br>
                      
                  <div className={styles.rowTableBtn}>
                        
                        <div className={styles.colmd4}>
                        <label className={styles.labelstyle}>Reminder Comment</label>
                        <br></br>
                            <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getReminderComment}
                            placeholder="Type Reminder comment.."

                          />
                        </div>


                        <div className={styles.colmd4}>
                             <label className={styles.labelstyle}>Reminder Date</label>
                             {/* <span className={styles.RedStar}>*</span> */}
                             <br></br>
                             <div className={styles.myDropDown}>
                                  <DatePicker
                                  placeholder="Select a date..."
                                  value={this.state.ReminderDate}
                                  onSelectDate={this.ReminderDateChange}
                                   />

                             </div>
                        </div>
                  </div>
              </div>
                
                  <br></br>
                  <br></br>
                  <br></br>

                  '<div 
                  className={styles.rowTableBtn}>


                    {/* Add More Button*/}
                    <div className={styles.colmd4}>
                      
                    {
                    this.state.AddMore === false &&
                        <DefaultButton className={styles.AddmoreBtn} onClick={this.AddMoreInfo}>Add More</DefaultButton>
                    }
                      <DefaultButton className={styles.ObligationBtn} onClick={this.ObligationOpenPopup} >Obligation</DefaultButton>

                      <DefaultButton className={styles.ObligationBtn} onClick={this.InsuranceOpenPopup} >Insurance</DefaultButton>


                      
                    </div>
                     {/* Submitted Button */}
                    <div className={styles.colmd3}>
                    {/* <button type="button" className={styles.CreateBtn}  disabled={this.state.VarDisabledBtnOnCreate} onClick={() => this.createItem("Submitted")}>Submitted</button> */}
                    <DefaultButton className={styles.CreateBtn}  disabled={this.state.VarDisabledBtnOnCreate} onClick={() => this.createItem("Submitted")}>Submit</DefaultButton>
                      {/* <PrimaryButton >Submit</PrimaryButton>  */}
                      <span className={styles.errorMSGButtonside}>{this.state.DocAttachedErrMsg}</span>
                      
                    </div>
                     {/* Draft Button*/}
                    <div className={styles.colmd3}>
                    {/* <button type="button" className={styles.DraftBtn} disabled={this.state.VarDisabledBtnOnCreate} onClick={() => this.DraftFunction("Draft")}>Save Draft</button> */}
                    <DefaultButton className={styles.DraftBtn} disabled={this.state.VarDisabledBtnOnCreate} onClick={() => this.DraftFunction("Draft")} >Save Draft</DefaultButton>
                    </div>
                  </div>
                </div>
                  }           
              </PivotItem>


              <PivotItem

                headerText="Submitted Request">
                <div className={styles.contractFormSpfx}>
                  
                  <ListView
                    listClassName={styles.listViewStyle}
                    items={this.state.items}
                    viewFields={this.viewFields()}
                    groupByFields={this.groupByFields()}
                    compact={true}
                    selectionMode={SelectionMode.none}
                    showFilter={true}
                    filterPlaceHolder="Search..."
                  />

                </div>

              </PivotItem>
            </Pivot>

                   {/* Insurance Model  */}
                  <Modal
                  titleAriaId={"Milestone"}
                  isOpen={this.state.openInsurancePopup}
                  onDismiss={this.InsuranceExitHandler}
                  isBlocking={true}
                  containerClassName={contentStyles.container}
                  >

                  <div className={contentStyles.header}>
                    <span id={"Popup"}>Insurance</span>
                    <IconButton
                      styles={iconButtonStyles}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={this.InsuranceExitHandler}
                    />
                  </div>

                  <table className={styles.newRequestTable}>
                    <div className={this.state.IInsurance.length > 0 ? styles.groove : ""}>
                      {this.InsurancerenderTableData()}
                    </div>
                  </table>

                  <button className='btn btn-primary addItemsRow'
                    disabled={this.state.DisabledValue} id="addDetailRow"
                    onClick={this._handleInsuranceAddRow}>Add New</button>
                  {/* <br></br> */}
                  <div className={styles.CloseMilestone}>
                    <DefaultButton className={styles.CloseMilestonetbtn} disabled={this.state.DisabledValue} onClick={this.InsuranceExitHandler}>Save</DefaultButton>
                  </div>
                </Modal>
                {/* Insurance Popup Form */}
            

                  {/* Obligation Model  */}
                  <Modal
                  titleAriaId={"Milestone"}
                  isOpen={this.state.openObligationPopup}
                  onDismiss={this.ObligationExitHandler}
                  isBlocking={true}
                  containerClassName={contentStyles.container}
                  >

                  <div className={contentStyles.header}>
                    <span id={"Popup"}>Obligation</span>
                    <IconButton
                      styles={iconButtonStyles}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={this.ObligationExitHandler}
                    />
                  </div>

                  <table className={styles.newRequestTable}>
                    <div className={this.state.IObligation.length > 0 ? styles.groove : ""}>
                      {this.ObligationrenderTableData()}
                    </div>
                  </table>

                  <button className='btn btn-primary addItemsRow'
                    disabled={this.state.DisabledValue} id="addDetailRow"
                    onClick={this._handleObligationAddRow}>Add New</button>
                  {/* <br></br> */}
                  <div className={styles.CloseMilestone}>
                    <DefaultButton className={styles.CloseMilestonetbtn} disabled={this.state.DisabledValue} onClick={this.ObligationExitHandler}>Save</DefaultButton>
                  </div>
                </Modal>
                {/* Milestone Popup Form */}
            


{/* View Show All data data in invoice */}

                  <Modal
                  
                  titleAriaId={"Akash"}
                  isOpen={this.state.openInvoicePDF}
                  onDismiss={this.ExitInvoicePDF}
                  isBlocking={true}
                  containerClassName={contentStyles.container1} 
                  scrollableContentClassName='overflow-x: hidden'>

                    <div className={contentStyles.header}>
                   
                       <span id={"Popup"}>Contract Information</span>
                      
                 <DefaultButton className={styles.PDFBtn} onClick={this.printDocument} >Print</DefaultButton>
                    <IconButton
                      styles={iconButtonStyles}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={this.ExitInvoicePDF}
                    />
                  </div>
                  <div id="generatePdfForm" className={styles.PDFInvoice}>
      <table>
            <tr>
                <td className={styles.stat}>Besa Entity:</td>
                <td><p className={styles.HeadingTag}id="venderName">{this.state.Bind_BesaEntity}
                </p></td>
                <td className={styles.stat}>Project Name:</td>
                <td><p className={styles.HeadingTag}id="venderName">{this.state.Bind_ProjectName}
                </p></td>
                <td className={styles.stat}>Contracting Party:</td>
                <td><p className={styles.HeadingTag}id="venderName">{this.state.Bind_ContractingParty}
                </p></td>
            </tr>
        </table>
        <p className={styles.HeadingTag}>Basic Information:</p>
        <table>
            <tr>

                <td className={styles.stat}>Besa Officer:</td>
                <td><p className={styles.HeadingTag}id="venderName">{this.state.BindBesaOfficerText}
                </p></td>

                <td className={styles.stat}>Contract Type:</td>
                <td><p className={styles.HeadingTag}id="venderName">{this.state.Bind_ContractType}
                </p></td>

                <td className={styles.stat}>Contract Date:</td>
                <td><p className={styles.HeadingTag}id="venderName">
                 
                        <DatePicker
                          style={{background:"White",color:"Black"}}
                          color='white'
                          className={styles.Fields}
                          placeholder="Select a date..."
                          ariaLabel="Select a date"
                          disabled={this.state.DisabledValue}
                          onSelectDate={this.ContractDateChange}
                          value={this.state.ContractDate}
                        />
                        </p>
                </td>
            </tr>
            <tr>
                <td className={styles.stat}>Other Party Point of Contract:</td>
                <td><p className={styles.HeadingTag}id="duration">{this.state.VendorPointOfContact}
                </p></td>

                <td className={styles.stat}>Total Contract Value:</td>
                <td><p className={styles.HeadingTag}id="precondate">{this.state.TotalContractValue}
                </p></td>

 
                <td className={styles.stat}>Budget ID:</td>
                <td><p className={styles.HeadingTag}id="precondate">{this.state.BudgetId}
                </p></td>

            </tr>

            <tr>
                

                <td className={styles.stat}>Contract Description:</td>
                <td><p className={styles.HeadingTag}id="precondate">{this.state.DescriptionOfProduct}
                </p></td>

 
                <td className={styles.stat}>Transaction Type:</td>
                <td><p className={styles.HeadingTag}id="precondate">{this.state.BindTransactionType}
                </p></td>
                <td className={styles.stat}>Point Of Contract Address:</td>
                <td ><p className={styles.HeadingTag}id="useOfFund">{this.state.VendorAddress}</p></td>
            </tr>

        </table>

        <p className={styles.HeadingTag}>Term Type:</p>
        <table>
            <tr>
                <td className={styles.stat}>Termination Date:</td>
                <td><p className={styles.HeadingTag}id="contractAmount">
                <DatePicker
                            placeholder="Select a date..."
                            ariaLabel="Select a date"
                            onSelectDate={this.TerminationDateChange}
                            disabled={this.state.DisabledValue}
                            value={this.state.TerminationDate}

                          />
                </p></td>

                <td className={styles.stat}>Renewal By Notice:</td>
                <td><p className={styles.HeadingTag}id="contractAmount">
                  {this.state.DateToExtend} 
                  </p></td>

                <td className={styles.stat}>Renewal Period:</td>
                <td><p className={styles.HeadingTag}id="contractAmount">
                  {this.state.TerminationPeriod}
                  </p></td>
               
            </tr>

        </table>

        <p className={styles.HeadingTag}>Termination:</p>
        <table>
            <tr>
                <td className={styles.stat}>Discretionary Termination:</td>
                <td><p className={styles.HeadingTag}id="contractAmount">
                 {this.state.NoOfDays}
                  </p></td>

                <td className={styles.stat}>Termination By Breach:</td>
                <td><p className={styles.HeadingTag}id="contractAmount">
                  {this.state.RecoveryPeriod} 
                  </p></td>

                <td className={styles.stat}>Termination By Non Renewal:</td>
                <td><p className={styles.HeadingTag}id="contractAmount">
                  {this.state.DaysForNotice} 
                  </p></td>
               
            </tr>

        </table>


        <p className={styles.HeadingTag}>Payment Details:</p>
        {this.state.Bind_PaymentType === 'One Time' &&
                      <table>
                      <tr>
                          <td className={styles.stat}>Amount (USD):</td>
                          <td>
                          <TextField className={styles.myDropDown}
                                    type="textarea"
                                    onChange={this.getAmountUSD}
                                    placeholder="Type Amount (USD).."
                                    disabled={this.state.DisabledValue}
                                    defaultValue={this.state.AmountUSD}
                                  />
                          </td>
          
                          <td className={styles.stat}>Payment Date:</td>
                          <td><DatePicker
                                      placeholder="Select Payment Date..."
                                      ariaLabel="Select a date"
                                      disabled={this.state.DisabledValue}
                                      value={this.state.PaymentDate}
                                      onKeyDown={(e) => e.preventDefault()}
                                    />
                                    </td>
                      </tr>
          
                  </table>
                  }
                       {
                        this.state.Bind_PaymentType === 'Milestone based' &&

                       <div className={this.state.IProcurementModel.length > 0?styles.groove:""}>

                        {this.renderTableDataInvoice()}
                        </div>
                          
                            }
                            {
                    this.state.Bind_PaymentType === 'Periodically' &&

                   
                    <div className={this.state.IPeriodicallyModel.length > 0?styles.groove:""}>
                    {this.renderPeriodicallyTableDataInvoice()}
                   </div>
                  }
                   {
                    this.state.Bind_PaymentType === 'Variable Periodically' &&

                   
                    <div className={this.state.IVariablePeriodicallyModel.length > 0?styles.groove:""}>
                    {this.renderVariablePeriodicallyTableDataInvoice()}
                   </div>
                  }



        <p className={styles.HeadingTag}>Obligation Details:</p>

        <div className={this.state.IObligation.length > 0 ? styles.groove : ""}>
                      {this.ObligationrenderTableDataInvoice()}
                    </div>


        <p className={styles.HeadingTag}>Insurance Details:</p>
        <div className={this.state.IInsurance.length > 0 ? styles.groove : ""}>
                      {this.InsurancerenderTableDataInvoice()}
                    </div>


        <p className={styles.HeadingTag}>Reminder Details:</p>
        <table>
            <tr>    
                <td className={styles.stat}>Risk Factor:</td>
                <td className="col-md-4">
                  <p className={styles.HeadingTag}id="useOfFund">{this.state.BindRiskFactor}</p></td>
            </tr>
            <tr>
                <td className={styles.stat}>Reminder Comment:</td>
                <td><p className={styles.HeadingTag}id="sectionOffice">{this.state.BindReminderComment}</p></td>
                <td className={styles.stat}>Reminder Date:</td>
                <td><p className={styles.HeadingTag}id="competitive">
                <DatePicker
                                    placeholder="Select a date..."
                                    ariaLabel="Select a date"
                                    value={this.state.ReminderDate}
                                    disabled={this.state.DisabledValue}
                                    onSelectDate={this.ReminderDateChange}                    
                                     />
                  </p></td>
            </tr>
        </table>
        <table ><tr><td className={styles.stat}>Comment:</td></tr>
        <tr>
            <td><p className={styles.HeadingTag}id="description">{this.state.Comments} </p></td>
        </tr>
    </table>
    </div>
</Modal>

{/* End - View Show All data data in invoice */}



            {/* Edit AllItems Open Model */}
            <Modal
                  titleAriaId={"Akash"}
                  isOpen={this.state.openEditDialog}
                  onDismiss={this.ExitHandler}
                  isBlocking={true}
                  containerClassName={contentStyles.container} 
                  scrollableContentClassName='overflow-x: hidden'>

                  <div className={contentStyles.header}>
                    {this.state.DisabledValue == true &&
                       <span id={"Popup"}>View Submission</span>
                    }
                   {
                    this.state.DisabledValue != true &&
                       <span id={"Popup"}>Edit Submission</span>
                    }
                    {
                    this.state.DisabledValue != true &&
                          <div className={styles.ExpiredCheckBox}>
                          <Checkbox label="Expired"
                          title="Expired"
                          onChange={this._getExpiredValue}
                          defaultChecked={this.state.BindStatus == "Expired"? true : false}
                          disabled={this.state.DisabledValue} />
                          </div>
                    }

                    {
               this.state.DisabledValue == true &&
                 <DefaultButton className={styles.PDFBtn} onClick={this.OpenInvoiceDialog} >PDF Generate</DefaultButton>
                 }
                    <IconButton
                      styles={iconButtonStyles}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={this.ExitHandler}
                    />
                  </div>

                  <div>
                  <div className={styles.newRequestForm}>

                  <div className={styles.rowTable}>
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Besa Entity</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.BesaEntity}
                        onChange={this.getBesaEntity}
                        defaultSelectedKey={this.state.Bind_BesaEntity}
                        disabled={this.state.DisabledValue}
                        placeholder="Select Besa Entity.."
                      ></Dropdown>
                    </div>

                    {/* ProjectName Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Project Name</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>

                      {/* {this.state.DisabledValue===false&& */}
                      <Dropdown className={styles.myDropDown}
                        options={this.state.CompanyProject}
                        onChange={this.getProjectName}
                        defaultSelectedKey={this.state.Bind_ProjectName}
                        disabled={this.state.DisabledValue}
                        placeholder="Select Project Name.."
                      ></Dropdown>
                

                    </div>

                    {/* Contracting Party Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contracting Party</label>
                      {/* <span className={styles.RedStar}>*</span> */}


                      {/* {this.state.DisabledValue===false&& */}
                      <Dropdown className={styles.myDropDown}
                        options={this.state.ContractingParty}
                        onChange={this.getContractingParty}
                        defaultSelectedKey={this.state.Bind_ContractingParty}
                        disabled={this.state.DisabledValue}
                        placeholder="Select Contracting Party.."
                      ></Dropdown>
                      {/* } */}
                    </div>
                  </div>

                  


                  {/* 2st Row of Other Functionality*/}
                  <div className={styles.rowTable}>

                    {/* Contract Description TextField */}
                    {this.state.AddProjectName === 'Other' &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Add Project Name </label>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getAddProjectName}
                          placeholder="Add Project Name .."
                        />
                      </div>}

                    {/* Vendor Point of Contract Text Field */}
                    {this.state.AddContractingParty === 'Other' &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Add Contracting Party</label>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getAddContractingParty}
                          placeholder="Type Contracting Party.."
                        />

                      </div>}

                  </div>
                

                  {/* 2st Row of Form */}
                  <div className={styles.rowTable}>

                    {/* BesaOfficer Dropdown */}
                    <div className={styles.colmd3}>

                      <label className={styles.labelstyle}>Besa Officer</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>

                      <div className={styles.myDropDown}>

                        {this.state.DisabledValue === true &&
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            disabled={this.state.DisabledValue}
                            placeholder="Name of the Besa Officer.."
                            defaultValue={this.state.BindBesaOfficerText}
                          />
                        }

                        {this.state.DisabledValue === false &&

                          // <PeoplePicker
                          //   context={this.props.Context}
                          //   onChange={this.getPeoplePicker}
                          //   placeholder="Enter your Name"
                          //   personSelectionLimit={1}
                          //   ensureUser={true}
                          //   disabled={this.state.DisabledValue}
                          //   defaultSelectedUsers={[this.state.user]}

                          // />
                          <TextField className={styles.myDropDown}
                            type="textarea"
                            disabled={this.state.DisabledValue}
                            onChange={this.getbesaOfficer}
                            defaultValue={this.state.BindBesaOfficerText}
                          />
                        }

                      </div>
                    </div>

                    {/* Contracting Party Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contract Type</label>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.ContractType}
                        onChange={this.getContractType}
                        disabled={this.state.DisabledValue}
                        defaultSelectedKey={this.state.Bind_ContractType}
                        placeholder="Select Contract Type..">

                      </Dropdown>
                    </div>

                    {/* Contract Date */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contract Date</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>
                      <div className={styles.myDropDown}>
                        <DatePicker
                          placeholder="Select a date..."
                          ariaLabel="Select a date"
                          disabled={this.state.DisabledValue}
                          onSelectDate={this.ContractDateChange}
                          value={this.state.ContractDate}
                          
                        />

                      </div>

                    </div>


                    {/* 2st Row of Other Functionality*/}
                    <div className={styles.rowTable}>

                      {/* Contract Description TextField */}
                      {this.state.AddContractType === 'Other' &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Add Contract Type</label>

                          <TextField className={styles.myDropDown}
                            type="textarea"
                            onChange={this.getAddContractType}
                            disabled={this.state.DisabledValue}
                            placeholder="Add Contract Type.."
                          />
                        </div>}

                    </div>



                  </div>

                  {/* 3st Row of Form */}
                  <div className={styles.rowTable}>

                    {/* Total Contrct ValuenText Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Total Contract Value (USD)</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getContractValue}
                        placeholder="Type Total Contract Value (USD).."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.TotalContractValue}
                      />
                    </div>

                    {/* Budget ID Tex Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Budget ID</label>
                      {/* <span className={styles.RedStar}>*</span> */}

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getBudgetId}
                        placeholder="Type Budget ID.."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.BudgetId}
                      />

                    </div>

                    {/* Vendor Point of Contract Text Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Other Party Point of contact</label>
                      {/* <span className={styles.RedStar}>*</span> */}

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getVendorContact}
                        placeholder="Type Vendor Contact.."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.VendorPointOfContact}
                      />

                    </div>

                  </div>

                  {/* 4th Row */}
                  <div className={styles.rowTable}>

                    {/* Comments MultiTextLine Field */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Comment</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>
                      <TextField className={styles.myDropDown1}
                        type="textarea"
                        multiline rows={1}
                        onChange={this.getComment}
                        placeholder="Type Comment.."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.Comments}
                      />
                    </div>
                    
                  
                  {/* Contract Description TextField */}
                  <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Contract Description</label>
                      {/* <span className={styles.RedStar}>*</span> */}

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        onChange={this.getContractDescription}
                        placeholder="Type Contract Description.."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.DescriptionOfProduct}
                      />

                    </div>

                       {/* Budget ID Tex Field */}
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Transaction Type</label>
                        <Dropdown className={styles.myDropDown}
                          options={this.state.TransactionType}
                          onChange={this.getTransactionType}
                          defaultSelectedKey={this.state.BindTransactionType}
                          disabled={this.state.DisabledValue}
                          placeholder="Select Transaction Type">
                            
                        </Dropdown>

                     </div>
                </div>
                <br></br>
                <div className={styles.rowTable}>
                    {/* Address MultiTextLine Field*/}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Point of Contact Address</label>
                      {/* <span className={styles.RedStar}>*</span> */}

                      <TextField className={styles.myDropDown}
                        type="textarea"
                        multiline rows={7}
                        onChange={this.getAddress}
                        placeholder="Type Address.."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.VendorAddress} />
                    </div>


              </div>
                  <br></br>
                  {this.state.DisabledValue !== true &&

                    <div className={styles.rowTable}>
                       <div className={styles.colmd3}></div>

                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Attachment</label>
                        <input className='form-control'
                          type="file" ref={(elm) => { this._input = elm; }}onChange={this.AttachmentErr}></input>
                          {this.state.isDocAttached && <span className={styles.errorMSG}>
                          {this.state.DocAttachedErrMsg}
                        </span>}

                      </div>
                    </div>}

                    {this.state.DisabledValue == true &&

                   <div className={styles.rowTable}>
                   <div className={styles.colmd3}></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                   </div>
                    
                    }
              </div>
           </div>


                  {
                  this.state.AddMore &&
                  <div>
                  <div className={styles.newRequestForm}>
                  <IconButton
                        styles={AddMoreIcon}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={this.ExitAddMore.bind(this)}
                      />
                  <div className={styles.rowTable}>
                    {/* BesaEntity Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Term Type</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Fixed"
                          //checked={this.state.VarFixedValue} 
                          title="Fixed"
                          onChange={this._getFixedValue}
                          defaultChecked={this.state.FixedValue != null ? this.state.FixedValue.indexOf("Fixed") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue} />

                      </div>

                    </div>

                    {/* ProjectName Dropdown */}
                    <div className={styles.colmd3}>
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Auto Renewal"
                          //checked={this.state.VarAutoRnewal} 
                          title="Auto Renewal"
                          onChange={this._getAutoRenewal}
                          defaultChecked={this.state.AutoRenewalValue != null ? this.state.AutoRenewalValue.indexOf("Auto Renewal") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue} />
                      </div>

                    </div>

                    {/* Contracting Party Dropdown */}
                    <div className={styles.colmd3}>
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Renewal by Notice"
                          //checked={this.state.VarRenewalNotice} 
                          title="Renewal by Notice"
                          onChange={this._getRenewalNotice}
                          defaultChecked={this.state.RenewalByNoticeValue != null ? this.state.RenewalByNoticeValue.indexOf("Renewal by Notice") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue}
                        />
                      </div>

                    </div>
                    

                      {/* Contracting Party Dropdown */}
                      <div className={styles.colmd3}>
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Perpetual"
                          //checked={this.state.VarRenewalNotice} 
                          title="Perpetual"
                          onChange={this._getPerpetual}
                          defaultChecked={this.state.PerpetualValue != null ? this.state.PerpetualValue.indexOf("Perpetual") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue}
                        />
                      </div>

                    </div>

                  </div>
                  <div className={styles.rowTable}>
                    {this.state.FixedValue != null &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Termination Date</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <div className={styles.myDropDown}>
                          <DatePicker
                            placeholder="Select a date..."
                            ariaLabel="Select a date"
                            onSelectDate={this.TerminationDateChange}
                            disabled={this.state.DisabledValue}
                            value={this.state.TerminationDate}

                          />

                        </div>
                      </div>}
                      {/* && this.state.AutoRenewalValue.indexOf("Auto Renewal") > -1) */}
                    {/* ProjectName Dropdown */}
                    {this.state.AutoRenewalValue != null
                    &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Renewal Period</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getRenewalPeriod}
                          placeholder="Type Renewal Period.."
                          defaultValue={this.state.TerminationPeriod}
                          disabled={this.state.DisabledValue}

                        />
                      </div>
                    }

                    {/* Contracting Party Dropdown */}
                    {
                    
                      this.state.RenewalByNoticeValue != null
                    //|| ( this.state.VarRenewalNotice) 
                    &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Days before Renewal Date</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getDaysBeforeRenewalDate}
                          placeholder="Type Days before Renewal Date.."
                          defaultValue={this.state.DateToExtend}
                          disabled={this.state.DisabledValue}
                        />
                      </div>
                    }

                       {this.state.RenewalByNoticeValue &&
                        <div className={styles.colmd3}>
                          <label className={styles.labelstyle}>Renewal Date</label>
                          <br></br>
                          <div className={styles.myDropDown}>
                            <DatePicker
                              placeholder="Select Renewal Date..."
                              ariaLabel="Select a date"
                              value={this.state.RenewalNoticeDate}
                              onSelectDate={this.RenewalNoticeDateChange}
                              disabled={this.state.DisabledValue}
                            />
                          </div>
                        </div>
                      }

                  </div>

                  <div className={styles.rowTable}>

                    {/* BesaEntity Dropdown */}
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Termination</label>
                      {/* <span className={styles.RedStar}>*</span> */}
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Discretionary Termination"
                          //checked={this.state.VarDiscretionary} 
                          title="Discretionary Termination"
                          onChange={this._getDiscretionary}
                          defaultChecked={this.state.DiscretionaryValue != null ? this.state.DiscretionaryValue.indexOf("Discretionary Termination") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue}
                        />

                      </div>
                    </div>

                    {/* ProjectName Dropdown */}
                    <div className={styles.colmd3}>
                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Termination by breach"
                          //checked={this.state.VarTerminationBreach} 
                          title="Termination by breach"
                          onChange={this._getTerminationBreach}
                          defaultChecked={this.state.TerminationBreachValue != null ? this.state.TerminationBreachValue.indexOf("Termination by breach") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue} />
                      </div>

                    </div>

                    {/* Termination by auto-renewal  */}
                    <div className={styles.colmd3}>

                      <br></br>
                      <div className={styles.myDropDown}>
                        <Checkbox label="Termination by non-renewal"
                          //checked={this.state.VarTerminationStopping} 
                          title="Termination by non-renewal"
                          onChange={this._getTerminationStopping}
                          defaultChecked={this.state.TerminationStoppingValue != null ? this.state.TerminationStoppingValue.indexOf("Termination by non-renewal") > -1 ? true : false : false}
                          disabled={this.state.DisabledValue} />
                      </div>

                    </div>
                  </div>


                  {/* 4th Row of Form */}
                  <div className={styles.rowTable}>
                  {/* this.state.DiscretionaryValue.indexOf("Discretionary Termination") > -1) */}
                    {/* No. of Days for Notice */}
                    {this.state.DiscretionaryValue != null 
                    //|| (this.state.VarDiscretionary) 
                    &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>No. of Days for Notice</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>

                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getDaysForNotice}
                          placeholder="Type No. of Days for Notice.."
                          disabled={this.state.DisabledValue}
                          defaultValue={this.state.DaysForNotice}
                        />


                      </div>}

                    {/* Recovery Period*/}
                    {this.state.TerminationBreachValue != null
                    //|| (this.state.VarTerminationBreach) 
                    &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Recovery Period</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getRecoveryPeriod}
                          placeholder="Type Recovery Period.."
                          disabled={this.state.DisabledValue}
                          defaultValue={this.state.RecoveryPeriod}
                        />

                      </div>}

                    {/* No. of Days */}
                    {this.state.TerminationStoppingValue != null 
                    //||(this.state.VarTerminationStopping) 
                    &&
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>No. of Days</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getNoOfDays}
                          placeholder="Type No. of Days.."
                          disabled={this.state.DisabledValue}
                          defaultValue={this.state.NoOfDays}
                        />

                      </div>}
                  </div>

                  {/* 4th Row of Form */}
                  <div className={styles.rowTable}>

                    {/* Payment Type */}

                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Payment Type</label>

                      <br></br>
                      <Dropdown className={styles.myDropDown}
                        options={this.state.PaymentType}
                        onChange={this._getPaymentType}
                        disabled={this.state.DisabledValue}
                        defaultSelectedKey={this.state.Bind_PaymentType}
                      ></Dropdown>
                    </div>

                    


                  </div>

                  {/* 4th Row of Form */}
                  {this.state.Bind_PaymentType === 'One Time' &&
                    <div className={styles.rowTable}>

                      {/* Amount (USD */}

                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Amount (USD)</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <TextField className={styles.myDropDown}
                          type="textarea"
                          onChange={this.getAmountUSD}
                          placeholder="Type Amount (USD).."
                          disabled={this.state.DisabledValue}
                          defaultValue={this.state.AmountUSD}
                        />
                      </div>

                      {/* ProjectName Dropdown */}
                      <div className={styles.colmd3}>
                        <label className={styles.labelstyle}>Payment Date</label>
                        {/* <span className={styles.RedStar}>*</span> */}
                        <br></br>
                        <div className={styles.myDropDown}>
                          <DatePicker
                            placeholder="Select Payment Date..."
                            ariaLabel="Select a date"
                            disabled={this.state.DisabledValue}
                            value={this.state.PaymentDate}
                          />
                        </div>
                      </div>
                    </div>}
                    {
                    this.state.Bind_PaymentType === 'Periodically' &&

                    <div className={styles.rowTablePeriodically}>
                    <table className={styles.PeriodicallyTable}>
                    <div className={this.state.IPeriodicallyModel.length > 0?styles.groove:""}>
                    {this.renderPeriodicallyTableDataEdit()}
         
                   </div>
                   <br></br>
                            <button className='btn btn-primary addItemsRow'
                             disabled={this.state.DisabledValue} id="addDetailRow"

                             onClick={this._handleAddRowIPeriodicallyModel}>Add New</button>
                   </table>
                   </div>
                  }
                      {
                    this.state.Bind_PaymentType === 'Variable Periodically' &&

                    <div className={styles.rowTablePeriodically}>
                    <table className={styles.PeriodicallyTable}>
                    <div className={this.state.IVariablePeriodicallyModel.length > 0?styles.groove:""}>
                    {this.renderVariablePeriodicallyTableDataEdit()}
         
                   </div>
                   <br></br>
                            <button className='btn btn-primary addItemsRow'
                             disabled={this.state.DisabledValue} id="addDetailRow"

                             onClick={this._handleAddRowIVariablePeriodicallyModel}>Add New</button>
                   </table>
                   </div>
                  }



                   {
                        this.state.Bind_PaymentType === 'Milestone based' &&
                        <div className={styles.rowTablePeriodically}>
                          <table className={styles.PeriodicallyTable}>

                           <div className={this.state.IProcurementModel.length > 0?styles.groove:""}>

                            {this.renderTableDataEdit()}
                            </div>
                            
                            <br></br>
                            
                            <button className='btn btn-primary addItemsRow'
                             disabled={this.state.DisabledValue} id="addDetailRow"
                             onClick={this._handleAddRow}>Add New</button>
                            </table>
                          
                        </div>
                      }
                  <br></br>
                  </div>
                </div>
                }

                 <div className={styles.newRequestForm}>
                    <div className={styles.rowTableBtn}>
                    {/* Add More Button*/}
                    <div className={styles.colmd4}>
                       <label className={styles.labelstyle}>Risk Factor</label>
                        <TextField className={styles.myDropDown1}
                        type="textarea"
                        multiline rows={3}
                        onChange={this.getRiskFactor}
                        placeholder="Type Comment.."
                        disabled={this.state.DisabledValue}
                        defaultValue={this.state.BindRiskFactor} />
                   </div>
                 </div>
                        <br></br>
                        <br></br>
                        
                    <div className={styles.rowTableBtn}>
                          
                          <div className={styles.colmd4}>
                          <label className={styles.labelstyle}>Reminder Comment</label>
                          <br></br>
                              <TextField className={styles.myDropDown}
                              type="textarea"
                              onChange={this.getReminderComment}
                              placeholder="Type Reminder comment.."
                              disabled={this.state.DisabledValue}
                              defaultValue={this.state.BindReminderComment}
                            />
                          </div>
                          <div className={styles.colmd4}>
                               <label className={styles.labelstyle}>Reminder Date</label>
                               {/* <span className={styles.RedStar}>*</span> */}
                               <br></br>
                               <div className={styles.myDropDown}>
                                    <DatePicker
                                    placeholder="Select a date..."
                                    ariaLabel="Select a date"
                                    value={this.state.ReminderDate}
                                    disabled={this.state.DisabledValue}
                                    onSelectDate={this.ReminderDateChange}                    
                                     />

                               </div>
                          </div>
                    </div>
                </div>
                '<div className={styles.rowTableBtn}>
                 {/* Add More Button*/}
                 <div className={styles.colmd4}>

                 {
                 this.state.AddMore === false &&
                 <DefaultButton className={styles.AddmoreBtn} onClick={this.AddMoreInfo}>View More</DefaultButton>
                 }
                 <DefaultButton className={styles.ObligationBtn} onClick={this.ObligationOpenPopup} >Obligation</DefaultButton>

                 <DefaultButton className={styles.ObligationBtn} onClick={this.InsuranceOpenPopup} >Insurance</DefaultButton>

                 </div>
                 </div>
                  <div className={styles.rowTable}>
                    <div className={styles.colmd3}>
                      <label className={styles.labelstyle}>Attachment</label>
                      {this.renderDocuments()}
                    </div>
                  </div>


                  {
                  this.state.DisabledValue === false && this.state.RadioOption != 'Child Document' &&
                 <span>
                  <DefaultButton 
                  className={styles.UpdateBtn} 
                  disabled={this.state.VarDisabledBtnOnCreate}
                  onClick={() => this.Update('Update')}
                 // disabled={this.state.RadioOption ==='Child Document'?false:true}
                  >Update</DefaultButton>
                 </span>
                  }

                     {
                  this.state.DisabledValue === false && this.state.RadioOption == 'Child Document' && this.state.PopupType == 'ChildEdit' &&
                 <span>
                  <DefaultButton 
                  className={styles.UpdateBtn} 
                  disabled={this.state.VarDisabledBtnOnCreate}
                  onClick={() => this.ChildUpdate('Update')}
                 // disabled={this.state.RadioOption ==='Child Document'?false:true}
                  >Update</DefaultButton>
                 </span>
                  }

                   {
                   this.state.DisabledValue === false && this.state.RadioOption == 'Child Document' && this.state.PopupType  == 'ParentEdit' &&
                   <span>
                  
                   <DefaultButton className={styles.UpdateBtn}disabled={this.state.VarDisabledBtnOnCreate} onClick={() =>this.createChildsItem("Submitted")}>Create Childs</DefaultButton>
                   
                   </span>  
                         
                   }
                   
                   {
                    
                  this.state.DisabledValue === false &&
                  <span>
                  <DefaultButton className={styles.CancelBtn} onClick={this.ExitHandler}>Close </DefaultButton>
                  <span className={styles.errorMSGButtonsideChild}>{this.state.DocAttachedErrMsg}</span>
                  </span>
                  }
                  </Modal>

          </div>
        </div>
      </section>
    );
  }
}
