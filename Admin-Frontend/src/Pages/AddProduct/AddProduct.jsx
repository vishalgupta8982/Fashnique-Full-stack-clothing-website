import './AddProduct.css';
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Button from '../../Components/Button/Button';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


const props = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const AddProduct = () => {
    const [desc, setDesc] = useState('');

    const handleDescChange = (value) => {
        console.log(value)
        setDesc(value);
    };

    return (
        <div className='addProduct'>
            <p className='addProductHead'>Add Product</p>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <input className='inputTitle' placeholder='Enter Product Title' type="text" />
            <select className='productCategory' name="" id="">
                <option value="">Select Product Category</option>
            </select>
            <div className='quill'>
                <ReactQuill theme='snow' value={desc} onChange={handleDescChange} />
            </div>
            <input className='inputTitle' placeholder='Enter Product Price' type="number" />
            <select className='productCategory' name="" id="">
                <option value="">Select  Category</option>
            </select> <select className='productCategory' name="" id="">
                <option value="">Select Color</option>
            </select> <select className='productCategory' name="" id="">
                <option value="">Select Brand</option>
            </select>
            <input className='inputTitle' placeholder='Enter Quantity' type="number" />
            <Button widthButton={"fit-content"} title="Add Product" />
        </div>
    );
};

export default AddProduct;
