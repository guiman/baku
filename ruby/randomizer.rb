# Create random values for the WiiMote to emmitt
class Randomizer
  def randomize(mote)
    mote.x = rand(1..100)
    mote.y = rand(1..100)
    mote.a = rand(1..10)
    mote.b = rand(1..10)
  end
end