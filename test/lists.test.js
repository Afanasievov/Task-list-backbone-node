'use strict';

suite('Lists', function() {
  const spyUpdate = sinon.spy(gapi.client.tasks.tasklists, 'update');
  const spyCreate = sinon.spy(gapi.client.tasks.tasklists, 'insert');
  const spyDelete = sinon.spy(gapi.client.tasks.tasklists, 'delete');;

  setup(function() {
    spyUpdate.reset();
    spyCreate.reset();
  });

  test('Creating a list', function() {
    const $el = bTask.views.app.$el;
    const listName = 'TEST LIST';

    $el.find('#add-list-button').click();

    $el.find('#list_title').val(listName);

    $el.find('#list_title').parents('form').first().submit();

    assert.equal(1, spyCreate.callCount);

    assert.equal(listName, $('.list-menu-item:last').text().trim());
  });

  test('Editing a list', function() {
    var $el = bTask.views.app.$el;

    // Show the edit list form
    $el.find('.list-menu-item:first').click();
    $el.find('#edit-list-button').click();

    $el.find('#list_title').val('Edited list');
    $el.find('#list_title').parents('form').first().submit();

    assert.equal(1, spyUpdate.callCount);
    assert.equal('Edited list', $('.list-menu-item:first').text().trim());
  });

  test('Deleting a list', function() {
    var $el = bTask.views.app.$el;

      // Show the delete list form
      $el.find('#delete-list-button').click();

    $el.find('#delete-button').click();

    // Click the list delete button
    $el.find('.delete-list').click();

    assert.equal(1, spyDelete.callCount);
  });

});
