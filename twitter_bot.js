import unirest from 'unirest'
import dotenv from 'dotenv'
import uuid from 'uuid'
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
var uuidv4 = uuid.v4
dotenv.config()

var domain = process.env.domain

var collection;

var arr_of_keywords = ['accessories', 'bags',
'beauty',
'house',
'jewelry',
'kids',
'men',
'shoes',
'women']

var link = `${domain}`

var unique_id = uuidv4().slice(0,8)

const uri = `mongodb+srv://salesfox:${process.env.mongodb_password}@cluster0.ucvcq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function obtain_data_from_twitter(){
try {

var response = await unirest
  .get('https://api.twitter.com/2/users/1522578633365282816/mentions')
  .headers({Authorization:`Bearer ${process.env.bearer}`})



return response.body
}catch(error){

  return error
}  

}


async function filter_out_data(data){

try{

  var reverse_data =data['data'].reverse()

  var test = await collection.find({}).toArray()

  var latest_id = test[test.length-1].id


  for (var i=reverse_data.length-1;i>=0;i--){

      if(reverse_data[i].id==latest_id){

        var result=reverse_data.slice(i+1)
      }
    }

if (result==undefined){

  var result=data['data']
}

return result
}catch(error){

  return error
}

}


async function reply_tweet(link, id){


var req = await unirest('POST', 'https://api.twitter.com/2/tweets')
  .headers({
    'Authorization': 'OAuth oauth_consumer_key="5TGsIaUOi5YJVYtGKttu7J7ub",oauth_token="1522578633365282816-4HQZRybjB1S6fyOsDmXmpmnUUs7b3F",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1653134134",oauth_nonce="v59KG6TfuXd",oauth_version="1.0",oauth_signature="eabxL%2BmYyxzBgXYr7pCNBi8dChs%3D"',
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


for(var i=0;i<arr.length;i++){

  for (var y=0;y<arr_of_keywords.length;y++){

    if(arr[i].text.search(arr_of_keywords[y]) != -1){

      matching_tweets_with_reply(arr_of_keywords[y], arr[i].id)
    }
  }

}

}




async function main() {


await client.connect()
collection = client.db("test").collection("devices")

var data_from_twitter = await obtain_data_from_twitter()

var data_not_in_DB = await filter_out_data(data_from_twitter)


if (data_not_in_DB.length == 0){

  return 'No new data'

}


await collection.insertMany(data_not_in_DB)

analyze_tweet_message(data_not_in_DB)

return 'All done'

}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());























