module MathUtil
  
  # calculate the Euclidean distance between two points
  def distance(point)
    Math.sqrt(((point.x - self.x)**2) + ((point.y - self.y)**2))
  end
end
