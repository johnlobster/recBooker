$(document).ready(function() {
  // process form and GET from server api
  $("#submitButton").on("click", function(event) {
    event.preventDefault(); // stop from posting and reloading page
    let userName = $("#name").val();
    let userPassword = $("#password").val();
    console.log("User " + userName + " password " + userPassword);

    // POST data to /api/newuser
    const postObject = {
      name: userName,
      password: userPassword
    };
    $.ajax({
      url: `/api/newUser`,
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
  });

  $("#logoutButton").on("click", function(event) {
    event.preventDefault(); // stop from posting and reloading page
    $.ajax({
      url: `/api/logout`,
      method: "POST",
      data: {},
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .done(function(body, textStatus, xhdr) {
        console.log(typeof testStatus);
        console.log(textStatus);
        if (textStatus === "success") {
          if (body.length !== 0) {
            console.log("Logged out successfully");
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
  });
}); // close document ready
