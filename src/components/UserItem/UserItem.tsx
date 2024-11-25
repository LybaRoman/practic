import React from 'react';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

interface UserItemProps {
    user: User;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, user: User) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDragStart, onDragOver, onDrop }) => {
    return (
        <div
            draggable={true}
            onDragStart={(e) => onDragStart(e, user)}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, user)}
            className="flex items-center justify-between py-7 px-10 text-xl border border-black rounded-lg mb-4 cursor-pointer"
        >
            <div>{user.id}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.age} years</div>
        </div>
    );
};

export default UserItem;
