import axios from 'axios';

const fetchTimeSchedule = async (id) => {
  
    // Realizar la solicitud POST a la segunda URL
    const response = await axios.post(
      'https://www.metrovalencia.es/wp-admin/admin-ajax.php',
      new URLSearchParams({
        'action': 'formularios_ajax',
        'data': `action=info-estacion&id=${id}`
      }),
      {
        headers: {
          // Aquí puedes agregar cualquier encabezado adicional si es necesario
        }
      }
    );
  
    return response.data;
  };

  export default fetchTimeSchedule;
