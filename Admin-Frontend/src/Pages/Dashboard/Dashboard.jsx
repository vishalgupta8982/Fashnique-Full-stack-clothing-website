import './Dashboard.css'
import { FaRupeeSign } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Column } from '@ant-design/plots';
import { Table } from "antd";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Status",
        dataIndex: "staus",
    },
];
const data1 = [];
for (let i = 0; i < 26; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        staus: `London, Park Lane no. ${i}`,
    });
}
const Dashboard = () => {
    const data = [
        {
            type: "Jan",
            sales: 38,
        },
        {
            type: "Feb",
            sales: 52,
        },
        {
            type: "Mar",
            sales: 61,
        },
        {
            type: "Apr",
            sales: 145,
        },
        {
            type: "May",
            sales: 438,
        },
        {
            type: "Jun",
            sales: 438,
        },
        {
            type: "July",
            sales: 238,
        },
        {
            type: "Aug",
            sales: 308,
        },
        {
            type: "Sept",
            sales: 238,
        },
        {
            type: "Oct",
            sales: 18,
        },
        {
            type: "Nov",
            sales: 348,
        },
        {
            type: "Dec",
            sales: 38,
        },
    ];
    const config = {
        data,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
            return "#52ab98";
        },
        label: {
           
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };
    return (
        <>
            <div className="dashboard">
                <p className="dashboardHead">Dashboard</p>
                <div className="dbCard w-[100%] flex md:flex-row flex-col ">
                    <div className="dbCard1   w-[100%] md:w-1/3">
                        <div> 
                        <p className='cardName'>Total sells</p>
                        <p className='cardAmount '><FaRupeeSign />3799.00</p>
                        </div>
                             
                        <div><p className="growth" ><FaArrowTrendUp/>&nbsp;34%</p>
                            <p className='cardName'>Compared to April 2022</p>
                        </div>
                    </div>
                    <div className="dbCard2   w-[100%] md:w-1/3">
                        <div>
                            <p className='cardName'>Average order</p>
                            <p className='cardAmount '><FaRupeeSign />3799.00</p>
                        </div> 
                        <div><p className="growth" ><FaArrowTrendUp />&nbsp;34%</p>
                            <p className='cardName'>Compared to April 2022</p>
                        </div>
                    </div>
                    <div className="dbCard3   w-[100%] md:w-1/3">
                        <div> <p className='cardName'>Total orders</p>
                            <p className='cardAmount '><FaRupeeSign />3799.00</p></div>
                        <div><p className="growth" ><FaArrowTrendUp />&nbsp;34%</p>
                            <p className='cardName'>Compared to April 2022</p>
                        </div>
                    </div>
                </div>
                <div className="income">
                    <p>Income Statistics</p>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="income">
                    <p>Recent order</p>
                    <div>
                        <Table columns={columns} dataSource={data1} />
                    </div>
                </div>
            </div></>
    )
}
export default Dashboard