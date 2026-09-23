function DeliveryEstimate({ area }) {
  const estimates = {
    Bole: {
      time: "20–30 min",
      fee: 80,
    },
    Kazanchis: {
      time: "20–30 min",
      fee: 70,
    },
    Piassa: {
      time: "30–40 min",
      fee: 90,
    },
    Megenagna: {
      time: "25–35 min",
      fee: 80,
    },
    CMC: {
      time: "30–45 min",
      fee: 100,
    },
    Lideta: {
      time: "25–35 min",
      fee: 80,
    },
    Mexico: {
      time: "25–35 min",
      fee: 80,
    },
  };

  if (!area) {
    return (
      <div className="delivery-estimate">
        <span className="delivery-icon">🚚</span>

        <div>
          <strong>Delivery estimate</strong>
          <p>Select your area to see delivery time and fee.</p>
        </div>
      </div>
    );
  }

  const estimate = estimates[area] || {
    time: "30–45 min",
    fee: 100,
  };

  return (
    <div className="delivery-estimate">
      <span className="delivery-icon">🚚</span>

      <div>
        <strong>Estimated delivery</strong>

        <p>
          {estimate.time} ·{" "}
          {estimate.fee.toLocaleString()} ETB delivery
        </p>
      </div>
    </div>
  );
}

export default DeliveryEstimate;