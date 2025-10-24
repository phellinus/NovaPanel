import {type FC, useEffect, useState} from "react";
import styles from '@/views/dept/index.module.css'
import type {IDeptListResponse} from "@/types/list-types.ts";
import {GetDeptListParams} from "@/api";
import {Button, TableColumnsType, Table, Space} from "antd";


const Dept:FC = () => {
    const [data,setData] = useState<IDeptListResponse[]>()
    const getDeptList = async () => {
        const res = await GetDeptListParams()
        setData(res)
    }
    useEffect(() => {
        getDeptList()
    }, []);
    const colums:TableColumnsType<IDeptListResponse> = [{
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            width: '200'
        },{
            title: '负责人',
            dataIndex: 'userName',
            key: 'userName',
            width: '150'
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '200'
        },{
            title:'更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: '200'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(_,record)=>{
                return (
                    <Space>
                        <Button type='primary'>编辑</Button>
                        <Button danger>删除</Button>
                    </Space>
                )
            }
        }
    ]
    return (
        <>
            <div>
                <div className={styles.header}>
                    <div>部门管理</div>
                    <button type='button' className={styles.buttonOne} onClick={() => nav('/')}>
                        新增
                    </button>
                </div>
                <Table
                    className={styles.table}
                    rowKey='_id'
                    columns={colums}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </>
    )
}
export default Dept;
