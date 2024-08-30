import React from "react";
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { message } from "antd";
import './Rooms.css';
const Room = () => {
        const { roomID } = useParams();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!roomID) {
    //         message.error("Invalid room. Redirecting to home...");
    //         navigate("/"); // Redirect to home or any other page
    //         return;
    //     }

        let myMeeting = async (element) => {
            const appID = 2092697871;
            const serverSecret = "8bed1111fd152465dcf3942a6035e109";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID, 
                serverSecret, 
                roomID, 
                Date.now().toString(), 
                "Guest" // Static name since user info is removed
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: window.location.protocol + '//' +
                             window.location.host + window.location.pathname +
                             '?roomID=' + roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
            });
        };

    //     const element = document.querySelector('.room-page > div');
    //     if (element) {
    //         myMeeting(element);
    //     }
    // }, [roomID, navigate]);

    return (
        <div className="room-page">
            <div ref={myMeeting} style={{ height: "100%" }} />
        </div>
    );
};

export default Room;
