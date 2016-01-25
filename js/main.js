/**
 * This is the access-point for all calls into the API.
 * <strong>An instance of this class, named adobeDPS, is automatically created in the global namespace.</strong>
 * @namespace <strong>Mixing booth</strong>
 * <br/>________________________________________________
 *
 * <br/>Copyright 2016 Student project Inholland.
 * <br/>All Rights Reserved.
 * <br/>
 * <br/>NOTICE:  All information contained herein is, and remains
 * the property of ,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 *
 * <br/><br/>
 * To begin working with the API, you must include the Library and Store API script in your HTML. The AdobeLibraryAPI.js can be included with your store files in the viewer or loaded from your server.
 * Once that is done, you can work with the API through the use of one of the service objects. Some examples of available service objects are:
 @example
 adobeDPS.libraryService         //Used to retrieve folios and to update the library.
 adobeDPS.authenticationService  //Used for authentication.
 adobeDPS.deviceService          //Used to get device information such as OS or network status.
 adobeDPS.receiptService         //Used to retrieve receipts and get subscription information.
 adobeDPS.settingsService        //Used to retrieve settings for the viewer.
 adobeDPS.analyticsService       //Used to send custom analytics events.
 adobeDPS.configurationService   //Used to retrieve application properties and to navigate between tabs.
 adobeDPS.dialogService          //Used to control dialogs.
 *
 **/

/**
 *  Variables for house sizes
 */

var size0_60;
var size60_80;
var size80_plus;

/**
 *  Variables for house types
 */

var socialRentHouses;
var privateRentHouses;
var buyingHouses;

/**
 *  Variables for age groups
 */

var age0_19;
var age20_24;
var age25_29;
var age30_39;
var age40_64;
var age65_plus;

/**
 *  Variables for Nationalities
 */

var popAntille;
var popAutochtoon;
var morccans;
var popOtherNW;
var popStudents;
var popSuriname;
var turkish;
var popWest;

/**
 *  House Size
 */

var low;
var low_EUgrens;
var Eugrens_43785;
var _43785_1_5xModaal;
var _1_5xModaal_2xModaal;
var twoxModaal_above;

/**
 *  Containers for
 */
var container = $('#container');
var container_two = $('#container_two');

/**
 * Number to be added
 */
var valueToChange = '';

$(function () {

    var catSelector = document.getElementById('year');

    var event = new Event('change');
    catSelector.dispatchEvent(event);

    var grdSelector = document.getElementById('selectPopulation');
    grdSelector.dispatchEvent(event);
});

function getData(that){

    $.getJSON( "pre.json", function( data ) {

        var selecteedYear = that.value;

        var item;

        switch(selecteedYear){
            case 'one':
                item = data.entry.one;
                break;
            case 'two':
                item = data.entry.two;
                break;
            case 'three':
                item = data.entry.three;
                break;
            case 'four':
                item = data.entry.four;
                break;
            case 'five':
                item = data.entry.five;
                break;
        }

        var issues = {"issues": item};
        var template = Handlebars.compile($('#entry-template').html());

        $('#tbody').empty();
        $('#tbody').append(template(issues));

        /* Population Age */
        age0_19 = parseInt($(".tables #a019").text());
        age20_24 = parseInt($(".tables #a2024").text());
        age25_29 = parseInt($(".tables #a2529").text());
        age30_39 = parseInt($(".tables #a3039").text());
        age40_64 = parseInt($(".tables #a4064").text());
        age65_plus = parseInt($(".tables #a65plus").text());

        /* Population Nationalities */

        popAntille = parseInt($(".tables #antNum").text());
        popAutochtoon = parseInt($(".tables #dutNum").text());
        morccans = parseInt($(".tables #morNum").text());
        popOtherNW = parseInt($(".tables #nwNum").text());
        popStudents = parseInt($(".tables #studNum").text());
        popSuriname = parseInt($(".tables #surNum").text());
        turkish = parseInt($(".tables #turNum").text());
        popWest = parseInt($(".tables #wesNum").text());

        /* Population Income */

        low = parseInt($(".tables #lowInc").text());
        low_EUgrens = parseInt($(".tables #lowEUInc").text());
        Eugrens_43785 = parseInt($(".tables #EUavInc").text());
        _43785_1_5xModaal = parseInt($(".tables #43785Inc").text());
        _1_5xModaal_2xModaal = parseInt($(".tables #15mInc").text());
        twoxModaal_above = parseInt($(".tables #2mInc").text());

        size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;

        size60_80 = - 42.698 + 0.6481 * age65_plus + 0.145 * low - 0.498 * popAntille + 0.306 * age25_29;

        size80_plus = - 36.186 + 0.618 * twoxModaal_above + 0.333 * age0_19 - 0.800 * age30_39 + 0.293 * Eugrens_43785 + 0.362 * popOtherNW + 0.479 * _43785_1_5xModaal;

        socialRentHouses = 4.366 + 0.658 * low + 0.591 * low_EUgrens - 0.635 * age25_29;

        privateRentHouses = - 105.514 + 0.837 * popWest - 0.401 * age40_64 + 0.932 * age25_29 - 0.141 * low + 0.168 * popAutochtoon + 5.876 * popAntille - 0.662 * popOtherNW + 0.553 * _43785_1_5xModaal - 0.458 * popStudents - 0.406 * popSuriname;

        buyingHouses = 18.742 + 0.147 * age40_64 + 0.264 * twoxModaal_above + 0.302 * Eugrens_43785 - 0.156 * age0_19 + 0.194 * _1_5xModaal_2xModaal;

        size0_60 = Math.ceil(size0_60);
        size60_80 = Math.ceil(size60_80);
        size80_plus = Math.ceil(size80_plus);
        socialRentHouses = Math.ceil(socialRentHouses);
        privateRentHouses = Math.ceil(privateRentHouses);
        buyingHouses = Math.ceil(buyingHouses);


        /**
         *  Charts
         *
         * */

        $('#container_pop').highcharts({
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ethnic groups'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Population'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });

        container.highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'House sizes in Amsterdam'
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b><br/>' +
                        this.point.y + ' ';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: '0 to 60',
                    y: size0_60
                }, {
                    name: '60 to 80',
                    y: size60_80,
                    sliced: false,
                    selected: false
                }, {
                    name: '80 plus',
                    y: size80_plus
                }]
            }]
        });

        container_two.highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'House types in Amsterdam'
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b><br/>' +
                        this.point.y + ' ';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'House type',
                colorByPoint: true,
                data: [{
                    name: 'Social houses',
                    y: socialRentHouses
                }, {
                    name: 'Private rented houses',
                    y: privateRentHouses,
                    sliced: false,
                    selected: false
                }, {
                    name: 'Buying houses',
                    y: buyingHouses
                }]
            }]
        });

        $( "text:contains('Highcharts')" ).hide();

        var min_btn = $(".size_button_left");
        var plus_btn = $(".size_button_right");

        // button handler
        var chart = container.highcharts();
        min_btn.click(function () {
            chart.series[0].data[0].update(size0_60);
            chart.series[0].data[1].update(size60_80);
            chart.series[0].data[2].update(size80_plus);
        });

        plus_btn.click(function () {
            chart.series[0].data[0].update(size0_60);
            chart.series[0].data[1].update(size60_80);
            chart.series[0].data[2].update(size80_plus);
        });

        var chart_two = container_two.highcharts();
        min_btn.click(function () {
            chart_two.series[0].data[0].update(socialRentHouses);
            chart_two.series[0].data[1].update(privateRentHouses);
            chart_two.series[0].data[2].update(buyingHouses);
        });

        plus_btn.click(function () {
            chart_two.series[0].data[0].update(socialRentHouses);
            chart_two.series[0].data[1].update(privateRentHouses);
            chart_two.series[0].data[2].update(buyingHouses);
        });


        min_btn.click(function(){

            valueToChange = parseInt($('#valueToChange').val());

            if(valueToChange > 0 || valueToChange == !''){
                if((parseInt($(this).next().text()) - valueToChange)>=0){
                    $(this).next().text(parseInt($(this).next().text()) - valueToChange);

                    /* Population Age */
                    age0_19 = parseInt($(".tables #a019").text());
                    age20_24 = parseInt($(".tables #a2024").text());
                    age25_29 = parseInt($(".tables #a2529").text());
                    age30_39 = parseInt($(".tables #a3039").text());
                    age40_64 = parseInt($(".tables #a4064").text());
                    age65_plus = parseInt($(".tables #a65plus").text());

                    /* Population Nationalities */

                    popAntille = parseInt($(".tables #antNum").text());
                    popAutochtoon = parseInt($(".tables #dutNum").text());
                    morccans = parseInt($(".tables #morNum").text());
                    popOtherNW = parseInt($(".tables #nwNum").text());
                    popStudents = parseInt($(".tables #studNum").text());
                    popSuriname = parseInt($(".tables #surNum").text());
                    turkish = parseInt($(".tables #turNum").text());
                    popWest = parseInt($(".tables #wesNum").text());

                    /* Population Income */

                    low = parseInt($(".tables #lowInc").text());
                    low_EUgrens = parseInt($(".tables #lowEUInc").text());
                    Eugrens_43785 = parseInt($(".tables #EUavInc").text());
                    _43785_1_5xModaal = parseInt($(".tables #43785Inc").text());
                    _1_5xModaal_2xModaal = parseInt($(".tables #15mInc").text());
                    twoxModaal_above = parseInt($(".tables #2mInc").text());

                    if($(this).hasClass('groups')){
                        decrementPopulation('groups')
                    }else if($(this).hasClass('age')){
                        decrementPopulation('age')
                    }else {
                        decrementPopulation('income')
                    }

                    size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;
                    size60_80 = - 42.698 + 0.6481 * age65_plus + 0.145 * low - 0.498 * popAntille + 0.306 * age25_29;
                    size80_plus = - 36.186 + 0.618 * twoxModaal_above + 0.333 * age0_19 - 0.800 * age30_39 + 0.293 * Eugrens_43785 + 0.362 * popOtherNW + 0.479 * _43785_1_5xModaal;

                    socialRentHouses = 4.366 + 0.658 * low + 0.591 * low_EUgrens - 0.635 * age25_29;
                    privateRentHouses = - 105.514 + 0.837 * popWest - 0.401 * age40_64 + 0.932 * age25_29 - 0.141 * low + 0.168 * popAutochtoon + 5.876 * popAntille - 0.662 * popOtherNW + 0.553 * _43785_1_5xModaal - 0.458 * popStudents - 0.406 * popSuriname;
                    buyingHouses = 18.742 + 0.147 * age40_64 + 0.264 * twoxModaal_above + 0.302 * Eugrens_43785 - 0.156 * age0_19 + 0.194 * _1_5xModaal_2xModaal;

                }

                else {
                    $(this).parent().find($(".interactive_num")).text(0);
                }
            }else {
                alert('Please enter an amount to add or subtract');
            }
        });

        plus_btn.click(function() {

            valueToChange = parseInt($('#valueToChange').val());

            if(valueToChange > 0 || valueToChange == !''){
                $(this).prev().text(parseInt($(this).prev().text()) + valueToChange);

                /* Population Age */
                age0_19 = parseInt($(".tables #a019").text());
                age20_24 = parseInt($(".tables #a2024").text());
                age25_29 = parseInt($(".tables #a2529").text());
                age30_39 = parseInt($(".tables #a3039").text());
                age40_64 = parseInt($(".tables #a4064").text());
                age65_plus = parseInt($(".tables #a65plus").text());

                /* Population Nationalities */

                popAntille = parseInt($(".tables #antNum").text());
                popAutochtoon = parseInt($(".tables #dutNum").text());
                morccans = parseInt($(".tables #morNum").text());
                popOtherNW = parseInt($(".tables #nwNum").text());
                popStudents = parseInt($(".tables #studNum").text());
                popSuriname = parseInt($(".tables #surNum").text());
                turkish = parseInt($(".tables #turNum").text());
                popWest = parseInt($(".tables #wesNum").text());

                /* Population Income */

                low = parseInt($(".tables #lowInc").text());
                low_EUgrens = parseInt($(".tables #lowEUInc").text());
                Eugrens_43785 = parseInt($(".tables #EUavInc").text());
                _43785_1_5xModaal = parseInt($(".tables #43785Inc").text());
                _1_5xModaal_2xModaal = parseInt($(".tables #15mInc").text());
                twoxModaal_above = parseInt($(".tables #2mInc").text());

                if($(this).hasClass('groups')){
                    incrementPopulation('groups')
                }else if($(this).hasClass('age')){
                    incrementPopulation('age')
                }else {
                    incrementPopulation('income')
                }



                size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;
                size60_80 = - 42.698 + 0.6481 * age65_plus + 0.145 * low - 0.498 * popAntille + 0.306 * age25_29;
                size80_plus = - 36.186 + 0.618 * twoxModaal_above + 0.333 * age0_19 - 0.800 * age30_39 + 0.293 * Eugrens_43785 + 0.362 * popOtherNW + 0.479 * _43785_1_5xModaal;

                socialRentHouses = 4.366 + 0.658 * low + 0.591 * low_EUgrens - 0.635 * age25_29;
                privateRentHouses = - 105.514 + 0.837 * popWest - 0.401 * age40_64 + 0.932 * age25_29 - 0.141 * low + 0.168 * popAutochtoon + 5.876 * popAntille - 0.662 * popOtherNW + 0.553 * _43785_1_5xModaal - 0.458 * popStudents - 0.406 * popSuriname;
                buyingHouses = 18.742 + 0.147 * age40_64 + 0.264 * twoxModaal_above + 0.302 * Eugrens_43785 - 0.156 * age0_19 + 0.194 * _1_5xModaal_2xModaal;
            }else {
                alert('Please enter an amount to add or subtract');
            }
        });
    });
}

function getGroupData(that){

    $.get( "data.json?callback=?", function( data ) {

        var selecteedGroup = that.value;
        console.log(selectedGroup);

        var item;

        switch (selectedGroup) {
            case 'one':
                item = data.groups.one;
                break;
            case 'two':
                item = data.groups.two;
                break;
            case 'three':
                item = data.groups.three;
                break;
        }

        var issues = {"issues": item};
        var template = Handlebars.compile($('#group-template').html());

        $('#tbody_one').empty();
        $('#tbody_one').append(template(issues));
    });
}

function changePrediction(that){

    $.getJSON( "data.json", function( data ) {

        var selectedGroup = that.value;
        console.log();

        var item;

        switch (selectedGroup) {
            case 'groups':
                item = data.groups.one;
                break;
            case 'age':
                item = data.groups.two;
                break;
            case 'income':
                item = data.groups.three;
                break;
        }


        var issues = {"issue": item};
        var template = Handlebars.compile($('#group-template').html());

        $('#tbody_one').empty();
        $('#tbody_one').append(template(issues));


        $('#container_pop').highcharts({
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ethnic groups'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Population'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });
    });
}

function incrementPopulation(plus){

    switch(plus){
        case 'groups':

            // add % to age
            age0_19 = (0.15689 * valueToChange) + age0_19;
            age20_24 = (0.06473 * valueToChange) + age20_24;
            age25_29 = (0.07875 * valueToChange) + age25_29;
            age30_39 = (0.13802 * valueToChange) + age30_39;
            age40_64 = (0.25600 * valueToChange) + age40_64;
            age65_plus = (0.08868 * valueToChange) + age65_plus;

            // add % to income
            low = (0.301 * valueToChange) + low;
            low_EUgrens = (0.158 * valueToChange) + low_EUgrens;
            Eugrens_43785 = (0.141 * valueToChange) + Eugrens_43785;
            _43785_1_5xModaal = (0.056 * valueToChange) + _43785_1_5xModaal;
            _1_5xModaal_2xModaal = (0.093 * valueToChange) + _1_5xModaal_2xModaal;
            twoxModaal_above = (0.251 * valueToChange) + twoxModaal_above;


            // add new value to front-end

            $(".tables #a019").text(age0_19);
            $(".tables #a2024").text(age20_24);
            $(".tables #a2529").text(age25_29);
            $(".tables #a3039").text(age30_39);
            $(".tables #a4064").text(age40_64);
            $(".tables #a65plus").text(age65_plus);

            /* Population Nationalities */

            /* Population Income */

            $(".tables #lowInc").text(low);
            $(".tables #lowEUInc").text(low_EUgrens);
            $(".tables #EUavInc").text(Eugrens_43785);
            $(".tables #43785Inc").text(_43785_1_5xModaal);
            $(".tables #15mInc").text(_1_5xModaal_2xModaal);
            $(".tables #2mInc").text(twoxModaal_above);

            break;
        case 'age':

            // add % to group
            popAntille = (0.0126 * valueToChange) + popAntille;
            popAutochtoon = (0.545 * valueToChange) + popAutochtoon;
            popOtherNW = (0.0917 * valueToChange) + popOtherNW;
            popSuriname = (0.065 * valueToChange) + popSuriname;
            popWest = (0.1694 * valueToChange) + popWest;

            // add % to income
            low = (0.301 * valueToChange) + low;
            low_EUgrens = (0.158 * valueToChange) + low_EUgrens;
            Eugrens_43785 = (0.141 * valueToChange) + Eugrens_43785;
            _43785_1_5xModaal = (0.056 * valueToChange) + _43785_1_5xModaal;
            _1_5xModaal_2xModaal = (0.093 * valueToChange) + _1_5xModaal_2xModaal;
            twoxModaal_above = (0.251 * valueToChange) + twoxModaal_above;

            $(".tables #antNum").text(popAntille);
            $(".tables #dutNum").text(popAutochtoon);
            $(".tables #nwNum").text(popOtherNW);
            $(".tables #surNum").text(popSuriname);
            $(".tables #wesNum").text(popWest);

            $(".tables #lowInc").text(low);
            $(".tables #lowEUInc").text(low_EUgrens);
            $(".tables #EUavInc").text(Eugrens_43785);
            $(".tables #43785Inc").text(_43785_1_5xModaal);
            $(".tables #15mInc").text(_1_5xModaal_2xModaal);
            $(".tables #2mInc").text(twoxModaal_above);


            break;
        case 'income':

            // add % to group
            popAntille = (0.0126 * valueToChange) + popAntille;
            popAutochtoon = (0.545 * valueToChange) + popAutochtoon;
            popOtherNW = (0.0917 * valueToChange) + popOtherNW;
            popSuriname = (0.065 * valueToChange) + popSuriname;
            popWest = (0.1694 * valueToChange) + popWest;

            // add % to age
            age0_19 = (0.15689 * valueToChange) + age0_19;
            age20_24 = (0.06473 * valueToChange) + age20_24;
            age25_29 = (0.07875 * valueToChange) + age25_29;
            age30_39 = (0.13802 * valueToChange) + age30_39;
            age40_64 = (0.25600 * valueToChange) + age40_64;
            age65_plus = (0.08868 * valueToChange) + age65_plus;

            $(".tables #antNum").text(popAntille);
            $(".tables #dutNum").text(popAutochtoon);
            $(".tables #nwNum").text(popOtherNW);
            $(".tables #surNum").text(popSuriname);
            $(".tables #wesNum").text(popWest);

            $(".tables #a019").text(age0_19);
            $(".tables #a2024").text(age20_24);
            $(".tables #a2529").text(age25_29);
            $(".tables #a3039").text(age30_39);
            $(".tables #a4064").text(age40_64);
            $(".tables #a65plus").text(age65_plus);

            break;
    }
}

function decrementPopulation(el){

    switch(el){
        case 'groups':

            // add % to age
            if((age0_19 - (0.15689 * valueToChange))>0) {
                age0_19 = age0_19 - (0.15689 * valueToChange);
            }

            if((age20_24 - (0.06473 * valueToChange))>0) {
                age20_24 = age20_24 - (0.06473 * valueToChange);
            }

            if((age25_29 - (0.07875 * valueToChange))>0) {
                age25_29 = age25_29 - (0.07875 * valueToChange);
            }

            if((age30_39 - (0.13802 * valueToChange))>0){
                age30_39 = age30_39 - (0.13802 * valueToChange);
            }

            if((age40_64 - (0.25600 * valueToChange))>0){
                age40_64 = age40_64 - (0.25600 * valueToChange);
            }

            if((age65_plus - (0.08868 * valueToChange))>0){
                age65_plus = age65_plus - (0.08868 * valueToChange);
            }

            // add % to income
            if((low -(0.301 * valueToChange))>0){
                low = low -(0.301 * valueToChange)
            }
            if((low_EUgrens - (0.158 * valueToChange))>0){
                low_EUgrens =  low_EUgrens - (0.158 * valueToChange);
            }
            if((Eugrens_43785 - (0.141 * valueToChange))>0){
                Eugrens_43785 =  Eugrens_43785 - (0.141 * valueToChange)
            }
            if((_43785_1_5xModaal - (0.056 * valueToChange))>0){
                _43785_1_5xModaal = _43785_1_5xModaal - (0.056 * valueToChange)
            }
            if((_1_5xModaal_2xModaal - (0.093 * valueToChange))>0){
                _1_5xModaal_2xModaal = _1_5xModaal_2xModaal - (0.093 * valueToChange)
            }
            if((twoxModaal_above - (0.251 * valueToChange))>0){
                twoxModaal_above = twoxModaal_above - (0.251 * valueToChange)
            }


            /**
             * Population Age
             * add new value to front-end
             */

            $(".tables #a019").text(age0_19);
            $(".tables #a2024").text(age20_24);
            $(".tables #a2529").text(age25_29);
            $(".tables #a3039").text(age30_39);
            $(".tables #a4064").text(age40_64);
            $(".tables #a65plus").text(age65_plus);

            /**
             * Population Income
             * */

            $(".tables #lowInc").text(low);
            $(".tables #lowEUInc").text(low_EUgrens);
            $(".tables #EUavInc").text(Eugrens_43785);
            $(".tables #43785Inc").text(_43785_1_5xModaal);
            $(".tables #15mInc").text(_1_5xModaal_2xModaal);
            $(".tables #2mInc").text(twoxModaal_above);

            break;
        case 'age':

            /**
             * subtract percentage(%) from group
             */

            if((popAntille - (0.0126 * valueToChange))>0){
                popAntille =  popAntille - (0.0126 * valueToChange);
            }

            if((popAutochtoon - (0.545 * valueToChange))>0){
                popAutochtoon = popAutochtoon - (0.545 * valueToChange) ;
            }

            if((popOtherNW - (0.0917 * valueToChange))>0){
                popOtherNW =  popOtherNW - (0.0917 * valueToChange);
            }

            if((popSuriname - (0.065 * valueToChange))>0){
                popSuriname =  popSuriname - (0.065 * valueToChange);
            }

            if((popWest - (0.1694 * valueToChange))>0){
                popWest =  popWest - (0.1694 * valueToChange);
            }


            // add % to income
            if((low -(0.301 * valueToChange))>0){
                low = low -(0.301 * valueToChange)
            }
            if((low_EUgrens - (0.158 * valueToChange))>0){
                low_EUgrens =  low_EUgrens - (0.158 * valueToChange);
            }
            if((Eugrens_43785 - (0.141 * valueToChange))>0){
                Eugrens_43785 =  Eugrens_43785 - (0.141 * valueToChange)
            }
            if((_43785_1_5xModaal - (0.056 * valueToChange))>0){
                _43785_1_5xModaal = _43785_1_5xModaal - (0.056 * valueToChange)
            }
            if((_1_5xModaal_2xModaal - (0.093 * valueToChange))>0){
                _1_5xModaal_2xModaal = _1_5xModaal_2xModaal - (0.093 * valueToChange)
            }
            if((twoxModaal_above - (0.251 * valueToChange))>0){
                twoxModaal_above = twoxModaal_above - (0.251 * valueToChange)
            }

            $(".tables #antNum").text(popAntille);
            $(".tables #dutNum").text(popAutochtoon);
            $(".tables #nwNum").text(popOtherNW);
            $(".tables #surNum").text(popSuriname);
            $(".tables #wesNum").text(popWest);

            $(".tables #lowInc").text(low);
            $(".tables #lowEUInc").text(low_EUgrens);
            $(".tables #EUavInc").text(Eugrens_43785);
            $(".tables #43785Inc").text(_43785_1_5xModaal);
            $(".tables #15mInc").text(_1_5xModaal_2xModaal);
            $(".tables #2mInc").text(twoxModaal_above);


            break;
        case 'income':

            // add % to group
            if((popAntille - (0.0126 * valueToChange))>0){
                popAntille =  popAntille - (0.0126 * valueToChange);
            }

            if((popAutochtoon - (0.545 * valueToChange))>0){
                popAutochtoon = popAutochtoon - (0.545 * valueToChange) ;
            }

            if((popOtherNW - (0.0917 * valueToChange))>0){
                popOtherNW =  popOtherNW - (0.0917 * valueToChange);
            }

            if((popSuriname - (0.065 * valueToChange))>0){
                popSuriname =  popSuriname - (0.065 * valueToChange);
            }

            if((popWest - (0.1694 * valueToChange))>0){
                popWest =  popWest - (0.1694 * valueToChange);
            }

            // add % to age
            if((age0_19 - (0.15689 * valueToChange))>0) {
                age0_19 = age0_19 - (0.15689 * valueToChange);
            }

            if((age20_24 - (0.06473 * valueToChange))>0) {
                age20_24 = age20_24 - (0.06473 * valueToChange);
            }

            if((age25_29 - (0.07875 * valueToChange))>0) {
                age25_29 = age25_29 - (0.07875 * valueToChange);
            }

            if((age30_39 - (0.13802 * valueToChange))>0){
                age30_39 = age30_39 - (0.13802 * valueToChange);
            }

            if((age40_64 - (0.25600 * valueToChange))>0){
                age40_64 = age40_64 - (0.25600 * valueToChange);
            }

            if((age65_plus - (0.08868 * valueToChange))>0){
                age65_plus = age65_plus - (0.08868 * valueToChange);
            }

            $(".tables #antNum").text(popAntille);
            $(".tables #dutNum").text(popAutochtoon);
            $(".tables #nwNum").text(popOtherNW);
            $(".tables #surNum").text(popSuriname);
            $(".tables #wesNum").text(popWest);

            $(".tables #a019").text(age0_19);
            $(".tables #a2024").text(age20_24);
            $(".tables #a2529").text(age25_29);
            $(".tables #a3039").text(age30_39);
            $(".tables #a4064").text(age40_64);
            $(".tables #a65plus").text(age65_plus);

            break;
    }
}

/**
 * custom theme for graphs
 * @type {{colors: string[], chart: {backgroundColor: {linearGradient: number[], stops: *[]}}, title: {style: {color: string, font: string}}, subtitle: {style: {color: string, font: string}}, legend: {itemStyle: {font: string, color: string}, itemHoverStyle: {color: string}}}}
 */

Highcharts.theme = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
        '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgba(255, 255, 255, 0.3)'],
                [1, 'rgba(255, 255, 255, 0.3)']
            ]
        }
    },
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);