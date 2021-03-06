// set up buttons and display table for booking page
// John Webster

$(document).ready(function() {
  var facilityId = 0;
  var facilityName = "";

  // select the facility
  $(".facilityDropdown").on("click", function() {
    facilityId = $(this).attr("data-value");
    facilityName = $(this).attr("data-name");
    // menu header now becomes facility name
    $("#facilityMenu").text(facilityName);
    $("#facName").text(facilityName);
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
    if (facilityId === 0) {
      console.log("Need to choose facility");
    } else {
      if (moment.utc(endDate).isBefore(startDate)) {
        console.log("End date is before start date");
      } else {
        // GET data from server
        $.ajax({
          url: `/api/facility_bookings/${facilityId}/${startDate}/${endDate}`,
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
                usr,
                dl = "";
              for (let i = 0; i < body.length; i++) {
                tRow = $("<tr>");
                sDate = $("<td>").text(
                  moment(body[i].startTime).format("MMM Do HH:mm A")
                );
                eDate = $("<td>").text(
                  moment(body[i].endTime).format("MMM Do HH:mm A")
                );
                usr = $("<td>").text(body[i].User.name);
                dl = $("<td>").text(body[i].User.drivingLicence);

                tRow.append(sDate, eDate, usr, dl);
                $("#tableBody").append(tRow);
              }
              // scroll down so table is visible
              window.scrollBy(0, 300);
            } else {
              console.log("No results returned (no facilities booked)");
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
