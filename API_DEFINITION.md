# recBooker route definitions

App for making bookings of city recreational facilities, administrating facilities and summarizing bookings for each facility

#### Developers

* Michael Sender
* Filmon Habtu
* Rob Ross
* John Webster


## API routes

##### GET `/api/facilities`

returns JSON array of all facilities { id:, name:}

##### GET `/api/users`

returns JSON array of all users {id: name:}

##### GET `/api/facility_bookings/:facility/:startDate/:endDate`

returns json array of all bookings for :facility from :startDate to :endDate 
{id:, startTime:, endTime:, userName:,facility:}

##### GET `/api/user_bookings/:user/:startDate/:endDate`

returns json array of all bookings for :user on :startDate to :endDate {id:, startTime:, endTime:, userName:, facility:}}

##### POST `/api/newuser`

request data (json) {userName:}

return json object {success:true/false}

##### POST `/api/newfacility`

request data (json) {facility:}

return json object {success:true/false}

#### POST `/api/newbooking`

request data (json) {facilityId:, UserId, startTime:, endTime:}

return json object {success:true/false}

#### DELETE `/api/booking/:bookingId`

Deletes booking from database

return json object {success:true/false}

#### DELETE `/api/user/userId`

Deletes user from database

return json object {success:true/false}

#### PUT `/api/booking/:bookingId`

Change booking

request data (json) {bookingId:, facilityId:, userId:, startTime:, endTime:}

return json object {success:true/false}

## HTML routes

##### GET `/`

renders index.handlebars

arguments:

##### GET `*`

renders 404.handlebars

arguments:

(This is the last route defined, so is default)

