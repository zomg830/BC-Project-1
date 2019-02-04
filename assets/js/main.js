$(document).ready(function() {
    console.log( "ready!" );

    var choice1 = "https://jobs.github.com/positions.json?";
    var choice2 = 'https://jobs.search.gov/jobs/search.json?';
    var choice3 = 'https://api.indeedassessments.com/v1/';
    //I can't get the url for ziprecruiter...Matt signed up
    var choice4 = '';
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

$('#all').on('click', function(){
    $('#sitePick').prop('selected', true);
});
