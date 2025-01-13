import React, { useEffect, useState } from "react";

const UserReels = () => {
  const fetchData = async (username) => {
    if (username) {
      const response = await fetch(
        "http://localhost:5000/get_reels?username=" + username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserResponse(data);
      setReelsRows(chunkReels(data.reels, 3));

      
    }
  };
  const [userResponse, setUserResponse] = useState({});

  const [username, setUsername] = useState("");

  const chunkReels = (reels, chunkSize) => {
    const result = [];
    for (let i = 0; i < reels.length; i += chunkSize) {
      result.push(reels.slice(i, i + chunkSize));
    }
    return result;
  };

  const [reelRows, setReelsRows] = useState([]);

  return (
    <div style={{ margin: "20px", padding: "10px" }}>
      <h1>User Reels</h1>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        style={{ marginBottom: "20px", padding: "5px" }}
      />
      <button
        onClick={() => fetchData(username)}
        style={{ marginLeft: "10px", padding: "5px 10px" }}
      >
        Search
      </button>

      {userResponse.username ? (
        <div>
          <h2>Username: {userResponse.username}</h2>
          <img
            src={"http://localhost:5000/img?src="+encodeURIComponent(userResponse.pfPhoto)}
            alt="Profile"
            style={{ borderRadius: "50%", width: "100px", margin: "10px 0" }}
          />
          <div>
            {reelRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                {row.map((reel) => (
                  <div
                    key={reel.id}
                    style={{
                      flex: "1",
                      margin: "0 10px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <p>{reel.caption_text}</p>
                    <video
                      src={reel.url}
                      controls
                      width="100%"
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserReels;
