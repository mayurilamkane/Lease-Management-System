//Searching Contract’s by Tenant
public with sharing class lwcAppExampleApex {
    
    @AuraEnabled(cacheable=true)
    public static List<Contract> retrieveContactData(string keySearch)
    {       
        
        List<Contract> contactList=[Select Id, Tenant_Name__r.Name, ContractNumber, StartDate, ContractTerm, CustomerSignedDate, Contract_Name__c  From Contract where Tenant_Name__r.Name LIKE :keySearch];
        return contactList;
    }
}
