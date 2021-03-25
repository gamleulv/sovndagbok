$(document).ready(function(){

  // Calculation /Datapoint-1 
  $(document).on('click', '#timefield2, #timefield4, body', function(){
    //var day = '1/1/2016 ',
    //start = $('#timefield2').val(),
    //end = $('#timefield4').val(),
    //diff_in_min = ( Date.parse(day + end) - Date.parse(day + start) ) / 1000 / 60;
    //diff_in_min = Math.abs(diff_in_min);

    //$('#datapointH').val(diff_in_min);

    var s1 = $('#timefield2').val(); 
    var s2 = $('#timefield4').val(); 
    var start = "04/jan/2013 " + s1; 
    var end = "04/jan/2013 "+ s2; 
    var ms = moment(end,"DD/MMM/YYYY hh:mm a").diff(moment(start,"DD/MMM/YYYY hh:mm a")); 
    var d = moment.duration(ms); 
    var result; 
    result= d/60000; 
    if (result<0){ 
      var end1 = "05/jan/2013 "+ s2; 
      var ms1 = moment(end1,"DD/MMM/YYYY hh:mm a").diff(moment(start,"DD/MMM/YYYY hh:mm a")); 
      var d1 = moment.duration(ms1); result = d1/60000; } 
    var diff_in_min = result;

    $('#datapointH').val(diff_in_min);


  });


  // Calculation /Datapoint-2 
  $(document).on('click', '#timefield, #timefield2, body', function(){
    //var day = '1/1/2016 ',
    //start = $('#timefield').val(),
    //end = $('#timefield2').val(),
    //diff_in_min = ( Date.parse(day + end) - Date.parse(day + start) ) / 1000 / 60;

    var s1 = $('#timefield').val(); 
    var s2 = $('#timefield2').val(); 
    var start = "04/jan/2013 " + s1; 
    var end = "04/jan/2013 "+ s2; 
    var ms = moment(end,"DD/MMM/YYYY hh:mm a").diff(moment(start,"DD/MMM/YYYY hh:mm a")); 
    var d = moment.duration(ms); 
    var result; 
    result= d/60000; 
    if (result<0){ 
      var end1 = "05/jan/2013 "+ s2; 
      var ms1 = moment(end1,"DD/MMM/YYYY hh:mm a").diff(moment(start,"DD/MMM/YYYY hh:mm a")); 
      var d1 = moment.duration(ms1); result = d1/60000; } 
    var diff_in_min = result;

    $('#datapointI').val(diff_in_min);
  });


  // Calculation /Datapoint-3 
  $(document).on('click', '#timefield3, #timefield4, body', function(){
    //var day = '1/1/2016 ',
    //start = $('#timefield3').val(),
    //end = $('#timefield4').val(),
    //diff_in_min = ( Date.parse(day + end) - Date.parse(day + start) ) / 1000 / 60;
    //diff_in_min = Math.abs(diff_in_min);


    var s1 = $('#timefield3').val(); 
    var s2 = $('#timefield4').val(); 
    var start = "04/jan/2013 " + s1; 
    var end = "04/jan/2013 "+ s2; 
    var ms = moment(end,"DD/MMM/YYYY hh:mm a").diff(moment(start,"DD/MMM/YYYY hh:mm a")); 
    var d = moment.duration(ms); 
    var result; 
    result= d/60000; 
    if (result<0){ 
      var end1 = "05/jan/2013 "+ s2; 
      var ms1 = moment(end1,"DD/MMM/YYYY hh:mm a").diff(moment(start,"DD/MMM/YYYY hh:mm a")); 
      var d1 = moment.duration(ms1); result = d1/60000; } 
    var diff_in_min = result;


    $('#datapointJ').val(diff_in_min);
  });


  // Calculation /Datapoint-4 
  $(document).on('click change', '#dropdown, #dropdown4, body', function(){
    var drp = $('#dropdown').val(),
        drp4 = $('#dropdown4').val(),
        drp3 = $('#dropdown3').val(),
        valj = $('#datapointJ').val();
    //var totalval = parseInt(drp) + (parseInt(drp4) * parseInt(drp3)) + parseInt(valj);
    var totalval = parseInt(drp) + parseInt(drp4) + parseInt(valj);
    if (isNaN(totalval)) {
      $('#datapointK').val('0');
    }
    else{
      $('#datapointK').val(totalval);
    }
  });


  // Calculation /Datapoint-5 
  $(document).on('click change', '#datapointH, #datapointK, body', function(){
    var dph = $('#datapointH').val(),
        dpk = $('#datapointK').val();
    var totalval = parseInt(dph) - parseInt(dpk);
    if (isNaN(totalval)) {
      $('#datapointL').val('0');
    }
    else{
      $('#datapointL').val(totalval);
    }
  });


  // Calculation /Datapoint-6
  $(document).on('click change', '#datapointL, #datapointH, body', function(){
    var dpl = $('#datapointL').val(),
        dph = $('#datapointH').val();
    var totalval = (parseInt(dpl) / parseInt(dph)) * 100;
    if (isNaN(totalval)) {
      $('#datapointM').val('0');
    }
    else{
      totalval = Math.round(totalval);
      $('#datapointM').val(totalval);
    }
  });


  // Calculation /Datapoint-7
  $(document).on('click change', '#datapointL, #dropdown2, body', function(){
    var dpl = $('#datapointL').val(),
        drp = $('#dropdown2').val();
    var totalval = parseInt(dpl) + parseInt(drp);
    if (isNaN(totalval)) {
      $('#datapointZ').val('0');
    }
    else{
      $('#datapointZ').val(totalval);
    }
  });

});