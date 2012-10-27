require "./randomizer"

# This is a specialized Randomizer that simulates two points get closer/far away from each other
class ZoomRandomizer < Randomizer
  
  def initialize
    @x1 = 0
    @x2 = 100
    @y1 = 0
    @y2 = 100
    @factor = 1
  end
  
  def initialize_factor
    @factor = -1
  end
  
  def randomize(mote)
    initialize_factor if @x2 <= 50 
    inititlize if @x2 == 0 && @factor == -1 # when they are in the same point, restart
    
    @x1 += @factor
    @y1 += @factor
    @x2 -= @factor
    @y2 -= @factor
    
    [[@x1, @y1], [@x2, @y2]]
  end
end