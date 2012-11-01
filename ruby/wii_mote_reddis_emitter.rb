require 'rubygems'
require 'bundler/setup'
require 'redis'
require 'json'
require 'cwiid' if RUBY_PLATFORM =~ /linux/
require_relative 'geometry'
require_relative 'randomizer'
require_relative 'zoom_randomizer'
require_relative 'zoom_gesture_parser'

# This script generates the WiiMote signals that should be echoed on the
# redis server. Also I'm adding some extra information regarding zoom gesture capture

if ARGV.any?
  host = "127.0.0.1"
else
  host = ARGV.first
end

redis = Redis.new host: host

if ! ARGV[1].nil?
  puts 'Put Wiimote in discoverable mode now (press 1+2)...'
  wiimote = WiiMote.new
  puts 'Sync accomplished, now it\'s broadcast time!'
else
  # Creates a WiiMote simulator with a certain signal behaviour, in this case: ZoomRandomizer
  require_relative "wii_mote"
  wiimote = WiiMote.new(ZoomRandomizer.new(10))
end

zoom_gesture_parser = ZoomGestureParser.new

loop do
  # Create the simulated ir_data
  ir_data = wiimote.get_state.ir
  
  # Sending data obtainer via redis
  redis.publish "wiimote_ir_channel", { ir_data: ir_data, gesture_data: zoom_gesture_parser.parse(ir_data) }.to_json  unless ir_data.empty?
  
  # Let's not choke the server
  sleep 0.01
end