$(document).ready(function() {
    console.log( "ready!" );

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