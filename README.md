# my first vue project with antd on localServer

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## Add(Create)
```
Add button click -> add camera modal -> input information -> save button click -> enter this camera data to MongoDB and spread to screen
```
![Camera Add](https://github.com/dndud2906/first_local_vue_project/blob/master/example/test.gif)

## Edit(Update)
```
Edit button click on operation row at table -> edit camera modal -> update information -> save button click -> update this caemra data on screen with MongoDB
```
![Camera Edit](https://github.com/dndud2906/first_local_vue_project/blob/master/example/edit.gif)

## Remove(Delete)
```
Remove button exists double version.

first, the remove button on each row delete only one camera on table.

second, the remove button next to the add button delete selected camera on table. (several camera information remove in possible)
```
![Camera Remove](https://github.com/dndud2906/first_local_vue_project/blob/master/example/remove.gif)

## Search
```
first doing to search camera informations you want is selectiong searchType on selectBar

after that

enter word input box
(perhaps you want to show all camera list after searching, Enter without typing anything)
```
![Camera Search](https://github.com/dndud2906/first_local_vue_project/blob/master/example/search.gif)

## Export
```
like second remove button, this button is executed when camera list selected exist (camera must be selected)

after this button clicks, Downloaded cameraListData fileName in Json file format.
```
![Camera Export](https://github.com/dndud2906/first_local_vue_project/blob/master/example/export.gif)

## Import
```
if you click this button, open file explorer.

and select .json file you want to push camera list

-> this camera list also enter to MongoDB
```
![Camera Import](https://github.com/dndud2906/first_local_vue_project/blob/master/example/import.gif)

### Vue CLI download
npm install -g @vue/cli     --me
or
yarn global add @vue/cli

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
