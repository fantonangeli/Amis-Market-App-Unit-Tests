function ForecastUtility() {
  showTitle(arguments.callee.name);
  
     Q.module(arguments.callee.name,{
       after:function(){
      AmisMarketApp.AmisNamedRanges.getAllNamedRanges=getAllNamedRanges;
       }
     });
      var getAllNamedRanges=AmisMarketApp.AmisNamedRanges.getAllNamedRanges;
     
     AmisMarketApp.AmisNamedRanges.getAllNamedRanges=function(){
       return getAllNamedRangesMocks;
     }; 
     

    

   function getFirstFcOfPeriod() {
      var f = AmisMarketApp.ForecastUtility.getFirstFcOfPeriod;
     Q.module(arguments.callee.name);
      
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
      } );


      Q.test( "active sheet", function( assert ) {
        assert.ok( /\w+\d+:\w+\d+/.test(f( 0 )[1]) );
      } );


      Q.test( "rice", function( assert ) {
        assert.ok( f( 0, "rice" )[1]=="U30:U31" );
        assert.ok( f( 1, "rice" )[1]=="Z30:Z31" );
      } );


      Q.test( "wheat", function( assert ) {
        assert.ok( f( 0, "wheat" )[3]=="U48:U55" );
        assert.ok( f( 1, "wheat" )[3]=="Z48:Z55" );
      } );


      Q.test( "wrong params", function( assert ) {
         assert.throws(
            function() {
               f(8,"wheat");
            },
            "InvalidPeriod"
         );
      } );

  };

   function editedWrongForecast() {
      var f = AmisMarketApp.ForecastUtility.editedWrongForecast;
     var comm="rice";
     Q.module(arguments.callee.name);
      
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
      } );


      Q.test( "ranges falses", function( assert ) {
        assert.ok( !f("T10:T15", comm));
        assert.ok( !f("U8:V8", comm));
        assert.ok( !f("R16:S23", comm));
        assert.ok( !f("AA17:AA18", comm));
        assert.ok( !f("V19:V24", comm));
      } );


      Q.test( "cells falses", function( assert ) {
        assert.ok( !f("X21", comm));
        assert.ok( !f("T27", comm));
        assert.ok( !f("AA30", comm));
        assert.ok( !f("U32", comm));
        assert.ok( !f("V36", comm));
      } );


      Q.test( "trues", function( assert ) {
        assert.ok( f("U12", comm));
        assert.ok( f("Z12", comm));
        assert.ok( f("U15:U16", comm));
        assert.ok( f("U20:U23", comm));
        assert.ok( f("Z20:AA22", comm));
        assert.ok( f("X36:AA36", comm));
        assert.ok( f("Z49:Z51", comm));
      } );


  };









   function getHistoricalColNum() {
      var f = AmisMarketApp.ForecastUtility.getHistoricalColNum;
     Q.module(arguments.callee.name);
      
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f("nosheet");
            },
            "SheetNotFound"
         );
      } );


      Q.test( "trues", function( assert ) {
        assert.ok( f("rice").first===3);
        assert.ok( f("rice").last===19);
        assert.ok( f("maize").last===19);
        assert.ok( f("wheat").last===19);
        assert.ok( f("soybean").last===19);
      } );


  };





  
  


    getFirstFcOfPeriod();
    editedWrongForecast();
    getHistoricalColNum();
}; 