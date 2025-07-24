import React, { useEffect, useState } from "react";
import axios from "axios";
import MarketPlayerCard from "../components/MarketPlayerCard";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const TransferMarket = () => {
  const [players, setPlayers] = useState([]);
  const [filters, setFilters] = useState({ name: "", team: "", price: 0 });
  const [myTeamId, setMyTeamId] = useState("");
  const [myBudget, setMyBudget] = useState(0);
  const [modal, setModal] = useState({
    open: false,
    message: "",
    title: "",
    type: "success",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/market", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlayers(res.data);
        const teamRes = await axios.get("http://localhost:5000/api/team", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyTeamId(teamRes.data._id);
        setMyBudget(teamRes.data.budget || 0);
      } catch (err) {
        setPlayers([]);
      }
    };
    fetchData();
  }, []);

  const teamOptions = Array.from(
    new Set(players.map((p) => p.teamName))
  ).sort();

  const maxPrice =
    players.length > 0
      ? Math.max(...players.map((p) => p.askingPrice)) + 10000
      : 5000000;

  const filteredPlayers = players.filter((player) => {
    const matchesName = player.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const matchesTeam = !filters.team || player.teamName === filters.team;
    const matchesPrice =
      !filters.price || player.askingPrice <= Number(filters.price);
    return matchesName && matchesTeam && matchesPrice;
  });

  const handleUnlist = async (playerId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/players/unlist/${playerId}`,
        {
          askingPrice: 0,
          isListed: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModal({
        open: true,
        message: "Player unlisted.",
        title: "Success",
        type: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setModal({
        open: true,
        message: err.response?.data?.message || "Unlisting failed.",
        title: "Error",
        type: "error",
      });
    }
  };

  const handleBuy = async (playerId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/market/buy/${playerId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModal({
        open: true,
        message: "Player bought!",
        title: "Success",
        type: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log("🎯 err:", err);
      setModal({
        open: true,
        message: err.response?.data?.error || "Buying failed.",
        title: "Error",
        type: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFilters({
      ...filters,
      [name]: type === "range" || name === "price" ? Number(value) : value,
    });
  };

  return (
    <>
      <Modal
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        setInputValue={() => {}}
        onSubmit={() => {}}
      />
      <div className="p-6 glass-card">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Transfer <span className="text-blue-600">Market</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Player name"
            className="px-3 py-2 border rounded glass-input w-full"
            value={filters.name}
            onChange={handleChange}
          />
          <select
            name="team"
            className="px-3 py-2 border rounded glass-input w-full"
            value={filters.team}
            onChange={handleChange}
          >
            <option value="">All Teams</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <div className="flex flex-col glass-input w-full">
            <label htmlFor="price" className="mb-1 text-sm">
              Max Price: ${filters.price || maxPrice}
            </label>
            <input
              type="range"
              name="price"
              min="0"
              max={maxPrice}
              step="1000"
              value={filters.price || maxPrice}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Available Players
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredPlayers.length === 0 ? (
            <p>No players found.</p>
          ) : (
            filteredPlayers.map((player) => (
              <MarketPlayerCard
                key={player._id}
                player={player}
                myTeamId={myTeamId}
                myBudget={myBudget}
                onBuy={() => handleBuy(player._id)}
                onUnlist={() => handleUnlist(player._id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TransferMarket;
