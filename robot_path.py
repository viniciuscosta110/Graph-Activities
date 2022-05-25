#Shortest path from current position to desired position in a grid

import numpy as np

delta = [[-1, 0], [ 0,-1], [ 1, 0], [ 0, 1]]
class Node:
  def __init__(self, x, y, parent, cost):
    self.x = x
    self.y = y
    self.parent = parent
    self.cost = cost
  
def distance(robot_pos, robot_pos_d):
  x = robot_pos[0]
  y = robot_pos[1]
  x_d = robot_pos_d[0]
  y_d = robot_pos_d[1]
  distance = np.sqrt((x - x_d)**2 + (y - y_d)**2) 

  return distance

def robot_path(robot_pos, robot_pos_d, occupancy):
  x = robot_pos[0]
  y = robot_pos[1]
  x_d = robot_pos_d[0]
  y_d = robot_pos_d[1]

  path = []
  
  visited = []
  visited.append([x, y])

  node = Node(x, y, None, 0)

  frontier = []
  frontier2 = []

  frontier.append(node)
  frontier2.append([x, y])

  previous = None

  while len(frontier) > 0:
    current = frontier.pop(0)
    x = current.x
    y = current.y
    
    if x == x_d and y == y_d:
      new_node = Node(x, y, current.parent, current.cost)
      path.append(new_node)
      break

    visited.append([x, y])
    
    min_distance = []
    possibilities = []
    
    for i in range(len(delta)):
      x2 = x + delta[i][0]
      y2 = y + delta[i][1]
      
      if x2 >= 0 and x2 < 10 and y2 >= 0 and y2 < 10:
        if occupancy[x2][y2] != np.inf and [x2, y2] not in visited:
          new_node = Node(x2, y2, current, distance([x2, y2], [x_d, y_d]))
          frontier.append(new_node)
          
    frontier.sort(key = lambda x: x.cost , reverse=True)

  return path

def main ():
  occupancy = np.ones((10, 10))
  occupancy[0:5, 0] = np.inf
  occupancy[5, 0:5] = np.inf
  occupancy[5:8, 5] = np.inf
  occupancy[0:3, 5:8] = np.inf
  occupancy[7:9, 3] = np.inf
  occupancy[5:10, 8] = np.inf
       
  robot_pos_c = [9, 0] # Robot current position
  robot_pos_d = [0, 2] # Robot desired position

  path = robot_path(robot_pos_c, robot_pos_d, occupancy)

  current = path.pop(0)

  while current.parent != None:
    print("[", current.x , current.y, "]")
    current = current.parent
  print("[", robot_pos_c[0] , robot_pos_c[1], "]")
main()