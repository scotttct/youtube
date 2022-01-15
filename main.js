const apiKey = "AIzaSyB4dnBAJNoOmKup4Vaf6M2zlTXw_fTioKU"

let today = new Date().getFullYear()
document.getElementById('today').innerHTML = today

  const showSearchResults = (data) => {

    document.getElementById("search-results").innerHTML = ""

    // loop over data.items
    data.items.forEach(item => {
        //check to see only videos and no undefined videos
        if (item.kind != 'youtube#channel' && item.id.videoId != undefined) {
          //I used let but const might work better here...
            let videoId= item.id.videoId
            htmlOutput =  `<div class="col text-center p-3">
            <iframe width="400" height="300"
             src="https://www.youtube.com/embed/${videoId}" 
             title="YouTube video player" frameborder="0" allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; 
              picture-in-picture" allowfullscreen></iframe>
            </div>
            `
            //output to div and adding to list with +=
            document.getElementById("search-results").innerHTML += htmlOutput
        }
     
    })

  }

  const fetchDataFromYoutube = (searchStr) => {
    
    let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${searchStr}`

    console.log('the url is', url)

    fetch(url)
    .then((res) => {
      return res.json()
    }).then((data) => {      
      showSearchResults(data)
    })
  
  }

  document.getElementById("searchButton").addEventListener("click", function(e) {
      e.preventDefault

        let searchStr = document.getElementById('search-box').value

        fetchDataFromYoutube(searchStr)

  })

  document.getElementById("search-box").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      let searchStr = document.getElementById('search-box').value

      fetchDataFromYoutube(searchStr)

    }

      
})