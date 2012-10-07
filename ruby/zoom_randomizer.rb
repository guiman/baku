require "./randomizer"

# This is a specialized Randomizer witch makes two points get closer
class ZoomRandomizer < Randomizer
  
  def initialize
    @x1 = 0
    @x2 = 100
    @y1 = 0
    @y2 = 100
  end
  
  def randomize(mote)
    initialize if @x2 <= 50 # when they are in the same point, restart
    
    @x1 += 1
    @y1 += 1
    @x2 -= 1
    @y2 -= 1
    
    [[@x1, @y1], [@x2, @y2]]
  end
end