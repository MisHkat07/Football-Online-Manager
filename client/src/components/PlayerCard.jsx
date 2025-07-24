import React from "react";

const PlayerCard = ({ player, showActions = false, onList, onUnlist }) => {
  const { name, position, price, isListed, askingPrice, teamName, rating } =
    player;

  return (
    <div className="glass-card p-4 rounded shadow bg-white flex flex-col justify-between items-center transition-transform duration-300 hover:scale-105">
      <img
        src={player.image}
        alt={name}
        className="w-24 h-24 rounded-full mb-2 object-cover border-2 border-blue-300"
      />
      <div className="w-full">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">Position: {position}</p>
        <p className="text-sm text-gray-600">Price: ${price}</p>
        <p className="text-sm text-gray-600">⭐ Rating: {rating}</p>
        {teamName && <p className="text-sm text-gray-500">Team: {teamName}</p>}
        {isListed && (
          <p className="text-sm text-green-600">Listed at ${askingPrice}</p>
        )}
      </div>

      {showActions && (
        <div className="mt-4 w-full">
          {isListed ? (
            <button
              onClick={() => onUnlist(player._id)}
              className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
            >
              Unlist Player
            </button>
          ) : (
            <button
              onClick={() => onList(player._id)}
              className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-sm"
            >
              List for Sale
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
