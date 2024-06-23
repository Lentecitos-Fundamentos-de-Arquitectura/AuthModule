const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername, getUsers, UpdateUser, DeleteUser } = require('../models/userModel');

require('dotenv').config();

const registerUser = async(req, res) =>{
    const { nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad } = req.body;

    try{
        const user = await createUser({ nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad })
        res.status(201).json(user);      
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const loginUser = async (req, res) =>{
    const { usuario, contrasena } = req.body; 
    try{
        const user = await findUserByUsername(usuario);

        if(!user){
            return res.status(401).json({error: 'Credencias Invalidas'});
        }

        const match = await bcrypt.compare(contrasena, user.contrasena);

        if(!match){
            return res.status(401).json({error: 'Credencias Invalidas'});
        }

        const token = jwt.sign({id: user.id, username: user.usuario}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({user, token});        
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getAllUsers = async (req, res) =>{
    try{
        const users = await getUsers();
        res.json(users);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const updateUser = async (req, res) =>{
    const { id } = req.params;
    const { nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad } = req.body;

    try{
        const user = await UpdateUser(id, { nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad });
        res.json(user);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }

}

const deleteUser = async (req, res) =>{
    const { id } = req.params;
    try{
        await DeleteUser(id);
        res.json({message: 'Usuario eliminado correctamente'});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }

}

module.exports = {registerUser, loginUser, getAllUsers, updateUser, deleteUser}