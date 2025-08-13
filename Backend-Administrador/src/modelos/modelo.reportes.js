const pool = require('../db');

async function listarReportes({ zona, estado }) {
  let query = 'SELECT * FROM reportes_peligros WHERE 1=1';
  const params = [];

  if (zona) {
    query += ' AND zona = $1';
    params.push(zona);
  }

  if (estado) {
    query += params.length ? ' AND estado_reporte = $2' : ' AND estado_reporte = $1';
    params.push(estado);
  }

  const result = await pool.query(query, params);
  return result.rows;
}

async function obtenerReportePorId(id) {
  const result = await pool.query('SELECT * FROM reportes_peligros WHERE id_reporte = $1', [id]);
  return result.rows[0];
}

async function actualizarReporte(id, campos, realizadoPor) {
  const { descripcion, zona, estado_reporte } = campos;
  const actual = await obtenerReportePorId(id);

  const updates = [];
  const values = [];
  let index = 1;

  if (descripcion && descripcion !== actual.descripcion) {
    updates.push(`descripcion = $${index}`);
    values.push(descripcion);
    await registrarCambio(id, 'descripcion', actual.descripcion, descripcion, realizadoPor);
    index++;
  }

  if (zona && zona !== actual.zona) {
    updates.push(`zona = $${index}`);
    values.push(zona);
    await registrarCambio(id, 'zona', actual.zona, zona, realizadoPor);
    index++;
  }

  if (estado_reporte && estado_reporte !== actual.estado_reporte) {
    updates.push(`estado_reporte = $${index}`);
    values.push(estado_reporte);
    await registrarCambio(id, 'estado_reporte', actual.estado_reporte, estado_reporte, realizadoPor);
    index++;
  }

  if (updates.length === 0) return;

  values.push(id);
  const query = `UPDATE reportes_peligros SET ${updates.join(', ')} WHERE id_reporte = $${index}`;
  await pool.query(query, values);
}

async function registrarCambio(id_reporte, campo, anterior, nuevo, realizadoPor) {
  await pool.query(`
    INSERT INTO log_cambios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, realizado_por)
    VALUES ($1, $2, $3, $4, $5)
  `, [id_reporte, campo, anterior, nuevo, realizadoPor]);
}

module.exports = {
  listarReportes,
  obtenerReportePorId,
  actualizarReporte
};