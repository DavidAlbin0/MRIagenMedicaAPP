import { gql, useMutation, useQuery } from '@apollo/client';
import { View, Text, SafeAreaView } from 'react-native';

const CREAR_USER = gql`
    
    mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input : $input)
  }
`;


const GET_ESTUDIO = gql`
    query obtenerEstudio{
        obtenerEstudio{
            nombre
            Estudio
        }
    }


`;

export default function List() {
  
    const { loading, error, data } = useQuery(GET_ESTUDIO);
    if(loading) return<Text>Loading</Text>
    if(error) return<Text>Error en el servidor</Text>

    return(
        <SafeAreaView>

        </SafeAreaView>
    )

}