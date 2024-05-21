
//GET QUERIES

export const GET_TASK_QUERY = `SELECT * FROM tasks WHERE created_by = ?`;

//POST QUERIES
export const REGISTER_USER_QUERY =`INSERT INTO users (name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
export const LOGIN_QUERY = `SELECT * FROM users WHERE username = ?`;
export const CREATE_TASK_QUERY = `INSERT INTO tasks (name, description, created_by, assigned_to, status) VALUES (?, ?, ?, ?, ?)`;

//DELETE QUERIES
export const DELETE_TASK_QUERY = `DELETE FROM tasks WHERE id = ?`;

//UPDATE QUERIES
export const UPDATE_STATUS_TASK_QUERY = `UPDATE tasks SET status = ? WHERE id = ?`;