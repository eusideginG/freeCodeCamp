import copy
import random
# Consider using the modules imported above.
# class hat ################################
class Hat:
# initialize ###############################
  def __init__(self, **kwargs):
    self.contents = list()
    for color, ball in kwargs.items():
      for i in range(ball):
        self.contents.append(color)
# class string #############################
  def __str__(self):
    return str(self.contents)
  def listOfBalls(self):
    return [*self.contents]
# draw method ##############################
  def draw(self, draws):
    if draws > len(self.contents):
      return self.contents
    balls = []
    for i in range(draws):
      rn = random.randrange(len(self.contents))
      balls.append(self.contents[rn])
      del self.contents[rn]
    return balls
# experiment function #######################
def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  probability = 0
  expected_balls_list = []
# expected balls to list ####################
  for color, ball in expected_balls.items():
      for i in range(ball):
        expected_balls_list.append(color)
# experiment ################################
  for i in range(num_experiments):
    ballsInHat = copy.deepcopy(hat.listOfBalls())
    ballsToDraw = copy.deepcopy(expected_balls_list)
    for i in range(num_balls_drawn):
      if len(ballsInHat) == 0:
        break
      random_number = random.randrange(len(ballsInHat))
      ball = ballsInHat[random_number]
      del ballsInHat[random_number]
      if ball in ballsToDraw:
        ballsToDraw.remove(ball)
    if len(ballsToDraw) == 0:
      probability += 1
  probability = probability / num_experiments
  return probability