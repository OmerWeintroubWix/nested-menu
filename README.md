# nested-menu

## GET (all menus): http://localhost:8080/api/menu/
Returns an array of all menus.

## POST (a menu): http://localhost:8080/api/menu/, body: {parentId: number, name: string}
Adds a menu with the given name to the array, id is a `Date.new()`
###### Returns an array of all menus

## DELETE (a menu): http://localhost:8080/api/menu/:menuId
Deletes a menu by id
###### Returns an array of all menus

## UPDATE (a menu): http://localhost:8080/api/menu/:menuId, body: {newName: string}
Renames a menu by id (newName param needed)
###### Returns an array of all menus
