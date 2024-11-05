// Supongamos que este código está en tu aplicación frontend

const obtenerArchivosPorCurp = async (curp) => {
    const query = `
      query obtenerArchivosPorCurp($curp: String!) {
        obtenerArchivosPorCurp(curp: $curp)
      }
    `;
  
    const variables = {
      curp: "CURP_DEL_USUARIO", // Reemplaza con el valor adecuado
    };
  
    //const url = "http://tu-servidor-graphql-endpoint"; // Reemplaza con tu URL de GraphQL
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer TU_TOKEN_JWT`, // Agrega el token JWT aquí
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      });
  
      const data = await response.json();
      console.log("Datos recibidos:", data.data.obtenerArchivosPorCurp);
      // Aquí puedes manejar los datos según tus necesidades
    } catch (error) {
      console.error("Error en la solicitud GraphQL:", error);
      // Maneja los errores aquí
    }
  };
  
  // Llama a la función para obtener archivos
  obtenerArchivosPorCurp();
  