import mongoose from "mongoose"

export const getData = (model: any, params: any = {}) => {
    //console.log('getData model: ', model)
    //console.log('getData params: ', params)
    return new Promise((resolve, reject) => {
        if(Object.keys(params).length) {
            model.find( params.input, (err, data) => {
                if(err) { 
                    reject(err);
                }
                else {
                    console.log('data: ', data)
                    resolve(data)
                }
            })
        } 
        
    })
}

export const updateData = (model: any, input: any, id: string, property: string = "") => {
    console.log('updateData model: ', model)
    console.log('updateData id: ', {id})
    console.log('property: ', property)
    console.log('updateData data before update: ', JSON.stringify(input, null, "\t"))
    //let data = update

    //see  if its bc the first scene has no number or version 
    return new Promise((resolve, reject) => {
       // console.log('propertyAndData: ', JSON.stringify(propertyAndData, null, "\t"))
       console.log('input: ', input)
        let dataObj = {}
        dataObj[property] = input.project
        console.log('dataObj: ', JSON.stringify(dataObj, null, 2))
        model.findOneAndUpdate({id}, input.project, {returnOriginal: false}, (err, data) => {
            if(err) { 
                console.log('updateData error: ',  err)
                reject(err) 
            }
            else { 
                console.log('updateData data: ', data)
                resolve(data) 
            }
        })
        
       
    })
}

export const insertData = (data: any) => {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

export const deleteData = (model: any, id: any) => {
    return new Promise( async (resolve, reject) => {
        try {
            await model.deleteOne({id})
            resolve(`deleted id: ${id}`)
        } catch (err) {
            console.log(`error delting ${id}: `, err)
            reject(err)
        }
    })
}