/******************************************************************************

  zero.js

  A common GUI-like App with Inverse Kinematics testing stuff within.

  Inverse Kinematics stuff based on (all the credit goes to):
    (*) http://www.dhteumeuleu.com/the-law-of-robotics/2/
    (you should really cheack this guy works!)
******************************************************************************/
define(['jquery',
        'underscore',
        'backbone'], 
    function($,_,Backbone){

    /*  Public module interface */
    function publicStart(){
        prepare();
    }

    /* END Public module interface */

    /* Private module area */

    function prepare(){
        //be sure to add backbone later, alright?

        //Simple load

    }

    /* END Private module area */

    return {
        initialize: publicStart,
        //render: render
    }
});