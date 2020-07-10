const CAT_URL = "https://api.thecatapi.com/v1/images/search?mime_types=gif";

document
  .querySelector(".request-complement")
  .addEventListener("click", function () {
    fetch("/complement")
      .then(function (res) {
        const data = res.json();
        return data;
      })
      .then(function (data) {
        document.querySelector(".complement").innerText = data.complement;
      })
      .then(function () {
        const promise = fetch(CAT_URL);
        promise
          .then(function (response) {
            const processingPromise = response.json();
            return processingPromise;
          })
          .then(function (processedResponse) {
            const cat = processedResponse[0].url;
            const catImg = document.querySelector(".cat");
            if (catImg === null) {
              const img = document.createElement("img");
              img.src = cat;
              img.alt = "Cute cat gif";
              img.className = "cat";
              document.querySelector(".content-img").appendChild(img);
            } else {
              catImg.src = cat;
            }
          });
      })
      .catch(function (err) {
        console.error(err);
      });
  });
