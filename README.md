Car Price - Server and Web App
==============================

Node RESTful web server
-----------------------

For the purposes of this assessment, you'll just want to look in the api directory.
Specifically this particular endpoint:

> /value/:make-:model-:age-months-:owners-owners?mileage={numberOfMiles}&collisions={numberOfCollisions}

This probably doesn't require much explanation, but navigate to the api directory
using cmd prompt or powershell and use

> npm install

and then

> node server.js

to get it started. Then put the above endpoint into postman or something like it, starting with your
localhost and port 8081. The endpoint will respond uniquely to request headers that accept html and
json, and will otherwise return text. You can also navigate to the endpoint in your browser to see the
html response. The html and json responses will not only return the final value, but also the base
factory value of the vehicle, and the percent that the factory value was adjusted by to get the final
value.

... or at least that's what I'd like to say. You'll probably see in carsController.js that I don't
actually get a proper base value from anywhere and just hard code it as $20,000. Not only does the car
info api suggested by the assessment not have anyway to find a car's value, a search on the internet
turned up no other particularly good options to do so. The ones that seem like they would actually
provide car values all seem to require making accounts and paying fees, which I assume would be
overkill for me to try to do for the sake of this assessment. So for the record: I would have if I
could have.

Just For Fun - React Web UI
---------------------------

Since I needed to brush up on react.js in general, I figured this would be a good excuse to make a
front end, which I put in the ui directory. If you want to try it out, head on in there and use the
commands

> npm install

and then

> npm run dev

to start it, and then navigate on your browser to localhost and port 3000. Also make sure you have the
rest server running as well. The ui provides a crude interface for inputting the props into the value
api endpoint, and recieving the response json. I didn't really get around to proper styling or error
handling, but the ui's code should give you a decent idea of how my team's react work looked like at my
previous place of employment.
