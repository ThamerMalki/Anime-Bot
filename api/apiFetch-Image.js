const anilist = require('anilist-node');
const Anilist = new anilist();

 async function getID(name){
    // get anime ID by name
   return Anilist.searchEntry.anime(name).then(response => {
    return response.media[0].id
    })
}
  
async function getImg(animeID){
    return Anilist.media.anime(animeID).then(response =>{return response.coverImage.medium});
}

module.exports = {getID, getImg};

// NOTE:
// timestap => specific date => [airingAt]
// seconds => timeUntilAiring

