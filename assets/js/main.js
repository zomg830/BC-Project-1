<<<<<<< HEAD
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
=======

/*API parameter requirements for GitHub Jobs

Search for jobs by term, location, full time vs part time, or any combination of the three. All parameters are optional.

description — A search term, such as "ruby" or "java". This parameter is aliased to search.
location — A city name, zip code, or other location search term.
lat — A specific latitude. If used, you must also send long and must not send location.
long — A specific longitude. If used, you must also send lat and must not send location.
full_time — If you want to limit results to full time positions set this parameter to 'true'.*/

/*API parameter requirements for GlassDoor
v - The API version. The current version is 1 except for jobs, which is currently version 1.1	Required
format - Either xml or json as you prefer	Required
t.p - Your partner id, as assigned by Glassdoor	Required
t.k - Your partner key, as assigned by Glassdoor	Required
userip - The IP address of the end user to whom the API results will be shown	Required
useragent - The User-Agent (browser) of the end user to whom the API results will be shown. Note that you can can obtain this from the "User-Agent" HTTP request header from the end-user	Required
callback - If json is the requested format, you may specify a jsonp callback here, allowing you to make cross-domain calls to the glassdoor API from your client-side javascript. See the JSONP wikipedia entry for more information on jsonp.
action - The particular API call that you would like to make - see jobs, reviews, salaries, etc. sub-sections for details	Required
other - Each API action will require different parameters - in the example above, an employerId is passed in order to retrieve reviews.	
>>>>>>> 5712ed23c5946fc6b1e397207b01e2eb1f6e4c7a
