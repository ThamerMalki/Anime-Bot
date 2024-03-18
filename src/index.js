const { Client, GatewayIntentBits, Events } = require('discord.js')
const myEmbeds = require('../myEmbeds/CreateEmbed.js');
const apiFetchImage = require('../api/apiFetch-Image.js');
const apiFetchAnime = require('../api/apiFetch-Anime.js');
require("dotenv").config();


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

async function getImgURL(anime)
{
	const id = await apiFetchImage.getID(anime);
	const res = await apiFetchImage.getImg(id);
	return res;
}


async function getAnime(name)
{
	const [myAnime,timeLeft] = await apiFetchAnime.getAnimeDate(name);
	return [myAnime,timeLeft];
}

client.on("ready", (ready) => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate',(interaction)=>{
	if(!interaction.isChatInputCommand()) return;
	
		 if(interaction.commandName === 'getanimedate')
		 {
			const anime = interaction.options.get('anime').value;
			Promise.all([getAnime(anime),getImgURL(anime)]).then(res=>{
				interaction.reply({
					embeds:[myEmbeds.createEmbed(res[0][0].title, new Date(res[0][0].episodeDate).toDateString(), 
					res[0][1],res[0][0].episodeNumber,res[1])],
					ephemeral: true 
				})
			})
			.catch(err=>{
				interaction.reply('Make sure the name of anime is complete and correct or the anime is completed !!\nCheck: https://animeschedule.net/')
				console.log(err);
			})
		}
		
});


client.login(process.env.TOKEN);