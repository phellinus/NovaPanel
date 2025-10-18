const Welcome = () => {
    const handleStorage = (type: string) => {
        switch (type) {
            case 'get':
                console.log(localStorage.getItem('tokenReact'));
                break;
            case 'set':
                localStorage.setItem('tokenReact', '123456');
                break;
            case 'remove':
                localStorage.removeItem('tokenReact');
                break;
            case 'clear':
                localStorage.clear();
                break;
            default:
                break;
        }
    };
    return (
        <>
            <h1>欢迎来到Nova Panel</h1>
            <button onClick={() => handleStorage('get')}>获取</button>
            <button onClick={() => handleStorage('set')}>设置</button>
            <button onClick={() => handleStorage('remove')}>删除</button>
            <button onClick={() => handleStorage('clear')}>清空</button>
        </>
    );
};

export default Welcome;
