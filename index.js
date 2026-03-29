const express = require('express')
const app = express()

// 🌐 Keep-alive web server (for Railway/UptimeRobot)
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
    port: 28572,
    username: 'LuckyBot123',
    auth: 'offline',
    version: '1.20.1'
  })

  // ✅ When bot joins
  bot.once('spawn', () => {
    console.log('✅ Bot joined server')

    bot.waitForChunksToLoad(() => {
      console.log('🌍 Chunks loaded')

      // ⏳ Wait before doing anything (IMPORTANT)
      setTimeout(() => {

        console.log('🤖 Starting anti-AFK')

        // 🔁 Anti-AFK movement loop
        setInterval(() => {
          const actions = ['forward', 'back', 'left', 'right', 'jump']
          const action = actions[Math.floor(Math.random() * actions.length)]

          bot.setControlState(action, true)

          setTimeout(() => {
            bot.setControlState(action, false)
          }, 1000)

        }, 5000)

      }, 5000)

    })
  })

  // 🔄 Auto reconnect
  bot.on('end', () => {
    console.log('❌ Disconnected... Reconnecting')
    setTimeout(createBot, 5000)
  })

  bot.on('kicked', (reason) => {
    console.log('🚫 Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err)
  })
}

// 🚀 Start bot
createBot()
