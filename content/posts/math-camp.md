---
title: "Mathcamp in Belgium: My Impressions on Mathematical Modeling and Python"
slug: "math-camp"
description: "In this blog post, I will share my experience attending a math camp in Belgium focused on mathematical modeling and Python. Join me as I delve into the world of problem-solving, mathematical concepts, and the exciting world of programming with Python. "
image: "/images/content/math-camp-1280x960.jpg"
imageAlt: "alt"
category: ["personal", "education"]
createdAt: "2023-07-25T16:58:04Z"
updatedAt: "2023-09-30T20:39:18Z"
---




# What is the CAMMP week

The modeling week is a project week in which high school students work together
with teachers and scientific support on real problems from the
research of companies or university institutes.

**Some examples are the following problems:**

1. How to design solar power plants to make them competitive? (TSK Flagsol)
2. In spaceflight, how to control robots to take soil samples? (Enceladus Explorer Initiative, DLR)
3. How can your city's bus routes be optimized so that the bus finally arrives on time? (IVU Traffic Technologies AG)
4. How can optimal bone implants for accident victims be developed? (RWTH Aachen University Hospital)
<br/>

Each group is given an individual task to work on during the five days.
They are always supervised by a scientist.
At the end of the week, the student teams present their results
to company representatives at a representative closing event in Aachen or Karlsruhe.
The families of the participants and representatives of the schools are
cordially invited to attend. The week also includes a supporting program with a
sports competition, a barbecue and other leisure activities,
as well as a study information event.

# Our Task
For the purpose of in-situ exploration of thick ice layers both on Earth and on the icy moons of our solar system, e.g. Europa, fusion robots are being developed. One advantage of this technology is that it requires extremely low maintenance and can also be operated well autonomously. The fusion robots, also called cryo-robots, can be individually loaded with scientific payloads (i.e., equipped with certain measuring instruments) melt through the ice. However, work is also underway to send an entire smart grid of smaller melting probes into the ice.
Each of the elements of this smart grid, also called pingers or probes, can melt into the ice in a directionally stable manner, i.e., along a straight trajectory that is not necessarily vertically oriented.
Furthermore, each pinger is equipped with an acoustic emitter and an acoustic receiver, so that acoustic so that acoustic waves can be transmitted and received. There are large pingers (cylinders of length 1m with a diameter of 20cm) which can emit an acoustic signal up to a distance of 3km and small pingers (cylinders of length 1m with a diameter of 15cm) which can emit an acoustic signal up to a distance of 2km. The individual 'wave beams' of the signal cover a circular cross-section with approximate diameter 2*pinger diameter. Only one signal packet can be transmitted at a time.


The pingers are synchronized in time, so that the travel times of the waves between the pingers can be measured and stored (we assume here that the challenge of data communication is solved ...). By means of a so-called time-of-flight tomography, it is thus possible to infer local heterogeneities in the ice, for example due to density variations, or salt, or water deposition.
Here, however, we are not concerned with the time-of-flight tomography itself, but with the ice volume covered by the pinger-to-pinger beams. The pinger is in constant sinking motion. In terrestrial applications, the necessary melting power comes from a generator that sets a nominal sinking rate and can be turned off. For extraterrestrial applications, RTGs (so-called Radio Thermal Generators) are planned, in which radioactive material decays according to a certain decay curve and produces heat (continuously). Candidate materials are curium, uranium or plutonium (see data sheet).
The goal is to control and send the pingers (or melting probes) of the RTGS, arranged in a smart grid, into the ice in such a way that the investigated ice volume can be maximized.

**Your Task**
- Develop a model that can be used to describe the ice volume studied under an arbitrary setup (launch order of pingers, distribution of radioactive material, melt direction).
- Then develop an operational experimental setup (starting order of pingers, distribution of radioactive material, melting direction) with which the investigated ice volume can be maximized. Consider the following three scenarios:
- Only large pingers are considered (10 in total).
- Only small pingers are considered (10 pieces in total).
- A mixture of small and large pingers is considered.

# Code
In order to calculate the scanned volume with the now derived formulas, I was mainly responsible for developing an algorithm for this in Python. With my previous knowledge in Java and some help from the supervisor in the beginning, I was able to develop it.
## Importation of libs
```python
import numpy as np
import scipy.integrate as integrate
from matplotlib import pyplot as plt
```

## Constant variables
```python
s = 20000 # thickness of ice in m
T = 200 # difference of temperature
r = 0.1 # radius of big pinger
t = 10*365*86400 # 10 years in seconds
l = 18.1*365*86400 # 18.1 years in seconds A = np.pi*r*r # Surface of pinger at front a=3
```

## Pinger Class
```python
class Pinger:
    x = [] # X values for plotting
    xCord = 0 # x-axis positon
    down = 0 # how far the pinger goes into the ice (in km)

    def __init__(self, px, pdown):
        self.x.append(px)
        self.xCord = px
        self.down = pdown

    # Each functions are explained in the report
    @staticmethod
    def calcNeededPower(x):
        l = 18.1*365*86400 #18.1 years in seconds
        return (((2-x/s)*A*x*920*2100*T/2+A*x*920*335000)*np.power(np.e,(np.log(2)/l)*t)) /(t)

    @staticmethod
    def length(p0):
        p = s*(1+335000/(T*2100))
        length = -p + np.sqrt((p*p)-(p0*np.power(np.e,(-np.log(2)/l)*t)*t*2*s)/(A*920*T*2100))
        return length

    @staticmethod
    def volumen(a1, x1, x2):
        d = np.sqrt((x1-x2)*(x1-x2)+a1*a1)
        return a1*((x1+x2)/2)*4*r+(np.pi*2*r*r*d)

```

## Algorithm for the total volume of n pingers
```python
def totalVolume(pingers):
    tempVolume = 0 # will be returned
    length = len(pingers)-1 # array size of pingers

    for i in range(length): # iterate through all pingers currentPinger = pingers[i];
        if i == length:
            break # No nextPinger possible -> no volume
        else:
          nextPinger = pingers[i+1]; # next pinger in array (index+1)
          m1 = currentPinger.calcNeededPower(currentPinger.down) # power for pinger1 m2 = nextPinger.calcNeededPower(nextPinger.down) # power for pinger2
          l1 = currentPinger.length(m1) # depth for pinger1
          l2 = nextPinger.length(m2) # depth for pinger1
          x1 = currentPinger.xCord # x coordinate for pinger1
          x2 = nextPinger.xCord # x coordinate for pinger1
          a1 = 0

          # calc delta x of pingers
          if x1 < x2:
              a1 = x2-x1
          else:
              a1 = x1-x2

          v = volumenWithLimitation(l1, l2, x1, x2) # volume between current and next pinger
          tempVolume = tempVolume+v # added to the other volumes

          plt.plot([currentPinger.xCord, currentPinger.xCord], [0, l1], 'o:r') # plot without realspace

          # Real area between
          vx = [currentPinger.xCord, nextPinger.xCord, nextPinger.xCord, currentPinger.xCord]
          vy = [-currentPinger.down, -nextPinger.down, 0, 0]
          plt.fill(vx, vy, 'o:r', alpha=0.1)

          if i == length-1: # draw last red area
              plt.plot([nextPinger.xCord, nextPinger.xCord], [0, l2], 'o:r')

    return tempVolume*1000 # added volume


```

## Function for the 3km sending radius
```python
def volumenWithLimitation(y1, y2, x1, x2): # days until > 3km m1 = calcNeededPower(y1)
  m2 = calcNeededPower(y2)

  # day = int(t/86400) # t = 15years in sec -> diveded by sec a day
  volume = 0
  count = t/86400

  for i in range(int(count)):
      y1 = lengthT(m1, i*86400)
      y2 = lengthT(m2, i*86400)

      delta = abs(y2-y1)
      space = abs(x2-x1)

      realspace = np.sqrt(space*space + delta*delta)

      if(realspace > 3):
          return volumen(x1, x2, space, abs(y1), abs(y2)) #abs because crazy issue of wed.

  return volumen(x1, x2, space, abs(y1), abs(y2))
```

##
```python
# Config of figure
figure, axes = plt.subplots()
axes.set_ylabel('y in km')
axes.set_xlabel('x in km')
figure.set_size_inches(10, 10)
figure.savefig('test.png', dpi=100)
plt.xlim(-10, 10)
plt.ylim(-30, 20)

# Circle for Europa
circle1 = plt.Circle((0, -1500), 1500, color='#A5E1F7', fill=True, label = "Europa (Moon)") plt.gca().add_patch(circle1)

# Circle for Ice
circle2 = plt.Circle((-0, -1500), 1480, color = '#1978CB', fill=True, label = "Ocean") plt.gca().add_patch(circle2)

pingers = []
# Adding of the pingers
pingers.append(Pinger(-6, 10))
pingers.append(Pinger(-4.8, 5))
pingers.append(Pinger(-2.8, 17))
pingers.append(Pinger(0, 18))
pingers.append(Pinger(3.8, 11.5))
pingers.append(Pinger(4.8, 12))
pingers.append(Pinger(6.8, 13))
pingers.append(Pinger(8, 16))

vGes = totalVolume(pingers)

# Figure for data table
fig, ax = plt.subplots(1,1)
fig.set_size_inches(10, 10)
fig.savefig('table.png', dpi=200)
data=[]

# Adding values in array
c=0
for p in pingers:
    c+=1
    ppow = p.calcNeededPower(p.down)
    plen = p.length(ppow)
    data.append([c, abs(plen), round(ppow/2.5*1000, 2)])

# Configure first row
data.append(["", "", ""])
totalV = str(round(vGes,2)) + "m3"
data.append(["Total Volume:", totalV, ""])
column_labels=["Pinger n", "Depth (km)", "Curium (g)"] ax.axis('off')

table = ax.table(cellText=data,colLabels=column_labels,loc="center")
table.set_fontsize(25)
cellDict = table.get_celld()

# Changing size of each cell
for i in range(0,len(column_labels)):
    cellDict[(0,i)].set_height(.1)
    for j in range(1,len(pingers)+3):
        cellDict[(j,i)].set_height(.05)

print(vGes)
plt.show()
```

## Output

# Images

Go back [Home](/).

