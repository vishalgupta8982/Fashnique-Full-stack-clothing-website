import { useEffect, useState } from 'react'
import './Enquiries.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import CustomModal from '../../Components/CustomModel/CustomModel'
import {
  deleteEnquiry,
  getEnquiry,
  resetEnquiryState,
  updateEnquiry,
} from '../../Services/Enquiries/EnquiriesAction'
import { toast } from 'react-toastify'
import { RiDeleteBinLine } from 'react-icons/ri'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'comment',
    dataIndex: 'comment',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
]
const Enquiries = () => {
  const dispatch = useDispatch()
  const enquiryState = useSelector((state) => state.enquiry)
  const { loading, Enquiry, isSuccess } = enquiryState
  const [open, setOpen] = useState(false)
  const [EnquiryId, setEnquiryId] = useState('')
  const showModal = (id) => {
    setOpen(true)
    setEnquiryId(id)
  }
  useEffect(() => {
    dispatch(resetEnquiryState())
    dispatch(getEnquiry())
    if (isSuccess) {
      toast.success('Deleted Successfully')
    }
  }, [isSuccess, dispatch])

  const hideModal = () => {
    setOpen(false)
  }

  const data1 = Array.isArray(Enquiry)
    ? Enquiry.map((item, index) => ({
        key: index,
        name: item.name,
        email: item.email,
        mobile: item.mobile,
        comment: <p className="text-center">{item.comment}</p>,
        status: (
          <>
            <select
              name=""
              defaultValue={item.status ? item.status : 'Submitted'}
              className="outline-none form-control form-select"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, item._id)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        ),
        action: (
          <div className="icon">
            <button className="delete" onClick={() => showModal(item._id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        ),
      }))
    : []

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e }
    dispatch(updateEnquiry(data))
    setTimeout(() => {
      dispatch(getEnquiry())
    }, 1000)
  }
  const deleteEnq = (e) => {
    dispatch(deleteEnquiry(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getEnquiry())
    }, 100)
  }
  return (
    <>
      <div className="enquiries">
        {loading && (
          <div className="loader">
            <ClipLoader
              color={'#52ab98'}
              loading={loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <p className="enquiriesHead">Enquiries</p>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteEnq(EnquiryId)
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  )
}
export default Enquiries
