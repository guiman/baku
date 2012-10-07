require 'rubygems'
require 'redis'
require 'json'
require 'cwiid'

puts 'Put Wiimote in discoverable mode now (press 1+2)...'
wiimote = WiiMote.new
puts 'Sync accomplished, now it\'s broadcast time!'
redis = Redis.new

loop do
  ir_data = wiimote.get_state.ir
  redis.publish "wiimote_ir_channel", { ir_data: ir_data }.to_json unless ir_data.empty?
  sleep 0.001
end
