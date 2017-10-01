## Flick

### Overview

Flick is a game based on asteroids. There will be different colored dots moving around the board. 
The player will navigate their ship to "eat" the dots that matches it color and avoid the ones that don't.
If the player hits a dot that doesn't match their color they will lose a life. Dots will respawn as the 
player eats them. Every 5 seconds or so the player ship color will change to match a different color of dots.

There will be two game modes, a timed one to see how many points the player can get and a zen mode where the
player can keep going until they lose.

### Functionality

* Aside describing the rules and how to move
* Player can move using arrow keys or cursor
* Toggle game mode

### Wireframe
![flick-wireframe][wireframe]

### Technologies

* Javascript for game structure and logic
* Canvas for DOM manipulation
* Webpack to serve up various scrips

### Architecture

* asteroids.js :this script will contain physics logic for the dots
* ship.js :this script will contain logic for the player ship movement and interaction with dots
* view.js :this script will create and update objects for the DOM

### Timelines

#### Over the weekend: 
- [ ] Set up files
- [ ] Create basic game view

#### Day 1:
- [ ] Set up Asteroids with colors
- [ ] Physics of movement, collisions

#### Day 2:
- [ ] Set up timer
- [ ] Set up ship movement with mouse and arrow keys

#### Day 3: 
- [ ] Ship and dot interactions based on color matching
- [ ] Points and lives
- [ ] Set up point system

#### Day 4:
- [ ] Difficulty increases with time
- [ ] Asteroids speed up
- [ ] Ship changes color more frequently

### Bonus:
- [ ] AI version (Demo)

[wireframe]: https://github.com/rebekahliu/Flick/blob/master/wireframes/Untitled%20Diagram.png
