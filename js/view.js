function setup_select_tag(firstinformations){
	let htmlString='<option value="">---Select one---</option>';
	if($_GET("mapDbId")===null){
        for(let key in firstinformations.studies){
            htmlString += '<option id="'+key+'" value="' + firstinformations.maps[key].mapDbId + '">' + firstinformations.maps[key].name + '</option>\n';
        }
	}else{
        htmlString = '<option id="'+0+'" value="' + firstinformations.maps[0] + '">' + firstinformations.maps[0] + '</option>\n';
	}
    $('select#selectionMap').html(htmlString);
    selectStudies();
}

function selectStudies(){
    let selectedMapId = currentGroupId =$('#selectionMap').find('option:selected').attr('id');
    $('select#selectionStudies').html('');
    let htmlString='<option value="">---Select one---</option>';
    for(let key in firtstInformation.studies){
        if(selectedMapId === key){
            htmlString += '<option id="'+key+'" value="' + firtstInformation.studies[key].studyDbId + '">' + firtstInformation.studies[key].name + '</option>\n';
        }
    }
    $('select#selectionStudies').html(htmlString);
}

function setEmptyTheFields(){
	$("#MarkersProfils").html("");
	$("#typeMarker").html("");
	$("#chromosome").html("");
	$("#Markers").html("");
	$('#Germplasms').html("");
	$('#labelGermplasms').hide();
    $('#markerProfileLabel').hide();
    $('#typeLabel').hide();
    $('#chromosomeLabel').hide();
    $('#markersLabel').hide();
    $('#topMarkerDiv').hide();
    $('#topTypeDiv').hide();
    enmptResultTab();
}

function setEmptyMarkerSelect() {
	$('#Markers').html("");
}

function setUpGermplasms(response){
	let htmlString ="";
	Object.keys(response).forEach(function(element){
        let valueString = "";
        for (let i = 0; i < response[element].length; i++) {
			valueString+=response[element][i].markerProfileDbId + ",";
		}
		htmlString +='<option selected value="'+valueString+'">'+element+'</option>\n';
	});
	$('select#Germplasms').html(htmlString);
	updateSelection('labelGermplasms','Germplasms');
}

function setUpMarkerProfils(){
    let selectedGermplasms = $("select#Germplasms option:selected").map(function () {
        return $(this).val().split(",");
    }).get();
    selectedGermplasms=removeAll(selectedGermplasms,"");
	let htmlString="";
	selectedGermplasms.forEach(function(element){
		htmlString +='<option selected value="'+element+'">'+element+'</option>\n';
	});
	$('#MarkersProfils').html(htmlString);
    updateSelection('markerProfileLabel','MarkersProfils');
	if ($('#MarkersProfils>option').length===$('#Germplasms>option:selected').length){
		$('#MarkersProfils').attr("disabled", true);
	}else{
		$('#MarkersProfils').attr("disabled", false);
	}
}

function setUpLinkageGroupAndMarkersType(arrayOfLinkageGroup,arrayOfMarkersType){
	arrayOfLinkageGroup.sort(sortAlphaNum);
    let htmlString="";
    arrayOfLinkageGroup.forEach(function(element){
		htmlString += '<option value="' + element+ '">' + element+ '</option>';
    });
    $('select#chromosome').html(htmlString);
    updateSelection('chromosomeLabel','chromosome');
    htmlString="";
    arrayOfMarkersType.forEach(function(element){
		htmlString += '<option selected value="' + element+ '">' + element+ '</option>';
    });
    $('select#typeMarker').html(htmlString);
}

function setupMarkersId(arrayMarkersIds){
	if (arrayMarkersIds.length<=10000) {
		$('#Markers').show();
		$('#numberOfMarkers').hide();
		$('#labelToHide').show();
        $('#markersLabel').show();
        $('#topMarkerDiv').hide();
		let htmlString ="";
		arrayMarkersIds.forEach(function(element){
			htmlString +='<option selected value="'+element+'">'+element+'</option>\n';
		});
		$('#Markers').html(htmlString);
        updateSelection('markersLabel','Markers');
	}else{
		$('#Markers').html("");
		$('#markersLabel').hide();
		$('#numberOfMarkers').html(arrayMarkersIds.length);
		$('#numberOfMarkers').show();
		$('#topMarkerDiv').show();
	}
}

function fill_result_table(sendedMarkers,sendedMarkersProlis,response) {
    $('table').show();
    let htmlString="";
    console.log(sendedMarkers);
    console.log(sendedMarkersProlis);
    for(let i=0;i<sendedMarkersProlis.length;i++){
    	for(let j=0;j<sendedMarkers.length;j++){
            htmlString += '<tr><td>'+sendedMarkers[j]+'</td><td>'+response[sendedMarkersProlis[i]]+'</td><td>'+sendedMarkersProlis[i]+'</td><td id="'+(sendedMarkers[j]+sendedMarkersProlis[i]).hashCode()+'"></td></tr>';
		}
	}
    $("#resulttable").find("> tbody").html(htmlString);
}

function cleanTab(sendedMarkers,sendedMarkersProlis){
    for(let i=0;i<sendedMarkersProlis.length;i++){
        for(let j=0;j<sendedMarkers.length;j++){
            let id = '#' + (sendedMarkers[j]+sendedMarkersProlis[i]).hashCode();
            let temp = $(id);
            if(temp.text()===''){
                temp.parent().remove();
            }
        }
    }
}

function insetMatrixInResultTable(matrix){
    for(let i=0; i<matrix.length;i++){
        matrix[i].forEach(function (element) {
			let tempString = (element[0]+element[1]).hashCode();
			$('#'+tempString).text(element[2]);
        });
    }
}

function updateSelection(idLabel, idSelect){
	let nbSelectionOption = $('#'+idSelect+" option:selected").map(function(){return $(this).val().split(",");}).get();
	nbSelectionOption = removeAll(nbSelectionOption, "");
	nbSelectionOption=nbSelectionOption.length;
	let nbOption = $('#'+idSelect+" option").map(function(){return $(this).val().split(",");}).get();
	nbOption = removeAll(nbOption,"");
	nbOption=nbOption.length;
	$('#'+idLabel).text(nbSelectionOption + ' / ' + nbOption);
    $('#'+idLabel).show();
}

function setloader(){
	$('#loadingScreen').show();
	$('#loadingScreen').modal({
		escapeClose: false,
        closeExisting: false,
		clickClose: false,
		showClose: false
	});
}

async function handleErrors(err) {
	if (typeof err === "string"){
		$('#ErrorMessage').show();
	    $('#ErrorMessage').text(err);
	    await sleep(3000);
	    $('#ErrorMessage').hide();
	}else{
		$('#ErrorMessage').show();
	    $('#ErrorMessage').text(err.message);
	    await sleep(3000);
	    $('#ErrorMessage').hide();
	}
}

function setDisabled(bool){
    $('#selectionMap').prop('disabled', bool);
    $('#selectionStudies').prop('disabled', bool);
    $('#Search').prop('disabled', bool);
    $('#Export').prop('disabled', bool);
    $('#ExportGermplasmsTsv').prop('disabled', bool);
    $('#ExportGermplasmsDetails').prop('disabled', bool);
}

function animatForm(){
	if(!$('#UserId2').is(':visible')){
		$('#btnChangeName').text('Use one url');
        $('#UserId2').show();
        $('#Password2').show();
        $('#urltoget2').show();
        $('#UserId2').addClass('animated bounceInRight');
        $('#Password2').addClass('animated bounceInRight');
        $('#urltoget2').addClass('animated bounceInRight');
	}else{
        $('#btnChangeName').text('Use tow url');
        $('#UserId2').hide();
        $('#Password2').hide();
        $('#urltoget2').hide();
        $('#UserId2').removeClass('animated bounceInRight');
        $('#Password2').removeClass('animated bounceInRight');
        $('#urltoget2').removeClass('animated bounceInRight');
	}
}

function useMoreUrl() {
	
}

function setMainFormVisible(){
    $('#mainForm').show();
	if($('#Use2Url').is(':checked')){
		$('#ExportGermplasmsDetails').attr("disabled", true);
	}else{
        $('#ExportGermplasmsDetails').attr("disabled", false);
	}
}

function  enmptResultTab(){
	$('tbody').html('');
}

function  addUrl(caller){
    $(caller).parent().append('<div class=" row space container-fluid animated pulse">\n' +
        '                        <input class="form-control  col-8" type="text" placeholder="Url">\n' +
        '                        <input class="form-control col-2" type="text" placeholder="UserName">\n' +
        '                        <input class="form-control col-2" type="text" placeholder="Password">\n' +
        '                    </div>');
}

async function  rmUrl(caller){
    if($(caller).parent().children().length>4){
        $(caller).parent().children().last().addClass('fadeOut');
        sleep(300).then(function () {
            $(caller).parent().children().last().remove();
        });
    }else{

    }

}
function addGrp(caller){
    $(caller).parent().append('<div class="row col-12 lol animated pulse" style="background-color: #fd7e14;">\n' +
        '                    <button class="col-5 btn btn-primary" onclick="addUrl(this);">Add one URL</button>\n' +
        '                    <button class="col-5 btn btn-danger" onclick="rmUrl(this);">Remove one URL</button>\n' +
        '                    <button type="button" class="col-2 close" aria-label="Close" onclick="rmThisGrp(this);">\n' +
        '                        <span aria-hidden="true">&times;</span>\n' +
        '                    </button>\n' +
        '                    <div class=" row space container-fluid animated pulse">\n' +
        '                        <input class="form-control  col-8" type="text" placeholder="Url">\n' +
        '                        <input class="form-control col-2" type="text" placeholder="UserName">\n' +
        '                        <input class="form-control col-2" type="text" placeholder="Password">\n' +
        '                    </div>\n' +
        '                </div>');
}

async function rmThisGrp (caller) {
    $(caller).parent().addClass('fadeOut');
    await sleep(400).then(function () {
        $(caller).parent().remove();
    });
}