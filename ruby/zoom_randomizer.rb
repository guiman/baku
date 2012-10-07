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
    @x1 += 1
    @y1 += 1
    @x2 -= 1
    @y2 -= 1
    
    mote.a = @x1
    mote.b = @y1
    mote.c = @x2
    mote.d = @y2
    
    initialize if @x2 <= 50 # when they are in the same point, restart
  end
end