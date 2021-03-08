import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Avatar, Badge} from 'antd'


const FileUpload = ({values, setValues, setLoading}) => {
    const user = useSelector(state => state.user)
    /*Resizer.imageFileResizer(
    file, // Is the file of the image which will resized.
    maxWidth, // Is the maxWidth of the resized new image.
    maxHeight, // Is the maxHeight of the resized new image.
    compressFormat, // Is the compressFormat of the resized new image.
    quality, // Is the quality of the resized new image.
    rotation, // Is the degree of clockwise rotation to apply to uploaded image. 
    responseUriFunc,  // Is the callBack function of the resized new image URI.
    outputType,  // Is the output type of the resized new image.
    minWidth, // Is the minWidth of the resized new image.
    minHeight, // Is the minHeight of the resized new image.
    );
    */
    const fileUploadAndResize = (e) => {
        // console.log(e.target.files)
        //resize
        let files = e.target.files
        let allUploadedFiles = values.images

        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG',100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
                        headers: {
                            authToken: user ? user.token : ''
                        }
                    })
                    .then(res => {
                        console.log('IMAGE UPLOAD RES DATA', res)
                        setLoading(false)
                        allUploadedFiles.push(res.data)

                        setValues({...values, images: allUploadedFiles})
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log('CLOUDINARY UPLOAD ERR',err)
                    })
                }, 'base64')
            }
        }
        //send back to server to upload to cloudinary
        // set url to images [] in the parent component - ProductCreate
            }
    const handleImageRemove = (id) => {
        setLoading(false)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id: id}, {
            headers: {
                authToken: user ? user.token : ''
            }
        })
        .then(res => {
            setLoading(false)
            const {images} = values
            let filteredImages = images.filter((item) => {
                return item.public_id !== id
            })
            setValues({...values, images: filteredImages})
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
        
    }
    return (
        <>
        <div className="row">
            {values.images && values.images.map((i) => (
                <Badge count="X" key={i.public_id} onClick={() => handleImageRemove(i.public_id)} style={{cursor: 'pointer'}}>
                <Avatar shape="square"  src={i.url} size={100} className="ml-3"/>
                </Badge>
            ))}
        </div>
        <br />
        <div className="row">
            <label className="btn btn-primary btn-raised">Choose files
            <input type="file" hidden multiple accept="images/*" onChange={fileUploadAndResize}/>
            </label>
        </div>
        </>
    )
        
    
}

export default FileUpload
