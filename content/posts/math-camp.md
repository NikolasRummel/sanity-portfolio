---
title: "Mathecamp in Belgien: Meine Eindrücke zu mathematischer Modellierung und Python"
slug: "math-camp"
description: "In diesem Beitrag berichte ich von meiner Teilnahme an einem Mathecamp in Belgien zu mathematischer Modellierung und Python: Problemlösen, mathematische Konzepte und die spannende Welt des Programmierens mit Python."
image: "/images/content/math-camp-1280x960.jpg"
imageAlt: "Mathecamp"
category: ["personal", "education"]
createdAt: "2023-07-25T16:58:04Z"
updatedAt: "2023-09-30T20:39:18Z"
---

# Was ist die CAMMP-Woche?

Die Modellierungswoche ist eine Projektwoche, in der Schülerinnen und Schüler
gemeinsam mit Lehrkräften und wissenschaftlicher Unterstützung an echten Problemen aus der
Forschung von Unternehmen oder Universitätsinstituten arbeiten.

**Einige Beispiele für solche Probleme:**

1. Wie müssen Solarkraftwerke ausgelegt werden, damit sie wettbewerbsfähig sind? (TSK Flagsol)
2. Wie lassen sich in der Raumfahrt Roboter steuern, die Bodenproben entnehmen? (Enceladus Explorer Initiative, DLR)
3. Wie können die Buslinien einer Stadt so optimiert werden, dass der Bus endlich pünktlich kommt? (IVU Traffic Technologies AG)
4. Wie lassen sich optimale Knochenimplantate für Unfallopfer entwickeln? (Uniklinik RWTH Aachen)
<br/>

Jede Gruppe bekommt eine eigene Aufgabe, an der sie fünf Tage lang arbeitet.
Dabei wird sie stets von einer Wissenschaftlerin oder einem Wissenschaftler betreut.
Am Ende der Woche präsentieren die Teams ihre Ergebnisse
Unternehmensvertretern bei einer Abschlussveranstaltung in Aachen oder Karlsruhe.
Die Familien der Teilnehmenden und Vertreter der Schulen sind
herzlich eingeladen. Zur Woche gehört außerdem ein Rahmenprogramm mit
Sportwettkampf, Grillabend und weiteren Freizeitaktivitäten
sowie eine Studieninformationsveranstaltung.

# Unsere Aufgabe
Für die In-situ-Erkundung dicker Eisschichten, sowohl auf der Erde als auch auf den Eismonden unseres Sonnensystems, z. B. Europa, werden Schmelzroboter entwickelt. Ein Vorteil dieser Technologie: Sie ist extrem wartungsarm und lässt sich gut autonom betreiben. Die Schmelzroboter, auch Kryoroboter genannt, können individuell mit wissenschaftlicher Nutzlast (also bestimmten Messinstrumenten) bestückt werden und sich durch das Eis schmelzen. Es wird aber auch daran gearbeitet, ein ganzes Smart Grid aus kleineren Schmelzsonden ins Eis zu schicken.
Jedes Element dieses Smart Grids, auch Pinger oder Sonden genannt, kann sich richtungsstabil ins Eis schmelzen, d. h. entlang einer geraden Bahn, die nicht unbedingt senkrecht verläuft.
Außerdem ist jeder Pinger mit einem akustischen Sender und einem akustischen Empfänger ausgestattet, sodass akustische Wellen gesendet und empfangen werden können. Es gibt große Pinger (Zylinder von 1 m Länge und 20 cm Durchmesser), die ein akustisches Signal bis zu 3 km weit senden können, und kleine Pinger (Zylinder von 1 m Länge und 15 cm Durchmesser) mit einer Reichweite von 2 km. Die einzelnen „Wellenstrahlen“ des Signals decken einen kreisförmigen Querschnitt mit einem Durchmesser von etwa dem Doppelten des Pingerdurchmessers ab. Es kann immer nur ein Signalpaket gleichzeitig gesendet werden.


Die Pinger sind zeitlich synchronisiert, sodass die Laufzeiten der Wellen zwischen den Pingern gemessen und gespeichert werden können (wir nehmen hier an, dass die Herausforderung der Datenkommunikation gelöst ist ...). Mit einer sogenannten Laufzeittomographie lassen sich so lokale Inhomogenitäten im Eis erkennen, etwa durch Dichteschwankungen, Salz oder Wassereinschlüsse.
Uns geht es hier aber nicht um die Laufzeittomographie selbst, sondern um das Eisvolumen, das von den Strahlen zwischen den Pingern abgedeckt wird. Der Pinger sinkt dabei ständig. Bei irdischen Anwendungen kommt die nötige Schmelzleistung von einem Generator, der eine Soll-Sinkgeschwindigkeit vorgibt und abgeschaltet werden kann. Für außerirdische Anwendungen sind RTGs (sogenannte Radioisotopengeneratoren) vorgesehen, in denen radioaktives Material nach einer bestimmten Zerfallskurve zerfällt und dabei (kontinuierlich) Wärme erzeugt. Kandidaten für das Material sind Curium, Uran oder Plutonium (siehe Datenblatt).
Ziel ist es, die als Smart Grid angeordneten Pinger (bzw. Schmelzsonden) der RTGs so zu steuern und ins Eis zu schicken, dass das untersuchte Eisvolumen maximal wird.

**Eure Aufgabe**
- Entwickelt ein Modell, mit dem sich das untersuchte Eisvolumen für einen beliebigen Aufbau beschreiben lässt (Startreihenfolge der Pinger, Verteilung des radioaktiven Materials, Schmelzrichtung).
- Entwickelt anschließend einen praxistauglichen Versuchsaufbau (Startreihenfolge der Pinger, Verteilung des radioaktiven Materials, Schmelzrichtung), mit dem das untersuchte Eisvolumen maximiert wird. Betrachtet dabei drei Szenarien:
- Es werden nur große Pinger betrachtet (insgesamt 10).
- Es werden nur kleine Pinger betrachtet (insgesamt 10 Stück).
- Es wird eine Mischung aus kleinen und großen Pingern betrachtet.

# Code
Um das gescannte Volumen mit den hergeleiteten Formeln zu berechnen, war ich hauptsächlich für die Entwicklung eines passenden Algorithmus in Python zuständig. Mit meinem Vorwissen in Java und etwas Hilfe des Betreuers zu Beginn konnte ich ihn entwickeln.
## Bibliotheken importieren
```python
import numpy as np
import scipy.integrate as integrate
from matplotlib import pyplot as plt
```

## Konstanten
```python
s = 20000 # thickness of ice in m
T = 200 # difference of temperature
r = 0.1 # radius of big pinger
t = 10*365*86400 # 10 years in seconds
l = 18.1*365*86400 # 18.1 years in seconds A = np.pi*r*r # Surface of pinger at front a=3
```

## Klasse Pinger
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

## Algorithmus für das Gesamtvolumen von n Pingern
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

## Funktion für den Senderadius von 3 km
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

## Ausgabe

# Bilder

Zurück zur [Startseite](/).

