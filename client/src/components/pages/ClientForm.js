import React, { useState } from "react";
import ServerPath from "../../const/const";

const ClientForm = ({ client }) => {
  const [error, setErrors] = useState(false);
  const [clientDataUpdate, setClientDataUpdate] = useState({});

  const updateClientData = (e) => {
    e.preventDefault();

    fetch(`${ServerPath}/clients/${client.clientId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientDataUpdate),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          return;
        }
        if (response.status === 401) {
          setErrors(error, response.message);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="modifyClient" onSubmit={updateClientData}>
      <div key={client["_id"]}>
        <input
          type="text"
          required
          name="clientId"
          placeholder="Client ID (clientId#)"
          value={client.clientId}
          readOnly
        />
        <input
          type="text"
          required
          name="fname"
          placeholder="First name"
          defaultValue={client.fname}
          onChange={(e) =>
            setClientDataUpdate({ ...clientDataUpdate, fname: e.target.value })
          }
        />
        <input
          type="text"
          required
          name="lname"
          placeholder="Last name"
          defaultValue={client.lname}
          onChange={(e) =>
            setClientDataUpdate({ ...clientDataUpdate, lname: e.target.value })
          }
        />
        <input
          type="text"
          required
          name="email"
          placeholder="Email"
          defaultValue={client.email}
          onChange={(e) =>
            setClientDataUpdate({ ...clientDataUpdate, email: e.target.value })
          }
        />
        <input
          type="text"
          required
          name="password"
          placeholder="Password"
          defaultValue={client.password}
          onChange={(e) =>
            setClientDataUpdate({
              ...clientDataUpdate,
              password: e.target.value,
            })
          }
        />
        <input
          type="text"
          required
          name="phone"
          placeholder="phone"
          defaultValue={client.phone}
          onChange={(e) =>
            setClientDataUpdate({
              ...clientDataUpdate,
              phone: e.target.value,
            })
          }
        />
        <input
          type="text"
          required
          name="address"
          placeholder="address"
          defaultValue={client.address}
          onChange={(e) =>
            setClientDataUpdate({
              ...clientDataUpdate,
              address: e.target.value,
            })
          }
        />

        <input
          type="text"
          name="doctors"
          placeholder="doctors"
          defaultValue={client.doctors}
          readOnly
        />
        <input
          type="text"
          name="pets"
          placeholder="pets"
          defaultValue={client.pets}
          onChange={(e) =>
            setClientDataUpdate({
              ...clientDataUpdate,
              pets: e.target.value,
            })
          }
        />
        <button type="submit" value="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
