# nested-menu

## GET (all menus): http://localhost:8080/api/menu/
Returns an array of all menus

## POST (a menu): http://localhost:8080/api/menu/, body: {parentId: number, name: string}
Adds a menu with the given name to the array, id is a `Date.new()`

## DELETE (a menu): http://localhost:8080/api/menu/:menuId
Deletes a menu by id

## UPDATE (a menu): http://localhost:8080/api/menu/:menuId, body: {newName: string}
Renames a mtnu by id (newName param needed)
