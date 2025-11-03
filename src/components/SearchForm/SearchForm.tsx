import { Button, Form } from 'antd';
import styles from '@/views/user/index.module.css';

export default function SearchForm(props: any) {
    return (
        <>
            <Form className={styles.form} layout='inline' form={props.form} initialValues={props.initialValues}>
                {props.children}
                <Form.Item>
                    <Button type='primary' className='mr-2' onClick={props.submit}>
                        查询
                    </Button>
                    <Button type='primary' onClick={props.reset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
