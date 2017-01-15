# Chocobo Date Range Picker - The Date Range Picker easier to use in angular.  [![chocobo2.png](https://s23.postimg.org/9ihipgoej/chocobo2.png)](https://postimg.org/image/k5bbuvwjr/)

[![chococo-range-picker.gif](https://s30.postimg.org/j435dzzsx/chococo_range_picker.gif)](https://postimg.org/image/6coz7hq0t/)

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
        }
      };
```
 
##### In your page use

```
  <chocobo-Range-Picker locale='pt-BR' options='options' ng-model="demo.searchDate"></chocobo-Range-Picker>
```

#### Attention only four locale were tested.: pt-BR - Brasil, en-US - United States, en-GB - Great Britain, de-DE - Germany

### $scope.options
<ul>
<li><b>txtDateInit</b> - Label of input text that will show the date interval. If you remove this property it will not shown.</li>
<li><b>buttons</b> - Where you will configure a buttons properties.</li>
<li><b>buttons: {btnYear}</b> - Where you will configure a each button properties. If you remove this property it will not shown.</li>
<li><b>buttons: {btnYear.txt}</b> - Text that will apear in button.</li>
<li><b>buttons: {btnYear.tooltip}</b> - Tooltip that will appear when user mouseover on button.</li>
</ul>

#### Other features.

#### You can override a css class like you prefer.

##### Button Text

```
.btnYear {
    yourCssProperty: yourValueCssproperty !important;
}

.btnSemester {
    yourCssProperty: yourValueCssproperty !important;
}

.btnTrimester {
    yourCssProperty: yourValueCssproperty !important;
}

.btnMonth {
    yourCssProperty: yourValueCssproperty !important;
}

.btnColorWeek {
    yourCssProperty: yourValueCssproperty !important;
}

.btnLastDay {
    yourCssProperty: yourValueCssproperty !important;
}

.btnToday {
    yourCssProperty: yourValueCssproperty !important;
}

```

##### Button Hover

```
.btnFade.btnYear:hover {
    yourCssProperty: yourValueCssproperty !important;
}

.btnFade.btnSemester:hover {
    yourCssProperty: yourValueCssproperty !important;
}

.btnFade.btnTrimester:hover {
    yourCssProperty: yourValueCssproperty !important;
}

.btnFade.btnMonth:hover {
    yourCssProperty: yourValueCssproperty !important;
}

.btnFade.btnColorWeek:hover {
    yourCssProperty: yourValueCssproperty !important;
}

.btnFade.btnLastDay:hover {
    yourCssProperty: yourValueCssproperty !important;
}

.btnFade.btnToday:hover {
    yourCssProperty: yourValueCssproperty !important;
}
```

##### Input text

```
.input-text {
    yourCssProperty: yourValueCssproperty !important;
}
```

##### Current select day

```
current-day-last {
    yourCssProperty: yourValueCssproperty !important;
}
```

##### Date interval

```
.hover-range-normal {
    yourCssProperty: yourValueCssproperty !important;
} 
```
 
##### Arrows that changes the months.

```
.btn-prev,.btn-next {
    yourCssProperty: yourValueCssproperty !important;
}
.btn-prev:hover, .btn-next:hover {
   yourCssProperty: yourValueCssproperty !important;
}
```
#### Used versions

##### Angular
"version": "^1.6.1"
<hr>
### License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
