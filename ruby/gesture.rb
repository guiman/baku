class Gesture
  
  def initialize(signals = 2)
    @number_of_signals = signals
    @last_distance_between_points = 0
  end
  
  def parse(trace)
    capture sanitize trace if trace.count == @number_of_signals
  end
  
  # Converting [[X,Y], [A,B]] to [Point(X,Y), Point(A,B)]
  # This conversion will allow me to use math_util module methods like distance
  # witch calculates the Eucliden Distance
  def sanitize(trace)
    points = []
    
    trace.each do |each|
      points << Geometry::Point[each[0], each[1]]
    end
    
    points
  end
  
  def capture(points)
    current_distance_between_points = points[0].distance points[1]
  
    # If current distance is small than last distance, then they are getting closer
    direction = (current_distance_between_points < @last_distance_between_points)? -1 : 1
  
    # How close of far are they moving
    magnitude = current_distance_between_points.abs
  
    # Update historic value
    @last_distance_between_points = current_distance_between_points
    
    [direction, magnitude]
  end
end