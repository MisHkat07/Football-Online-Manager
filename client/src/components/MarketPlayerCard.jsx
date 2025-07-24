import React from "react";

const MarketPlayerCard = ({ player, myTeamId, myBudget, onBuy, onUnlist }) => {
  const isMyPlayer = player.teamId === myTeamId;
  const canBuy = myBudget >= 0.95 * player.askingPrice;
  return (
    <div className="glass-card bg-white rounded-lg shadow flex flex-col justify-between items-center mx-auto border border-gray-200">
      <img
        src={player.image || `https://robohash.org/${player._id}?200x200`}
        alt={player.name}
        className="w-24 h-24 rounded-full mb-3 object-cover border-2 border-blue-300"
      />
      <h2 className="text-lg font-bold text-blue-700 mb-1 text-center">
        {player.name}
      </h2>
      <p className="text-sm text-gray-600 mb-1 text-center">
        {player.position} | {player.teamName}
      </p>
      <p className="text-blue-600 font-bold text-lg mb-2">
        ${player.askingPrice}
      </p>
      <div className="w-full flex flex-col items-center">
        {isMyPlayer ? (
          <button
            className="w-full mt-2 px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => onUnlist(player)}
          >
            Unlist
          </button>
        ) : (
          <button
            className={`w-full mt-2 px-4 py-1 text-sm rounded ${
              canBuy
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={() => canBuy && onBuy && onBuy(player)}
            disabled={!canBuy}
          >
            {canBuy ? "Buy" : "Insufficient Budget"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MarketPlayerCard;
