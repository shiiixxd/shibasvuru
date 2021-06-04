const { MessageEmbed } = require('discord.js');
const shi = require("../settings.json");
module.exports.execute = async (client, message, args) => {

    let shiembed = new MessageEmbed().setTitle(message.member.displayName, message.author.displayAvatarURL).setColor("#BLACK").setTimestamp().setFooter(`Unutma bu yazdıkların log kanalına düşüyor eğer troll için geldiysen denemebile. Aksi takdirde cezalandıralacaksın.`);
    let shiembedx = new MessageEmbed().setTitle(message.member.displayName, message.author.displayAvatarURL).setColor("#BLACK").setTimestamp()
    if (!message.member.roles.cache.has("826847945504063508")) return message.channel.send(embed.setDescription("Yetkili olmak için tagı almak zorundasınız.")).then(x => x.delete({timeout: 10000})); ////// family rol ıd
    let yt = message.guild.roles.cache.get(`826847906895495171`)/////// başvuru kabul edecek kişi
    let member =  message.member;
    const reactionFilter = (reaction) => {
        return ['✅'].includes(reaction.emoji.name) && yt.id;
      }
    let kanal = [shi.başvuru];
    if (!kanal.includes(message.channel.id)) return message.reply(`Komutu sadece ${shi.başvuru} bu kanalda kullanabilirsin.`).then(x => x.delete({timeout: 10000}));
try {
    message.author.send(`${message.author}`, {embed: shiembed.setDescription(`Merhaba yetkili olmak için ilk önce ismini ve yaşını örenebilirmiyim ?`)}).then(async m => {
        message.react("✅");
        let awaitMessage = await m.channel.awaitMessages(x => x.author.id == message.author.id, { max: 1, time: 60000 });
        if (!awaitMessage.size) return message.channel.send(`${member} Zamanında cevap vermediğin için başvuruyu iptal ettim.`).then(m.delete());
        let shixd = awaitMessage.first();
        m.channel.send(`${message}`, {embed: shiembed.setDescription(`Sunucuya ne gibi katkılarda bulunabilirsin (/invite/chat/ses/kayıt/)`)}).then(async z => {
            m.delete();
            let awaitMessage1 = await z.channel.awaitMessages(x => x.author.id == message.author.id, { max: 1, time: 60000 });
            if (!awaitMessage1.size) return message.channel.send(`${member} Zamanında cevap vermediğin için başvuruyu iptal ettim.`).then(z.delete());
            let shi1 = awaitMessage1.first();
            z.channel.send(`${message.author}`, {embed: shiembed.setDescription(`Günde kaç saat aktif olabilirsin ?(chat/ses) `)}).then(async b => {
                z.delete();
                let awaitMessage2 = await b.channel.awaitMessages(x => x.author.id == message.author.id, { max: 1, time: 60000 });
                if (!awaitMessage2.size) return message.channel.send(`${member} Zamanında cevap vermediğin için başvuruyu iptal ettim.`).then(b.delete());
                let shi2 = awaitMessage2.first();
                b.channel.send(`${message.author}`, {embed: shiembed.setDescription(`Sorula bitmiştir yetkililerin onaylamasını beklemen gerek. İyi günler`)})
                b.delete();
                let kanal = message.guild.channels.cache.get(shi.log);
                kanal.send(`<@&826847906895495171> `, {embed: shiembed.setDescription(`\`•\` Başvuran : ${message.author} - (\`${message.author.id}\`)\n \`•\` Başvuru Zamanı: (\`${new Date().toTurkishFormatDate()}\`)\n **___Kullanıcının sorulara verdiği cevaplar :___ **\n\`•\` İsmi ve Yaşı : \`${shixd.content}\`\n \`•\` Sunucumuza ne tür katkılarınız olabilir?: \`${shi1.content}\`\n \`•\` Günde kaç saat aktif : \`${shi2.content}\``)}).then(async msj => {
                    await msj.react("✅")
                    msj.awaitReactions(reactionFilter, {max: 1}).then(q => {
                        let cevap = q.first();
                        if (cevap) {
                            member.roles.add(shi.rol).catch();
                            member.send(`${member}`, {embed: shiembedx.setDescription(`Başvurun onaylanmıştır yetkilerin verildi.`)})
                        } 
                    })
                })
            });
        })
    });
} catch (err) {
    console.error(err);
    message.react("❌");
};

};

module.exports.configuration = {
    name: "basvuru",
    aliases: ["başvur"],
    usage: "",
    description: ""
};
