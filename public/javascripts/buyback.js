/**
 * @author Tor Livar Flugsrud
 */

$(function() {
  
  $("#buybackcalculator").submit(function(event) {
    event.preventDefault();
    var result = $("#raw_textarea").val();
    alert(result);
    $.post('/buyback',
      {
        raw_paste: result
      }, function(data) {
        $("#contractvalue_input").val(data);
        $(".contractvalue_section").slideDown();
     }
  ).error(function() {
   alert("Error"); 
  });
  return false;
  });
});
