require "./randomizer"

# This is a specialized Randomizer that simulates two points get closer/far away from each other
# 
class ZoomRandomizer < Randomizer
  
  def initialize(how_far_away = 100)
    @x1 = 0
    @x2 = how_far_away
    @y1 = 0
    @y2 = how_far_away
    @factor_p_1 = 1
    @factor_p_2 = -1
  end
  
  def run
    if (@x1 == @x2)
      @factor_p_1 * -1
      @factor_p_2 * -1
    end
    
    @x1 +=  1 * @factor_p_1
    @y1 +=  1 * @factor_p_1
    @x2 +=  1 * @factor_p_2
    @y2 +=  1 * @factor_p_2
    
    [[@x1, @y1], [@x2, @y2]]
  end
end