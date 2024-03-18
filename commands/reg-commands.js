const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require("dotenv").config();

//list of bot commands
const commands = [
   
	{
        name: "getanimedate",
        description: "Getting the anime's EP time",
		options: [
			{
				name: "anime",
				description: "The anime's next episode",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
		] 
    },
	
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands });

		console.log(`Successfully reloaded application (/) commands.`);
	    } 
    catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();