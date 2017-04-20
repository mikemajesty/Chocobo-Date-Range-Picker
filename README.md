# Chocobo Date Range Picker - The Date Range Picker easier to use in angular.  [![chocobo2.png](https://s23.postimg.org/9ihipgoej/chocobo2.png "Chocobo Icon")](https://postimg.org/image/k5bbuvwjr)


[![video.gif](https://s13.postimg.org/d7riugr93/ezgif.com-video-to-gif.gif)](https://postimg.org/image/h44uqgc8j/)

## Try it yourself.
[click here](https://chocobo-date-range-picker.herokuapp.com/)

# How to install

```shell
bower install chocoborangepicker
```

# How to use

##### Import to your project the chocobo-range-picker.min.js and chocobo-range-picker.min.css files in bower_components folder
```html
 <link href="/bower_components/chocoborangepicker/dist/css/chocobo-range-picker.min.css" rel="stylesheet">
 <script type="text/javascript" src="/bower_components/chocoborangepicker/dist/js/chocobo-range-picker.min.js"></script>
```

 Then refer to your module
```javascript
 angular.module('yourModule', ['chocoboRangePicker']);
```

##### In your controller use the code below

```javascript
  // Here is your property that you want to be populated with date range.
  $scope.demo = { searchDate: null };  

  $scope.options = {
    txtDateInit: 'Demo: Date',
    buttons: {
      btnYear: { txt: 'Demo: Year', tooltip: "Choose Year" },
      btnSemester: { txt: 'Demo: Semester', tooltip: "Choose Semester" },
      btnTrimester: { txt: 'Demo: Trimester', tooltip: "Choose Trimester" },
      btnMonth: { txt: 'Demo: Month', tooltip: "Choose Month" },
      btnWeek: { txt: 'Demo: Week', tooltip: "Choose Week" },
      btnToday: { txt: 'Demo: Today', tooltip: "Choose Today" },
      btnLastDay: { txt: 'Demo: Last Day', tooltip: "Choose Last Day" }
    }
    /*,
    inputConfig: {
      showIcon: true,
      iconPath: "http://www.racedepartment.com/images/rd_calext/calendar.png"
    } ,
    minDate: new Date(2017, 1, 3),
    maxDate: new Date(2017, 3, 12)*/
  };
```


### $scope.options

* **txtDateInit**(optional): Label of input text that will show the date interval. If you remove this property it will not shown.;
* **buttons**(required): Where you will configure a buttons properties.;
* **buttons: {btnYear}**(optional): Where you will configure a each button properties. If you do not use this property the related button will not be displayed;
* **buttons: {btnYear.txt}**(optional): Text that will apear in button;
* **buttons: {btnYear.tooltip}**(optional): Tooltip that will appear when user mouseover on button.;
* **inputConfig**(optional): Without this property the default icon will be displayed;
* **inputConfig: {showIcon}**(required): This property indicate if you want show icon. If the property is false, the icon will not be displayed;
* **inputConfig: {iconPath}**(optional): This property indicate if you want show icon. This property indicate the path to his own icon;
* **minDate**(optional): Indicates the minimun possible date for a user to select;
* **maxDate**(optional): Indicates the maximum possible date for a user to select.

##### In your page use

```html
  <chocobo-range-picker bindRange='false'
                        blockWeekDay='0,6'
                        locale='pt-BR'
                        options='options'
                        ng-model="demo.searchDate">
  </chocobo-range-picker>
```


### chocobo-Range-Picker

* **bindRange**(required)
  * *true*: All date in the range will be assigned to the model;
  * *false*: The first and last date will be assigned to the model.

* **blockWeekDay**(optional)\*: Property that represent a weekday to be blocked (`0-6`), where:
  * "Sunday": 0;
  * "Monday": 1;
  * "Tuesday": 2;
  * "Wednesday": 3;
  * "Thursday": 4;
  * "Friday": 5;
  * "Saturday": 6.

#### Attention these locales have been tested.

* **Spain**: `es-ES`
* **Brazil**: `pt-BR`
* **United States**: `en-US`
* **Great Britain**: `en-GB`
* **Germany**: `de-DE`

#### Used versions

* **Angular**
  * version: `1.2.32`

***

### License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)

<hr>

### Collaborators

* [mikemajesty](https://github.com/mikemajesty) - 
**Mike Lima** &lt;mikee_2008@hotmail.com&gt;
* [celso-wo](https://github.com/celso-wo) -
**Celso Wo** &lt;celsowo@gmail.com&gt; Special thank you.
* [jeanvitor06](https://github.com/jeanvitor06) -
**Jean Vitor** &lt;jeanvitor06@gmail.com&gt;
* [danieloprado](https://github.com/danieloprado) -
**Daniel Prado** &lt;danielprado.ad@gmail.com&gt;
* [GabrielJacquier](https://github.com/GabrielJacquier) -
**Gabriel Jacquier** &lt;gabrieljacquierme@gmail.com&gt;
* [Mateus-Oli](https://github.com/Mateus-Oli) -
**Mateus Oli** &lt;mateus.oli.car@gmail.com&gt;
