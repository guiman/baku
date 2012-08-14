require 'rubygems'
require 'cwiid'
puts 'Put Wiimote in discoverable mode now (press 1+2)...'
wiimote = WiiMote.new

wiimote_state = wiimote.get_state

while true
  puts wiimote.get_state.ir.to_s
  sleep 1
end
