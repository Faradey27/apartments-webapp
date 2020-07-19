This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Bob W frontend software engineer assignment

## [Open live demo](https://faradey27.github.io/bobw-task/) 🚀

## How to run

`npm start` <br>
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test` <br>
Launches the test runner in the interactive watch mode.

`npm run build` <br>
Builds the app for production to the `build` folder.<br>
It's ready to be deployed

`npm run deploy` <br>
Deploys app to github pages

`npm run prettier` <br>
Runs prettier which will autofix codebase

## Task
> ETA 8 hours

Create a simple browser application that would allow a user to book a hotel room (our hotel has
just three rooms) for one night.

### Main tasks:

#### Booking date selection.
- [x] Shows the interface to pick the booking date.
- [x] Should be implemented with any datepicker of your choice.
- [x] It should be possible to progress to the next stage when the date is picked.
#### Room selection.
- [x] Shows rooms list with room names and images. 
- [x] It should be possible to select one of the available rooms.
- [x] Rooms are hardcoded with the JSON provided below.
- [x] It should be possible to go back to the previous stage.
- [x] It should be possible to progress to the next stage when the room is selected.
#### Payment
- [x] Shows the input for credit card number and an icon that shows the payment card network (Visa/Mastercard/Amex) depending on the credit card number entered.
- [x] It should be possible to go back to the previous stage.
- [x] It should be possible to finalize the booking once a valid credit card number is entered (validate with Luhn algorithm). 
- [x] Request is sent to the endpoint POST http://localhost/booking and contains selected date, room id and credit card number.
- [x] Success page

```JSON
{"data":[{"id":1,"name":"Cheap
room","available":true,"image":"https://via.placeholder.com/400x200.png?text=C
heap%20room"},{"id":2,"name":"Not so cheap
room","available":false,"image":"https://via.placeholder.com/400x200.png?text=
Not%20so%20cheap%20room"},{"id":3,"name":"Expensive
room","available":true,"image":"https://via.placeholder.com/400x200.png?text=E
xpensive%20room"}]}
```

### Bonus tasks:

- [x] Reload apartments after another date selected
- [x] Use real API requests
- [x] Calculate price for selected date range
- [x] Show number of nights that user selected 

### Extra:

- [x] Loading states
- [x] Error states 
- [x] Validations 

## Architecture

## General note

In the begining I was thinking that for such type of projects the best 
fit will be universal app(server side rendering on first visit + SPA after [read more](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905)).
React JS has nice tool for this called [nextjs](https://nextjs.org/).
But after some thinking I decided to implement simple SPA, because: 
 - it is test task and it should show general skills first, rather then frameworks details
 - nextjs provides own routing and requires a little bit different way to work with app state 
 - as task is timeboxed to 8 hours, with nextjs ETA will increase by 5-15%

### View + data management

I've used to React for view layer because it is flexible, simple, and able to provide good abstraction together with good performance.
For state management I've chosen Flux architecture (it's cut Redux implementation), because it has one-way data flow, one centralized store, simple API, large community - a good fit for such type of application.(but in general such simple app can live fully without redux, I am using it here more like a demostation)
Also create-react-app able to generate project pretty fast, which will save some time.
Also, BobW uses react in their day to day work, so it will be easier to assess test task as it is closer to real life.

### Tests

In the beginning, I planned to use TDD, but after a deeper analysis of the task, I decided to skip tests almost fully in order to save some extra time and meet the deadline.
I have all infra ready from create-react-app and 1 test that renders the whole app, so next tests only question of time

### Typesafty

I decided to use typescript, it allows us to make code easier to maintain and understand, also it helps to prevent some bugs on compile step.
Alternative to typescript can be TDD, with TDD we can stop worrying about most of the bugs that can be handled by TS, but sadly I did not have enough time to solve tasks in TDD way.

### Project structure

With bigger application, I usually prefer feature-folder approach to structure the codebase. But as the task is pretty small, I separated code by function.
It will allow me in future easialy migrate to feature-folder structure, where components, rdx, styles, api leaves near to each other.

```js
|-- public
|-- src
|---- api          // data fetching logic and types
|---- state        // all redux state management
|---- hooks        // global custom react hooks
|---- components   // reusable components
|---- screens   // reusable components
```

#### API

I created a folder called `api` where I have `types.ts` - it contains type information about all data layer - in real life this type will be imported from server code (or generated by server team).
Inside `index.ts` file I have created functions per each endpoint, these type-safe functions fetch and load data from the server.
In order to save some time, I decided to not use real external API. I emulated it by putting JSON files in to `public` folder. These files are loaded in a way that would emulate real API, and in case I would decide to migrate to use expternal API in the furure it would be pretty easy to do.

#### State management

For state management I decided to use `redux`. Everything related to it lives in `state` folder. Inside it, I used feature sub-folders, that emulate state structure – the idea is that we have sub-reducer, sub-actions, sub-selectors per feature.
Currently there is only apartments - independent sub-feature inside redux with own sub-reducer, sub-actions, sub-selectors - it allows us to simplify readability and allows us to work with features in an easier way (smaller files, abstracted code), in case if we decide to add more features to app.

For side effects, I decided to use `redux-thunk` as most of our requests pretty simple. But everything structured in a way that it is easy to migrate to redux-observable or redux-saga in the future, if side-effects become more complex.

#### Screens

Main logic blocks of the app live in `screens` folder. I put here the main logic blocks of the app(pages/routes - each screen independent route). The idea is that screens are more "smart" components, use async redux actions to fetch data,
then select this data, contain some business logic and redistribute all data to children. All non-reusable components and helper functions that screens use, are structured within the screen folder. This way it is easier to develop new functionality, as all the code is very close.


### Main decitions

#### Styles

I did some research of available component libraries, that couple be used for the task. I considered `material-ui`, `ant` and `reach-ui`.
I decided not to use a pre-made components library. Here's why:

1. They can increase the complexity of a small project, as to create a UI close to design I would need to interfere with the library's code
2. Not everyone is familiar with the libabry I would choose, and with any of those there's some libabry-specific knowledge that can make code harder to understand
3. The benefit for 1-page layout would be relatively small
4. For you, as a reviewer, it would be easier to assess my coding skills

Most styles are implemented from scratch with SASS and css modules (built in create-react-app). I activly used css-grid and scss variables
to make better and consistent layouts.


#### Internatiolalization amd localization

It is always hard to add intl support at the end, so I added react-intl in the begining as show case how it can be implemented.
More about motivation you can read [here](https://formatjs.io/docs/react-intl/)

#### Code style

For code style I am using prettier and eslint from create-react-app.

## Dependencies

- Icons and images from https://bobw.co/
- [react-dates](https://github.com/airbnb/react-dates) as date-picker component
- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - for typesafe redux actions
- [react-helmet](https://github.com/nfl/react-helmet) - for dynamic page title
- [card-validator](https://github.com/braintree/card-validator) - to validate credit card with luhn algorithm
- [formik](https://formik.org/) - to work with forms

## Known issues & improvements

**Known issues:**

**1. Accessibility**

Unfortunately, I did not have time to make application fully accessible and test the accessibility. Where possible I tried to keep it in mind, but there's still a lot to improve

**2. Hardcoded values**
Somewhere in the code and CSS I have hardcoded values.

**3. Inconsistent color palette**
Unfortunately, I was not able to find BobW's design system that I could follow. So in a lot of cases there are some assumprions or inconsistyent colors.

**4. Only 1 test**
As I said before, I made a decision not to cover functionality with tests. But if it was a real life application, I would most definitely cover at least the main user flows with tests.

**5. Fake API**
Currently fake API is used. Ideally, I would love to use a real API with data, but I could not find anything that is close enough quickly, so settled with the mocked API

**6. Some minor bugs**
I have tested the flow and tried to fix all the issues. But there's definitely some bugs that I have missed.

**Improvements:**

**Improvements:**

1. I'd like to have more tests and better overall coverage
2. Use real API
3. Do real filtering of apartments based on selected dates
4. Safely calculate prices on server
5. Make design more coherent
6. Add documentation on components
7. Better loading states

## Timetable

> ETA 6-8 hours

- Research - 0.5 hours
- General layout - 1 hours
- Workable MVP - 2 hours
- Fixing prototype according to requirments + other functionality - 3.5 hours
- Cleanup and refactoring 1 hour
- Readme - 0.5 hour

`Total: 8.5 hours`
