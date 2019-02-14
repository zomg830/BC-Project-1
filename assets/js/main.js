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
        $('#accordion1').empty();
        event.preventDefault();
        aggregateResults = [];
        var jobInput = $("#jobTitle").val();
        var locInput = $("#jobLocation").val();
        console.log(jobInput);
        console.log(locInput);
        $(".form-control").val("");
        searchDotGov(jobInput,locInput);
        searchAuthenticJobs(jobInput,locInput);
        // searchGithubJobs(jobInput, locInput);
        setTimeout(populateModal, 7000);
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
                    posted: response[i].start_date,
                    url: response[i].url
                }
                aggregateResults.push(respObj);
            }
            console.log("Aggregate results: " + JSON.stringify(aggregateResults));
        })
    };

    // var searchGithubJobs = (job, loc) => {
    //     var queryURL = `https://jobs.github.com/positions.json?description=${job}&location=${loc}`
    //     console.log("queryURL" + queryURL);
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET",
    //         crossDomain: true,
    //         dataType: "jsonp",
    //         headers: {
    //             "Access-Control-Allow-Credentials": true,
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET",
    //             "Access-Control-Allow-Headers": "application/json",
    //         }
    //     }).then(function(response){
    //         console.log(response);
    //         for (let i = 0; i < response.length; i++){
    //             let respObj = {
    //                 title: response[i].position_title,
    //                 company: response[i].company,
    //                 location: response[i].location,
    //                 posted: response[i].created_at,
    //                 url: response[i].url
    //             }
    //             aggregateResults.push(respObj);
    //         }
    //         console.log("Aggregate results: " + JSON.stringify(aggregateResults));
    //     })
    // };


    var searchAuthenticJobs = (job, loc) => {
        var queryURL = `https://authenticjobs.com/api/?api_key=85265268d6f1738391d7c732415e84e9&method=aj.jobs.search&keywords=${job}&location=${loc}&perpage=100&format=json`
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
                    title: ajResp[i].title,
                    company: ajResp[i].company.name,
                    // location: ajResp[i].company.location.name,
                    posted: ajResp[i].post_date,
                    url: ajResp[i].url
                }
                aggregateResults.push(respObj);
            }
            console.log("Aggregate results: " + JSON.stringify(aggregateResults));
        })
    }

    /*var modalAppend = (arr) => {
        $("#searchResults").append("<div>"+arr[0]+"</div>")
    }*/

    var populateModal = () => {
        for (i = 0; i < aggregateResults.length && i < 20; i++){
            $("#accordion1").append(
                '<div class="card">'
                +'<div class="card-header row" role="tab" id="headingOne1">'
                    +'<div class="col-sm-8">'
                        +'<h5 class="mb-0">'
                            +'<a data-toggle="collapse" href="#collapse'+intToString(i)+'1" role="button" aria-expanded="true" aria-controls="collapse'+intToString(i)+'1" id="title'+`${i}`+'"></a>'
                        +'</h5>'
                    +'</div>'
                    +'<div class="col-sm-4">'
                        +'<p id="loc'+`${i}`+'"></p>'
                    +'</div>'
                +'</div>'
                +'<div id="collapse'+intToString(i)+'1" class="collapse" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordion1">'
                  +'<div class="card-body">'
                      +'<p id="desc'+`${i}`+'"></p>'
                      +'<a href="" target="_blank" id="url'+`${i}`+'"></a>'
                  +'</div>'
                +'</div>'
              +'</div>'
            );
            try{
                $(`#title${i}`).text(aggregateResults[i].title);
                $(`#loc${i}`).text(aggregateResults[i].location);
                $(`#desc${i}`).text("Date posted: " + aggregateResults[i].posted);
                $(`#url${i}`).attr("href", aggregateResults[i].url);
                $(`#url${i}`).text(aggregateResults[i].url);
            }
            catch (e){
                console.log(e);
            }
        };
    };

    var intToString = (int) => {
        var strs = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen','Twenty']
        return strs[i];
    }
});

//modal search checkbox to select/un-select all job sites 
$('.form-check-input').on('change', function(){
	if ($(this).prop('checked') === true){
		$('option').attr('selected', true);
	}
	else $('option').attr('selected', false);
});