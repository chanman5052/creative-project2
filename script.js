document.getElementById("artistSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("artistInput").value;
    if(value == "")
        return;
    console.log(value);
    const url = "https://itunes.apple.com/search?term=" + value + "&entity=musicTrack" + "&limit=15";
    fetch(url)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        var results = [];
        //var table = [];
        results += '<h2>Top 15 Results for ' + value + '</h2>';
        
        for (let i = 0; i < json.results.length; i++) {
            var j = (i+1)
            results += "<div class= artistResults>"
            results += "<p><strong>" + j + ". Artist Name: </strong>" + json.results[i].artistName;
            results += "<br>"
            results += "<br><strong>Song Name: </strong>" + json.results[i].trackName;
            results += "<br>"
            //results += "<p><strong>Album Name: </strong>" + json.results[i].collectionName;
            results += "<br><strong>Genre: </strong>" + json.results[i].primaryGenreName;
            results += "<br>"
            //results += "<br>";
            if(json.results[i].trackExplicitness == "notExplicit")
                results += "<br><strong>Rating: </strong>Not Explicit";
            else
                results += "<br><strong>Rating: </strong>Explicit";
            results += "</p><br/></div>"

        }
        document.getElementById("artistResults").innerHTML = results;
      });
      const url2 = "https://itunes.apple.com/search?term=" + value + "&entity=musicVideo" + "&limit=15";
      fetch(url2)
      .then(function(response) {
          return response.json();
      }).then(function(json) {
          console.log(json);
          let videoResults = "";
          videoResults += "<h2>Music Videos Related to: " + value + "</h2>";
          for(let i = 0; i < json.results.length; i++) {
            var j = (i + 1);
            videoResults += "<div class= videoResults>";
            videoResults +="<p><strong>" + j + ". Video Name: </strong>" + json.results[i].trackName + "<br>";
            videoResults += "<strong>Watch: </strong><a href=" + json.results[i].trackViewUrl + ">Watch Here</a>";
          }
          videoResults += "</p><br/></div>";
        document.getElementById("videoResults").innerHTML = videoResults;
      });
      const url3 = "https://itunes.apple.com/search?term=" + value + "&entity=tvEpisode" + "&limit=15";
      fetch(url3)
      .then(function(response) {
          return response.json();
      }).then(function(json) {
          console.log(json);
          let tv = "";
          tv += "<h2>TV Shows Related to: " + value + "</h2>";
          for (let i = 0; i < json.results.length; i++) {
              var j = (i+1);
              tv += "<div class= 'tv'>";
              tv += "<p><strong>" + j + ". Show Name: </strong>" + json.results[i].collectionName + ": " + json.results[i].trackName + "<br></p>";
          }
          tv += "</p><br/></div>";
          document.getElementById("tv").innerHTML = tv;

      });
});
