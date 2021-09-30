//Searching Contract’s by Flats
import { LightningElement } from 'lwc';
import retriveAccs from '@salesforce/apex/LWCExamples.retriveAccs';


const columns = [
    {
        label: 'Contract Name',
        fieldName: 'Contract_Name__c',
    },  {
        label:'Contract Number',
        fieldName: 'ContractNumber',
    },{
        label: 'Contract Start Date',
        fieldName: 'StartDate',
    }, {
        label: 'Contract Term (months)',
        fieldName: 'ContractTerm',
    }, 
    // {
    //     label: 'Tenant Name',
    //     fieldName: 'Tenant_Name__r.Name',
    // },

];

export default class DynamicSearchInLWC extends LightningElement {

    searchData;
    columns = columns;
    errorMsg = '';
    strSearchAccName = '';
    

    handleAccountName(event) {
        this.errorMsg = '';
        this.strSearchAccName = event.currentTarget.value;
    }

    handleSearch() {
        if(!this.strSearchAccName) {
            this.errorMsg = 'Please enter account name to search.';
            this.searchData = undefined;
            return;
        }

        retriveAccs({strAccName : this.strSearchAccName})
        .then(result => {
            this.searchData = result;
        })
        .catch(error => {
            this.searchData = undefined;
            if(error) {
                if (Array.isArray(error.body)) {
                    this.errorMsg = error.body.map(e => e.message).join(', ');
                } else if (typeof error.body.message === 'string') {
                    this.errorMsg = error.body.message;
                }
            }
        }) 
    }
}