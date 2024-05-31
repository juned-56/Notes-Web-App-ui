app.controller('NoteController', function($scope, NoteService) {
    $scope.notes = [];
    $scope.selectedNote = null;
    $scope.filteredNotes = [];
    $scope.isEditing = false;
    $scope.isAdding = false;
    $scope.noteForm = {};
    $scope.showNoteDetailsPopup = false;
    $scope.searchQuery = "";

    $scope.getAllNotes = function() {
        NoteService.getAllNotes().then(function(data) {
            $scope.notes = data;
            $scope.filteredNotes = data;
        }).catch(function(error) {
            console.error('Error fetching notes:', error);
        });
    };

    $scope.selectNote = function(note) {
        console.log('selectNote function called');
        console.log('Selected note:', note);
        $scope.selectedNote = note;
        $scope.showNoteDetailsPopup = true;
    };

    $scope.closeNoteDetailsPopup = function() {
        $scope.showNoteDetailsPopup = false;
    };

    $scope.showAddForm = function() {
        $scope.noteForm = {};
        $scope.isAdding = true;
        $scope.isEditing = false;
    };

    $scope.showEditForm = function(note) {
        console.log('Editing note:', note);
        $scope.noteForm = angular.copy(note);
        $scope.isEditing = true;
        $scope.isAdding = false;
    };

    $scope.saveNote = function() {
        NoteService.addNewNotes($scope.noteForm).then(function() {
            $scope.getAllNotes();
            $scope.cancel();
        }).catch(function(error) {
            console.error('Error adding note:', error);
        });
    };

    $scope.updateNote = function() {
        NoteService.updateNotes($scope.noteForm.id, $scope.noteForm).then(function() {
            $scope.getAllNotes();
            $scope.cancel();
        }).catch(function(error) {
            console.error('Error updating note:', error);
        });
    };

    $scope.deleteNote = function(id) {
        console.log('Deleting note with id:', id);
        NoteService.deleteNoteById(id).then(function() {
            $scope.getAllNotes();
            $scope.selectedNote = null;
        }).catch(function(error) {
            console.error('Error deleting note:', error);
        });
    };

    $scope.cancel = function() {
        $scope.selectedNote = null;
        $scope.isEditing = false;
        $scope.isAdding = false;
    };

    $scope.closeModal = function () {
        $scope.isAdding = false;
        $scope.isEditing = false;
        $scope.selectedNote = null;
        $scope.noteForm = {};
    };

    // Add the search function
    $scope.searchNotes = function() {
        $scope.filteredNotes = $scope.notes.filter(function(note) {
            return note.title.toLowerCase().includes($scope.searchQuery.toLowerCase());
        });
    };

    // Fetch all notes on controller initialization
    $scope.getAllNotes();
});
