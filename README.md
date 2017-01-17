# theNodeProject

## API

The [Swagger](http://swagger.io/) definitions of the API is found under ./docs/api/

Try the live demo of the API [here](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/seanes/theNodeProject/master/docs/api/api.json)

### Exercises, part 2

#### a. React
* Create a Footer component in the Home component. This component could e.g. contain information about current version (be creative here!), link to GitHub repository and with a tiny cry for help. It is also very useful to display the year (don't cheat!)
* Resume the work of the lazer programmers in the Events component. It would be very useful to list all relevant information of the events. But not too verbose. Oh, and wouldn't it be great with a link (NB: use `Link` with the props `to=""` and not your regular `<a href=""..."` so that React-Router is happy) to the event with more information? The lazy programmers agree.
* You have gotten so far, React ninja! The very last but not least "pure" React exercise is vital for the participants to have a closer look on each event. Remember you made the Events component link to an event? Well, now pass the event down to the Event component and make it look important and shiny. Useful information about the event would be nice, but be creative and let it be useful.

#### b. Redux
* We have kinda already cheated and connected to the Store, but let's have a closer look and do more fluxible and reductive stuff. In the Home component you will find a beautiful image of yourself. Or do you? All new users start with a boring default image. Wouldn't it be nice if you can change your profile picture? The lazy programmers agree. Make an action creator that posts your profile with a image from your harddrive. Make sure that your store gets hold of this picture, too. Get Base64 string -> create an action -> post the image -> dispatch the response -> let the reducers take care of the changes of the store!
* So,you think you are done with all your tasks and can go home and play video games? Not yet. The lazy event maintainers couldn't be bothered maintaining your events (they are actually busy playing video games!), and want the users (the creators or hosts) of the events to update the event info. Your next exercise is a difficult task to be sure, be it's very useful! Make a form (or be creative) and make the user update the event. Same procedure as always. 
 