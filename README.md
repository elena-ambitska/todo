# Rokupo ToDo App

ToDo app implementaion built with pure JS https://rokupo.com/

## Goals of the project

* don't use JS frameworks and libs
* structure code and split it to components
* make it real world project

## Used resources

* WebPack config from https://github.com/wbkd/webpack-starter
* ToDo list API https://rokupo-37fca.ondigitalocean.app/
* Minimalistic CSS framework https://picocss.com/

## Routing

* src/routes.js contains list of routes
* src/components/router-link/router-link.js custom element that intercepts click on link,
 updates page URL with history api push state and fires custom event pushstate
* src/components/router/router.js listens to popstate and pushstate events and
 tries to find corresponding component. If no component was found then displays login page

## Components

* Components are responsible for viewing data and handling user events.
* All components are inheriting HTMLElement and are Custom Elements

## Services

* src/services/BaseService.js base service with generic method to send API calls
* src/services/AuthService.js makes login and register API calls. Stores auth token in LocalStorage
* src/services/ListService.js and src/services/TodoService.js CRUD for todo app resources

## Future Plans

* allow to specify task deadline
* use WebSocket to autoupdate data
* add subtasks
* task lists sharing
