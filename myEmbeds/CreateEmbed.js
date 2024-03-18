const {AttachmentBuilder, EmbedBuilder} = require('discord.js');

 function createEmbed(titel, fieldValue,fieldValue2,ep,imgURL){
    return new EmbedBuilder()
    .setTitle(titel)
    .setColor('Random')
    .setTimestamp()
    .addFields(
        {
            name: `EP ${ep} release at:`, 
            value: fieldValue,
            inline: true,
        },
        {
            name: 'Time left for EP.', 
            value: fieldValue2,
        },
        
    )
    .setImage(imgURL)
    .setThumbnail(imgURL);
    
}

function NotifyEmbed(titel,ep,imgURL){
    return new EmbedBuilder()
    .setTitle(titel)
    .setDescription(` __**EP ${ep}**__ is out`)
    .setColor('Random')
    .setTimestamp()
    .setImage(imgURL)
    .setThumbnail(imgURL);
    
}

function getImageFile(){
    return new AttachmentBuilder('assets/image.jpg');
}

module.exports = {createEmbed, getImageFile, NotifyEmbed};