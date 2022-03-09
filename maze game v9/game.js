kaboom({
     global: true,
     fullscreen: true,
     scale: 2,
     debug: true,
     clearColor: [0, 0, 0, 1],
   })
   
   //SPEED IDENTIFERS
   const MOVE_SPEED = 120
   const JUMP_FORCE = 360
   const BIG_JUMP_FORCE = 550
   let CURRENT_JUMP_FORCE = JUMP_FORCE
   const FALL_DEATH = 400
   const ENEMY_SPEED = 20
   
   //GAME LOGIC
   let isJumping = true
   
   //SPRITES
   loadRoot('https://i.imgur.com/')
   loadSprite('coin', 'wbKxhcd.png')
   loadSprite('evil-shroom', 'KPO3fR9.png')
   loadSprite('brick', 'pogC9x5.png')
   loadSprite('player', '5hklMOL.png')
   loadSprite('mushroom', '0wMd92p.png')
   loadSprite('surprise', 'gesQ1KP.png')
   loadSprite('unboxed', 'bdrLpi6.png')
   loadSprite('slide-top-left', 'ReTPiWY.png')
   loadSprite('slide-top-right', 'hj2GK4n.png')
   loadSprite('slide-bottom-left', 'c1cYSbt.png')
   loadSprite('slide-bottom-right', 'nqQ79eI.png')
   loadSprite('blue-block', 'fVscIbn.png')
   loadSprite('blue-brick', '3e5YRQd.png')
   loadSprite('blue-steel', 'gqVoI2b.png')
   loadSprite('blue-evil-monster', 'SvV4ueD.png')
   loadSprite('blue-surprise', 'RMqCc1G.png')
   loadSprite('block', 'M6rwarW.png')
   
   
   //DEFINING THE 3 LAYERS, 'ui' WILL BE DRAWN ON THE TOP MOST, WITH THE DEFUALT LAYER BEING 'game'
   scene("game", ({ level, score }) => {
     layers(['bg', 'obj', 'ui'], 'obj')
   
     
     //LEVEL CREATION
     const maps = [
          [
               '                                         ',
               '                                         ',
               '                                         ',
               '                                         ','                                         ',
               '                                         ',
               'b  bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
               'b  bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
               'b  bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
               'b    zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzb',
               '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
          ],
          [
            '£                 xxxxxxxxxxxxxxxxxxx',
            '£           nN           xxxxxxxxxxxx',
            '£           ()             xxxxxxxxxx',
            '£        xxxxxxxx $$$$$$        xxxxx',
            '£                 xxxxxxx       xxxxx',
            '£                         xx    xxxxx',
            '£                             oOxxxxx',
            '£                             ()xxxxx',
            '£                $$xxxxxxxxxxxxxxxxxx',
            '£             $$xxxxxxxxxxxxx$$xxxxxx',
            '£         $$xxxxxxxxxxxxxxxx$$$xxxxxx',
            '£          zxxxxxxxxxxxxxxx$$$$xxxxxx',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
          ],
          // level 2
          [
          '£                                       £',
          '£    xxxxxxxxxxxxxxxxxxxxxxxxx         x£',
          '£    xxxxxxxxxxxxxxxxxxxxxx            x£',
          '£    xxxxxxxxxxxxxxxxxxxxx      xx wW$$x£',
          '£    $$xxxxxxxxxxxxxxx             ()$$x£',
          '£    $$$xxxxxxxxxxxxxx       xxxxxxxxxxx£',
          '£    $$$$xxxxxxxxxxxxx$$   xxxxxxxxxxxxx£',
          '£    $$$$$xxxxxxxxxxxx$$    xxxxxxxxxxxx£',
          '£    $$$$$xxxxxxxxxxxxxx    xxxxxxxxxxxx£',
          '£                           xxxxxxxxxxxx£',
          '£                         oOxxxxxxxxxxxx£',
          '£                   z    z()xxxxxxxxxxxx£',
          '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
          ],
        // level 3
          [
            '          oO                             ',
            '£         ()$$$$$$$$$$$$$               £',
            '£         xxxxxxxxxxxxxxx     $$$$$$    £',
            '£                             xxxxxx    £',
            '£                             xxxx      £',
            '£                             xxx       £',
            '£                                   yY  £',
            '£                                   ()  £',
            '£                 $$$$$$$$xxxxxxxxxxxxx £',
            '£                 xxxxxxxxxxxxxxxxxxxxx £',
            '£                 xxxxxxxxxxxxxxxxxxxxx £',
            '£                                       £',
            '£      *                                £',
            '£                              sS       £',
            '£                     z    z  z()       £',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            ],
            // level 4
            [
              '£                             xxxxxx    £',
              '£                             xxxxxx    £',
              '£         wW                            £',
              '£         ()$$$$$$$$$$$$$               £',
              '£         xx *                $$$$$$    £',
              '£                             xxxxxx    £',
              '£                             xxxx      £',
              '£            x                        oO£',
              '£                 $$$$$$$$xxxxxxxxxx  ()£',
              '£                 xxxxxxxxxxxxxxxxxxxxxx£',
              '£                 xxxxxxxxxxxxxxxxxxxxxx£',
              '£            x                          £',
              '£                                    fF £',
              '£                                z   () £',
              '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
              ],
              [
                '£                Vv        Vv           £',
                '£         Vv     ()        ()           £',
                '£         ()     xx        xx           £',
                '£         xx           Vv        Vv     £',
                '£              Vv      ()        ()     £',                
                '£              ()      xx   Vv   xx     £',
                '£      Vv      xx           ()          £',
                '£      ()                   xx   Vv     £',
                '£      xx                        ()     £',
                '£                  cC            xx     £',
                '£                  ()                   £',
                '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
                ],
          
     ]
   
     const levelCfg = {
       width: 20,
       height: 20,
       '$': [sprite('coin'), 'coin'],
       '%': [sprite('surprise'), solid(), 'coin-surprise'],
       '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
       '}': [sprite('unboxed'), solid()],
       '(': [sprite('slide-bottom-left'), solid(), scale(0.5)],
       ')': [sprite('slide-bottom-right'), solid(), scale(0.5)],
       '^': [sprite('evil-shroom'), solid(), 'dangerous'],
       '#': [sprite('mushroom'), solid(), 'mushroom', body()],
       '!': [sprite('blue-block'), solid(), scale(0.5)],
       '£': [sprite('blue-brick'), solid(), scale(0.5)],
       'z': [sprite('blue-evil-monster'), solid(), scale(0.5), 'dangerous'],
       '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
       'x': [sprite('blue-steel'), solid(), scale(0.5)],
       'b': [sprite('block'), solid(), scale(1)],


       /// THESE ARE DEFINED TO CREATE THE DIFFERENT ROUTES OF THE GAME
       /// GIVES THE PLAYER AN OPTION OF WHICH ROUTE THEY WANT TO TAKE
       'o': [sprite('slide-top-left'), solid(), scale(0.5), 'slide'],
       'O': [sprite('slide-top-right'), solid(), scale(0.5), 'slide'],
       'n': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_forward2'],
       'N': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_forward2'],
       'e': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_forward3'],
       'E': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_forward3'],

       's': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_back1'],
       'S': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_back1'],
       'w': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_back2'],
       'W': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_back2'],
       'y': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_back3'],
       'Y': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_back3'],
       'f': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_back4'],
       'F': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_back4'],

       'c': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_exit'],
       'C': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_exit'],
       'V': [sprite('slide-top-left'), solid(), scale(0.5), 'slide_nothing'],
       'v': [sprite('slide-top-right'), solid(), scale(0.5), 'slide_nothing'],
   
     }
   
     //NEXT LEVEL CREATION
     const gameLevel = addLevel(maps[level], levelCfg)
   
     //SCORE IDENTIFIER
     const scoreLabel = add([
       text(score),
       pos(73, 15),
       layer('ui'), // by placin on UI layer its not going to interfere with anything in my game
       {
         value: score,
       }
     ])
   
     //LEVEL IDENTIFER
     add([text('level ' + parseInt(level + 0) ), pos(26, 30)])

     //SCORE IDENTIFER
     add([text('score ' ), pos(26, 15)])
     
     //SUPERPOWER LOGIC
     function big() {
       let timer = 0
       let isBig = false
       return {
         update() {
           if (isBig) {
             CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
             timer -= dt()  //kaboom.js method
             if (timer <= 0) {
               this.smallify()
             }
           }
         },
         isBig() {
           return isBig
         },
         smallify() {
           this.scale = vec2(0.5)
           CURRENT_JUMP_FORCE = JUMP_FORCE
           timer = 0
           isBig = false
         },
         biggify(time) {
           this.scale = vec2(2)
           timer = time
           isBig = true     
         }
       }
     }
   

     //PLAYER LOGIC
     const player = add([
       sprite('player'), solid(),
       pos(35, 200),
       body(),
       big(),
       scale(0.5),
       origin('bot')
     ])
   
     //SUPERPOWER LOGIC
     action('mushroom', (m) => {
       m.move(20, 0)
     })
   
     //HIDDEN SURPISES
     player.on("headbump", (obj) => {
       if (obj.is('mushroom-surprise')) {
         gameLevel.spawn('#', obj.gridPos.sub(0, 1))
         destroy(obj)
         gameLevel.spawn('}', obj.gridPos.sub(0,0))
       }
     })
   
     //SUPERPOWER LOGIC
     player.collides('mushroom', (m) => {
       destroy(m)
       player.biggify(6)
     })
   
     //TREASURE LOGIC
     player.collides('coin', (c) => {
       destroy(c)
       scoreLabel.value++
       scoreLabel.text = scoreLabel.value
     })
   
     // ENEMY MOVEMENT
     action('dangerous', (d) => {
       d.move(-ENEMY_SPEED, 0)
     })
   
      //ENEMY DEFEAT METHOD
     player.collides('dangerous', (d) => {
       if (isJumping) {
         destroy(d)
       } else {
         go('lose', { score: scoreLabel.value})
       }
     })

     //PLAYER DEATH
     player.action(() => {
       camPos(player.pos)
       if (player.pos.y >= FALL_DEATH) {
         go('lose', { score: scoreLabel.value})
       }
     })

     //THE DIFFERENT ROUTES OF THE GAME
     player.collides('slide', () => {
          keyPress('enter', () => {
            go('game', {
              level: (level + 1),
              score: scoreLabel.value
            })
          })
        })

     player.collides('slide_forward2', () => {
       keyPress('enter', () => {
         go('game', {
           level: (level + 2),
           score: scoreLabel.value
         })
       })
     })

     player.collides('slide_forward3', () => {
          keyPress('enter', () => {
            go('game', {
              level: (level + 3),
              score: scoreLabel.value
            })
          })
        })
     
     player.collides('slide_back1', () => {
          keyPress('enter', () => {
            go('game', {
              level: (level - 1),
              score: scoreLabel.value
            })
          })
        })

     player.collides('slide_back2', () => {
          keyPress('enter', () => {
            go('game', {
              level: (level - 2),
              score: scoreLabel.value
            })
          })
        })

        player.collides('slide_back3', () => {
          keyPress('enter', () => {
            go('game', {
              level: (level - 3),
              score: scoreLabel.value
            })
          })
        })

        player.collides('slide_back4', () => {
          keyPress('enter', () => {
            go('game', {
              level: (level - 4),
              score: scoreLabel.value
            })
          })
        })

        player.collides('slide_exit', () => {
          keyPress('enter', () => {
            go('lose', { score: scoreLabel.value})
          })
        })

     // PLAYER MOVEMENT: FOWARD AND BACKWARDS
        keyDown('right', () => {
          player.move(MOVE_SPEED, 0)
        })

     keyDown('left', () => {
       player.move(-MOVE_SPEED, 0)
     })

     console.log(keyDown);
   
     // PLAYER ACTION: JUMPING
     player.action(() => {
       if(player.grounded()) {
         isJumping = false
       }
     })
   
     keyPress('space', () => {
       if (player.grounded()) {
         isJumping = true
         player.jump(CURRENT_JUMP_FORCE)
       }
     })

     keyPress('up', () => {
      if (player.grounded()) {
        isJumping = true
        player.jump(CURRENT_JUMP_FORCE)
      }
    })
   })
   
   // WHAT IS SHOW ON SCREEN IF PLAYER DIES FROM FALLING OR DEFATED BY MONSTER
   scene('lose', ({ score }) => {
     add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)])
   })  //THIS IS ALSO HOWN WHEN PLAYER COMPLETES GAME

   start("game", { level: 1, score: 0})