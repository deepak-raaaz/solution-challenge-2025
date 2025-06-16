import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FiBell, FiSettings, FiMessageSquare, FiAlertTriangle, FiInfo, FiX, FiCheck } from "react-icons/fi";
import { Bell } from "lucide-react";

const mockNotifications = [
    {
        id: 1,
        type: "system",
        title: "System Update Available",
        message: "A new system update is available. Please restart your device to apply changes.",
        timestamp: new Date(),
        read: false,
        link: "/updates"
    },
    {
        id: 2,
        type: "message",
        title: "New Message from John",
        message: "Hey there! Just checking in about the project progress.",
        timestamp: new Date(Date.now() - 3600000),
        read: true,
        link: "/messages"
    },
    {
        id: 3,
        type: "alert",
        title: "Critical Alert",
        message: "Server performance issues detected in production environment.",
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        link: "/alerts"
    },
    {
        id: 4,
        type: "general",
        title: "Weekly Newsletter",
        message: "Check out this week's highlights and upcoming events.",
        timestamp: new Date(Date.now() - 86400000),
        read: false,
        link: "/newsletter"
    }
];

const NotificationCard = ({ notification, onDismiss, onMarkAsRead }: { notification: any, onDismiss: any, onMarkAsRead: any }) => {
    const getIcon = (type: any) => {
        switch (type) {
            case "system":
                return <FiSettings className="text-blue-500" />;
            case "message":
                return <FiMessageSquare className="text-green-500" />;
            case "alert":
                return <FiAlertTriangle className="text-red-500" />;
            default:
                return <FiInfo className="text-purple-500" />;
        }
    };

    return (
        <div className={`p-4 mb-2 rounded-lg transition-all duration-300 ${notification.read ? "bg-gray-800/20" : "bg-gray-700/20"} hover:bg-gray-600/40`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gray-800">
                        {getIcon(notification.type)}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-100">{notification.title}</h3>
                        <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                        <span className="text-xs text-gray-400 block mt-2">
                            {format(notification.timestamp, "MMM dd, yyyy HH:mm")}
                        </span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    {!notification.read && (
                        <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-1 hover:bg-gray-700 rounded-full"
                            aria-label="Mark as read"
                        >
                            <FiCheck className="text-green-500" />
                        </button>
                    )}
                    <button
                        onClick={() => onDismiss(notification.id)}
                        className="p-1 hover:bg-gray-700 rounded-full"
                        aria-label="Dismiss notification"
                    >
                        <FiX className="text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const NotificationWidget = () => {
    const [notifications, setNotifications] = useState<any>([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setNotifications(mockNotifications);
    }, []);

    const categories = [
        { id: "all", label: "All" },
        { id: "system", label: "System" },
        { id: "message", label: "Messages" },
        { id: "alert", label: "Alerts" },
        { id: "general", label: "General" }
    ];

    const filteredNotifications = notifications.filter((notification: any) =>
        activeCategory === "all" ? true : notification.type === activeCategory
    );

    const handleDismiss = (id: any) => {
        setNotifications(notifications.filter((n: any) => n.id !== id));
    };

    const handleMarkAsRead = (id: any) => {
        setNotifications(notifications.map((n: any) =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const unreadCount = notifications.filter((n: any) => !n.read).length;

    return (
        <div className="">

            <div className="mt-2  w-96 max-w-[calc(100vw-2rem)] bg-[#11161D] border border-gray-700/40 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform">
                <div className="p-4 border-b border-gray-700/40">
                    <div className="flex space-x-2 overflow-x-hidden scrollbar-hide">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeCategory === category.id ? "bg-gray-700/40 text-white" : "text-gray-400 hover:text-gray-200"}`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification: any) => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onDismiss={handleDismiss}
                                onMarkAsRead={handleMarkAsRead}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            No notifications to display
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default NotificationWidget;