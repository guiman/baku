require 'rubygems'
require 'redis'
require 'json'
require "./wii_mote.rb"
require "./zoom_randomizer.rb"
require "./gesture.rb"

# This example script simulates the WiiMote signals that should be echoed on the
# redis server

redis = Redis.new

# Creates a WiiMote with a certain point behaviour, in this case: ZoomRandomizer
wiimote = WiiMote.new Randomizer.new(2)

last_distance_between_points = 0

gesture_parser = Gesture.new

loop do
  
  # Create the simulated ir_data
  ir_data = wiimote.emmitt
    
  gesture_data = gesture_parser.parse ir_data
  
  redis.publish "wiimote_ir_channel", { ir_data: ir_data, gesture_data: gesture_data }.to_json  unless ir_data.empty?
  
  sleep 0.1 
end
