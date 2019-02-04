$(document).ready(function() {
    console.log( "ready!" );
	//base url for job search api's
    var choice1 = 'https://jobs.github.com/positions.json?';
    var choice2 = 'https://jobs.search.gov/jobs/search.json?';
    var choice3 = 'https://api.indeedassessments.com/v1/';
    var choice4 = '';  //I can't get the url for ziprecruiter...Matt signed up
    var choice5 = 'http://api.glassdoor.com/api/api.htm?';

    $(".form-submit").on("click", function(event){
        event.preventDefault();
        var jobInput = $("#job-title").val();
        var locInput = $("#location").val();
        console.log(jobInput);
        console.log(locInput);
        $(".form-control").val("");
        searchDotGov(jobInput,locInput);
    });

    var searchDotGov = (job, loc) => {
        var queryURL = `https://jobs.search.gov/jobs/search.json?query=${job}+in+${loc}`
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log(response);
        })
    };
});

//modal search checkbox to select/un-select all job sites 
$('.form-check-input').on('change', function(){
	if ($(this).prop('checked') === true){
		$('option').attr('selected', true);
	}
	else $('option').attr('selected', false);
});
