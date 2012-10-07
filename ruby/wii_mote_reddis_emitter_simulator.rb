require 'rubygems'
require 'redis'
require 'json'
require "./wii_mote.rb"
require "./zoom_randomizer.rb"

# This example script simulates the WiiMote signals that should be echoed on the
# redis server

redis = Redis.new

# Creates a WiiMote with a certain point behaviour, in this case: ZoomRandomizer
wiimote = WiiMote.new ZoomRandomizer.new

last_distance_between_points = 0

loop do
  
  # Create the simulated ir_data
  ir_data = wiimote.emmitt

  # Gesture information
  points = []
  
  # Converting [[X,Y], [A,B]] to [Point(X,Y), Point(A,B)]
  # This conversion will allow me to use math_util module methods like distance
  # witch calculates the Eucliden Distance
  ir_data.each do |each|
    points << Geometry::Point[each[0], each[1]]
  end
  
  current_distance_between_points = points[0].distance points[1]
  
  # If current distance is small than last distance, then they are getting closer
  direction = (current_distance_between_points < last_distance_between_points)? -1 : 1
  # How close of far are they moving
  magnitude = distance_between_points.abs
  
  # Update historic value
  last_distance_between_points = current_distance_between_points
  
  gesture_data = [direction, magnitude]
  redis.publish "wiimote_ir_channel", {ir_data: ir_data, gesture_data: gesture_data}.to_json
  sleep 0.1 
end
