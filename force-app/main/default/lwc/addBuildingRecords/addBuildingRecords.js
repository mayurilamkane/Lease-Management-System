import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddBuildingRecords extends NavigationMixin(LightningElement)
{
    @api recordId;
    handleSuccess(event)
    {
        console.log(event.detail);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Record Inserted Successfully',
                //message: event.detail.message,
                message:'Record Id: ' + event.detail.id,
                variant: 'success',
            }),
        );
        eval("$A.get('e.force:refreshView').fire();");

            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.detail.id,
                    objectApiName: 'Building__c',
                    actionName: 'view'
                },
             });
            // window.location.reload();
           
    }
    
}