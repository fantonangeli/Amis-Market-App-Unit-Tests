function Seasons() {
  showTitle(arguments.callee.name);
  
     var orig_getSheetConfig=AmisMarketApp.FirebaseConnector.getSheetConfig;

     AmisMarketApp.FirebaseConnector.getSheetConfig=function(){
       return {year:2016};
     };            
     
     Q.module(arguments.callee.name, {
       after:function(){
         AmisMarketApp.FirebaseConnector.getSheetConfig=orig_getSheetConfig;
       }
     });  

  
  
  
  
  
  
   function getYearOfSeason() {
     Q.module(arguments.callee.name);
     var f = AmisMarketApp.Seasons.getCurrentYearOfSeason;
     
      
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f("noid");
            },
            "InvalidArgument"
         );
      } );
     
      Q.test( "trues", function( assert ) {
        assert.ok( f("noid",123)==2016);
      } );

  };

     
     
     
     
     
     
   function changeSeason() {
     Q.module(arguments.callee.name);
     var f = AmisMarketApp.Seasons.changeSeason;
     
     
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f("noid");
            },
            "InvalidArgument"
         );
      } );
     
      Q.test( "wrong input", function( assert ) {
         assert.throws(
            function() {
               f(SpreadsheetApp.getActiveSpreadsheet(), 123);
            },
            "InvalidSpreadSheetYear"
         );
      } );

  }

     
     
     
     
     
     
   function newPeriodUpdateNamedRanges() {
     Q.module(arguments.callee.name);
     var f = AmisMarketApp.Seasons.newPeriodUpdateNamedRanges;
     
     
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f(SpreadsheetApp.getActiveSpreadsheet());
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f(SpreadsheetApp.getActiveSpreadsheet(), SpreadsheetApp.getActiveSheet());
            },
            "InvalidArgument"
         );
      } );
     
      Q.test( "2018", function( assert ) {
        var expected="maize_colMap_2017";
        ss={
          setNamedRange:function(name, range){
            assert.ok(name===expected)
            expected="maize_colMap_2018";
        }
        };
        
        f(ss, SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Maize"), 2017);
      } );
     
      Q.test( "2022", function( assert ) {
        var expected="maize_colMap_2021";
        ss={
          setNamedRange:function(name, range){
            assert.ok(name===expected)
            expected="maize_colMap_2022";
        }
        };
        
        f(ss, SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Maize"), 2021);
      } );

  }

     
     
     
     
     
     
   function newYearUpdateDb() {
     Q.module(arguments.callee.name);
     var f = AmisMarketApp.Seasons.newYearUpdateDb;
     
     
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f(SpreadsheetApp.getActiveSpreadsheet().getId());
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f(SpreadsheetApp.getActiveSpreadsheet(), 2017);
            },
            "InvalidArgument"
         );
      } );
     
      Q.test( "2018", function( assert ) {
        AmisMarketApp.FirebaseConnector.writeOnFirebase=function(year,sheetConfigNode,userToken){
          assert.ok(year===2018);
          assert.ok(/year$/.test(sheetConfigNode));
        };
        
        f(SpreadsheetApp.getActiveSpreadsheet().getId(), 2018, 123);
      } );

  }   






   
   
   
   function newYearUpdateTemplateCompilerCommodity() {
      var f = AmisMarketApp.Seasons.newYearUpdateTemplateCompilerCommodity;
      Q.module(arguments.callee.name);
      var s=SpreadsheetApp.getActiveSheet();
     
     var commodityJson={"ITY":["B33","July/June"],"NMY":["B8","October/September"],"country":["B1","Mexico"],"frc1NoteCrop":["T56","In the 2016/17 forecasts, the NMY covers the period from October 2016 to September 2017 and refers to the crop that is harvested mainly from November 2016 to February 2017 and from March 2017 to June 2017"],"frc1NoteITY":["T37","In the 2016/17 forecasts, the ITY covers the period from July 2016 to June 2017"],"frc1NoteNMY":["T32","In the 2016/17 forecasts, the NMY covers the period from October 2016 to September 2017 and refers to the crop that is harvested mainly from November 2016 to February 2017 and from March 2017 to June 2017"],"frc2NoteCrop":["Y56","In the 2017/18 forecasts, the NMY covers the period from October 2017 to September 2018 and refers to the crop that is harvested mainly from November 2017 to February 2018 and from March 2018 to June 2018"],"frc2NoteITY":["Y37","In the 2017/18 forecasts, the ITY covers the period from July 2017 to June 2018"],"frc2NoteNMY":["Y32","In the 2017/18 forecasts, the NMY covers the period from October 2017 to September 2018 and refers to the crop that is harvested mainly from November 2017 to February 2018 and from March 2018 to June 2018"],"note":["A32","(i) When \"by-crop\" production is available, please fill in the additional  lines at the bottom of this form"]};
   
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f();
            },
           /InvalidArgument/
         );
        assert.throws(
           function() {
              f(s);
           },
           /InvalidArgument/
        );
      } );
      
      Q.test( "ok", function( assert ) {
         var retVal=f(s, commodityJson);
        
        assert.ok( retVal.frc1NoteCrop[0]==="U56" );
         assert.ok( retVal.frc1NoteNMY[0]==="U32" );
         assert.ok( retVal.frc2NoteITY[0]==="Z37" );
      } );
     
     
   };   
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  getYearOfSeason();
  changeSeason();
  newPeriodUpdateNamedRanges();
  newYearUpdateDb();
  newYearUpdateTemplateCompilerCommodity();
}; 