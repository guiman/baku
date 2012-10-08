require './geometry.rb'
require "./randomizer.rb"

# This is a stub for the real WiiMote controller.
# It creates an array of points like [[X,Y], [A,B]] that mimmic the real ir_data controller information
class WiiMote
  attr_accessor :randomizer
  
  def initialize(randomizer)
    @randomizer = randomizer
  end
  
  def emmitt
    @randomizer.randomize self
  end
end