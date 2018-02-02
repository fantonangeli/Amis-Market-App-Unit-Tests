Q.helpers( this );

function tests(){
  Utility();
  ForecastUtility();
  Seasons();
  AmisRange();
  FirebaseConnector();
}

function doGet( e ) {
   Q.urlParams( e.parameter );
   Q.config( {
      title: "QUnit for AmisMarketApp", // Sets the title of the test page.
     hidepassed: true,
     notrycatch: false
   } );
   Q.load(tests);

   return Q.getHtml();
};



/**
 * show a title in the tests list (there is no the nested modules functionality with QUnit for GAS)
 * @param  {string} title the title
 * @return {void}       
 */
function showTitle( title ) {
   Q.module( title );

   Q.test( "--------------------------------------------------------------------------------------------------------------------------------------------------------------", function( assert ) {
      assert.ok( true );
   } );

}