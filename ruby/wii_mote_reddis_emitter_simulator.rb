require 'rubygems'
require 'bundler/setup'
require 'redis'
require 'json'
require "./wii_mote.rb"
require "./zoom_randomizer.rb"
require "./zoom_gesture_parser.rb"

# This example script simulates the WiiMote signals that should be echoed on the
# redis server. Also I'm adding some extra information regarding zoom gesture capture

redis = Redis.new

# Creates a WiiMote with a certain signal behaviour, in this case: ZoomRandomizer
wiimote = WiiMote.new(ZoomRandomizer.new)

zoom_gesture_parser = ZoomGestureParser.new

loop do
  # Create the simulated ir_data
  ir_data = wiimote.emmitt
  
  # Sending data obtainer via redis
  redis.publish "wiimote_ir_channel", { ir_data: ir_data, gesture_data: zoom_gesture_parser.parse(ir_data) }.to_json  unless ir_data.empty?
  
  # Let's not choke the server
  sleep 0.01
end
