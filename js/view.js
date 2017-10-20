function setup_select_tag(first_informatins){
	var htmlString ="";
	if($_GET("mapDbId")==null){
		first_informatins.maps.forEach(function(element){
		htmlString += '<option value="' + element.mapDbId + '">' + element.name + '</option>\n';
    });
    $('select#selectionMap').html(htmlString);
	}	
    htmlString='<option value="">---Select one---</option>'
    first_informatins.studies.forEach(function(element){
    	htmlString += '<option value="' + element.studyDbId + '">' + element.name + '</option>\n';
    })
    $('select#selectionStudies').html(htmlString);
}

function setEmptyTheFields(){
	$("#MarkersProfils").html("");
	$("#typeMarker").html("");
	$("#chromosome").html("");
	$("#Markers").html("");
}

function setUpGermplasms(response){
	var htmlString ="";
	Object.keys(response).forEach(function(element){
		var valueString ="";
		for (var i = 0; i < response[element].length; i++) {
			valueString+=response[element][i].markerProfileDbId + ",";
		}
		htmlString +='<option selected value="'+valueString+'">'+element+'</option>\n';
	});
	$('select#Germplasms').html(htmlString);
}

function setUpMarkerProfils(response){
	var selectedGermplasms = $("select#Germplasms option:selected").map(function(){return $(this).val().split(",");}).get(); 
	selectedGermplasms=removeAll(selectedGermplasms,"");
	var htmlString="";
	selectedGermplasms.forEach(function(element){
		htmlString +='<option selected value="'+element+'">'+element+'</option>\n';
	});
	$('select#MarkersProfils').html(htmlString);
	if ($('select#MarkersProfils>option').length==$('select#Germplasms>option:selected').length){
		$('#labelMarkersProfils').hide();
		$('select#MarkersProfils').hide();
	}else{
		$('#labelMarkersProfils').show();
		$('select#MarkersProfils').show();
	}
}

function setUpLinkageGroupAndMarkersType(arrayOfLinkageGroup,arrayOfMarkersType){
	arrayOfLinkageGroup.sort(sortAlphaNum);
    var htmlString="";
    arrayOfLinkageGroup.forEach(function(element){
		htmlString += '<option value="' + element+ '">' + element+ '</option>';
    });
    $('select#chromosome').html(htmlString);
    htmlString="";
    arrayOfMarkersType.forEach(function(element){
		htmlString += '<option selected value="' + element+ '">' + element+ '</option>';
    });
    $('select#typeMarker').html(htmlString);
}

function setupMarkersId(arrayMarkersIds){;
	if (arrayMarkersIds.length<=10000) {
		$('select#Markers').show();
		$('#numberOfMarkers').hide();
		$('#labelToHide').show();
		var htmlString =""
		arrayMarkersIds.forEach(function(element){
			htmlString +='<option selected value="'+element+'">'+element+'</option>\n';
		});
		$('select#Markers').html(htmlString);
	}else{
		$('select#Markers').html("");
		$('#numberOfMarkers').html(arrayMarkersIds.length);
		$('#numberOfMarkers').show();	
	}
}

function fill_result_table(matrix,response){
	$('table').show();
	var htmlString="";
	if($('#missingData').prop('checked')){
		matrix.forEach(function(element){
			if (Object.keys(response).length!=0){
				element[1]=response[element[1]];
			}
			htmlString += '<tr><td>'+element[0]+'</td><td>'+element[1]+'</td><td>'+element[2]+'</td></tr>';
		});	
	}else{
		matrix.forEach(function(element){
			if(element[2]!="N"){
				if (response!=false){
					element[1]=response[element[1]];
				}
				htmlString += '<tr><td>'+element[0]+'</td><td>'+element[1]+'</td><td>'+element[2]+'</td></tr>';
			}
		});
	}
	$("#resulttable > tbody").html(htmlString);	
}

function updateSelection(idLabel, idSelect){
	var nbSelectionOption = $('#'+idSelect+" option:selected").map(function(){return $(this).val().split(",");}).get();
	nbSelectionOption = removeAll(nbSelectionOption, "");
	nbSelectionOption=nbSelectionOption.length;
	var nbOption = $('#'+idSelect+" option").map(function(){return $(this).val().split(",");}).get();
	nbOption = removeAll(nbOption,"");
	nbOption=nbOption.length;
	$('#'+idLabel).text(nbSelectionOption + ' / ' + nbOption);
}

function setloader(){
	$('#loadingScreen').show();
	$('#loadingScreen').modal({
		escapeClose: false,
		clickClose: false,
		showClose: false
	});
}


async function handleErrors(err) {
	console.log(typeof err);
	if (typeof err == "string"){
		$('#ErrorMessage').show();
	    $('#ErrorMessage').text(err);
	    await sleep(10000);
	    $('#ErrorMessage').hide();
	}else{
		$('#ErrorMessage').show();
	    $('#ErrorMessage').text(err.message);
	    await sleep(10000);
	    $('#ErrorMessage').hide();
	}
}