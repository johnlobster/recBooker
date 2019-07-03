$(document).ready(function() {
  // process form and GET from server api
  $("#submitButton").on("click", function(event) {
    event.preventDefault(); // stop from posting and reloading page
    let userName = $("#name").val();
    let userPassword = $("#password").val();
    console.log("User " + userName + " password " + userPassword);

    // POST data to /api/login
    const postObject = {
      name: userName,
      password: userPassword
    };
    $.ajax({
      url: `/api/login`,
      method: "POST",
      data: JSON.stringify(postObject),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .done(function(body, textStatus, xhdr) {
        console.log(typeof testStatus);
        console.log(textStatus);
        if (textStatus === "success") {
          if (!body.length) {
            // no body return, so failed login
            console.log("failed to log in");
          } else {
            console.log("Logged in successfully");
            // save user id and name
            // user id is returned by the server
            // console.log(body);
            sessionStorage.setItem("userId", body.id);
            sessionStorage.setItem("userName", userName);
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
}); // close document ready
