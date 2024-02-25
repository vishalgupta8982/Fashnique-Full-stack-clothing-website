import React, { useEffect, useState } from 'react'
import './BrandList.css'
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomModal from '../../Components/CustomModel/CustomModel';
import ClipLoader from "react-spinners/ClipLoader";
import { deleteBrand, getBrand } from '../../Services/Brand/BrandAction';
 
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
        render: (text, record, index) => index + 1,
    },
    {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];
 
const BrandList = () => {
    const [open, setOpen] = useState(false);
    const [blogCatId, setBlogCatId] = useState("");

    const dispatch = useDispatch();

    const showModal = (id) => {
        setOpen(true);
        setBlogCatId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const brandList=useSelector((state)=>state.brand)
    const { isSuccess, loading, brand } = brandList;
    const token = useSelector((state) => state.auth.user.token);
    const dltBrand = (id) => {
        dispatch(deleteBrand(id, token));
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getBrand());
        if (isSuccess) {
            toast.success("Deleted Successfully");
        }
    }, [dispatch, isSuccess]);
    const data1 = Array.isArray(brand)
        ? brand.map((item, index) => ({
            key: index,
            name: `${item.title}`,
            action: (
                <div className="icon">
                    <Link to={`/admin/addbrand/${item._id}`} className="edit">
                        <BiEdit />
                    </Link>
                    <button className="delete" onClick={() => showModal(item._id)}>
                        <RiDeleteBinLine />
                    </button>
                </div>
            ),
        }))
        : [];

    
    return (
        <>
            <div className='brandlist' >
                {loading && (
                    <div className='loader'>
                        <ClipLoader
                            color={"#52ab98"}
                            loading={loading}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}
                <p className="brandlistHead">Brand List</p>
                <Table columns={columns} dataSource={data1} />
                <CustomModal
                    hideModal={hideModal}
                    open={open}
                    performAction={() => {
                        dltBrand(blogCatId);
                    }}
                    title="Are you sure you want to delete this blog category?"
                /></div></>
    )
}

export default BrandList