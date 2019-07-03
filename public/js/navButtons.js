// navButtons javascript called on every page as it has logout code

$(document).ready(function() {
    console.log("Loaded logout button function");
  $("#logoutbutton").on("click", function(event) {
    event.preventDefault(); // stop from posting and reloading page
    console.log("logout button pushed");
    // if not logged in, can't log out
    if (!sessionStorage.getItem("userId")) {
      // no user name available, can't log out
      console.log("Not logged in, can't log out");
    } else {
      // sending user id to server so it can check against session user id
      $.ajax({
        url: `/api/logout`,
        method: "POST",
        data: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
        .done(function(body, textStatus, xhdr) {
          if (textStatus === "success") {
            if (body.length !== 0) {
              console.log("Logged out successfully");
              sessionStorage.removeItem("userId");
              sessionStorage.removeItem("userName");
            } else {
              console.log("empty body returned - logout not successful");
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
}); // end document ready
