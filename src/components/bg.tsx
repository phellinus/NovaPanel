const Bg = () => {
    return (
        <div className='pointer-events-none absolute inset-0'>
            <div className='absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#1273D4]/25 via-transparent to-transparent' />
            <div className='absolute -top-24 left-12 h-64 w-64 rounded-full bg-[#1273D4]/20 blur-3xl' />
            <div className='absolute bottom-0 right-20 h-52 w-52 rounded-full bg-[#0EA5E9]/25 blur-3xl' />
        </div>
    );
};

export default Bg;
