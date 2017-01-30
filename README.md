# Chocobo Date Range Picker - The Date Range Picker easier to use in angular.  [![chocobo2.png](https://s23.postimg.org/9ihipgoej/chocobo2.png)](https://postimg.org/image/k5bbuvwjr/)

[![dtChocobo.gif](https://s30.postimg.org/qkccdu5xt/dt_Chocobo.gif)](https://postimg.org/image/607ifcq6l/)

## Try it yourself.
[click here](https://chocobo-date-range-picker.herokuapp.com/)

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
        },
        inputConfig: 
        {
          showIcon: true,
          iconPath: "http://www.racedepartment.com/images/rd_calext/calendar.png"
        }
      };
```


### $scope.options
<ul>
<li><b>txtDateInit</b> - Label of input text that will show the date interval. If you remove this property it will not shown. This property is optional</li>
<li><b>buttons</b> - Where you will configure a buttons properties. This property is required</li>
<li><b>buttons: {btnYear}</b> - Where you will configure a each button properties. This property is optional,but if you do not use this property the related button will not be displayed.</li>
<li><b>buttons: {btnYear.txt}</b> - Text that will apear in button. This property is optional</li>
<li><b>buttons: {btnYear.tooltip}</b> - Tooltip that will appear when user mouseover on button. This property is optional</li>
<li><b>inputConfig</b> - Input text settings. Optional. Without this property the default icon will be displayed.</li>
<li><b>inputConfig: {showIcon}</b> - This property indicate if you want show icon. his property is required. If the property is false, the icon will not be displayed.</li>
<li><b>inputConfig: {iconPath}</b> - This property indicate if you want show icon. This property is optional, This property indicate the path to his own icon.</li>
</ul>
 
##### In your page use

```
  <chocobo-Range-Picker bindRange='false' locale='pt-BR' options='options' ng-model="demo.searchDate"></chocobo-Range-Picker>
```


### chocobo-Range-Picker
<ul>
<li><b>bindRange
</b> 
<br> <b>false </b>- The first and last date will be assigned to the template
<br> <b>true </b> = All date in the range will be assigned to the model.
</li>

<li>
<br> <b>blockWeekDay </b>- Property that represent a weekday to be blocked, example blockWeekDay='0,6'. var blockWeekDay = {
  "Sunday": 0
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
}, This property is optional.
</li>
</ul>

#### Attention these locales have been tested.

<ul>
  <li>
    <b>
      Spain
    </b> - es-ES
  </li>
  <li>
    <b>
      Brazil
    </b> - pt-BR
  </li>
  <li>
    <b>
      United States
    </b> - en-US
  </li>
  <li>
    <b>
      Great Britain 
    </b> - en-GB
  </li>
  <li>
    <b>
      Germany
    </b> - de-DE
  </li>
</ul>
<hr>
```
#### Used versions

##### Angular
"version": "1.2.32"
<hr>
### License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
