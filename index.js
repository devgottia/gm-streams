$.ajax({
  url: "https://s1.sportea.link/v1/api.php?key=a38088a3a9ba7c256f6580413927a274",
  method: "GET",
  dataType: "json",
})
  .done(function (data) {
    const schedule = data[0].schedule;
    const displayDiv = $("#display");

    Object.keys(schedule).forEach((sport) => {
      schedule[sport].forEach((event, index) => {
        const eventTime = new Date(event.event_time * 1000);
        const formattedTime = eventTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        displayDiv.append(`
        <div class="col-md-4 mb-2">

<div class="card mb-2 rounded-4 bg-body-tertiary">
<div class="card-body text-center">

<div >

<span class="me-2">${data[0].date} </span>
:
&nbsp;
<span class="me-2">${formattedTime} </span>
<br />
 
<span >${event.teams}  </span> 



</div>


<div>
<button class="btn btn-outline-success copyBtn  w-100 mt-1 rounded-4" onclick="copyToClipboard('${event.channel_id}')" >Copy Link</button> 
</div>

</div>

</div>

        </div>
        
        `);
      });
    });
  })
  .fail(function () {
    console.error("Request failed");
  });

function copyToClipboard(ch_Id) {
  let copyUrl = encodeURI(
    `https://v1.gmstreams.site/p/p.html?ch=${ch_Id}`
  );

  window.navigator.clipboard.writeText(copyUrl);
}

$("body").on("click", ".copyBtn", function () {
  $(this).addClass("btn-outline-danger");
});
