# Events and Callbacks

## Learning Objectives

### Events

* Explain event-driven development
* Understand the different types of events we can work with in JS
* Setup an event listener and an event handler
* Use the event object

### Callbacks

* Explain the concept of a "callback" and how we can pass functions as arguments to other functions
* Explain why callbacks are important to asynchronous program flow
* Pass a named function as a callback to **another** function
* Pass an anonymous function as a callback to another function

## Framing

So far, we have needed to use the REPL in the browser console to interact with our programs. This is asking a bit much of our users. Instead we would like to write code to respond to user interactions with the webpage.

The **DOM** not only lets us manipulate the document (or webpage) using JavaScript, but also gives us the ability to write JavaScript that responds to interactions with the page. These interactions are communicated as **events**.

We can **listen** for certain kinds of user-driven events, such as clicking a button, entering data into a form, keypresses and many, many more.

## Events

- In plain English, what is an event?
- What might an event in the context of a web page be?
- What are some specific examples of common DOM events?

> You can find information on events and examples at [W3Schools Events](https://www.w3schools.com/js/js_events.asp), [W3Schools DOM Events](https://www.w3schools.com/js/js_htmldom_events.asp), and [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Events).

> Note: W3 schools introduces events with JavaScript written into attributes.
We instead will prefer to keep JavaScript out of HTML files and use JS to target elements from the DOM and attach [event listeners](https://www.w3schools.com/js/js_htmldom_eventlistener.asp).

"DOM Events are sent to notify code of interesting things that have taken place." _- MDN_

For the time being, when we talk about "interesting things that have taken place" we are talking about user interactions with the page.

### Types of Events

There are many events that we can listen for and respond to in JavaScript. Broadly speaking, we can divide these events in to four categories:

**Document / Window Events**

- load
- resize
- scroll
- unload

**Mouse Events**

- click
- dblclick
- mouseenter
- mouseleave

**Key Events**

- keypress
- keydown
- keyup

**Form Events**

- submit
- change
- focus

### Setting Up An Event Listener

Now that we have an idea of what DOM events are in theory, let's wire up our code and begin interacting with them. There are two steps to working with events: (1) Listening for an event and (2) Responding to an event.

In order to listen for an event, we need to define an **event listener**. Below you'll find a simple event listener associated with a `'click'` event on a `button` element.

First we target the button:

<details>
	<summary>If a button element has a class of 'js-button', how would we capture this from the DOM?</summary>

```js
const button = document.querySelector('.js-button');
```
</details>


Once we have the element from the DOM, we can tell JS to listen for an event:

```js
// This is the event listener

button.addEventListener('click', handleClickEvent);

// first argument: event
// second argument: callback function
```

That completes step 1 of working with events - we're now listening for a click event on our button!

For step two, we need to define the function that will be called whenever this event is emitted. This is just a function, but it has a special name due to how it's being used: a **callback** function:

```js
function handleClickEvent() {
  console.log('I was clicked!');
}
```

All together, our code looks like this:

```js
const button = document.querySelector('.js-button');
button.addEventListener('click', handleClickEvent);

function handleClickEvent() {
  console.log('I was clicked!')
}
```

Or we could use an anonymous callback function:

```js
const button = document.querySelector('.js-button');

button.addEventListener('click', function() {
  console.log('I was clicked!');
});
```

The code above first gets an element from the DOM. It then attaches an event listener to that `button` element with the `addEventListener()` method. The `addEventListener()` method takes two arguments: (1) the event we want to listen for and (2) the function that should be called whenever that event is invoked. In the case of the code above, we're saying we want to listen for `click` events on our `button`, and whenever someone does click on our button, call the `handleClickEvent()` function.

## Aside: Callbacks -  Calling vs. Referencing

As a quick aside, let's answer the question, "What is a callback function?"

A callback function is a function that is passed in to another function as an argument, so that it can be called (invoked) at a later point. This is one of the many ways that JavaScript handles **asynchronous** code.

Let's see an example.

_Scenario_: Let's say we have a function called `doWork()` that takes a long time to execute (maybe it has to communicate with some external service). We want to perform some task when it is finished, which we wrap into a function called `getPaid()`. How can we ensure that `getPaid()` will only be called after `doWork()` is finished?

You might think that it is as simple as putting the two functions after each other:

```js  
doWork();
getPaid();
```

In some languages this will work, and the process will hang until `doWork` finishes - but not in JavaScript. JavaScript is an asynchronous programming language, which simply means things won't necessarily happen one after the other. Instead, what would likely happen is `doWork` would get called and start it's process, then `getPaid` would get called and then sometime later, `doWork` would finish running.

This is where callbacks come in!

We can imagine the implementation of `doWork` as looking something like this:

```js
function doWork(callback) {

	// code for whatever it is that takes so long ...

	callback();
}

```

Making sure `getPaid` is called after `doWork` is finished is now as simple as passing it in to `doWork` as an argument:

```js
doWork(getPaid);
```

Note that we're passing a *reference* to `getPaid` in to `doWork`.

<details>
	<summary>What is the difference between referencing and invoking a function?</summary>
	Invoking will actually run the function; referencing is just passing it around inside our program.
</details>

<details>
	<summary>Where does `getPaid` actually get invoked?</summary>
	It will be invoked inside of `doWork`, at the very end of that functions' process or work.
</details>


## The Event Object

Comment out the code you just did in the Color Scheme Switcher exercise and put the following...

```js
var buttons = document.querySelector('li a');

buttons.addEventListener('click', handleClickEvent);

function handleClickEvent (e) {
  console.log('I was clicked!');
  console.log(e);
}
```

The `e` stands for `event`.

> The reason we're not actually using `event` is that it's a "reserved word" in Javascript, like "if" and "return".

### Explore The Event Object

Open up your event listener practice exercise and modify your event handler to accept the event object as a parameter. Then print it to the console.

With your partner, spend three minutes clicking the button and exploring what properties the event (or `e`) object contains. Look for...

* A way to figure out what element was clicked on.
* A way to tell the position of the mouse when it was clicked.
* One other piece of useful or interesting information.

### Preventing Default Behavior

The event object is useful to us as programmers for many reasons - one of those reasons is preventing the default browser behavior for a certain event.

A very common use case for this is when the user clicks on an anchor element (`<a>`) but we want to control what happens in our code, rather than rely on what the browser tries to do in response to this event by default (navigate to another location).

For example:

To prevent the default behavior, we have a special method inside the event object: `preventDefault()`.

- How do we call methods on objects?
- How might we then invoke `preventDefault()` to prevent the default browser behavior?

<details>
	<summary> Answer </summary>

```js
var button = document.querySelector('.js-button');

button.addEventListener('click', handleClickEvent);

function handleClickEvent(e) {
	e.preventDefault();
  console.log('I was clicked!');
  console.log(e);
}
```

</details>

### Event Propagation

Given the following scenario and what we've learned about events so far, what would you do?

> You have a `<nav>` element that contains an unordered list with links in the header of your website. This `<nav>` serves as the primary navigation. Whenever the user clicks on one of these links however, you want to run some code and update the page with JavaScript. How would you attach and event to each link in the list?

One way to go about this is to set an individual event listener on each link, as we did in the color switcher example above.

Another way to go about this is to take advantage of event propagation. There are three phases of **event propagation**: capture phase, target phase, and bubbling phase.

When an event (e.g. click) occurs, all nodes up the DOM tree are notified, beginning at the window level and working its way down the DOM branch to the event target. This is the capture phase. Once the propagation reaches the event target, all event listeners on the target will be triggered. Then, event propagation continues back up the DOM tree in the event bubbling phase. All three of these phases are very nearly instantaneous.

For a visual, consider the event propagation flow phase illustration below.

![Event Propagation Flow Chart (from World Wide Web Consortium)](./event-propagation-flow.png)

Going back to our example with the `<nav>` element containing links: Given event propagation, you can put an event listener on the `<nav>` element. When a click event occurs on each child `<a>`, the event will propagate up through all parent elements of that `<a>` element, including the `<nav>` element. Thus, the event listener on the `<nav>` element will be triggered.

To trigger specific outcomes for each event target child element, you can use a conditional (if/else) or switch statement to invoke the intended function for each the event target.

### We do: Color Switcher

Let's write use javascript event listeners to finish the color switcher code and get the buttons working.

## You Do: Traffic Light and DOTS: The Game

1. In the traffic light directory, implement the JavaScript required to get the traffic light to illuminate the correct light when the corresponding button is pressed. **Note**: Only one light should be on at a time!

2. Visit this [repository](https://git.generalassemb.ly/WDI-Epiphany/event-listener-demo) and follow the instructions.

## Additional Reading
- [Build a Drum Kit in Vanilla JS](https://www.youtube.com/watch?v=VuN8qwZoego)
- [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [Eloquent JavaScript: Handling Events](http://eloquentjavascript.net/14_event.html)
- [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
