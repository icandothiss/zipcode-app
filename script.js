const form = document.getElementById("zipForm");
const output = document.getElementById("output");
const input = document.getElementById("input");
const remove = document.getElementById("remove");
const check = document.getElementById("check");
const exit = document.getElementById("exit");

form.addEventListener("submit", formFunc);
document.querySelector("body").addEventListener("click", exitContent);

function formFunc(e) {
  e.preventDefault();

  let value = input.value;
  console.log(value);

  fetch(`https://api.zippopotam.us/us/${value}`)
    .then((response) => response.text())
    .then((data) => {
      let result = JSON.parse(data).places[0];
      output.innerHTML = `<div id='success-content' class='success-msg'>
                        
                             <div class='info-title'>
                                   <p>Location Info</p>
                                   <span class="icon is-small is-right icon-remove">
                                   <i class=" close fa fa-remove"></i>
                                   </spanclass=>
                              </div>                           
                              <div class='info'>
                                   <p><span>City: </span>${result["place name"]}</p>
                                   <p><span>State: </span>${result["state"]}</p>
                                   <p><span>Longitude: </span>${result["longitude"]}</p>
                                   <p><span>Latitude: </span>${result["latitude"]}</p>
                              </div>

                          </div>`;
      console.log(JSON.parse(data).places[0]["place name"]);
      check.classList.remove("remove");
      remove.classList.add("remove");
    })
    .catch(
      (err) => remove.classList.remove("remove"),
      check.classList.add("remove"),
      (output.innerHTML =
        "<div class='error-msg'>Invalid Zipcode, please try again</div>")
    );
}

function exitContent(e) {
  if (e.target.classList.contains("close")) {
    document.getElementById("success-content").style.display = "none";
    input.value = "";
  }
}
