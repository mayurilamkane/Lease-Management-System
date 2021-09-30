//Searching Contract’s by Tenant
import { LightningElement, track, wire } from 'lwc';
import retrieveContactData from '@salesforce/apex/lwcAppExampleApex.retrieveContactData';
 
export default class DisplayContactsOnAccountName extends LightningElement {
 
   @track currentAccountName;
   @track searchAccountName;
    handleChangeAccName(event){
      this.currentAccountName = event.target.value;      
    }
 
    handleAccountSearch(){
       this.searchAccountName = this.currentAccountName;
    }
   
    @track records;
    @track dataNotFound;
    @wire (retrieveContactData,{keySearch:'$searchAccountName'})
    wireRecord({data,error}){
        if(data){           
            this.records = data;
            this.error = undefined;
            this.dataNotFound = '';
            if(this.records == ''){
                this.dataNotFound = 'There is no Contract found related to Tenant name';
            }
 
           }else{
               this.error = error;
               this.data=undefined;
           }
    }
}