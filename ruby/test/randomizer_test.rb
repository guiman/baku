require 'test/unit'
require_relative '../randomizer'

class RandomizerTest < Test::Unit::TestCase
  
  def setup
    @randomizer = Randomizer.new
  end
  
  def test_run_should_return_an_array_with_xy_pairs
    assert_equal @randomizer.run.class, Array
    sample = @randomizer.run.sample
    assert_equal 2, sample.size
    assert_equal Fixnum, sample.size.class
  end
  
  def test_run_should_return_an_array_with_n_values
    n = 5
    randomizer = Randomizer.new n 
    
    result = randomizer.run
    assert_equal Array, randomizer.run.class
    assert_equal 5, result.size
  end
end