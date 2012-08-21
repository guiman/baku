baku
====

Node + Redis + Ruby + WiiMote = ????_API

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

Objective
---------

This is an experimental project in witch the main idea it's to be able to interact with WiiMote IR camera information in a real-time way. To this purpose we will be using multiple technologies such as Rubys Cwiid gem (WiiMote interface), Redis(make data from cwiid flow in a network) and Node (use data delivered by Redis and expose it to the world! or do whatever you want to in a nodeway =D).