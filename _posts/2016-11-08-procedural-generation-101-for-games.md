---
date: '2016-11-08 9:00:00 -04:00'
layout: post
title: Procedural Generation 101 (for games)
slug: procedural-generation-101-for-games
description: Procedural Generation is awesome and you need some in your game!
categories:
- Programming
- Game Dev
tags:
- Procedural Generation
- Game Dev
---
> "Awwww man I need some of that Procedural Generation in my game"
>
> \- anonymous totally not made up indie game developer

But what is it?  Well it's when your game is all random and stuff right?  Sort of.  I like to think of it as randomness with a bit of intelligence.  It isn’t a silver bullet, but it can help add variety and re-playability to your game.

But before we get into it, let's take a look at some games that do Procedural Generation.

## Games that use Procedural Generation

- Minecraft, Terraria - Terrain is dynamically created for each game.
- Diablo I, II, III, Spelunky - Dungeons/map is generated.
- The Division - Set pieces (rooms) are dynamically linked together each time a new mission is run.
- No Man's Sky - Terrain, creatures and plants are generated the same way for everyone who plays the game.
- Borderlands 1, 2 - Weapon models and stats are generated.
- Crossy Road, Land Sliders, Shooty Skies - Mobile games that randomly generate levels.
- Final Frontier (a highly anticipated unreleased game from an up and coming indie game developer) - Enemy waves are generated at increasingly difficulty with great variety.
- And many others!

Think about those for a minute.  Many different types of games use Procedural Generation, and they use it for different aspects of gameplay.  Even if 2 games use it for the same aspect they may still use it in different ways.  Terraria and The Division and both generate the map but Terraria generates the terrain while The Division composes its level out of set piece rooms.  Think about some of the other similiarities between these games.  Think about if any of your favorite games use Procedural Generation.  Finally, think about games that don't use Procedural Generation.


## Applications of Procedural Generation

Given the list of games we just mentioned we can see that there are many different applications of randomness:

- Terrain/level creation
- Enemies/spawning
- Loot/weapons/gear
- Models/textures/animations
- Sound/music - I'm not well versed in games with Procedurally Generated sound, but I've "heard" it's a thing. (GET IT!?)
- Story/quests/dialog


## Procedural Generation Methods

So how is this randomness achieved?  And what is so intelligent about it?  Let's start simple and imagine we're making a Dungeon Crawler.  For the sake of this article, let's apply Procedural Generation to the map, enemies, and loot.

### Method 1: Regular Ol' Randomness

While not intelligent, you can use pure randomness.

- How big is each level of our dungeon?  Randomly create a grid of tiles 10-100 high/wide.
- What is the layout of the dungeon?  Each tile is randomly selected from a list: Empty, Decoration, Trap, Enemy.
- What enemies are going to show up? Randomly select 1-10 enemies.
- What loot drops? Pick a random item image, select 5 random abilities for it.

Sounds like we have ourselves an awesome game, right?  Every play-through will probably be drastically different!  Wait, DRASTICALLY different?  Well, yeah that could be an issue... We could get 10 bosses to spawn right next to us and drop nothing but worthless loot.  Or maybe we get 1 weak goblin to spawn and he drops Excalibur and Aegis!  Or maybe the map is 100x100 and is ALL TRAPS.  Or maybe... you get the idea.

While this type of gameplay can be entertaining, it's too chaotic and the user will quickly become frustrated that the game either goes really well, really badly, or anywhere in between.

A better approach is what I call...


### Method 2: Guided Randomness

As we just saw, complete randomness can be great... or disastrous.  Instead of drowning our game in randomness we'll selectively apply randomness, with limits (or ranges).  Good games slowly ramp up difficulty and avoid huge discrepancies in difficulty.  Let's take our last example and upgrade it:

- How big is each level of our Dungeon?  The level grid starts at 10x10 and gets increasingly bigger as the player progresses.
- What is the layout of the dungeon?  Each level is allowed a certain number of traps and decorations.  Those numbers slowly increase with the level size so the whole level doesn't become traps and decorations.
- What enemies are going to show up? Start with only weak enemies and slowly introduce the more difficult ones.  Optionally replace a harder enemy with many smaller ones, for more variety.
- What loot drops? Find a way to categorize the abilities that can appear on an item and select 1 from each category.  Maybe certain abilities have a higher chance to appear together and maybe some can't appear together at all.  Fire and Ice damage on a single weapon might seem silly for example, cuz realism.
- Quests - "Fetch \_\_\_\_\_\_ \_\_\_\_\_\_'s from \_\_\_\_\_\_ for \_\_\_\_\_\_".

So now that we've created a more fluid play-through, how can we share it?  Wait, you can share randomness?


### Improvement 1: Using a Seed

Imagine you just had an amazing play through of a game, and your friend wants to play it too so you can finally settle who is better at video games.  If we want to share our play through, we need the game's randomness to be deterministic.  That means the game should produce the same results everytime, given a start value, or **seed**.  Random Number Generators (RNG's) are able to take a value that it uses as a starting point.

If you create a new RNG instance and pass it the same seed every time you will get the same exact sequence of values generated.  As long as everything is generated in the same order, the exact same experience can be replayed!

But that doesn't mean that *everything* should be using a seed.  For example, cosmetic things like particle effects can still be fully randomized simply because it doesn't matter, and the sequence in which they're created would be different for every play through.  We also want to make sure that we use a separate RNG instance for each type of thing that we're generating.  For example, the layout engine should use it's own RNG to make sure that we don't accidentally generate a random value somewhere and throw the whole thing off.

Keep in mind that while the game can be generated the same way, each player may play the game differently.  If you have a game with multiple paths through a given map, a player could take a different route and therefore encounter things in a different order.

Ok, so now our game has pretty interesting playthroughs, and we can even share them!  How do we take things to the next level?


### Improvement 2: Set Pieces

Randomness with constraints can only get you so far.  Eventually you may want to incorporate ***Set Pieces***.  Set Pieces are pieces of content that are **pre**-generated, either by the game developer or by the game.

Let's continue with our dungeon crawler example.  If you tried creating the game I've been describing so far, you'll find that there are still some rough edges.  At times, things just don't end up looking or feeling right.  Maybe the Traps were all created in a cluster that is easily avoidable, or maybe the RNG gods decided to roll really bad stats on every weapon that drops.

- Dungeon Layout - Create "blocks" that consist of several tiles preconfigured with decorations, traps, and enemies.  Imagine 4 Skeleton Guards faithfully guarding a booby-trapped sacred altar with a Golden Chalice on top.  Sounds cool, right?  Don't use that one though... that's mine.  (The Division, Diablo, and Spelunky all do something like this.  See the links at the bottom for an ***amazing*** video on Spelunky's Level Generation)
- Loot - Create Named Weapons that have unique stats like "The Party Pooper" which is the only weapon in the game that makes a sad trombone noise and spews out confetti every time you kill an enemy.  (The Division, Diablo, Borderlands, and many others have named items)
- Quests - Hand-craft a number of quests and sprinkle them throughout the game amidst the fetch quests.  A cool idea might be to disguise a set-quest as a fetch quest, surprising the player with a boss or some awesome loot.

OK now our game is FREAKIN' SWEET. SHIP IT!  What?  Not yet?  What else could we possibly need?


### Noise Functions

Randomize the volume?  No!  Not that type of noise.  Noise as in static, like on a incorrectly setup TV, or when your old car radio can't find a station.  Noise can do some of the heavy lifting for you when it comes to randomization.  Let's take a look at a Noise Function commonly used in games for terrain generation called [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise).

(*Apparently there is a successor to Perlin Noise called [Simplex Noise](https://en.wikipedia.org/wiki/Simplex_noise).  However, it is patented so there is also [OpenSimplex noise](https://en.wikipedia.org/wiki/OpenSimplex_noise)*)

Perlin Noise generates a grid of values ranging from 0 to 1.  What's cool is if we map the grid of values to a grid of pixels, we would get an image that looks like clouds!  Each pixel in the cloud image is a different shade of black, or if you look at it another way, each pixel can be a value between 0 and 1.  0 being completely white, 1 being completely black, and anything in between representing shades of gray.  Since we have values from 0 to 1, we could multiply those values by a fixed number and get any upper limit!  Multiply everything by 10 and we get 0 to 10.  Multiply everything by 25 and we get 0 to 25.  Multiply everything by 10,000 and we get 0 to 10,000.  You get the idea.

Now that we can scale the image data to fit our needs we can apply it to different things.  A prime example of this would be a height map for terrain.  Using a scale of 0 - 100, we could use 25 as "sea level".  Any number below 25 would be considered water, 25-35 would be beach, 30-60 would be forests, 60-90 would be hills, and 90-100 would be mountains.  Another example would be to calculate the probability of a trap appearing, or clusters herds of enemies/animals.

## A Simple Example - Final Frontier

Now that we've covered the basics, let's take a slightly more detailed look at a real world example.

Final Frontier is a simple space shooter.  Each game consists of increasingly difficult waves of enemies.  Once all enemies in a wave are cleared players are given 10 seconds to purchase upgrades and prepare themselves for the next wave.

The Procedural Generation comes in the form of the enemy makeup of each wave.  Each successive wave has a larger point value assigned to it.  That point value is used to spawn a varying number of enemies each round.  Enemies are spawned until the points are exhausted.  For example, these could be the point values for the enemies:

- 1 - Scout - Crappy trash mob.
- 3 - Cloaking Scout - Hard to see at times which allows it to sneak up on the player.
- 10 - Light Gunship - Slow moving, but has a turret and missiles.
- 20 - Heavy Gunship - Even slower moving, but has multiple turrets and missile launchers.
- 50 - Mothership - A mobile base.  Super slow, gigantic, armed to the teeth, and launches fighters.

And these could be the point values available to each wave:

- Wave 1 - 5
- Wave 2 - 10
- Wave 3 - 15
- Wave 4 - 20
- Wave 5 - 30
- Wave 6 - 40
- Wave 7 - 50
- Wave 8 - 75
- Wave 9 - 100
- Wave 10 - 150

When we put those together we can see the different possibilities for each wave:

- Wave 1
  - 5 Scouts
  - 2 Scouts, 1 Cloaking Scout
- Wave 3
  - 15 Scouts
  - 3 Cloaking Scouts
  - 5 Scouts, 2 Cloaking Scouts
  - 10 Scouts, 1 Cloaking Scout
- Wave 5
  - 30 Scouts
  - 15 Scouts, 5 Cloaking Scouts
  - 1 Light Gunship, 20 Scouts
  - 1 Light Gunship, 5 Scouts, 5 Cloaking Scouts
  - 1 Light Gunship, 1 Heavy Gunship
  - etc.

As the game progresses, each wave can have more variety in it, but the difficulty shouldn't vary *too* much.


## Conclusion

If this all sounds pretty cool, you should check out [PROCJAM](http://www.procjam.com/), the Procedural Generation Game Jam!  There are a lot of great resources there, even if you don't plan on entering the Jam.

Just in case it wasn't obvious from the title, Procdeural Generation has other applications than just games!  I've heard 

And if you're in the Boston area on Novermber 19th, I'll be speaking at the [Boston Code Camp](http://www.bostoncodecamp.com) about Procedural Generation and showing examples in Unity.

## Resources and Other Cool Links

~~Dogs on the internet~~ People have done a lot of cool stuff with procedural generation.  Check out these awesome examples:

- [PROCJAM - Procedural Generation Game Jam](http://www.procjam.com/)
- [PROCJAM 2016 Talks](https://www.youtube.com/watch?v=3wcpLwvBTYo)
- [How \(and Why\) Spelunky Makes its Own Levels \| Game Maker's Toolkit](https://www.youtube.com/watch?v=Uqk5Zf0tw3o)
- [Generating Fantasy Maps](http://mewo2.com/notes/terrain/)
- [Making maps with noise functions](http://www.redblobgames.com/maps/terrain-from-noise/)
- [PerlinNoise function in Unity](https://docs.unity3d.com/ScriptReference/Mathf.PerlinNoise.html)
- [Unity Manual - Adding Random Gameplay Elements](https://docs.unity3d.com/Manual/RandomNumbers.html)
