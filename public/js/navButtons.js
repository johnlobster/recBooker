// navButtons javascript called on every page as it has logout code
// nothing other than logout code

$("#logoutButton").on("click", function(event) {
  event.preventDefault(); // stop from posting and reloading page
  // if not logged in, can't log out
  if (!sessionStorage.getItem("userId")) {
    // no user name available, can't log out
    console.log("Not logged in, can't log out");
    // display modal
    $("#logoutModalText1").text("Logout unsuccessful");
    $("#logoutModalText2").text("No-one logged in");
    $("#logoutModal").modal({
      show: true
    });
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
            // display modal
            $("#logoutModalText1").text("Logout successful");
            $("#logoutModalText2").text(
              "User " + sessionStorage.getItem("userName") + " logged out"
            );
            $("#logoutModal").modal({
              show: true
            });
            // remove from session storage
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("userName");
          } else {
            console.log("empty body returned - logout not successful");
            // display modal
            $("#logoutModalText1").text("Logout unsuccessful");
            $("#logoutModalText2").text("No-one logged in");
            $("#logoutModal").modal({
              show: true
            });
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
