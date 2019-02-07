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
        searchAuthenticJobs(jobInput,locInput);
    });

    var searchDotGov = (job, loc) => {
        var queryURL = `https://jobs.search.gov/jobs/search.json?query=${job}+in+${loc}`
        console.log("queryURL" + queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
            crossDomain: true,
            dataType: "jsonp",
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < response.length; i++){
                let respObj = {
                    title: response[i].position_title,
                    company: response[i].organization_name,
                    location: response[i].locations,
                    posted: response[i].start_date
                }
                aggregateResults.push(respObj);
            }
            console.log("Aggregate results: " + JSON.stringify(aggregateResults));
        })
    };

    var searchAuthenticJobs = (job, loc) => {
        var queryURL = `https://authenticjobs.com/api/?api_key=85265268d6f1738391d7c732415e84e9&method=aj.jobs.search&keywords=${job}&location=${loc}&format=json&perpage=10`
        console.log("queryURL" + queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
            crossDomain: true,
            dataType: "jsonp",
        }).then(function(response){
            var ajResp = response.listings.listing;
            console.log(ajResp);
            for (let i = 0; i < ajResp.length; i++){
                let respObj = {
                    title: ajResp[i].category.name,
                    company: ajResp[i].company.name,
                    location: "",
                    posted: ajResp[i].post_date
                }
                aggregateResults.push(respObj);
            }
            console.log("Aggregate results: " + JSON.stringify(aggregateResults));
        })
    }

    var modalAppend = (arr) => {
        $(".modal-body").append("<div>"+arr[0]+"</div>")
    }
});

//modal search checkbox to select/un-select all job sites 
$('.form-check-input').on('change', function(){
	if ($(this).prop('checked') === true){
		$('option').attr('selected', true);
	}
	else $('option').attr('selected', false);
});
