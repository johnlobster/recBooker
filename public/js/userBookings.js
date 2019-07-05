// set up buttons and display table for booking page
// John Webster

$(document).ready(function() {
  var userId = 0;
  var userName = "";

  // select a user
  $(".userDropdown").on("click", function() {
    userId = $(this).attr("data-value");
    userName = $(this).attr("data-name");
    // menu header now becomes user name
    $("#userMenu").text(userName);
  });

  // process form and GET from server api
  $("#submitButton").on("click", function() {
    event.preventDefault(); // stop from posting and reloading page
    let startDate = $("#startDateInput").val();
    let endDate = $("#endDateInput").val();
    // convert to utc
    startDate = moment.utc(startDate).format();
    endDate = moment.utc(endDate).format();
    // Used for testing
    // startDate = moment.utc().subtract(10, "days").format();
    // endDate = moment.utc().add(10, "days").format();
    if (userId === 0) {
      console.log("Need to choose a user");
    } else {
      if (moment.utc(endDate).isBefore(startDate)) {
        console.log("End date is before start date");
      } else {
        // GET data from server
        $.ajax({
          url: `/api/user_bookings/${userId}/${startDate}/${endDate}`,
          method: "GET"
        }).then(function(body, textStatus, xhdr) {
          if (textStatus === "success") {
            if (body.length !== 0) {
              // clear table
              $("#tableBody").empty();
              // populate table
              let tRow,
                sDate,
                eDate,
                facility = "";
              for (let i = 0; i < body.length; i++) {
                tRow = $("<tr>");
                sDate = $("<td>").text(
                  moment.utc(body[i].startTime).format("MMM Do HH:mm A")
                );
                eDate = $("<td>").text(
                  moment.utc(body[i].endTime).format("MMM Do HH:mm A")
                );
                facility = $("<td>").text(body[i].Facility.name);

                tRow.append(facility, sDate, eDate);
                $("#tableBody").append(tRow);
              }
              // scroll down so table is visible
              window.scrollBy(0, 300);
            } else {
              console.log(`${userName} has no facilities booked`);
            }
          } else {
            console.log(
              "Error returned from server http status " + String(xhdr.status)
            );
          }
        });
      }
    }
  });
});
