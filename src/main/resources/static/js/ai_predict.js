
$(document).ready(function () {
    $("#input-file-events").change(function () {
        fire_ajax_submit();
    });
});

function fire_ajax_submit() {
	//clear previous result
	
	$("#postResultDiv").empty();
	$("#progressShow").empty();
	$("#progressShow").html('<div class="blue bigger-110"> Getting result <i class="ace-icon fa fa-spinner fa-spin blue bigger-125"></i>  </div>')
    // Get form
    var form = $('#plant-form')[0];
    var data = new FormData(form);
    $("#btnSubmit").prop("disabled", true);

    $.ajax({
        type: "POST",        
        enctype: 'multipart/form-data',
        url: 'https://leaf-brains.herokuapp.com/api/ai',
        crossDomain: true,
        data: data,        
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        timeout: 600000,
        success : function(result) {
        	console.log(result);
        	var matchPercent=Math.round(result.leaf);
        	var nonLeafMatch =100-matchPercent;
        	
        	console.log("leaf ="+matchPercent+" non leaf="+nonLeafMatch);
			if(result.status){$("#progressShow")
				.html('<h3 class ="text-center"><span class="badge badge-success">'+
						'Leaf status</span></h3><hr>'+
						'<div class="progress">'+
				'<div class="progress-bar bg-success" style="width:'+matchPercent+'%;">'+matchPercent+'%</div>'+
				'<div class="progress-bar bg-danger" style="width:'+nonLeafMatch+'%;">'+nonLeafMatch+'%</div>'+
			'</div><br>'+'<strong>Leaf: ' +matchPercent+'%</strong><br>'+'<strong>Non Leaf: ' +nonLeafMatch+'%</strong>');  
				
			}else{
				$("#postResultDiv").html("<strong>Error</strong>");
			}
			
		},
        error: function (e) {

            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
           

        }
    });

    function clearInputs()
    {
    	consol.log("empty input");
    	$("#input-file-events").empty();
    }
}