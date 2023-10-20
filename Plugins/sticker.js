const fs = require("fs");
const fetch = require("node-fetch");
const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../Configurations.js");
const eco = require("discord-mongoose-economy");
const ty = eco.connect(config.mongodb);
const { userData } = require("../System/MongoDB/MongoDb_Schema.js");
let mergedCommands = [
  "bank",
  "capacity",
  "daily",
  "deposit",
  "gamble",
  "leaderboard",
  "lb",
  "rob",
  "slot",
  "transfer",
  "wallet",
  "withdraw",
];
let { TelegraPh } = require("../System/Uploader.js");
const {
  fetchJson,
  getBuffer,
  GIFBufferToVideoBuffer,
} = require("../System/Function2.js");
let mergedCommands = [
  "sticker",
  "s",
  "steal",
  "take",
  "stickercrop",
  "scrop",
  "smeme",
  "stickermeme",
  "quote",
  "q",
  "emojimix",
];

module.exports = {
  name: "stickerformat",
  alias: [...mergedCommands],
  uniquecommands: [
    "sticker",
    "steal",
    "scrop",
    "smeme",
    "stickermeme",
    "q",
    "emojimix",
  ],
  description: "All Sticker formatting Commands",
  start: async (
    Atlas,
    m,
    {
      inputCMD,
      text,
      pushName,
      prefix,
      doReact,
      args,
      itsMe,
      participants,
      metadata,
      mentionByTag,
      mime,
      isMedia,
      quoted,
      botNumber,
      isBotAdmin,
      groupAdmin,
      isAdmin,
    }

    module.exports = {
  name: "economy",
  alias: [...mergedCommands],
  uniquecommands: [
    "bank",
    "capacity",
    "daily",
    "deposit",
    "gamble",
    "leaderboard",
    "rob",
    "slot",
    "transfer",
    "wallet",
    "withdraw",
  ],
  description: "All Economy / Gambling related commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const debitCard = fs.readFileSync("./Assets/card.png");
    const pushname = pushName || `${botName} User`;
    const cara = "cara";
    switch (inputCMD) {
      case "bank":
        await doReact("🏦");
        user = m.sender;
        balance = await eco.balance(user, cara);
        var role = "brokie😭";
        if (`${balance.bank}` <= 1000) {
          role = "broke😭";
        } else if (`${balance.bank}` <= 10000) {
          role = "Poor😢";
        } else if (`${balance.bank}` <= 50000) {
          role = "Average💸";
        } else if (`${balance.bank}` <= 1000000) {
          role = "Rich💸💰";
        } else if (`${balance.bank}` <= 10000000) {
          role = "Millionaire🤑";
        } else if (`${balance.bank}` <= 90000000) {
          role = "Multimillionaire🤑🤑";
        }
        let buttonMessage = {
          image: debitCard,
          caption: `\n🏦 *${pushname}'s Bank*:\n\n🪙 Balance: ${balance.bank}/${balance.bankCapacity}\n\n\n*Wealth: ${role}*\n`,
        };

        await Atlas.sendMessage(m.from, buttonMessage, { quoted: m });
        break;

      case "capacity":
        if (!text) {
          return Atlas.sendMessage(
            m.from,
            {
              text: `『  *Bank 💴 Capacity*  』\n\n1 | *1000 sp* = 100 💎\n\n2 | *100000 sp* = 1000 💎\n\n3 | *10000000 sp* = 10000000 💎\n\nExample: *${prefix}capacity 1* OR *${prefix}bankupgrade 1000*`,
            },
            { quoted: m }
          );
        }
        user = m.sender;
        value = text.trim();
        k = parseInt(value);
        balance = await eco.balance(user, cara);
        switch (value) {
          case "1000":
          case "1":
            if (k > balance.wallet)
              return m.reply(
                "*You need to pay 100 💎 to increase bank capacity ~ 1000 sp*"
              );
            await eco.deduct(user, cara, 100);
            await eco.giveCapacity(user, cara, 1000);
            await Atlas.sendMessage(
              m.from,
              { text: `*1000 💎 storage has been added in ${pushname} bank*` },
              { quoted: m }
            );
            break;
          case "10000":
          case "2":
            if (k > balance.wallet)
              return m.reply(
                `*You need to pay 💎 to increase bank capacity ~ 10000 sp*`
              );
            await eco.deduct(user, cara, 1000);
            await eco.giveCapacity(user, cara, 10000);
            await Atlas.sendMessage(
              m.from,
              {
                text: `*10000 💎 storage has been added in *${pushname}'s* bank*`,
              },
              { quoted: m }
            );
            break;
          case "100000":
          case "3":
            if (k > balance.wallet)
              return m.reply(
                `*You need to pay 10000 💎 to increase bank capacity ~ 100000 sp*`
              );
            await eco.deduct(user, cara, 10000);
            await eco.giveCapacity(user, cara, 100000);
            await Atlas.sendMessage(
              m.from,
              {
                text: `*100000 💎 storage has been added in *${pushname}'s* bank*`,
              },
              { quoted: m }
            );
            break;
        }
        break;

      case "daily":
        await doReact("📊");
        if (!m.isGroup)
          return m.reply("This command can only be used in groups!");
        user = m.sender;
        const daily = await eco.daily(user, cara, 1000);
        if (daily.cd) {
          await m.reply(
            `🧧 You already claimed your daily cash today, Come back in ${daily.cdL} to claim again 🫡`
          );
        } else {
          await m.reply(
            `You have Successfully claimed your daily revenue ${daily.amount} 💴 today 🎉.`
          );
        }
        break;

      case "deposit":
        await doReact("💵");
        if (!text) {
          return m.reply(
            `Please provide an amount to deposit !\n\nExample: *${prefix}deposit 1000*`
          );
        }
        num = parseInt(text);
        const deposit = await eco.deposit(user, cara, num);
        if (deposit.noten)
          return m.reply(
            `*Your Deposit ammount should be less than or equal to your wallet balance!*`
          );

        await Atlas.sendMessage(
          m.from,
          {
            image: debitCard,
            caption: `\n⛩️ Sender: ${m.pushName}\n\n🍀Successfully Deposited 💴 ${deposit.amount} to your bank.\n`,
          },
          { quoted: m }
        );
        break;

      case "gamble":
        await doReact("🎰");
        user = m.sender;
        var texts = text.split(" ");
        var opp = texts[1];
        value = texts[0].toLowerCase();
        var gg = parseInt(value);
        balance = await eco.balance(user, cara);
        const g = balance.wallet > parseInt(value);
        k = 50;
        a = k > parseInt(value);
        twice = gg * 2;
        const f = [
          "up",
          "right",
          "left",
          "down",
          "up",
          "left",
          "down",
          "right",
          "up",
          "down",
          "right",
          "left",
        ];

        const r = f[Math.floor(Math.random() * f.length)];
        if (!text)
          return m.reply(
            `Usage:  *${prefix}gamble 100 left/right/up/down*\n\nExample:  *${prefix}gamble 100 left*`
          );

        if (!value)
          return m.reply("*Please, specify the amount you are gambling with!*");
        if (!opp) return m.reply("*Specify the direction you are betting on!*");
        if (!gg)
          return m.reply(
            "*Check your text please, You are using the command in a wrong way*"
          );

        if (g == false)
          return m.reply(
            `*You don't have sufficient 🪙 Diamond to gamble with*`
          );
        if (a == true)
          return m.reply(
            `*Sorry ${m.pushName}, you can only gamble with more than 🪙50.*`
          );
        if (r == opp) {
          await eco.give(user, cara, twice);
          await Atlas.sendMessage(
            m.from,
            {
              image: debitCard,
              caption: `*📈 You won 💴 ${twice}*`,
            },
            { quoted: m }
          );
        } else {
          await eco.deduct(user, cara, texts[0]);
          await m.reply(`*📉 You lost 💴 ${texts[0]}*`);
        }
        break;

      case "leaderboard":
      case "lb":
        await doReact("📊");
        try {
          let h = await eco.lb("cara", 10);
          if (h.length === 0) {
            return Atlas.sendMessage(
              m.from,
              { text: "No users found on leaderboard." },
              { quoted: m }
            );
          }
          let str = `*[ ${botName} Leaderboard ]*\n\n`;
          let arr = [];
          for (let i = 0; i < h.length; i++) {
            let username = await userData.findOne({
              id: h[i].userID,
              name: pushname,
            });
            var tname;
            if (username && username.name) {
              tname = username.name;
            } else {
              tname = Atlas.getName(h[i].userID);
            }
            str += `*${
              i + 1
            }*\n╭─────────────◆\n│ *🎀 Name:-* _${tname}_\n│ *⚜️ User:-* _@${
              h[i].userID.split("@")[0]
            }_\n│ *💳 Wallet:-* _${h[i].wallet}_\n│ *📄 Bank Amount:-* _${
              h[i].bank
            }_\n│ *📊 Bank Capacity:-* _${
              h[i].bankCapacity
            }_\n╰─────────────◆\n\n`;
            arr.push(h[i].userID);
          }
          await Atlas.sendMessage(
            m.from,
            { text: str, mentions: arr },
            { quoted: m }
          );
        } catch (err) {
          console.log(err);
          return Atlas.sendMessage(
            m.from,
            {
              text: `An internal error occurred while fetching the leaderboard.`,
            },
            { quoted: m }
          );
        }

        break;

      case "rob":
        await doReact("💶");
        if (!text) {
          return m.reply(
            `Please specify the user you want to rob!\n\nExample: *${prefix}rob @user*`
          );
        }

        if (m.quoted) {
          var mentionedUser = m.quoted.sender;
        } else {
          var mentionedUser = mentionByTag[0];
        }

        user1 = m.sender;
        user2 = mentionedUser;
        k = 100;
        const amount = Math.floor(Math.random() * 200) + 1;
        balance1 = await eco.balance(user1, cara);
        balance2 = await eco.balance(user2, cara);
        const typ = ["ran", "rob", "caught"];
        const random = typ[Math.floor(Math.random() * typ.length)];
        if (k > balance1.wallet)
          return m.reply(
            `*☹️ You don\'t have enough money to pay fine incase you get caught*`
          );
        if (k > balance2.wallet)
          return m.reply(`*☹️ Your target doesn't have enough money to rob*`);
        switch (random) {
          case "ran":
            return m.reply(
              `*Lets leave this poor soul alone.*\n\nHe's toooo poor.`
            );
          case "rob":
            await eco.deduct(user2, cara, amount);
            await eco.give(user1, cara, amount);
            return m.reply(`*🤑 You robbed and got away with 💴 ${amount}*`);
          case "caught":
            await eco.deduct(user1, cara, balance1.wallet);
            return m.reply(
              `*☹️ You got caught and paid a fine of 💴 ${balance1.wallet}*`
            );
        }

        break;

      case "slot":
        await doReact("🎰");
        user = m.sender;
        var today = new Date();
        if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0) {
          if (text == "help")
            return m.reply(
              `*1:* Use ${prefix}slot to play\n\n*2:* You must have 🪙100 in your wallet\n\n*3:* If you don't have money in wallet then withdraw from your bank\n\n*4:* If you don't have money in your bank too then use economy features to gain money`
            );
          if (text == "money")
            return m.reply(
              `*1:* Small Win --> +🪙20\n\n*2:* Small Lose --> -🪙20\n\n*3:* Big Win --> +🪙100\n\n*4:* Big Lose --> -🪙50\n\n*5:* 🎉 JackPot --> +🪙1000`
            );
          const fruit1 = ["🥥", "🍎", "🍇"];
          const fruit2 = ["🍎", "🍇", "🥥"];
          const fruit3 = ["🍇", "🥥", "🍎"];
          const fruit4 = ["🍇", "🥥", "🍎"];
          const lose = [
            "*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_",
            "*Totally out of line*\n\n_--> 🥥-🍎-🍍_",
            "*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_",
          ];
          const smallLose = [
            "*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_",
            "*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_",
            "*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_",
          ];
          const won = [
            "*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_",
            "*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_",
            "*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_",
          ];
          const near = [
            "*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_",
            "*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_",
          ];
          const jack = [
            "*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_",
            "*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_",
            "*🎊 You Just hit a jackpot worth 🪙1000*",
          ];
          k = 100;
          balance1 = await eco.balance(user, cara);
          if (k > balance1.wallet)
            return m.reply(
              `You are going to be spinning on your wallet, you need at least 🪙100`
            );
          const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
          const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
          const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
          const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
          const mess1 = lose[Math.floor(Math.random() * lose.length)];
          const mess2 = won[Math.floor(Math.random() * won.length)];
          const mess3 = near[Math.floor(Math.random() * near.length)];
          const mess4 = jack[Math.floor(Math.random() * jack.length)];
          const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];

          if (f1 !== f2 && f2 !== f3) {
            await eco.deduct(user, cara, 50);
            m.reply(`${mess1}\n\n*Big Lose -->* _🪙50_`);
          } else if (f1 == f2 && f2 == f3) {
            await eco.give(user, cara, 100);
            m.reply(`${mess2}\n*_Big Win -->* _🪙100_`);
          } else if (f1 == f2 && f2 !== f3) {
            await eco.give(user, cara, 20);
            m.reply(`${mess3}\n*Small Win -->* _🪙20_`);
          } else if (f1 !== f2 && f1 == f3) {
            await eco.deduct(user, cara, 20);
            m.reply(`${mess5}\n\n*Small Lose -->* _🪙20_`);
          } else if (f1 !== f2 && f2 == f3) {
            await eco.give(user, cara, 20);
            m.reply(`${mess3}\n\n*Small Win -->* _🪙20_`);
          } else if (f1 == f2 && f2 == f3 && f3 == f4) {
            await eco.give(user, cara, 1000);
            m.reply(`${mess4}\n\n_🎊 JackPot --> _🪙1000_`);
          } else {
            m.reply(`Do you understand what you are doing?`);
          }
        } else {
          m.reply(
            `*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`
          );
        }

        break;

      case "transfer":
        await doReact("💴");
        if (value[0] === "") return m.reply(`Use ${prefix}transfer 100 @user`);
        if (!text && !m.quoted) {
          return Atlas.sendMessage(
            m.from,
            { text: `Please tag any user ${pushName} senpai 🤦‍♂️ !` },
            { quoted: m }
          );
        } else if (m.quoted) {
          var mentionedUser = m.quoted.sender;
        } else {
          var mentionedUser = mentionByTag[0];
        }
        user = (await mentionedUser) || m.msg.contextInfo.participant;
        user1 = m.sender;
        user2 = user;
        const word = value[0];
        const code = value[1];
        d = parseInt(word);
        if (!d)
          return m.reply(
            "check your text plz u r using the command in a wrong way👀"
          );
        balance = await eco.balance(user1, cara);
        a = balance.wallet < parseInt(word);
        if (a == true)
          return m.reply("you dont have sufficient money to transfer👎");

        await eco.deduct(user1, cara, value[0]);
        await eco.give(user2, cara, value[0]);

        await Atlas.sendMessage(
          m.from,
          {
            image: debitCard,
            caption: `*📠 Transaction successful of ${word} 💷*`,
          },
          { quoted: m }
        );

        break;

      case "wallet":
        await doReact("💲");
        user = m.sender;
        balance = await eco.balance(user, cara);
        await Atlas.sendMessage(
          m.from,
          {
            image: debitCard,
            caption: `\n💳 *${m.pushName}'s Wallet:*\n\n_💴 ${balance.wallet}_`,
          },
          { quoted: m }
        );
        break;

      case "withdraw":
        await doReact("💳");
        if (!text) {
          return m.reply(`*Provide the amount you want to withdraw!*`);
        }
        user = m.sender;
        query = text.trim();
        withdraw = await eco.withdraw(user, cara, query);
        if (withdraw.noten) return m.reply("*🏧 Insufficient fund in bank*");
        await eco.give(user, cara, query);
        Atlas.sendMessage(
          m.from,
          {
            image: debitCard,
            caption: `*🏧 ALERT*  _💶 ${withdraw.amount} has been added in your wallet._*`,
          },
          { quoted: m }
        );
        break;
      default:
        break;
    }
  ) => {
    switch (inputCMD) {
      case "s":
      case "sticker":
        if (/image/.test(mime)) {
          await doReact("🔖");
          let mediaMess = await quoted.download();
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer }, { quoted: m });
        } else if (/video/.test(mime)) {
          await doReact("🔖");
          let mediaMess = await quoted.download();
          if ((quoted.msg || quoted).seconds > 15) {
            await doReact("❌");
            return Atlas.sendMessage(
              m.from,
              { text: "Please send video less than 15 seconds." },
              { quoted: m }
            );
          }
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer2 }, { quoted: m });
        } else {
          await doReact("❌");
          m.reply(
            `Please mention an *image/video* and type *${prefix}s* to create sticker.`
          );
        }
        break;

      case "steal":
      case "take":
        if (!m.quoted) {
          await doReact("❔");
          return m.reply(`Please meantion a sticker to steal it.`);
        }
        await doReact("🀄️");
        if (!args.join(" ")) {
          var packName = pushName;
          var authorName = pushName;
        } else if (args.join(" ").includes(",")) {
          var packName = args.join(" ").split(",")[0];
          var authorName = args.join(" ").split(",")[1];
        } else {
          var packName = args.join(" ");
          var authorName = args.join(" ");
        }
        if (/webp/.test(mime)) {
          let mediaMess = await quoted.download();
          let stickerMess = new Sticker(mediaMess, {
            pack: packName,
            author: authorName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer }, { quoted: m });
        } else {
          await doReact("❌");
          m.reply(
            `Please mention a *Sticker* and type *${prefix}steal <packname , authorname>* to create sticker with your name.`
          );
        }

        break;

      case "scrop":
      case "stickercrop":
        if (/image/.test(mime)) {
          await doReact("🃏");
          let mediaMess = await quoted.download();
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer }, { quoted: m });
        } else if (/video/.test(mime)) {
          await doReact("🃏");
          let mediaMess = await quoted.download();
          if ((quoted.msg || quoted).seconds > 15) {
            await doReact("❌");
            return m.reply("Please send video less than 15 seconds.");
          }
          let stickerMess = new Sticker(mediaMess, {
            pack: packname,
            author: pushName,
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          Atlas.sendMessage(m.from, { sticker: stickerBuffer2 }, { quoted: m });
        } else {
          await doReact("❌");
          m.reply(
            `Please mention an *imade/video* and type *${prefix}s* to create cropped sticker.`
          );
        }
        break;

      case "smeme":
      case "stickermeme":
        if (/image/.test(mime)) {
          if (!text) {
            await doReact("❔");
            return m.reply(
              `Please type *${prefix}smeme <text>* to create sticker meme.`
            );
          }
          await doReact("📮");
          media = await Atlas.downloadAndSaveMediaMessage(quoted);
          mem = await TelegraPh(media);
          meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`;

          let stickerMess = new Sticker(meme, {
            pack: packname,
            author: pushName,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });

          const stickerBuffer2 = await stickerMess.toBuffer();
          await Atlas.sendMessage(
            m.from,
            { sticker: stickerBuffer2 },
            { quoted: m }
          );
          fs.unlinkSync(media);
        } else {
          await doReact("❌");
          m.reply(
            `Please mention an *image* and type *${prefix}smeme* to create sticker meme.`
          );
        }
        break;

      case "q":
      case "quote":
        if (!text && !m.quoted) {
          await doReact("❔");
          return m.reply(
            `Please provide a text (Type or mention a message) !\n\nExample: ${prefix}q Atlas MD is OP`
          );
        }

        if (m.quoted) {
          try {
            userPfp = await Atlas.profilePictureUrl(m.quoted.sender, "image");
          } catch (e) {
            userPfp = botImage3;
          }
        } else {
          try {
            userPfp = await Atlas.profilePictureUrl(m.sender, "image");
          } catch (e) {
            userPfp = botImage3;
          }
        }
        await doReact("📮");
        var waUserName = pushName;

        const quoteText = m.quoted ? m.quoted.msg : args ? args.join(" ") : "";

        var quoteJson = {
          type: "quote",
          format: "png",
          backgroundColor: "#FFFFFF",
          width: 700,
          height: 580,
          scale: 2,
          messages: [
            {
              entities: [],
              avatar: true,
              from: {
                id: 1,
                name: waUserName,
                photo: {
                  url: userPfp,
                },
              },
              text: quoteText,
              replyMessage: {},
            },
          ],
        };

        const quoteResponse = await axios.post(
          "https://bot.lyo.su/quote/generate",
          quoteJson,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        fs.writeFileSync(
          "quote.png",
          quoteResponse.data.result.image,
          "base64"
        );

        let stickerMess = new Sticker("quote.png", {
          pack: packname,
          author: pushName,
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });

        const stickerBuffer2 = await stickerMess.toBuffer();
        await Atlas.sendMessage(
          m.from,
          { sticker: stickerBuffer2 },
          { quoted: m }
        )
          .then((result) => {
            fs.unlinkSync("quote.png");
          })
          .catch((err) => {
            m.reply("An error occurd!");
          });

        break;

      case "emojimix":
        if (!args[0]) {
          await doReact("❔");
          return m.reply(
            `Please provide two emojis to combine! *Example :* ${
              prefix + "emojimix"
            } 🦉+🤣`
          );
        }
        await doReact("🔖");
        let [emoji1, emoji2] = args[0].split("+");
        let jsonData = await fetch(
          `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
            emoji1
          )}_${encodeURIComponent(emoji2)}`
        ).then((res) => res.json());

        let imgUrl = jsonData.results[0].url;
        //console.log(imgUrl);

        let stcBuff = await getBuffer(imgUrl);
        fs.writeFileSync("emoji.png", stcBuff);

        let stickerMess2 = new Sticker("emoji.png", {
          pack: packname,
          author: pushName,
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });

        const stickerBuffer = await stickerMess2.toBuffer();
        await Atlas.sendMessage(
          m.from,
          { sticker: stickerBuffer },
          { quoted: m }
        );
        await fs.unlinkSync("emoji.png");

        break;
      default:
        break;
    }
  },
};
