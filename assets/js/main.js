$(document).ready(function() {
	
    console.log( "ready!" );
	//base url for job search api's
    var choice1 = 'https://jobs.github.com/positions.json?';
    var choice2 = 'https://jobs.search.gov/jobs/search.json?';
    var choice3 = 'https://api.indeedassessments.com/v1/';
    var choice4 = '';  //I can't get the url for ziprecruiter...Matt signed up
    var choice5 = 'http://api.glassdoor.com/api/api.htm?';
    var aggregateResults = [];
	//changed the id to modal button
    $("#findJob").on("click", function(event){
        event.preventDefault();
        var jobInput = $("#jobTitle").val();
        var locInput = $("#jobLocation").val();
        console.log(jobInput);
        console.log(locInput);
        $(".form-control").val("");
        searchDotGov(jobInput,locInput);
    });

    var searchDotGov = (job, loc) => {
        var queryURL = `https://jobs.search.gov/jobs/search.json?query=${job}+in+${loc}`
        console.log("queryURL" + queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < response.length; i++){
                var respObj = {
                    title: response[i].position_title,
                    company: response[i].organization_name,
                    location: response[i].locations[0],
                    posted: response[i].start_date
                }
                aggregateResults.push(respObj);
            }
            console.log("Aggregate results: " + JSON.stringify(aggregateResults));
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
