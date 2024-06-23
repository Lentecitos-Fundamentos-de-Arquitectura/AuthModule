const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (user) => {

    const { nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad } = user;

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
      'INSERT INTO usuario (nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nombres, apellidos, correo, usuario, hashedPassword, direccion, fecha_nacimiento, telefono, codigo_seguridad]
    )

    return result.rows[0];

}

const findUserByUsername = async (usuario) => {
    const result = await pool.query('SELECT * FROM usuario WHERE usuario = $1', [usuario]);
    return result.rows[0];
}

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
}

const UpdateUser = async (id, user) => {
    const { nombres, apellidos, correo, usuario, contrasena, direccion, fecha_nacimiento, telefono, codigo_seguridad } = user;

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
      'UPDATE usuario SET nombres = $1, apellidos = $2, correo = $3, usuario = $4, contrasena = $5, direccion = $6, fecha_nacimiento = $7, telefono = $8, codigo_seguridad = $9 WHERE codigo = $10 RETURNING *',
      [nombres, apellidos, correo, usuario, hashedPassword, direccion, fecha_nacimiento, telefono, codigo_seguridad, id]
    )

    return result.rows[0];
}

const DeleteUser = async (id) => {
    const result = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = { createUser, findUserByUsername, getUsers, UpdateUser, DeleteUser}