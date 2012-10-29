# This is a stub for the real WiiMote controller.
# It creates an array of points like [[X,Y], [A,B]] that mimmic the real ir_data controller information
class WiiMote
  attr_accessor :randomizer
  
  def initialize(randomizer)
    @randomizer = randomizer
  end
  
  def get_state
    # Uses to emulate the cwiid WiiMote class api
    self
  end
  
  def ir
    @randomizer.run unless @randomizer.nil?
  end
end