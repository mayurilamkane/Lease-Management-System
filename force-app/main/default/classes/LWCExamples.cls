//Searching Contract’s by Flats
public with sharing class LWCExamples {
    @AuraEnabled(Cacheable = true)
    public static list<Contract> retriveAccs(String strAccName) {
        strAccName = '%' + strAccName + '%';
        // list<Contract> lstAccs = [SELECT  Id, Contract_Name__c, StartDate, ContractTerm, Tenant_Name__c From Contract WHERE Contract_Name__c  LIKE :strAccName];
        List<Contract> lstAccs=[Select Id, Contract_Name__c, ContractNumber, StartDate, ContractTerm, CustomerSignedDate From Contract WHERE Flat_Number__r.Name LIKE :strAccName];
        
        if(lstAccs.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstAccs; 
    }
}
