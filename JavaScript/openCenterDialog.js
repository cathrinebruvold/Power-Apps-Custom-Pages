function openCustomPage(pageContext){
    Xrm.Navigation.navigateTo({ 
       pageType: "custom",  
       name: "cb_landingpagescottishsummit_810d5",  
       entityName: pageContext.data.entity.getEntityName(),  
       recordId: pageContext.data.entity.getId()
    }, {
    target:2, 
    width: 1400, 
    height:1000}
    )
 .then(function(){
     pageContext.data.refresh();
 })
 .catch(console.error);
 }