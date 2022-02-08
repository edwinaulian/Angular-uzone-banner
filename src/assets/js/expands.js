$(function() {
    var icons = {
  header: "ui-icon-circle-arrow-e",
  activeHeader: "ui-icon-circle-arrow-s"
};
$( "#accordion" ).accordion({
    collapsible: true,
    active: false,
  icons: icons,
  heightStyle: "content"
});
$( "#toggle" ).button().click(function() {
  if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
    $( "#accordion" ).accordion( "option", "icons", null );
  } else {
    $( "#accordion" ).accordion( "option", "icons", icons );
  }
});
});