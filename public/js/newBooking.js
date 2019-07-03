// set up buttons and display table for new booking page
// John Webster

$(document).ready(function() {
  var facilityId = 0;
  var facilityName = "";
  var userId = 0;
  var userName = "";

  // select the facility
  $(".facilityDropdown").on("click", function() {
    facilityId = $(this).attr("data-value");
    facilityName = $(this).attr("data-name");
    // menu header now becomes facility name
    $("#facilityMenu").text(facilityName);
  });

  // select the user
  $(".userDropdown").on("click", function() {
    userId = $(this).attr("data-value");
    userName = $(this).attr("data-name");
    // menu header now becomes user name
    $("#userMenu").text(userName);
  });

  // process form and GET from server api
  $("#submitButton").on("click", function() {
    event.preventDefault(); // stop from posting and reloading page
    let eventDate = $("#dateInput").val();
    let startTime = $("#startTimeInput").val();
    let endTime = $("#endTimeInput").val();

    // convert to utc
    startTime = moment.utc(eventDate + "T" + startTime).format();
    endTime = moment.utc(eventDate + "T" + endTime).format();

    if (
      facilityId === 0 ||
      userId === 0 ||
      moment.utc(endTime).isBefore(startTime)
    ) {
      console.log(
        "Must select both user and facility, and start time not before end time"
      );
    } else {
      // POST data to server
      const postObject = {
        userId: userId,
        facilityId: facilityId,
        startTime: startTime,
        endTime: endTime
      };
      $.ajax({
        url: `/api/newBooking`,
        method: "POST",
        data: JSON.stringify(postObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .done(function(body, textStatus, xhdr) {
          console.log(typeof testStatus);
          console.log(textStatus);
          if (textStatus === "success") {
            if (body.length !== 0) {
              console.log("Posted successfully");
            } else {
              console.log("No results returned (no facility booked)");
            }
          } else {
            console.log(
              "Error returned from server http status " + String(xhdr.status)
            );
          }
        })
        .fail((xhr) => {
          console.log("AJAX POST failed with error code " + xhr.status);
        });
    }
  });
});
