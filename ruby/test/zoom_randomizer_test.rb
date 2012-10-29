require 'test/unit'
require_relative '../geometry'
require_relative '../zoom_randomizer'

class ZoomRandomizerTest < Test::Unit::TestCase
  
  def setup
    @randomizer = ZoomRandomizer.new
  end
  
  def test_run_should_return_two_points_getting_closer
    run_result = @randomizer.run
    assert_equal run_result.class, Array
    assert_equal 2, run_result.size
  end
end