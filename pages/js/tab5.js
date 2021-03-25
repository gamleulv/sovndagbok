$(document).ready(function(){
	//set defaults
	var getrangeVal = $('#rangeSlide').val();
	//$("#plan-holder").text('Step-'+getrangeVal);
	//$(".info-price").html('Fair');

	$('#loadRange').on('click mouseenter', function(){
		//function initialize after click tab-5
		setTimeout(function(){
			var getrangeVal = $('#rangeSlide').val();
			new Dragdealer('pr-slider', {
		    animationCallback: function(x, y) {
		      var slider_value = ((Math.round(x * 100)));
		      //$("#pr-slider .value").text(slider_value);
		      var stripe_width = slider_value+1;
		      // $(".stripe").css("width", ""+stripe_width+"%");
		      $(".stripe").css("width", $('#rangeSlide').val()*10+"%");
		      //$("#plan-holder").text('Step-'+$('#rangeSlide').val());
		      		$("#plan-holder").text('Sleep Quality');
					//$(".info-price").html('Fair');
				//RangeSlider update
				var rangeConverted = '';
				if (getrangeVal == 0) {
				rangeConverted = 'Very Poor';
				}
				if (getrangeVal == 2.5) {
				rangeConverted = 'Poor';
				}
				if (getrangeVal == 5) {
				rangeConverted = 'Fair';
				}
				if (getrangeVal == 7.5) {
				rangeConverted = 'Good';
				}
				if (getrangeVal == 10) {
				rangeConverted = 'Very Good';
				}
				$(".info-price").html(rangeConverted);

		      //step-0
		      if(slider_value > 0){
			     	$("#plan-holder").text('Sleep Quality');
			     	$(".info-price").html('Very Poor');
			     	$("#rangeSlide").val('0');
		      }
		     //  //step-1
		     //  if(slider_value > 8){
			    //   $("#plan-holder").text('Sleep Quality');
			    //   if(slider_value > 8){ 
			    //   	$(".info-price").html('1');
			    //   	$('#rangeSlide').val('1'); 
			    //   }
			    // }	
			    //step-2
		      if(slider_value > 25){
			      $("#plan-holder").text('Sleep Quality');
			      if(slider_value > 25){ 
			      	$(".info-price").html('Poor');
			      	$('#rangeSlide').val('2.5'); 
			      }
			    }
			    //step-3
		     //  if(slider_value > 28){
			    //   $("#plan-holder").text('Sleep Quality');
			    //   if(slider_value > 28){ 
			    //   	$(".info-price").html('3');
			    //   	$('#rangeSlide').val('3');
			    //   }
			    // }
			    // //step-4
		     //  if(slider_value > 38){
			    //   $("#plan-holder").text('Sleep Quality');
			    //   if(slider_value > 38){ 
			    //   	$(".info-price").html('4'); 
			    //   	$('#rangeSlide').val('4');
			    //   }
			    // }
			    //step-5
		      if(slider_value > 48){
			      $("#plan-holder").text('Sleep Quality');
			      if(slider_value > 48){ 
			      	$(".info-price").html('Fair');
			      	$('#rangeSlide').val('5'); 			      	
			      }				      	      
			    }
			    //step-6
		     //  if(slider_value > 58){
			    //   $("#plan-holder").text('Sleep Quality');
			    //   if(slider_value > 38){ 
			    //   	$(".info-price").html('6'); 
			    //   	$('#rangeSlide').val('6');

			    //   }
			    // }
			    // //step-7
		     //  if(slider_value > 68){
			    //   $("#plan-holder").text('Sleep Quality');
			    //   if(slider_value > 68){ 
			    //   	$(".info-price").html('7');
			    //   	$('#rangeSlide').val('7'); 
			    //   }
			    // }
			    //step-8
		      if(slider_value > 75){
			      $("#plan-holder").text('Sleep Quality');
			      if(slider_value > 75){ 
			      	$(".info-price").html('Good');
			      	$('#rangeSlide').val('7.5'); 
			      }
			    }
			    //step-9
		     //  if(slider_value > 88){
			    //   $("#plan-holder").text('Sleep Quality');
			    //   if(slider_value > 88){ 
			    //   	$(".info-price").html('9');
			    //   	$('#rangeSlide').val('9'); 
			    //   }
			    // }
			    //step-10
		      if(slider_value > 98){
			      $("#plan-holder").text('Sleep Quality');
			      if(slider_value > 98){ 
			      	$(".info-price").html('Very Good');
			      	$('#rangeSlide').val('10'); 
			      }
			    }
		    }

			});
		},500);
	});
});