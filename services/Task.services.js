const puppeteer = require('puppeteer');
const Task = require('../models/Task.model');

module.exports.getAllTheUserNameService = async () => {

    let userInfos = []

    const users = await Task.find({"is_validated": false, subscribers: { $gte: 100 }})

   users.forEach(user => {
         userInfos.push({
            username: user?.ig_url.split('/')[3],
            id: user?._id
         })
   })

   const emailRegex = /[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
   const linkRegex = /"sameAs":"(.*?)"/;

   function findEmail(obj) {
      for (const key in obj) {
          if (typeof obj[key] === 'object') {
              const result = findEmail(obj[key]);
              if (result) {
                  return result;
              }
          } else if (typeof obj[key] === 'string') {
              const emailMatch = emailRegex.exec(obj[key]);
              if (emailMatch) {
                  return emailMatch[0];
              }
          }
      }
      return null;
  }
  
  function findLink(bioContent) {
      const match = linkRegex.exec(bioContent);
      const link = match ? match[1] : '';
      if (link) {
          return link.replace(/\\\//g, '/');
      }
      return null;
  }

  (async () => {
      const browser = await puppeteer.launch({
          headless: 'new',
      });
  
      try {
          for await (const userObj of userInfos) {
              try {
                  const insta = await browser.newPage();
                  await insta.goto(`https://instagram.com/${userObj?.username}`, { waitUntil: 'networkidle0' });
  
                  const bioContent = await insta.evaluate(() => {
                      const scriptTag = document.querySelector('script[type="application/ld+json"]');
                      const jsonContent = scriptTag.textContent;
                      return jsonContent;
                  });
  
                  const data = JSON.parse(bioContent);
  
                  await insta.close();
  
                  const context = data['@context'];
                  const type = data['@type'];
                  const { description } = data;
                  const authorType = data.author['@type'];
                  const authorIdentifierType = data.author.identifier['@type'];
                  const authorIdentifierPropertyID = data.author.identifier.propertyID;
                  const authorIdentifierValue = data.author.identifier.value;
                  const authorImage = data.author.image;
                  const authorName = data.author.name;
                  const authorAlternateName = data.author.alternateName;
                  const authorSameAs = data.author.sameAs;
                  const authorUrl = data.author.url;
                  const mainEntityType = data.mainEntityOfPage['@type'];
                  const mainEntityId = data.mainEntityOfPage['@id'];
                  const identifierType = data.identifier['@type'];
                  const identifierPropertyID = data.identifier.propertyID;
                  const identifierValue = data.identifier.value;
                  const interactionStatisticType1 = data.interactionStatistic[0]['@type'];
                  const interactionStatisticInteractionType1 =
                      data.interactionStatistic[0].interactionType;
                  const interactionStatisticUserInteractionCount1 =
                      data.interactionStatistic[0].userInteractionCount;
                  const interactionStatisticType2 = data.interactionStatistic[1]['@type'];
                  const interactionStatisticInteractionType2 =
                      data.interactionStatistic[1].interactionType;
                  const interactionStatisticUserInteractionCount2 =
                      data.interactionStatistic[1].userInteractionCount;
  
                  const link = findLink(bioContent);
                  const email = findEmail(data);
  
                  const result = {
                      context,
                      type,
                      description,
                      authorType,
                      authorIdentifierType,
                      authorIdentifierPropertyID,
                      authorIdentifierValue,
                      authorImage,
                      authorName,
                      authorAlternateName,
                      authorSameAs,
                      authorUrl,
                      mainEntityType,
                      mainEntityId,
                      identifierType,
                      identifierPropertyID,
                      identifierValue,
                      interactionStatisticType1,
                      interactionStatisticInteractionType1,
                      interactionStatisticUserInteractionCount1,
                      interactionStatisticType2,
                      interactionStatisticInteractionType2,
                      interactionStatisticUserInteractionCount2,
                      link,
                      email,
                      mongo_id: userObj?.id,
                  };
  
                  if (result?.email || result?.authorUrl) {

                          const updateValidUser = await Task.findByIdAndUpdate(userObj?.id, {
                              is_validated: true,
                              is_valid: true,
                              follower_count: result?.interactionStatisticUserInteractionCount2,
                              validated_ig_url: result?.authorUrl,
                              ig_bio: result?.description
                          }, {
                              new: true,
                              });
                      console.log(`User ${userObj?.id}'s username is valid and updated as is_valid: true`.green.bold);
                  } 
              } catch (error) {
                  const updateInvalidUser = await Task.findByIdAndUpdate(userObj?.id, {
                          is_validated: true,
                          is_valid: false,
                    }, {
                              new: true,
                    });
                    console.log(`User ${userObj?.id}'s username is invalid and updated as is_valid: false`.red.bold);
              }
          }
      } catch (error) {
          console.error('Error:', error);
      } finally {
        const totalUpdated = await Task.find({is_validated: true}).countDocuments()
        const totalValid = await Task.find({is_valid: true}).countDocuments()

        console.log(`----- end of the process, total validated: ${totalUpdated} and ${totalValid} data remains valid in the database  ------`.rainbow.bold);
          await browser.close();
      }
  })();
  
  


   return 'done'
}