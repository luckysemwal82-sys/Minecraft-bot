const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'gfarsmp.falixsrv.me',
    port: 25863,
    username: 'LuckyBot123',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined server')
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
