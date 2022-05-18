var unirest = require('unirest')
var dotenv = require('dotenv')
var uuidv4 = require('uuid').v4
dotenv.config()






var domain = process.env.domain

var link = `${domain}/in/`

var unique_id = uuidv4().slice(0,8)


async function obtain_data_from_twitter(){



try {

var response = await unirest
  .get('https://api.twitter.com/2/users/1522578633365282816/mentions')
  .headers({Authorization:'Bearer AAAAAAAAAAAAAAAAAAAAACK%2BcQEAAAAA67uWLUM%2BO51yjHhk%2FdNcFKUbLCc%3DSbm3m8SrmQoCkRM7p8APtG8A6JdfntBVH9HdfAoMx7Ubw39iSb'})
  console.log('obtain_data_from_twitter')
   return response.body
}catch(error){

	return error
}	 

	  }



function obtain_message_from_twitter_data(raw_data){

var mention_objects = raw_data['data']

console.log('obtain_message_from_twitter_data')

return mention_objects

	}




  async function reply_tweet(link, id){




var req = unirest('POST', 'https://api.twitter.com/2/tweets')
  .headers({
    'Authorization': 'OAuth oauth_consumer_key="10X8ffBoZEe99t3eEBoYfnFaJ",oauth_token="1522578633365282816-CzmbyZ5snIy6PIeXWDIRsKbZJOyyuZ",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1652429498",oauth_nonce="2P7CpidO2bL",oauth_version="1.0",oauth_signature="Wh1hcMuRgStQuVcm3L8A2eYtzQA%3D"',
   'Content-Type': 'application/json',
    'Cookie': 'guest_id=v1%3A165226499107585946; guest_id_ads=v1%3A165226499107585946; guest_id_marketing=v1%3A165226499107585946; personalization_id="v1_nP77W+yc1x1PvkjDSdgp7A=="'

  })
  .send(JSON.stringify({
    "text": `Here is a link to products curated for you ${link}  -${unique_id}`,
    "reply": {
      "in_reply_to_tweet_id": `${id}`
    }
  }))
  .end(function (res) { 
    console.log(res.raw_body);
  });


}



function matching_tweets_with_reply(keyword, id){

  console.log('Switchingggg')
  console.log(keyword)

switch (keyword) {
  case 'accesssories':
    reply_tweet(link+'accesssories', id)
    break;
  case 'bags':
    reply_tweet(link+'bags', id)
    break;
  case 'beauty':
    reply_tweet(link+'beauty', id)
    break;
  case 'house':
    reply_tweet(link+'house', id)
    break;
  case 'jewelry':
    reply_tweet(link+'jewelry', id)
    break;
  case 'kids':
    reply_tweet(link+'kids', id)
    break;
  case 'men':
    console.log('sending message')
    reply_tweet(link+'men', id)
    break;
   case 'shoes':
    reply_tweet(link+'shoes', id)
    break;
  case 'women':
    reply_tweet(link+'women', id)
    break;
}


}



function analyze_tweet_message(arr){

var arr_of_keywords = ['accessories', 'bags',
'beauty',
'house',
'jewelry',
'kids',
'men',
'shoes',
'women']
// console.log('ARRR')
// console.log(arr)
for(i=0;i<arr.length;i++){

	for (y=0;y<arr_of_keywords.length;y++){

		if(arr[i].text.search(arr_of_keywords[y]) != -1){

      console.log(arr_of_keywords[y])

			matching_tweets_with_reply(arr_of_keywords[y], arr[i].id)
		}
	}

}

}











async function main(){

  try{

  mentions = await obtain_data_from_twitter()

  restructured_data = obtain_message_from_twitter_data(mentions)

  analyze_tweet_message(restructured_data)

}catch(error){

  console.log(error)
}


}

main()