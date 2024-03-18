require("dotenv").config();
      function WeekNumber()
      {
        // calculating the week number to instantly get the next ep info after it's aired.
        const currentdate = new Date();
        let oneJan = new Date(currentdate.getFullYear(),0,1);
        let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
        let result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);

        return result;
      } 

      function TimeLeft(obj)
      {
        const now = new Date().getTime();
        const futureDate = new Date(obj).getTime();

        const timeleft = futureDate - now;

        const days    = Math.floor( timeleft / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

        return `${days} days ${hours} hours ${minutes} minutes`;
      }

      async function getAnimeDate(name) 
      {
        try
        {
        const response = await fetch(`https://animeschedule.net/api/v3/timetables/sub?year=${new Date().getFullYear()}&week=${WeekNumber()}`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.ANIME_API_KEY}`,
              }
        });
        const result = await response.json();
        const myObj = result.find(obj =>{
          if(obj.title ===name && obj.status === 'Ongoing')
            return obj;
        })
  
        const timeLeft =TimeLeft(myObj.episodeDate); 

        return [myObj,timeLeft];
      }
      catch(err){
        console.log('The anime is ended');
      }
      }

   module.exports = {getAnimeDate};
