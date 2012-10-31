# This is a specialized Randomizer that simulates two points get closer/far away from each other
class ZoomRandomizer < Randomizer
  
  def initialize(how_far_away = 100)
    @p1 = 0
    @p2 = how_far_away
    @how_far = how_far_away
    @factor = -1
  end
  
  def switch_factor
    @factor = @factor * -1
  end 
  
  def run
    if @factor < 0
      @p1 +=  1
      @p2 -=  1
    else
      @p1 -=  1
      @p2 +=  1
    end

    switch_factor if (@p1 == @p2) || (@p1 == 0 || @p2 == @how_far)
    
    [[@p1, @p1], [@p2, @p2]]
  end
end