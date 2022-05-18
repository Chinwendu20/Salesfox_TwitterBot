import dfd from 'danfojs-node'



(async ()=>{

	try{

	var result = await dfd.read_v('C:\\Users\\USER\\dev_environment\\twitterbot_src\\data_folder\\men.csv')

	console.log(result)

}catch(error){

	console.log(error)

}})()
