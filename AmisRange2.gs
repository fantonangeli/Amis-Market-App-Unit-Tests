function AmisRange() {
  showTitle(arguments.callee.name);
  
      Q.test( "undef", function( assert ) {
        
         assert.throws(
            function() {
               AmisMarketApp.AmisRange();
            },
            "InvalidArgument"
         );
      } );
  
  
  
  
  
   function getNumColumns() {
     var c = AmisMarketApp.AmisRange;
     Q.module(arguments.callee.name);
     
      Q.test( "invalid data", function( assert ) {
        
         assert.throws(
            function() {
              (new c("dfa").getNumColumns());
            },
            "InvalidArgument"
         );
        
         assert.throws(
            function() {
              (new c("B:C").getNumColumns());
            },
            "InvalidArgument"
         );
      } );     
     
      Q.test( "trues", function( assert ) {
        assert.ok( (new c("R1").getNumColumns())===1);
        assert.ok( (new c("AC45").getNumColumns())===1);
        assert.ok( (new c("C12:D45").getNumColumns())===2);
        assert.ok( (new c("F2:AC55").getNumColumns())===24);
      } );

  };

     
  getNumColumns();   
     
}; 