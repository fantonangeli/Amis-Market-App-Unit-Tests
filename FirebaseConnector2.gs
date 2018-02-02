function FirebaseConnector() {
  showTitle(arguments.callee.name);
  


  
  
  
  
  
  
   function getSpreadSheetTemplateCompilerNode() {
     Q.module(arguments.callee.name);
     var f = AmisMarketApp.FirebaseConnector.getSpreadSheetTemplateCompilerNode;
     
      
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
      } );
     
      Q.test( "trues", function( assert ) {
        assert.ok( f("mexico")=="config/templateCompiler/mexico");
      } );

  }

     
  
  
  
  
  
  
  
  
  
  getSpreadSheetTemplateCompilerNode();

}; 