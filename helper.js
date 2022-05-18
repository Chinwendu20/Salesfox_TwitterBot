import dfd from 'danfojs-node'
import Joi from 'joi'




export async function helper (req, res, path){

	try{

		var data = await dfd.readCSV(path)

		var select_data = data.loc({columns: ["url", "image_url", "subcategory", "raw_price"]})

		res.status(200).json(dfd.toJSON(select_data))

		res.end()

	}catch(error){

		console.log(error)
	}



}

export function validateObjModel(ObjModel)
{
    const JoiSchema = Joi.object({
    
        tag:Joi.string()
            .required(),
        url: Joi.string()
        .required()}).options({ abortEarly: false });

    return JoiSchema.validate(ObjModel)
}