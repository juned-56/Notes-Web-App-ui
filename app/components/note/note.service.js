app.service('NoteService', function($http) {
    var baseUrl = 'http://localhost:8787/app';

    this.getAllNotes = function() {
        return $http.get(baseUrl + '/getAllNotes').then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.error('Error fetching notes:', error);
        });
    };

    this.addNewNotes = function(note) {
        return $http.post(baseUrl + '/addNewNotes', note).then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.error('Error adding note:', error);
        });
    };

    this.updateNotes = function(id, note) {
        return $http.put(baseUrl + '/updateNotes/' + id, note).then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.error('Error updating note:', error);
        });
    };

    this.deleteNoteById = function(id) {
        return $http.delete(baseUrl + '/deleteNoteById/' + id).then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.error('Error deleting note:', error);
        });
    };
});
