import React, { useEffect, useState } from 'react';
import UserItem from '../UserItem/UserItem';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [curentUser, setCurentUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        } else {
            fetch('https://dummyjson.com/users')
                .then(res => res.json())
                .then(data => {
                    setUsers(data.users as User[]);
                    localStorage.setItem('users', JSON.stringify(data.users));
                })
                .catch(error => console.error('Помилка:', error));
        }
    }, []);
    
    const updateLocalStorage = (users: User[]) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, user: User) {
        setCurentUser(user);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, user: User) {
        e.preventDefault();
        if (curentUser) {
            const updatedUsers = users.map(c => {
                if (c.id === user.id) {
                    return { ...c, id: curentUser.id };
                }
                if (c.id === curentUser.id) {
                    return { ...c, id: user.id };
                }
                return c;
            });
            setUsers(updatedUsers);
            updateLocalStorage(updatedUsers);
        }
    }

    const sortUsers = (a: User, b: User) => {
        return a.id > b.id ? 1 : -1;
    };

    return (
        <div className="flex flex-col justify-center w-[500px] border border-black mx-auto rounded-lg p-5">
            <h1 className='pt-5 pb-10 text-3xl text-center'>Users</h1>
            <ul>
                {users.sort(sortUsers).map((user) => (
                    <li key={user.id}>
                        <UserItem
                            user={user}
                            onDragStart={dragStartHandler}
                            onDragOver={dragOverHandler}
                            onDrop={dropHandler}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
