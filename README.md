baku
====

"(multiple) IR tracking in the comfort of your browser."

What's baku?
------------

Baku is an experimental platform, that allows you to connect to a WiiMote device from a web browser. For now we are only capturing the IR Sensor Data and broadcasting it from a Ruby driver via Redis to a Node.js server witch has an application that uses Sockets.io to communicate with the browser.

The idea is to emmit IR Light to the sensor an capture it's location, deliver this data to the browser app in a standard (through an API) real-time way so you can manipulate this information as you want to.

Why would you do this?
----------------------

Well a couple answers:

* This project has been inspired by the work of [John Lee](http://johnnylee.net/) regarding "Tracking Your Fingers with the Wiimote". If you don't know who he is or what he did, please see [this TED Talk presentation](http://www.ted.com/talks/johnny_lee_demos_wii_remote_hacks.html).

* If you just saw the TED Talk video and thought "Shut up and take my money!", well that's pretty much what we thought.

* WiiMote Hacks development have been stalled for quite some time so this is an opportunity to revive this projects.

* Last but not least: Because we can and it's cool!

Exploration areas
----------------

Some of the areas we would like to explore:

* Alternative HCI's with different devices like robots, UIs, etc.
* Gesture research.
* Online gaming.
* Multiuser realtime interaction in a web browser with a more "human" experience.

Dependencies
------------

  *  [Cwiid](https://github.com/wedesoft/cwiid)
  *  [Redis](http://redis.io/)
  *  [Node.js](http://nodejs.org)
    *  [express](expressjs.com)
    *  [node-redis](https://github.com/mranney/node_redis)
    *  [sockets.io](http://socket.io)
    *  [jade](http://jade-lang.com) 
    *  [stylus](http://learnboost.github.com/stylus/) 

Take a look at each project site for installing instructions according to your platform. For the whole node.js bundle we recommend use the npm way.
