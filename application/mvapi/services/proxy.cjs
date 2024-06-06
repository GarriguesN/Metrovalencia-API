const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');
const fetchTimeSchedulePromise = import('./fetchTimeSchedule.js');


const PORT = 3001;

// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Funciones
const extractScheduleDetails = (html) => {
  const $ = cheerio.load(html);
  const scheduleDetails = [];

  $('.container.trayecto.horarios-enlaces .estacion').each((index, element) => {
      const icon = $(element).find('.linea img').attr('src');
      const stationName = $(element).find('.nombre-estacion').first().text().trim();
      const time = $(element).find('.minutos').text().trim();

      scheduleDetails.push({ icon, stationName, time });
  });

  return scheduleDetails;
};

// Middleware de análisis de cuerpo para JSON
app.use(express.json());

// Ruta para manejar las solicitudes POST
app.post('/', async (req, res) => {
    const { url, options } = req.body;
    try {
        const response = await axios(url, options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/getSchedule', async (req, res) => {
  const { id } = req.body;
  try {
      // Espera a que se resuelva la promesa de importación
      const { default: fetchTimeSchedule } = await fetchTimeSchedulePromise;
      // Llama a la función fetchTimeSchedule con el id proporcionado
      const response = await fetchTimeSchedule(id);

      const scheduleDetails = extractScheduleDetails(response.html);
      res.json(scheduleDetails);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  } 
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor proxy iniciado en :${PORT}`);
});
