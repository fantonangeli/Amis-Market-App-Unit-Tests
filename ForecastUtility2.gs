function ForecastUtility() {
  showTitle(arguments.callee.name);

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
        assert.ok( f( 0, "rice" )[1]=="T30:T31" );
        assert.ok( f( 1, "rice" )[1]=="Y30:Y31" );
      } );


      Q.test( "wheat", function( assert ) {
        assert.ok( f( 0, "wheat" )[3]=="T48:T55" );
        assert.ok( f( 1, "wheat" )[3]=="Y48:Y55" );
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
        assert.ok( !f("S10:S15", comm));
        assert.ok( !f("T8:U8", comm));
        assert.ok( !f("Q16:R23", comm));
        assert.ok( !f("Z17:Z18", comm));
        assert.ok( !f("U19:U24", comm));
      } );


      Q.test( "cells falses", function( assert ) {
        assert.ok( !f("W21", comm));
        assert.ok( !f("S27", comm));
        assert.ok( !f("Z30", comm));
        assert.ok( !f("T32", comm));
        assert.ok( !f("U36", comm));
      } );


      Q.test( "trues", function( assert ) {
        assert.ok( f("T12", comm));
        assert.ok( f("Y12", comm));
        assert.ok( f("T15:T16", comm));
        assert.ok( f("T20:T23", comm));
        assert.ok( f("Y20:Z22", comm));
        assert.ok( f("W36:Z36", comm));
        assert.ok( f("Y49:Y51", comm));
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
        assert.ok( f("rice").last===18);
        assert.ok( f("maize").last===18);
        assert.ok( f("wheat").last===18);
        assert.ok( f("soybean").last===18);
      } );


  };





  
  


    getFirstFcOfPeriod();
    editedWrongForecast();
    getHistoricalColNum();
}; 