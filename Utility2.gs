function Utility() {
    showTitle( arguments.callee.name );

   function isInRange() {
      var f = AmisMarketApp.Utility.isInRange;
      Q.module(arguments.callee.name);
      
      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f( "F14:h34" );
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
      } );


      Q.test( "cell in range", function( assert ) {
         assert.ok( f( "F14:H34", "G20" ) );
         assert.ok( !f( "F14:H34", "B20" ) );
         assert.ok( !f( "F14:H34", "F10" ) );
         assert.ok( f( "F14:H34", "F14" ) );
         assert.ok( f( "F14:H34", "H34" ) );
         assert.ok( f( "F14:H34", "H14" ) );
         assert.ok( f( "F14:H34", "F34" ) );
         assert.ok( f( "F14:H34", "H20" ) );
         assert.ok( f( "F14:H34", "F20" ) );
         assert.ok( !f( "F14:H34", "I16" ) );
         assert.ok( !f( "F14:H34", "E17" ) );
         assert.ok( !f( "F14:H34", "G13" ) );
         assert.ok( !f( "F14:H34", "I17" ) );
         assert.ok( !f( "F14:H34", "H35" ) );
      } );

      Q.test( "cell in column", function( assert ) {
          var range="G:G";
         assert.ok( f( range, "G1" ) );
         assert.ok( f( range, "G5" ) );
         assert.ok( f( range, "G18" ) );
         assert.ok( f( range, "G35" ) );
         assert.ok( !f( range, "F1" ) );
         assert.ok( !f( range, "H1" ) );
         assert.ok( !f( range, "F16" ) );
         assert.ok( !f( range, "H16" ) );
         assert.ok( !f( range, "F35" ) );
         assert.ok( !f( range, "H35" ) );
         assert.ok( !f( range, "B12" ) );
         assert.ok( !f( range, "C27" ) );
         assert.ok( !f( range, "K24" ) );
         assert.ok( !f( range, "P6" ) );
         assert.ok( !f( "AB:AB", "P6" ) );
      } );

  };
      
   function isRangesOverlap() {
      var f = AmisMarketApp.Utility.isRangesOverlap;
      Q.module(arguments.callee.name);

      Q.test( "undef", function( assert ) {
         assert.throws(
            function() {
               f( "F14:h34" );
            },
            "InvalidArgument"
         );
         assert.throws(
            function() {
               f();
            },
            "InvalidArgument"
         );
      } );
      
      Q.test( "range in range falses", function( assert ) {
          var range="F9:H21";
         assert.ok( !f( range, "E2:H8" ) );
         assert.ok( !f( range, "I12:J15" ) );
         assert.ok( !f( range, "G22:G26" ) );
         assert.ok( !f( range, "C18:E20" ) );
         assert.ok( !f( range, "G3:H5" ) );
         assert.ok( !f( range, "C9:D15" ) );
         assert.ok( !f( range, "J14:K14" ) );
         assert.ok( !f( range, "H25:K26" ) );
         assert.ok( !f( range, "F29:G32" ) );
      } );
      
      Q.test( "range in range true", function( assert ) {
          var range="F9:H21";
         assert.ok( f( range, "E9:F11" ) );
         assert.ok( f( range, "G12:H13" ) );
         assert.ok( f( range, "H16:K18" ) );
         assert.ok( f( range, "E18:F18" ) );
         assert.ok( f( range, "E21:F24" ) );
         assert.ok( f( range, "H21:H22" ) );
        assert.ok( f( range, "C4:K29" ) );
        assert.ok( f( range, "G15:G17" ) );
     } );
      
      Q.test( "column in range", function( assert ) {
          var range="F9:H21";
         assert.ok( !f( range, "E:E" ) );
         assert.ok( f( range, "F:F" ) );
         assert.ok( f( range, "G:G" ) );
         assert.ok( f( range, "H:H" ) );
         assert.ok( !f( range, "I:I" ) );
         assert.ok( !f( range, "J:J" ) );
         assert.ok( !f( range, "AB:AB" ) );
      } );
   };


   function isCell() {
      var f = AmisMarketApp.Utility.isCell;
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
              f("");
           },
           "InvalidArgument"
        );
      } );
      
      Q.test( "ranges", function( assert ) {
         assert.ok( !f( "E2:H8" ) );
         assert.ok( !f( "I12:J15" ) );
         assert.ok( !f( "G22:G26" ) );
         assert.ok( !f( "C18:E20" ) );
         assert.ok( !f( "G3:H5" ) );
         assert.ok( !f( "C9:D15" ) );
         assert.ok( !f( "J14:K14" ) );
         assert.ok( !f( "H25:K26" ) );
         assert.ok( !f( "F29:GN32" ) );
      } );
      
      Q.test( "cells", function( assert ) {
         assert.ok( f( "B4" ) );
         assert.ok( f( "AN3" ) );
         assert.ok( f( "B44" ) );
         assert.ok( f( "AN44" ) );
     } );
      
      Q.test( "columns", function( assert ) {
         assert.ok( !f( "E:E" ) );
         assert.ok( !f( "F:F" ) );
         assert.ok( !f( "G:G" ) );
         assert.ok( !f( "H:H" ) );
         assert.ok( !f( "I:I" ) );
         assert.ok( !f( "J:J" ) );
      } );
      
      Q.test( "invalid", function( assert ) {
         assert.ok( !f( "B" ) );
         assert.ok( !f( "4" ) );
         assert.ok( !f( "44" ) );
         assert.ok( !f( "B 4" ) );
         assert.ok( !f( " B4" ) );
         assert.ok( !f( "B4 " ) );
         assert.ok( !f( "B:C4" ) );
         assert.ok( !f( "B4:C" ) );
         assert.ok( !f( "b" ) );
         assert.ok( !f( "4" ) );
         assert.ok( !f( "44" ) );
         assert.ok( !f( "b 4" ) );
         assert.ok( !f( " b4" ) );
         assert.ok( !f( "b4 " ) );
         assert.ok( !f( "b:c4" ) );
         assert.ok( !f( "b4:c" ) );
      } );
   };   






   
   
   
   function isRange() {
      var f = AmisMarketApp.Utility.isRange;
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
              f("");
           },
           "InvalidArgument"
        );
      } );
      
      Q.test( "ranges", function( assert ) {
         assert.ok( f( "E2:H8" ) );
         assert.ok( f( "I12:J15" ) );
         assert.ok( f( "G22:G26" ) );
         assert.ok( f( "C18:E20" ) );
         assert.ok( f( "G3:H5" ) );
         assert.ok( f( "C9:D15" ) );
         assert.ok( f( "J14:K14" ) );
         assert.ok( f( "H25:K26" ) );
         assert.ok( f( "F29:GN32" ) );
      } );
      
      Q.test( "cells", function( assert ) {
         assert.ok( !f( "B4" ) );
         assert.ok( !f( "AN3" ) );
         assert.ok( !f( "B44" ) );
         assert.ok( !f( "AN44" ) );
     } );
      
      Q.test( "columns", function( assert ) {
         assert.ok( f( "E:E" ) );
         assert.ok( f( "F:F" ) );
         assert.ok( f( "G:G" ) );
         assert.ok( f( "H:H" ) );
         assert.ok( f( "I:I" ) );
         assert.ok( f( "J:J" ) );
      } );
      
      Q.test( "invalid", function( assert ) {
         assert.ok( !f( "B" ) );
         assert.ok( !f( "4" ) );
         assert.ok( !f( "B 4" ) );
         assert.ok( !f( " B4" ) );
         assert.ok( !f( "B4 " ) );
         assert.ok( !f( "B:C4" ) );
         assert.ok( !f( "B4:C" ) );
         assert.ok( !f( "b" ) );
         assert.ok( !f( "4" ) );
         assert.ok( !f( "b 4" ) );
         assert.ok( !f( " b4" ) );
         assert.ok( !f( "b4 " ) );
         assert.ok( !f( "b:c4" ) );
         assert.ok( !f( "b4:c" ) );
      } );
   };   






   
   
   
   function getRangeColumns() {
      var f = AmisMarketApp.Utility.getRangeColumns;
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
              f("");
           },
           "InvalidArgument"
        );
      } );
     
      Q.module(arguments.callee.name);
   
      Q.test( "InvalidRange", function( assert ) {
         assert.throws(
            function() {
               f("D4");
            },
            "InvalidRange"
         );
        assert.throws(
           function() {
             f("D:D");
           },
           "InvalidArgument"
        );
      } );
      
      Q.test( "ranges", function( assert ) {
         assert.ok( f( "E2:H8" )==="E:H" );
         assert.ok( f( "I12:J15" )==="I:J" );
         assert.ok( f( "G22:G26" )==="G:G" );
         assert.ok( f( "C18:E20" )==="C:E" );
         assert.ok( f( "G3:H5" )==="G:H" );
         assert.ok( f( "C9:D15" )==="C:D" );
         assert.ok( f( "J14:K14" )==="J:K" );
         assert.ok( f( "H25:K26" )==="H:K" );
         assert.ok( f( "F29:G32" )==="F:G" );
         assert.ok( f( "F29:GH32" )==="F:GH" );
        assert.ok( f( "AV29:BC32" )==="AV:BC" );
      } );
   };   






   
   
   
   function A1Offset() {
      var f = AmisMarketApp.Utility.A1Offset;
      Q.module(arguments.callee.name);
      var s=SpreadsheetApp.getActiveSheet();
   
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
      
      Q.test( "cells", function( assert ) {
         assert.ok( f( s, "E2" )==="E2" );
         assert.ok( f( s, "E2", 1 )==="E3" );
         assert.ok( f( s, "E2", 5 )==="E7" );
         assert.ok( f( s, "E2", -1 )==="E1" );
         assert.ok( f( s, "A1", 1, 1)==="B2" );
         assert.ok( f( s, "E2", 0, 1)==="F2" );
         assert.ok( f( s, "E2", 0, 5)==="J2" );
         assert.ok( f( s, "E2", 0, -3)==="B2" );
         assert.ok( f( s, "E2", 5, 5)==="J7" );
      } );
      
      Q.test( "ranges", function( assert ) {
         assert.ok( f( s, "E2:H8" )==="E2:H8" );
         assert.ok( f( s, "E2:H8", 1 )==="E3:H9" );
         assert.ok( f( s, "E2:H8", 5 )==="E7:H13" );
         assert.ok( f( s, "E2:H8", -1 )==="E1:H7" );
         assert.ok( f( s, "E2:H8", 0, 1)==="F2:I8" );
         assert.ok( f( s, "E2:H8", 0, 5)==="J2:M8" );
         assert.ok( f( s, "E2:H8", 0, -3)==="B2:E8" );
         assert.ok( f( s, "E2:H8", 5, 5)==="J7:M13" );
      } );
      
      Q.test( "InvalidOffset", function( assert ) {
        assert.throws(
           function() {
             f(s, "B2:C4", -10, 0);
           },
           /InvalidOffset/
        );
        assert.throws(
           function() {
             f(s, "B2:C4", 0, -10);
           },
           /InvalidOffset/
        );
        assert.throws(
           function() {
             f(s, "B2:C4", -10, -10);
           },
           /InvalidOffset/
        );
      } );
     
     
   };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


   isInRange();
   isRangesOverlap();
   isCell();
   isRange();
   getRangeColumns();
   A1Offset();
}; 
//-