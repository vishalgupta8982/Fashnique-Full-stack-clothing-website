import './AddBlog.css';
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
const AddBlog = () => {
    const [desc, setDesc] = useState('');

    const handleDescChange = (value) => {
        console.log(value)
        setDesc(value);
    };

    return (
        <div className='addBlog'>
            <p className='addBlogHead'>Add Blog</p>
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
            <input className='inputTitle' placeholder='Enter Blog Title' type="text" />
            <select className='blogCategory' name="" id="">
                <option value="">Select Blog Category</option>
            </select>
            <div className='quill'>
                <ReactQuill theme='snow' value={desc} onChange={handleDescChange} />
            </div>
            <Button widthButton={"fit-content"} title="Add Blog" />
        </div>
    );
};

export default AddBlog;
