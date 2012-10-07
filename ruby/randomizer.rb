# Create random values for the WiiMote to emmitt
class Randomizer
  attr_accessor :number_of_signals
  
  def initialize(signals = 2)
    @number_of_signals = signals
  end
  
  def randomize(mote)
    ret = []
    
    @number_of_signals.times do
      ret << [rand(1..100), rand(1..100)]
    end
    
    ret
  end
end