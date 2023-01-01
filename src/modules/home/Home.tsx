import { useUser } from 'contexts/user';

function Home() {
    const [user] = useUser();

    return (
        <div>
            Welcome {user.email}
        </div>
    )
}

export default Home;