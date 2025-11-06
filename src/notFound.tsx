import React from 'react';
import { Button, Empty, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <>
            <div className={'h-screen flex justify-center items-center'}>
                <Empty
                    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                    styles={{
                        image: {
                            height: 100,
                            marginBottom: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                    description={
                        <Typography.Text>
                            <h1>暂无权限访问</h1>
                        </Typography.Text>
                    }
                >
                    <Button type='primary' onClick={handleClick}>
                        回到首页
                    </Button>
                </Empty>
            </div>
        </>
    );
};

export default NotFound;
