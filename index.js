const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot is alive ✅')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running')
})
const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'gfarsmp.falixsrv.me',
    port: 24793,
    username: 'LuckyBot123',
    auth: 'offline',
    version: '1.20.1'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined server')

  // Anti-AFK loop
  setInterval(() => {
    const actions = ['forward', 'back', 'left', 'right']

    const action = actions[Math.floor(Math.random() * actions.length)]

    bot.setControlState(action, true)

    setTimeout(() => {
      bot.setControlState(action, false)
    }, 2000)

    // Random jump
    if (Math.random() > 0.7) {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }

    // Random look
    bot.look(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI - Math.PI / 2,
      true
    )

  }, 5000) // every 5 sec
  })

  bot.on('end', () => {
    console.log('🔄 Reconnecting...')
    setTimeout(createBot, 5000)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('⚠ Error:', err.message)
  })
}

createBot() 
