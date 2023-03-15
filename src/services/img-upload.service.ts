// Dependencies
import axios from 'axios'

export const uploadImg = async (file: File) => {
    // Defining our variables
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_API_KEY_CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData()
    // Building the request body
    FORM_DATA.append('file', file)
    FORM_DATA.append('upload_preset', import.meta.env.VITE_API_KEY_UPLOAD_PRESET!)

    // Sending a post method request to Cloudniarys' API
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        return res.data
    } catch (err) {
        console.error('ERROR!', err)
    }
}
