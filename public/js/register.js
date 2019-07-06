$(document).ready(function() {
  // process form and GET from server api
  $("#submitButton").on("click", function(event) {
    event.preventDefault(); // stop from posting and reloading page
    let userName = $("#name")
      .val()
      .trim();
    let userPassword = $("#password")
      .val()
      .trim();
    let userDrivingLicense = $("#drivingLicense")
      .val()
      .trim();
    console.log(
      "User " +
        userName +
        " password " +
        userPassword +
        " licence " +
        userDrivingLicense
    );

    // POST data to /api/newUser
    const postObject = {
      name: userName,
      drivingLicence: userDrivingLicense,
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
        console.log(textStatus);
        if (textStatus === "success") {
          // API returns boolean "success"
          if (body.success) {
            console.log("Posted successfully");
            // display modal
            $("#registerModalText1").text("Created user " + userName);
            $("#registerModalText2").text("");
            $("#registerModal").modal({
              show: true
            });
            // save user id and name
            // user id is returned by the server
            sessionStorage.setItem("userId", body.id);
            sessionStorage.setItem("userName", userName);
          } else {
            console.log("Couldn't create user " + userName);
            // display modal
            $("#registerModalText1").text("Couldn't create user " + userName);
            $("#registerModalText2").text("");
            $("#registerModal").modal({
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
  });
}); // close document ready
