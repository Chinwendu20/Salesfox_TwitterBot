import {helper, validateObjModel} from'./helper.js'





export const accessories_view = async (req, res, next) => {

var path = './data_folder/accessories.csv'

helper(req, res, path)

 
}


export const bags_view=async (req, res, next)=>{

    var path = './data_folder/bags.csv'

helper(req, res, path)

}

export const beauty_view=async (req, res, next)=>{

var path = './data_folder/beauty.csv'

helper(req, res, path)
}


export const house_view=async (req, res, next)=>{

    var path = './data_folder/house.csv'

helper(req, res, path)

}


export const jewelry_view=async (req, res, next)=>{

var path = './data_folder/jewelry.csv'

helper(req, res, path)
}


export const kids_view=async (req, res, next)=>{

    var path = './data_folder/kids.csv'

helper(req, res, path)

}


export const men_view=async (req, res, next)=>{

    var path = './data_folder/men.csv'

helper(req, res, path)

}


export const shoes_view=async (req, res, next)=>{

    var path = './data_folder/shoes.csv'

helper(req, res, path)

}




export const women_view=async (req, res, next)=>{

    var path = './data_folder/women.csv'

helper(req, res, path)

}



