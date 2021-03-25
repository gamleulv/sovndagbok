$(document).ready(function(){

  var operation = "A"; //"A"=Adding; "E"=Editing
  var timefieldWarning = false;
  var selected_index = -1; //Index of the selected list item
  var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {},
      $checkboxes = $("#AT :checkbox");


  window.sortedDates = [];
  getSortedDates();

  $('#sleepQualityAT').hide();
  $('#sleepQualitySlider').show();
  
  window.navChecked = false; // global variable for assistive technology checkbox
  $('#ATbox').prop('checked', false);
  var cookieATbox = readCookie('cookieATbox'); // get stored cookie value if available
  if (cookieATbox == null || cookieATbox == undefined) {
    createCookie('cookieATbox','1',7); // initialize cookie to default value (1 = false)
    $('#sleepQualityAT').hide();
    $('#sleepQualitySlider').show();
  }
  else if (cookieATbox == '2') {
    window.navChecked = true;
    $('#ATbox').prop('checked', true);
    $('#sleepQualitySlider').hide();
    $('#sleepQualityAT').show();
    createCookie('cookieATbox','2',7);
  }
  else if (cookieATbox == '1') {
	  
    window.navChecked = false;
    $('#ATbox').prop('checked', false);
    $('#sleepQualityAT').hide();
    $('#sleepQualitySlider').show();
    createCookie('cookieATbox','1',7);
  }
  
  $('#AT').on('change', ':checkbox', function () {
    if ($(this).is(':checked')) {
      window.navChecked = true;
      $('#ATbox').prop('checked', true);
      $('#sleepQualitySlider').hide();
      $('#sleepQualityAT').show();
      createCookie('cookieATbox','2',7);
    } else {
      window.navChecked = false;
      $('#ATbox').prop('checked', false);
      $('#sleepQualityAT').hide();
      $('#sleepQualitySlider').show();
      createCookie('cookieATbox','1',7);
    }
  });

  // handle Assistive Technology checkbox
  $(document).keypress(function(e){
    if((e.keyCode ? e.keyCode : e.which) == 92){
      $('#ATbox').trigger('click');
    }
  });

  $('#sleepQuality').val('5'); // set default value for sleep quality Assistive Technology dropdown

  function Add(){
    var checkrequire = $("#datefield").val();

    if (checkrequire=='') {
      $('[href="#datetime"]').trigger('click');
    }
    else {
      // determine length so we know where to place the new entry
      var index = sortedDates.length;

      var rangeSlide = 5; // default value for range slider
      if (window.navChecked) { // use dropdown rather than slider value if ATbox is checked
        rangeSlide = $("#sleepQuality").val();
      }
      else {
        rangeSlide = $("#rangeSlide").val();
      }

      var key = $("#datefield").val();
      localStorage.setItem(key, JSON.stringify({
        Date   : $("#datefield").val(),
        Moment : moment($("#datefield").val(), 'MM/DD/YYYY'),
        Time   : $("#timefield").val(),
        Time2   : $("#timefield2").val(),
        Dropdown : $("#dropdown").val(),
        Dropdown2 : $("#dropdown2").val(),
        Dropdown3 : $("#dropdown3").val(),
        Dropdown4 : $("#dropdown4").val(),
        Time3   : $("#timefield3").val(),
        Time4   : $("#timefield4").val(),
        Dropdown5 : $("#dropdown5").val(),
        RangeSlide : rangeSlide,

        datapointH : $("#datapointH").val(),
        datapointI : $("#datapointI").val(),
        datapointJ : $("#datapointJ").val(),
        datapointK : $("#datapointK").val(),
        datapointL : $("#datapointL").val(),
        datapointM : $("#datapointM").val(),
        datapointZ : $("#datapointZ").val()
      }));

      $("#popupmodal").modal('hide');
      List();

      notification("The new sleep data was saved.", 3500);
      window.location.href = 'sleepinfo.html';
    }

    return true;
  } 

  function Edit() {
    var key = $("#datefield").val();

    var rangeSlide = 5; // default value for range slider
    if (window.navChecked) { // use dropdown rather than slider value if ATbox is checked
      rangeSlide = $("#sleepQuality").val();
    }
    else {
      rangeSlide = $("#rangeSlide").val();
    }

    localStorage.setItem(key, JSON.stringify({
      Date   : $("#datefield").val(),
      Moment : moment($("#datefield").val(), 'MM/DD/YYYY'),
      Time   : $("#timefield").val(),
      Time2   : $("#timefield2").val(),
      Dropdown : $("#dropdown").val(),
      Dropdown2 : $("#dropdown2").val(),
      Dropdown3 : $("#dropdown3").val(),
      Dropdown4 : $("#dropdown4").val(),
      Time3   : $("#timefield3").val(),
      Time4   : $("#timefield4").val(),
      Dropdown5 : $("#dropdown5").val(),
      RangeSlide : rangeSlide,

      datapointH : $("#datapointH").val(),
      datapointI : $("#datapointI").val(),
      datapointJ : $("#datapointJ").val(),
      datapointK : $("#datapointK").val(),
      datapointL : $("#datapointL").val(),
      datapointM : $("#datapointM").val(),
      datapointZ : $("#datapointZ").val()
    }));//Alter the selected item on the table

    notification("Your sleep entry edited.", 3500);
    $("#popupmodal").modal('hide');
    $('[href="#datetime"]').trigger('click');
    List();
    operation = "A"; //Return to default value
    setTimeout(function(){
      location.reload();
      window.location.href = 'sleepinfo.html';
    },1500);
    return true;
  } 

  function Delete(){
    var myArrayPosition = selected_index;
    var deleteMe = sortedDates[myArrayPosition];
    localStorage.removeItem(deleteMe.Date);
    notification("Sleep entry deleted.", 3500);
  }

  function getSortedDates() {
    var localStorageArray = [];
    var localStorageKeys = [];
    var localStorageMoments = [];
    var arrayPosition = 0;
    if (localStorage.length > 0){
      for (i = 0; i < localStorage.length; i++) {
         //make sure the local storage key is actually a date
        var $testID = localStorage.key(i);
        var aDate = moment($testID, 'MM/DD/YYYY', true);
        var $isValid = aDate.isValid();
        if($isValid) {
          var aarr = JSON.parse(localStorage.getItem(localStorage.key(i)));
          localStorageKeys[arrayPosition] = localStorage.key(i);
          localStorageArray[arrayPosition] = localStorage.getItem(localStorage.key(i));
          localStorageMoments[arrayPosition] = moment(aarr.Moment);
          arrayPosition++
        }
      }
    }

    // sort date array
    localStorageMoments.sort(function(a,b){
      return a.diff(b);
    });

    for (i = 0; i < localStorageMoments.length; i++) {
      for (j = localStorageMoments.length - 1; j >= 0; j--) { 
        if (localStorageKeys[j] == localStorageMoments[i].format('MM/DD/YYYY')) {
          sortedDates[i] = JSON.parse(localStorageArray[j]);
        }
      }
    }
  }

  function List(){
    $("#tblList").html();

    $("#tblList").html(
      "<thead>" +
      "<tr>" +
      "<th>Date</th>" +
      "<th>Total Time in Bed</th>" +
      "<th>Total time asleep</th>" +
      "<th>Sleep Efficiency</th>" +
      "<th>Edit/Delete</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    );

    getSortedDates();
    
    for (i = 0; i < sortedDates.length; i++)
    {
      var cli = sortedDates[i];

      if(cli.datapointM <= 0){
        cli.datapointM = "ERROR<BR><span class='sleep-info'>Please verify time inputs</span>";
      }
      else{
        cli.datapointM += "%";
      }

      if(cli.datapointZ <= 0){
        cli.datapointZ = "ERROR";
      }
      else{
        cli.datapointZ += "";
      }

      var dpHconverted = convertToHrsMin(cli.datapointH);
      var dpLconverted = convertToHrsMin(cli.datapointL);

      $("#tblList").append(
        "<tr>" +
        "<td><div><span class='visible-xs-block pull-left'>Date:</span><a href='sleepdetails.html#"+i+"' title='View sleep entry for "+cli.Date+"'><div>"+cli.Date+"</a></div></td>" +
        "<td><div tabindex='0'><span class='visible-xs-block pull-left'>Total Time in Bed:</span>"+dpHconverted+"</div></td>" +
        "<td><div tabindex='0'><span class='visible-xs-block pull-left'>Total time asleep::</span>"+dpLconverted+"</div></td>" +
        "<td><div tabindex='0'><span class='visible-xs-block pull-left'>Sleep Efficiency:</span><strong><div>"+cli.datapointM+"</strong></div></td>" +
        "<td data-label='Action'><span tabindex='0'><span alt='Edit"+i+"' class='btn btn-xm btn-primary glyphicon glyphicon-edit btnEdit' title='Edit this sleep entry for "+cli.Date+"'></span></span>&nbsp;<span tabindex='0'><span alt='Delete"+i+"'' class='btn btn-xm btn-danger glyphicon glyphicon-trash btnDelete' title='Delete this sleep entry for "+cli.Date+"''></span></span></td>" +
        "</tr>" 
      );
    }

  } 

  $("#timefield, #timefield2, #timefield3, #timefield4").focus(function() {
    timefieldWarning = false;
  });

  $("#btnSave").bind("click",function(){
    // Timefield error checking
    $("body").click();
    var selectedDate = $('#datefield').val();
    var time1 = $('#timefield').val();
    var time2 = $('#timefield2').val();
    var time3 = $('#timefield3').val();
    var time4 = $('#timefield4').val();

    var date1 = moment(selectedDate + time1, 'MM/DD/YYYYHH:mm a');
    var date2 = moment(selectedDate + time2, 'MM/DD/YYYYHH:mm a');
    var date3 = moment(selectedDate + time3, 'MM/DD/YYYYHH:mm a');
    var date4 = moment(selectedDate + time4, 'MM/DD/YYYYHH:mm a');

    var minDiff = date1.diff(date2, 'minutes');
    var minDiff2 = date3.diff(date4, 'minutes');

    var giveWarning = false;

    /* (minDiff >= 120 || minDiff <= -120) {
      giveWarning = true;
    }

    if (minDiff2 >= 120 || minDiff2 <= 120) {
      giveWarning = true;
    }
	*/

    if (!timefieldWarning && giveWarning) {
      $('#timefield-warning').modal('show');
      timefieldWarning = true;
      return;
    }
    else {
      setTimeout(function(){
        $("#frmCadastre input").val('');
        $('[href="#datetime"]').trigger('click');
      },500);
      if (operation == "A") {
        return Add();
      }
      else {
        return Edit();
      }
    }
  });

  $('#popupmodal').on('shown.bs.modal', function () {
    checkDuplicate(); // check for duplicate date entry
    if (window.navChecked) { // remove datepicker if Assistive Technology is selected
      $('.date-box').datepicker('destroy');
    }
    else {
      $('.date-box').datepicker();
    }
  });

  $(document).on("click", ".btnEdit", function(){
    $("#popupmodal").modal('show');
    $('#popupmodal a[href="#menu1"]').tab('show');

    $('#datefield').attr('disabled','disabled');
    $('#btnSave').removeAttr("disabled");

    operation = "E";
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));

    var myArrayPosition = selected_index;
    var editMe = sortedDates[myArrayPosition];


    var cli = JSON.parse(localStorage.getItem(editMe.Date));

    $("#idfield").val(cli.Id);
    $("#datefield").val(cli.Date);
    $("#timefield").val(cli.Time);
    $("#timefield2").val(cli.Time2);
    if(cli.Dropdown2 > 1) {$( "#yesno2" ).prop( "checked", true ); $("#ddtab2").show();} else {$( "#yesno2_no" ).prop( "checked", true );}
    $("#dropdown").val(cli.Dropdown);
    $("#dropdown2").val(cli.Dropdown2);

    if(cli.Dropdown3 > 1) {$( "#yesno3" ).prop( "checked", true ); $("#ddtab3").show();} else {$( "#yesno3_no" ).prop( "checked", true );}
    $("#dropdown3").val(cli.Dropdown3);
    $("#dropdown4").val(cli.Dropdown4);
    $("#timefield3").val(cli.Time3);
    $("#timefield4").val(cli.Time4);
    if(cli.Dropdown5 > 1) {$( "#yesno4" ).prop( "checked", true ); $("#ddtab4").show();} else {$( "#yesno4_no" ).prop( "checked", true );}
    $("#dropdown5").val(cli.Dropdown5);
    $("#rangeSlide").val(cli.RangeSlide);
    $("#sleepQuality").val(cli.RangeSlide);	
    $("#drop1Adddrop2").val(cli.AddD1D2);
    $("#datefield").focus();
  }); 
  $(document).on("click", ".btnDelete", function(){
    var conf = confirm("Are you sure you want to delete this sleep entry?");
    if (conf == true) {
      selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
      Delete();
      List();
      //window.close();
      setTimeout(function(){
        window.location.href = 'sleepinfo.html';

      },1500);
    }
  }); 

  // When adding new Sleep Data, check to make sure the date hasn't already been selected
  // Throw an error message inside the Add Sleep Data modal and link to the Edit page
  $('#datefield').change(function() {
    checkDuplicate();
  });

  function checkDuplicate() {
    var newDate = $('#datefield').val()
    var index = null;
    var saveDisabled = false;

    if (localStorage.length > 0){
      for (i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == newDate && operation != "E") {
          saveDisabled = true; 
          index = i;
        }
      }
    }

    if (saveDisabled) {
      $('#btnSave').prop('disabled', true);
      $("#confirm-edit-duplicate").modal('show');
      return true;
    }
    else if (!saveDisabled) {
      $('#btnSave').prop('disabled', false);
      return false;
    }   
  }

  // when page load then data table should be rendered 
  List();

  // click on add entry button
  $('#addentry, #dismissmodal').on('click', function(){
    timefieldWarning = false;
    $('#rangeSlide').val('5');
    $('#popupmodal a[href="#menu1"]').tab('show');
    $('#datefield').removeAttr('disabled');
    $('#btnSave').attr("disabled");
    document.getElementById("timefield").value = "10:00 PM";
    document.getElementById("timefield2").value = "11:00 PM";
    document.getElementById("timefield3").value = "06:00 AM";
    document.getElementById("timefield4").value = "07:00 AM";

    //$('#timefield').val('8:00 pm');
    //$('#timefield2').val('9:00 pm');
    //$('#timefield3').val('6:00 am');
    //$('#timefield4').val('7:00 am');
  });


  // page refresh on single page after edited data
  $(document).on('click', '.btnEdited', function(){
    setTimeout(function(){
      location.reload();
      window.location.href = 'sleepinfo.html';

    },1500);
  });


  // notification function
  function notification(msg, time){
    $('.notify').addClass('common');
    $('.notify').html(msg);
    setTimeout(function(){
      $('.notify').removeClass('common');
    },time);
  }


  // required field
  $('.required').on('click focus blur', function(){
    var getid = this.id;
    var checkval = $(this).val();
    if (checkval=='') {
      $('[data-required="#'+getid+'"]').show();
    }
    else{
      $('[data-required="#'+getid+'"]').hide();
    }
  });

  // after selection date then require msg will be hide
  $('.dd-s').on('click', function(){
    $('[data-required="#datefield"]').hide();
  })

  // //////////////////////////////////////////////////////////
  // get a single record
  var getHash = window.location.hash.substr(1);
  $('#singlEdit').attr('alt', 'Edit'+getHash);
  $('#singlDelete').attr('alt', 'Delete'+getHash);

  function singleRecord(index){
    if (sortedDates.length > 0) {
      if(index == '') {
        index = 0;
      }    
      var cli = sortedDates[index];
      var dpDropdownconverted = cli.Dropdown;
      var dpDropdown2converted = cli.Dropdown2;
      var dpDropdown4converted = cli.Dropdown4;
      var dpDropdown5converted = cli.Dropdown5;
      var dpHconverted = cli.datapointH;
      var dpIconverted = cli.datapointI;
      var dpJconverted = cli.datapointJ;
      var dpKconverted = cli.datapointK;
      var dpLconverted = cli.datapointL;
      var dpZconverted = cli.datapointZ;

      var convertArray = [dpDropdownconverted,dpDropdown2converted,dpDropdown4converted,dpDropdown5converted,dpHconverted,dpIconverted,dpJconverted,dpKconverted,dpLconverted, dpZconverted];
      for (var i = 0, len = convertArray.length; i < len; i++) {
        if (convertArray[i] > 59) {
          convertArray[i] = convertToHrsMin(convertArray[i]);
        } else {
          convertArray[i] = convertArray[i] + '&#8209;Minutes'
        }
      }

      var rangeConverted = '';
      if (cli.RangeSlide == 0) {
        rangeConverted = 'Very Poor';
      }
      if (cli.RangeSlide == 2.5) {
        rangeConverted = 'Poor';
      }
      if (cli.RangeSlide == 5) {
        rangeConverted = 'Fair';
      }
      if (cli.RangeSlide == 7.5) {
        rangeConverted = 'Good';
      }
      if (cli.RangeSlide == 10) {
        rangeConverted = 'Very Good';
      }
      $("#datetxt").html(cli.Date);
      $("#timetxt").html(cli.Time);
      $("#timetxt2").html(cli.Time2);
      $("#dropdowntxt").html(convertArray[0]);
      $("#dropdowntxt2").html(convertArray[1]);
      $("#dropdowntxt3").html(cli.Dropdown3);
      $("#dropdowntxt4").html(convertArray[2]);
      $("#timetxt3").html(cli.Time3);
      $("#timetxt4").html(cli.Time4);
      $("#dropdowntxt5").html(convertArray[3]);
      $("#rangeSlidetxt").html(rangeConverted);
      $("#drop1Adddrop2txt").html(cli.AddD1D2);
      $("#calcHtxt").html(convertArray[4]);
      $("#calcItxt").html(convertArray[5]);
      $("#calcJtxt").html(convertArray[6]);
      $("#calcKtxt").html(convertArray[7]);
      $("#calcLtxt").html(convertArray[8]);
      $("#calcMtxt").html(cli.datapointM);
      $("#calcZtxt").html(convertArray[9]);

      $('#singlEdit').attr('alt', 'Edit'+index);
      $('#singlDelete').attr('alt', 'Delete'+index);

      if (localStorage.getItem("downloadHistory") != "null") {
        // set for download history and last date. 
        $("#downloadHistorytxt").html(localStorage.getItem("downloadHistory"));
        var fineLastDate = localStorage.getItem("downloadHistory");
        if (fineLastDate != null) {
          var lastIndex = fineLastDate.lastIndexOf(",");
          var lastDate = fineLastDate.substring(lastIndex + 1);
          $("#lasDownloadtxt").html(lastDate);
        }
      }
    }
  };

  $(document).on('click', '[data-urlset]', function(){
    var gethashval = $(this).data('urlset');
    window.open('sleepdetails.html'+gethashval);
  });

  // If url does not match then again load record from localstorage
  var oldURL = "";
  function checkURLchange(currentURL){
    if(currentURL != oldURL){
      var type = window.location.hash.substr(1);
      singleRecord(type);
      oldURL = currentURL;
    }
  }
  oldURL = window.location.href;
  var cleartime = setInterval(function() {
    checkURLchange(window.location.href);
  },1500);

  singleRecord(getHash);

  // Close window
  $('#backbtn').click(function(){
    window.top.close();
    window.close();
  });

  //add sleep diary entries
  $('#sleep-tools').click(function(){
    addSleep();
  });

  getSortedDates();

  
});

function convertToHrsMin(minutes) {
    var MinHours = Math.floor(minutes / 60);
    var MinMinutes = minutes % 60;
    if(MinHours == 1) {
      MinHours = MinHours + '&#8209;Hour  '
    } else {
      if(MinHours == 0) {
        MinHours = '';
      } else {
        MinHours = MinHours + '&#8209;Hours  '
      }
    }
    if(MinMinutes == 1) {
      MinMinutes = MinMinutes + '&#8209;Minute'
    } else {
      MinMinutes = MinMinutes + '&#8209;Minutes'
    }
    return MinHours + MinMinutes;
  }

function addSleep(){
   for (var i = 1; i < 7; i++) {
      var dateKey = moment().subtract(i, 'day').format('MM/DD/YYYY');
      var dateMoment = moment().subtract(i, 'day');
      if (i == 6){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "10:10 PM",
            "Time2": "10:30 PM",
            "Dropdown": 30,
            "Dropdown2": 30,
            "Dropdown3": 1,
            "Dropdown4": 50,
            "Time3": "06:00 AM",
            "Time4": "06:30 AM",
            "Dropdown5": 30,
            "RangeSlide": 5,
            "datapointH": 480,
            "datapointI": 20,
            "datapointJ": 30,
            "datapointK": 110,
            "datapointL": 370,
            "datapointM": 77,
            "datapointZ": 400,
         }));
      }
      if (i == 5){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "11:00 PM",
            "Time2": "11:20 PM",
            "Dropdown": 50,
            "Dropdown2": 60,
            "Dropdown3": 3,
            "Dropdown4": 30,
            "Time3": "05:50 AM",
            "Time4": "06:30 AM",
            "Dropdown5": 40,
            "RangeSlide": 5,
            "datapointH": 430,
            "datapointI": 20,
            "datapointJ": 40,
            "datapointK": 180,
            "datapointL": 250,
            "datapointM": 58,
            "datapointZ": 310,
         }));
      }
      if (i == 4){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "11:20 PM",
            "Time2": "11:20 PM",
            "Dropdown": 90,
            "Dropdown2": 40,
            "Dropdown3": 1,
            "Dropdown4": 20,
            "Time3": "06:10 AM",
            "Time4": "06:20 AM",
            "Dropdown5": 10,
            "RangeSlide": 5,
            "datapointH": 420,
            "datapointI": 0,
            "datapointJ": 10,
            "datapointK": 120,
            "datapointL": 300,
            "datapointM": 71,
            "datapointZ": 340,
         }));
      }
      if (i == 3){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "11:00 PM",
            "Time2": "11:20 PM",
            "Dropdown": 10,
            "Dropdown2": 30,
            "Dropdown3": 0,
            "Dropdown4": 0,
            "Time3": "06:00 AM",
            "Time4": "06:30 AM",
            "Dropdown5": 30,
            "RangeSlide": 5,
            "datapointH": 430,
            "datapointI": 20,
            "datapointJ": 30,
            "datapointK": 40,
            "datapointL": 390,
            "datapointM": 91,
            "datapointZ": 420,
          }));
      }
      if (i == 2){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "10:00 PM",
            "Time2": "10:40 PM",
            "Dropdown": 30,
            "Dropdown2": 0,
            "Dropdown3": 1,
            "Dropdown4": 50,
            "Time3": "05:30 AM",
            "Time4": "06:20 AM",
            "Dropdown5": 50,
            "RangeSlide": 5,
            "datapointH": 460,
            "datapointI": 40,
            "datapointJ": 50,
            "datapointK": 130,
            "datapointL": 330,
            "datapointM": 72,
            "datapointZ": 330,
          }));
      }
      if (i == 1){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "10:10 PM",
            "Time2": "10:50 PM",
            "Dropdown": 20,
            "Dropdown2": 0,
            "Dropdown3": 0,
            "Dropdown4": 0,
            "Time3": "06:40 AM",
            "Time4": "07:00 AM",
            "Dropdown5": 5,
            "RangeSlide": 5,
            "datapointH": 490,
            "datapointI": 40,
            "datapointJ": 20,
            "datapointK": 40,
            "datapointL": 450,
            "datapointM": 92,
            "datapointZ": 450,
          }));
      }
      if (i == 0){
         localStorage.setItem(dateKey, JSON.stringify({
            "Date": dateKey,
            "Moment": dateMoment,
            "Time": "10:30 PM",
            "Time2": "10:40 PM",
            "Dropdown": 20,
            "Dropdown2": 20,
            "Dropdown3": 1,
            "Dropdown4": 70,
            "Time3": "06:40 AM",
            "Time4": "07:00 AM",
            "Dropdown5": 20,
            "RangeSlide": 5,
            "datapointH": 500,
            "datapointI": 10,
            "datapointJ": 20,
            "datapointK": 110,
            "datapointL": 390,
            "datapointM": 78,
            "datapointZ": 410,
         }));
      }
   };
} 



