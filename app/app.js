var app = angular.module('notesApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'app/components/note/note-list.html',
        controller: 'NoteController'
    })
    .when('/notes/:id', {
        templateUrl: 'app/components/note/note-detail.html',
        controller: 'NoteController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
