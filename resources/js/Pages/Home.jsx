import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';

function Home({ auth }) {
    return (
        <>
            Messages
        </>
    );
}

Home.layout = (page) => {
    return (
            <ChatLayout children={page} />
    );
}

export default Home;