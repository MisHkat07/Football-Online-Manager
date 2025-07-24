import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";
import Modal from "../components/Modal";
import InputModal from "../components/InputModal";

const MyTeam = () => {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState({ name: "", budget: 0 });
  const [modal, setModal] = useState({
    open: false,
    message: "",
    title: "",
    type: "success",
  });
  const [inputModal, setInputModal] = useState({
    open: false,
    value: "",
    error: "",
    playerId: null,
  });
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMyTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/team", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeam({ name: res.data.name || "", budget: res.data.budget || 0 });
      setPlayers(res.data.players || []);
    } catch (err) {
      setModal({
        open: true,
        message: "Failed to fetch your team.",
        title: "Error",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleList = (playerId) => {
    setInputModal({ open: true, value: "", error: "", playerId });
  };

  const handleListSubmit = async () => {
    const price = inputModal.value;
    if (!price || isNaN(Number(price))) {
      setInputModal((prev) => ({ ...prev, error: "Invalid price." }));
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/players/list/${inputModal.playerId}`,
        {
          askingPrice: parseFloat(price),
          isListed: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlayers((prev) =>
        prev.map((p) =>
          p._id === inputModal.playerId
            ? { ...p, isListed: true, askingPrice: parseFloat(price) }
            : p
        )
      );
      setInputModal({ open: false, value: "", error: "", playerId: null });
      setModal({
        open: true,
        message: "Player listed!",
        title: "Success",
        type: "success",
      });
    } catch (err) {
      setInputModal({ open: false, value: "", error: "", playerId: null });
      setModal({
        open: true,
        message: err.response?.data?.error || "Listing failed.",
        title: "Error",
        type: "error",
      });
    }
  };

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
      setPlayers((prev) =>
        prev.map((p) =>
          p._id === playerId ? { ...p, isListed: false, askingPrice: 0 } : p
        )
      );
      setModal({
        open: true,
        message: "Player unlisted.",
        title: "Success",
        type: "success",
      });
    } catch (err) {
      setModal({
        open: true,
        message: err.response?.data?.message || "Unlisting failed.",
        title: "Error",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchMyTeam();
  }, []);

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
      <InputModal
        open={inputModal.open}
        onClose={() =>
          setInputModal({ open: false, value: "", error: "", playerId: null })
        }
        title="Set Asking Price"
        label="Enter asking price ($)"
        value={inputModal.value}
        onChange={(v) =>
          setInputModal((im) => ({ ...im, value: v, error: "" }))
        }
        onSubmit={handleListSubmit}
        error={inputModal.error}
      />
      <div className="p-6 max-w-5xl mx-auto glass-card">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Your Team: <span className="text-blue-600">{team?.name}</span>
        </h1>
        <p className="text-center mb-6 font-bold">
          Current Budget: ${team?.budget}
        </p>
        <p className="mb-4">You have {players.length} players</p>
        {loading ? (
          <p>Loading players...</p>
        ) : players.length === 0 ? (
          <p>You have no players yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {players.map((player) => (
              <PlayerCard
                key={player._id}
                player={player}
                showActions={true}
                onList={() => handleList(player._id)}
                onUnlist={() => handleUnlist(player._id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyTeam;
