# Typescript Code Challenge

This repository contains three challenges of which we would like you to solve two. The first challenge, challenge-1, is a plain typescript challenge. For the second challenge you **may choose** between skipping either challenge-2 or challenge-3. Based on profile we may specifically ask you to do the Stream processing challenge-2 or the React challenge-3.

See this as an opportunity to show us your way of working, with the same code quality and robustness as you would deliver on the job. Your submission for the second challenge will be assessed as if delivering a production ready pull-request.

The estimated time to complete the challenges is roughly 4 hours.

## How to send us your solution

Please don’t make solutions to the code challenge publicly available online.

We would prefer to receive a link to a private repository.

## Challenge-1 (String manipulation)

You can find the instructions in `src/challenge-1.ts`;

## Challenge-2 (Stream processing)

You can find the instructions in `src/challenge-2.ts`;

## Challenge 3 (React)

The third challenge involves developing a small user story in React.

The assignment is to create an component where you can search by flightNumber through gate changes. A gate change is when a flight is directed to a different gate than originally planned. The gate changes, arrival and departure times can change at any time, so API requests should not be cached.

### Getting started

Install dependencies

```
npm install
```

Start dev server (http://localhost:3000)

```
npm start
```

You can find the API documentation for this challenge in the `swagger.json` in this repository.
The API can be started with the command `npm run start:api`.  
It will be available on `http://localhost:3001`.

A brief overview of the endpoints that are available:

-   `/arrivals`
-   `/departures`
-   `/gate-changes/:search`

Additional notes:

-   There is no need to add css styling or end-to-end tests
-   You are allowed to use any node module to assist you with writing the code/logic
-   Please do not change the api code

### Acceptance criteria for the user story:

Scenario: Searching for gate changes
Given I am on the Code Challenge page  
When I start typing in the input field  
And I have type more than 1 character  
Then a list of maximum 5 gate changes should be shown

Scenario: Showing arrival / destination for gate changes  
Given I am on the Code Challenge page  
When I start typing in the input field  
And I have type more than 1 character
Then a list of gate changes should be shown  
And every gate change should include the destination / origin of the flight

Scenario: Sorting the gate changes  
Given I am on the Code Challenge page  
When I start typing in the input field  
And I have type more than 1 character  
Then a list of gate changes should be shown  
And the list should be sorted based on arrival / departure time of the flight

Scenario: Clearing gate changes  
Given I am on the Code Challenge page  
When I clear the input field  
Then no gate changes should be shown

Scenario: Hovering effect on gate changes list items  
Given I am on the Code Challenge page, and have a list of gate changes.  
When I hover uneven times (1st time, 3rd time etc...) on a gate change item  
Then the background should have a yellow color  
When I hover even times (2nd time, 4th time etc...) on the same item  
Then the background should have a red color
