import math
# class rectangle #####################
class Rectangle:
# initialize ##########################
  def __init__(self, width, height):
    self.width = width
    self.height = height 
# string of the class #################
  def __str__(self):
    return "Rectangle(width=" + str(self.width) + ", height=" + str(self.height) + ")"
# methods #############################
# set width method ####################
  def set_width(self, width):
    self.width = width
# set height method ###################
  def set_height(self, height):
    self.height = height
# get area method #####################
  def get_area(self):
    return self.width * self.height
# get perimeter method ################
  def get_perimeter(self):
    return 2 * self.width + 2 * self.height
# get diagonal method #################
  def get_diagonal(self):
    return (self.width ** 2 + self.height ** 2) ** .5
# get picture method ##################
  def get_picture(self):
    if  self.width > 50 or self.height > 50:
      return "Too big for picture."
    picture = ""
    for i in range(self.height):
      for j in range(self.width):
        picture += "*"
      picture += "\n"
    return picture
# get amount inside method ############
  def get_amount_inside(self, shape):
    if self.width >= shape.width:
      if self.height >= shape.height:
        return math.floor(self.get_area() / shape.get_area())
    return 0
# class sqare #########################
class Square(Rectangle):
# initialize and inherit ##############
  def __init__(self, length):
    super(Square, self).__init__(length, length)
    self.width = length
    self.height = length
# string of the class #################
  def __str__(self):
    return "Square(side=" + str(self.width) + ")"
# set side method #####################
  def set_side(self, length):
    self.width = length
    self.height = length
# set width method ####################
  def set_width(self, width):
    self.width = width
    self.height = width
# set height method ###################
  def set_height(self, height):
    self.width = height
    self.height = height