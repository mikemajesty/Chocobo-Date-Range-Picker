# Chocobo Date Range Picker - The Date Range Picker easier to use in angular.  [![chocobo2.png](https://s23.postimg.org/9ihipgoej/chocobo2.png)](https://postimg.org/image/k5bbuvwjr/)

## See in operation.
[link](https://chocobo-date-range-picker.herokuapp.com/)

# How to install

```
bower install chocoborangepicker
```

# How to use

##### Import to your project the chocobo-range-picker.min.css.js and chocobo-range-picker.min.cs files in bower_components folder
```
 <link href="/bower_components/chocoborangepicker/dist/css/chocobo-range-picker.min.css" rel="stylesheet">
 <script type="text/javascript" src="/bower_components/chocoborangepicker/dist/js/chocobo-range-picker.min.js"></script>
```
 
 Then refer to your module
```
 angular.module('yourModule', ['chocoboRangePicker']);
```
 

##### In your controller use the code below
 
 
```
   $scope.demo = { searchDate: null };  Here is your property that you want to be populated with date range.
   
   $scope.options = {
        txtDateInit: 'Demo: Date',
        buttons:
        {
          btnYear: { txt: 'Demo: Year', tooltip: "Choose Year" },
          btnSemester: { txt: 'Demo: Semester', tooltip: "Choose Semester" },
          btnTrimester: { txt: 'Demo: Trimester', tooltip: "Choose Trimester" },
          btnMonth: { txt: 'Demo: Month', tooltip: "Choose Month" },
          btnWeek: { txt: 'Demo: Week', tooltip: "Choose Week" },
          btnToday: { txt: 'Demo: Today', tooltip: "Choose Today" },
          btnLastDay: { txt: 'Demo: Last Day', tooltip: "Choose Last Day" }
        }
      };
```
 
##### In your page use

```
  <chocobo-Range-Picker locale='pt-BR' options='options' ng-model="demo.searchDate"></chocobo-Range-Picker>
```

 
 
 
 
 
 
 
#### Used versions

##### Angular
"angular": "^1.6.1"
<hr>
### License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
