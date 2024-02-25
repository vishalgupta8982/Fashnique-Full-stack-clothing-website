import React, { useEffect, useState } from 'react';
import './BlogCategoryList.css';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Table } from "antd";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { deleteBlogCat, getBlogCat } from '../../Services/BlogCategory/blogCatAction';
import { Link } from 'react-router-dom';
import CustomModal from '../../Components/CustomModel/CustomModel';
import ClipLoader from "react-spinners/ClipLoader";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
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

const BlogCategoryList = () => {
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

    const blogCat = useSelector((state) => state.blogCat);
    const { isSuccess, loading, blogCategory } = blogCat;

    const deleteBlogCategory = (id) => {
        dispatch(deleteBlogCat(id, token));
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getBlogCat());
        if (isSuccess) {
            toast.success("Deleted Successfully");
        }
    }, [dispatch, isSuccess]);

    const token = useSelector((state) => state.auth.user.token);

    const data1 = Array.isArray(blogCategory)
        ? blogCategory.map((item, index) => ({
            key: index,
            name: `${item.title}`,
            action: (
                <div className="icon">
                    <Link to={`/admin/addblogcategory/${item._id}`} className="edit">
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
        <div className="blogCatlist">
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
            <p className="blogCatlistHead">Blog Category List</p>
            <Table columns={columns} dataSource={data1} />
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteBlogCategory(blogCatId);
                }}
                title="Are you sure you want to delete this blog category?"
            />
        </div>
    );
};

export default BlogCategoryList;
