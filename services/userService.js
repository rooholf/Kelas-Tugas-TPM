import { successResponse, errorResponse } from "../utils/response.js";
import { nanoid } from "nanoid";
import dbPool from '../utils/dbUtils.js'


const users = [];

export const addUser = (req, res, next) => {
    let error= false
    let id = nanoid(6);
    let name = req.body.name;
    let email= req.body.email;
    let password = req.body.password;
    let created_at = new Date();
    
    const sql = "INSERT INTO users (id, name, email, password, created_at) VALUE(?, ?, ?, ?, ?)";
    const value = [id, name, email, password, created_at];
   
    const result = async ()=> {
     await dbPool.query(sql, value).catch((err) => {
        error = true
        return "error :  "+err
     })
    }
    result()
    if (error){
      errorResponse(res, "gagal menambahkan user", result)
    } else {
       successResponse(res, "berhasil menambahkan user", value)
    }
    
}

const getData = () => {
    const sql = "SELECT * FROM users";
    return dbPool.query(sql)
}



export const getUser = async (req, res, next) => {
    const [result] = await getData()
    
    successResponse(res, "success", result)
}

export const updateUser = (req, res, next) => {
   let error = false
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
   const value = [name, email, password, id,]
    
 const result = async ()=> {
     await dbPool.execute('UPDATE `users` SET `name` = ?, `email` =?, `password` = ? WHERE `id` = ?', value)
     }
     
    result()
    if (error){
     errorResponse(res, "gagal update user", result)
    } else {
       successResponse(res, "berhasil update user", value)
    }
    
}

export const deleteUser = (req, res, next) => {
    let id = req.params.id;
    let error = false
    
    const result = async() => await dbPool.execute('DELETE FROM `users` WHERE `id` = ?',[iddd])
    result()
    
    if (error){
     errorResponse(res, "gagal update user", result)
    } else {
       successResponse(res, "berhasil delete user", id)
    }
    
}