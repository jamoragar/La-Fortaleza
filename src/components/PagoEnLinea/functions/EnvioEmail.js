import axios from 'axios';

const API_PATH = 'https://ingelic.cl/api/fortaleza/form_submit.php';

export const sendEmail = (formData) => {
    console.log(formData)
    axios({
        method:'post',
        url: API_PATH,
        headers: {'content-type': 'application/json'},
        data: formData
    }).then(result => {
        console.log('Correo Enviado...')
        console.log(result)
    })
}