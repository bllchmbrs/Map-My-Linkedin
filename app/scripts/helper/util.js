define(function(){
    'use strict';

    function chicken () {
        console.log('hello there');
    }

    function showMe (it){
        console.log(it);
    }

    function getConnections () {
        IN.API.Connections('me')
        .fields('firstName', 'lastName', 'industry')
        .result(showMe);
    }

    return {
        chicken:chicken,
        getConnections: getConnections
    };
});