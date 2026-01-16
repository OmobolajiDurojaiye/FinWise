import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialData = () => {
  const data = localStorage.getItem("finwiseData");
  if (data) {
    return JSON.parse(data);
  } else {
    return {
      user: { name: null },
      transactions: [],
    };
  }
};

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem("finwiseData", JSON.stringify(appData));
  }, [appData]);

  const setUserName = (name) => {
    setAppData((prevData) => ({
      ...prevData,
      user: { ...prevData.user, name: name },
    }));
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      amount: parseFloat(transaction.amount),
    };
    setAppData((prevData) => ({
      ...prevData,
      transactions: [newTransaction, ...prevData.transactions],
    }));
  };

  const value = {
    user: appData.user,
    transactions: appData.transactions,
    setUserName,
    addTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
