require 'test/unit'
require_relative '../geometry'
require_relative '../randomizer'
require_relative '../zoom_randomizer'

class ZoomRandomizerTest < Test::Unit::TestCase
  
  def test_run_should_return_two_points_getting_closer
		randomizer = ZoomRandomizer.new 10
		last_distance = 11

		5.times do
			points = []
			run_result = randomizer.run

			assert_equal run_result.class, Array
    	assert_equal 2, run_result.size

			run_result.each do |each|
      	points << Geometry::Point[each[0], each[1]]
	  	end

			current_distance = points[0].distance points[1]
			assert last_distance => current_distance

			last_distance = current_distance
		end
  end

  def test_run_should_return_two_points_getting_far_away_when_in_the_same_place
		randomizer = ZoomRandomizer.new 10
		last_distance = 0

		5.times do
			randomizer.run
		end

		5.times do
			points = []
			run_result = randomizer.run

			assert_equal run_result.class, Array
    	assert_equal 2, run_result.size

			run_result.each do |each|
      	points << Geometry::Point[each[0], each[1]]
	  	end

			current_distance = points[0].distance points[1]
			assert current_distance >= last_distance

			last_distance = current_distance
		end
  end
end